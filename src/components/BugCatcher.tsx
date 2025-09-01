import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bug, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export type LogEntry = {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'error' | 'warning';
  source: string;
  message: string;
};

type BugCatcherProps = {
  logs: LogEntry[];
  onClear: () => void;
};

export function BugCatcher({ logs, onClear }: BugCatcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeVariant = (type: LogEntry['type']) => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'success':
        return 'default';
      case 'info':
        return 'secondary';
      case 'warning':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const errorCount = logs.filter(log => log.type === 'error').length;

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-6 w-6" />
        {errorCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1">
            {errorCount}
          </Badge>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[70vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Bug Catcher - Event Logs</DialogTitle>
            <DialogDescription>
              A real-time log of application events.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow min-h-0">
            <ScrollArea className="h-full border rounded-md">
              <div className="p-4 space-y-4">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div key={log.id} className="p-3 bg-muted/50 rounded-md text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                           <Badge variant={getBadgeVariant(log.type)}>{log.type}</Badge>
                           <span className="font-semibold text-foreground">{log.source}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(log.timestamp, 'HH:mm:ss.SSS')}
                        </span>
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-xs break-all">{log.message}</pre>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    No logs yet.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={onClear} disabled={logs.length === 0}>
                <Trash2 className="mr-2 h-4 w-4"/>
                Clear Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
