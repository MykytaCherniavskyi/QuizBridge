import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { TodoList } from '@/components/TodoList';
import { PokemonPage } from '@/components/PokemonPage';
import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background text-foreground">
        <nav className="border-b p-4">
          <div className="mx-auto flex max-w-md gap-4">
            <Link to="/">
              <Button variant="ghost">Todo List</Button>
            </Link>
            <Link to="/pokemon">
              <Button variant="ghost">Pokemon</Button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/pokemon" element={<PokemonPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
