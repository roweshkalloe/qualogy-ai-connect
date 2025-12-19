import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

const MainLayout = ({ children, className = '' }: MainLayoutProps) => {
  return (
    <main className={`min-h-screen pt-16 lg:pt-18 pb-20 md:pb-8 ${className}`}>
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
