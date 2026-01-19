import { useState, useEffect } from 'react';
import { Menu, FileText, FolderOpen, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './components/ui/button';
import { NotesListScreen } from './components/NotesListScreen';
import { NoteEditor } from './components/NoteEditor';
import { FoldersScreen } from './components/FoldersScreen';
import { NotePreview } from './components/NotePreview';
import { SettingsScreen } from './components/SettingsScreen';
import { SearchResults } from './components/SearchResults';
import { Toaster } from './components/ui/sonner';
import { mockNotes } from './data/mockData';
import { Note, Screen, ViewMode } from './types';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';

export default function App() {
  // ---------------- STATE ----------------

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes_app_data');
    if (saved) {
      try {
        return JSON.parse(saved).map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          updatedAt: new Date(n.updatedAt),
        }));
      } catch {
        return mockNotes;
      }
    }
    return mockNotes;
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [theme, setTheme] = useState<string | null>(localStorage.getItem('theme') ?? 'system');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedNoteId) ?? null;
  const editingNote = notes.find(n => n.id === editingNoteId) ?? null;

  // ---------------- EFFECTS ----------------

  useEffect(() => {
    localStorage.setItem('notes_app_data', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    localStorage.setItem('theme', theme || 'system');
    if (theme === 'system') {
      root.classList.add(
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // ---------------- CRUD ----------------

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      isPinned: false,
      folderId: null,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes(prev => [newNote, ...prev]);
    setEditingNoteId(newNote.id);
    setCurrentScreen('editor');
  };

  const handleSaveNote = (data: Partial<Note>) => {
    if (!editingNoteId) return;

    setNotes(prev =>
      prev.map(n =>
        n.id === editingNoteId
          ? { ...n, ...data, updatedAt: new Date() }
          : n
      )
    );

    setSelectedNoteId(editingNoteId);
    setEditingNoteId(null);
    setCurrentScreen('preview');
  };

  const handleDeleteNote = () => {
    if (!selectedNoteId) return;

    setNotes(prev => prev.filter(n => n.id !== selectedNoteId));
    setSelectedNoteId(null);
    setCurrentScreen('home');
  };

  // ---------------- NAVIGATION ----------------

  const handleSelectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setCurrentScreen('preview');
  };

  const handleEditNote = () => {
    if (!selectedNoteId) return;
    setEditingNoteId(selectedNoteId);
    setCurrentScreen('editor');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedNoteId(null);
    setEditingNoteId(null);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSidebarOpen(false);
  };

  const navigationItems = [
    { id: 'home' as Screen, label: 'All Notes', icon: FileText },
    // { id: 'folders' as Screen, label: 'Folders', icon: FolderOpen },
    { id: 'settings' as Screen, label: 'Settings', icon: SettingsIcon },
  ];

  // ---------------- UI ----------------

  const Sidebar = () => (
    <nav className="p-4 space-y-2">
      <div className="mb-6">
        <h2 className="font-bold px-3">Notes App</h2>
        <p className="text-sm px-3 text-slate-500">{notes.length} notes</p>
      </div>

      {navigationItems.map(item => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={currentScreen === item.id ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
            onClick={() => handleNavigate(item.id)}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );




  const handleTogglePin = () => {
    if (!selectedNote) return;

    setNotes(prev =>
      prev.map(n =>
        n.id === selectedNote.id
          ? { ...n, isPinned: !n.isPinned, updatedAt: new Date() }
          : n
      )
    );

    setSelectedNote(prev =>
      prev ? { ...prev, isPinned: !prev.isPinned } : prev
    );
  };

  const handleDuplicate = () => {
    if (!selectedNote) return;

    const duplicated: Note = {
      ...selectedNote,
      id: Date.now().toString(),
      title: `${selectedNote.title} (copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes(prev => [duplicated, ...prev]);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-white dark:bg-slate-800">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-white dark:bg-slate-800 p-4">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-hidden mt-16 md:mt-0">
        {currentScreen === 'home' && (
          <NotesListScreen
            notes={
              searchQuery
                ? notes.filter(n =>
                  n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  n.content.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : notes
            }
            onCreateNote={handleCreateNote}
            onSelectNote={handleSelectNote}
            onSearch={handleSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        )}


        {currentScreen === 'editor' && editingNote && (
          <NoteEditor
            note={editingNote}
            onBack={handleBackToHome}
            onSave={handleSaveNote}
          />
        )}

        {currentScreen === 'preview' && selectedNote && (
          <NotePreview
            note={selectedNote}
            onBack={handleBackToHome}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
            onTogglePin={handleTogglePin}
            onDuplicate={handleDuplicate}
          />
        )}

        {currentScreen === 'folders' && (
          <FoldersScreen notes={notes} onBack={handleBackToHome} />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            onBack={handleBackToHome}
            theme={theme}
            onThemeChange={setTheme}
          />
        )}

        {currentScreen === 'search' && (
          <SearchResults
            notes={notes}
            query={searchQuery}
            onBack={handleBackToHome}
            onSelectNote={handleSelectNote}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
}
