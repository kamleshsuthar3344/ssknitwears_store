import type { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
    children: ReactNode;
    hideHeader?: boolean;
    hideBottomNav?: boolean;
}

export default function Layout({ children, hideHeader = false, hideBottomNav = false }: LayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            {!hideHeader && <Header />}

            <main className={`
        ${!hideHeader ? 'pt-16' : ''} 
        ${!hideBottomNav ? 'pb-20' : ''}
        min-h-screen
      `}>
                {children}
            </main>

            {!hideBottomNav && <BottomNav />}
        </div>
    );
}
