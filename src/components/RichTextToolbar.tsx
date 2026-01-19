import { Bold, Italic, Underline, List, ListOrdered, Highlighter, Link, Image, Mic, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface RichTextToolbarProps {
  isAutoSaving?: boolean;
}

export function RichTextToolbar({ isAutoSaving }: RichTextToolbarProps) {
  const handleFormat = (format: string) => {
    toast.success(`Applied ${format} formatting`);
  };

  const handleAddImage = () => {
    toast.success('Image added to note');
  };

  const handleVoiceNote = () => {
    toast.success('Recording started');
  };

  const handleSave = () => {
    toast.success('Note saved successfully');
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('bold')}
        className="h-8 w-8 p-0"
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('italic')}
        className="h-8 w-8 p-0"
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('underline')}
        className="h-8 w-8 p-0"
      >
        <Underline className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('highlight')}
        className="h-8 w-8 p-0"
      >
        <Highlighter className="w-4 h-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('bullet list')}
        className="h-8 w-8 p-0"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('numbered list')}
        className="h-8 w-8 p-0"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-6 mx-1" />
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFormat('link')}
        className="h-8 w-8 p-0"
      >
        <Link className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleAddImage}
        className="h-8 w-8 p-0"
      >
        <Image className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleVoiceNote}
        className="h-8 w-8 p-0"
      >
        <Mic className="w-4 h-4" />
      </Button>
      
      <div className="flex-1" />
      
      {isAutoSaving && (
        <span className="text-slate-500 dark:text-slate-400 mr-2">
          Saving...
        </span>
      )}
      
      <Button
        variant="default"
        size="sm"
        onClick={handleSave}
        className="gap-2"
      >
        <Save className="w-4 h-4" />
        Save
      </Button>
    </div>
  );
}
