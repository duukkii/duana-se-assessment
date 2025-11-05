'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BarChart3, Settings, HelpCircle, LogOut, MessageSquare, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out",
          "md:translate-x-0 md:static fixed inset-y-0 left-0 z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Workspace Info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/avatar-4.svg" alt="BotPlatform Inc." />
              <AvatarFallback className="bg-orange-600 text-white">B</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                BotPlatform Inc.
              </p>
              <p className="text-xs text-muted-foreground">Workspace</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3',
                    isActive && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <HelpCircle className="w-5 h-5" />
            Help Center
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
