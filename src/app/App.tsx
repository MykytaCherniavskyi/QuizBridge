import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { WordsListPage } from '@/features/pages/WordsList/WordsListPage';
import { WordEditPage } from '@/features/pages/WordsList/WordEditPage';
import { QuizletSetsPage } from '@/features/pages/QuizletSets/QuizletSetsPage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { useTheme } from '@/features/hooks/useTheme';

// // Prevent theme flash by immediately setting theme on script load
const initializeTheme = () => {
  const root = window.document.documentElement;
  root.classList.add('no-transition');
  root.classList.add('dark');
};
initializeTheme();

function Navigation() {
  const location = useLocation();
  const pathname = location.pathname === '/' ? '/words' : location.pathname;

  const isActive = (path: string) => {
    if (path === '/words') {
      return pathname.startsWith('/words');
    }
    return pathname === path;
  };

  return (
    <nav className="border-b p-4">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div className="flex gap-4">
          <Link to="/words">
            <Button
              variant="ghost"
              className={cn(
                'transition-colors',
                isActive('/words') && 'bg-accent text-accent-foreground'
              )}
            >
              Words List
            </Button>
          </Link>
          <Link to="/sets">
            <Button
              variant="ghost"
              className={cn(
                'transition-colors',
                isActive('/sets') && 'bg-accent text-accent-foreground'
              )}
            >
              Quizlet Sets
            </Button>
          </Link>
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default function App() {
  useTheme();

  return (
    <HashRouter>
      <div className="max-h-[600px] min-h-screen bg-background text-foreground">
        <Navigation />
        <Routes>
          <Route path="/words" element={<WordsListPage />} />
          <Route path="/words/:wordId" element={<WordEditPage />} />
          <Route path="/sets" element={<QuizletSetsPage />} />
          <Route path="/" element={<WordsListPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
