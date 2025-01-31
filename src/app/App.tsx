import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { WordsListPage } from '@/features/pages/WordsList/WordsListPage';
import { WordEditPage } from '@/features/pages/WordsList/WordEditPage';
import { QuizletSetsPage } from '@/features/pages/QuizletSets/QuizletSetsPage';
import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <HashRouter>
      <div className="max-h-[600px] min-h-screen bg-background text-foreground">
        <nav className="border-b p-4">
          <div className="mx-auto flex max-w-md gap-4">
            <Link to="/words">
              <Button variant="ghost">Words List</Button>
            </Link>
            <Link to="/sets">
              <Button variant="ghost">Quizlet Sets</Button>
            </Link>
          </div>
        </nav>

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
