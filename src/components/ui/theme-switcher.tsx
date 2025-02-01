import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './button';
import { toggleTheme } from '@/state/settings.slice';
import { selectTheme } from '@/state/selectors/settings.selector';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
