
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LogEntry } from '@/components/BugCatcher';

type LogContextType = {
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
};

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setLogs(prevLogs => [...prevLogs, { ...log, id: Date.now().toString(), timestamp: new Date() }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog, clearLogs }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogs() {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLogs must be used within a LogProvider');
  }
  return context;
}
