import { HashRouter, Routes, Route } from 'react-router-dom';
import { WordsListPage } from '@/features/pages/WordsList/WordsListPage';
import { WordEditPage } from '@/features/pages/WordsList/WordEditPage';
import { QuizletSetsPage } from '@/features/pages/QuizletSets/QuizletSetsPage';
import { useTheme } from '@/features/hooks/useTheme';
import { AppNavigation } from '@/features/components/AppNavigation';

// Prevent theme flash by immediately setting theme on script load
const initializeTheme = () => {
  const root = window.document.documentElement;
  root.classList.add('no-transition');
  root.classList.add('dark');
};
initializeTheme();

export default function App() {
  useTheme();

  return (
    <HashRouter>
      <div className="max-h-[600px] min-h-screen bg-background text-foreground">
        <AppNavigation />
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
