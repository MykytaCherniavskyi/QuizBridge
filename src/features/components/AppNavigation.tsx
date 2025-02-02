import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { cn } from '@/lib/utils';
import icon from '@/assets/icon144.png';

export function AppNavigation() {
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
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={icon} alt="QuizBridge" className="h-8 w-8" />
          </Link>
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
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
