import { ArrowLeft, Moon, Sun, Cloud, HardDrive, Lock, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

interface SettingsScreenProps {
  onBack: () => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function SettingsScreen({ onBack, theme, onThemeChange }: SettingsScreenProps) {
  const handleSyncToggle = (enabled: boolean) => {
    toast.success(enabled ? 'Sync enabled' : 'Sync disabled');
  };

  const handleBiometricToggle = (enabled: boolean) => {
    toast.success(enabled ? 'Biometric lock enabled' : 'Biometric lock disabled');
  };

  const handleFontSizeChange = (size: string) => {
    toast.success(`Font size changed to ${size}`);
  };

  const handleFontStyleChange = (style: string) => {
    toast.success(`Font style changed to ${style}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Appearance Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-slate-100">Appearance</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Customize how the app looks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={(value: any) => onThemeChange(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />


            
            </div>
          </div>

  

          {/* About Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-slate-900 dark:text-slate-100 mb-4">About</h2>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p>Version 1.0.0</p>
              <p>© 2026 Notes App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
