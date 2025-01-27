import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addTodo, toggleTodo, editTodo, deleteTodo } from '@/state/todo.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2, Check, X } from 'lucide-react';

export function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const todos = useAppSelector((state) => state.todos.todos);
  const isInitialized = useAppSelector((state) => state.todos.isInitialized);
  const dispatch = useAppDispatch();
  console.log(todos);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText.trim() }));
      setEditingId(null);
    }
  };

  if (!isInitialized) {
    return <div className="p-4 text-center">Loading todos...</div>;
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => dispatch(toggleTodo(todo.id))}
              />

              {editingId === todo.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(todo.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-between">
                  <span className={todo.completed ? 'text-muted-foreground line-through' : ''}>
                    {todo.text}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditing(todo.id, todo.text)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
