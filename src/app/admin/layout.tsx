"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Newspaper, LogOut, Brush, Home } from 'lucide-react';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import Link from 'next/link';
import { BugCatcher, LogEntry } from '@/components/BugCatcher';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
    setLogs(prevLogs => [...prevLogs, { ...log, id: Date.now().toString(), timestamp: new Date() }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-xl font-semibold tracking-tight">FND.ME Admin</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/dashboard"><LayoutDashboard />Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                <Link href="/admin/articles"><Newspaper />Articles</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild disabled>
                <Link href="#"><Brush />Portfolio</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/"><Home />View Site</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
          {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                // @ts-ignore 
                return React.cloneElement(child, { addLog });
              }
              return child;
          })}
        </div>
        <BugCatcher logs={logs} onClear={clearLogs} />
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <AdminLayoutContent>{children}</AdminLayoutContent>
  );
}
