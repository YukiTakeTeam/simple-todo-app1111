import { useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  title: string;
  dueDate: string | null;
};

const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      { id: crypto.randomUUID(), title: text, dueDate: dueDate || null },
      ...todos,
    ]);
    setText("");
    setDueDate("");
  };

  const isOverdue = (t: Todo) =>
    t.dueDate !== null && t.dueDate < today();

  return (
    <div>
      <h1>ToDo (Due Date)</h1>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id} className={isOverdue(t) ? "overdue" : ""}>
            {t.title}
            {t.dueDate && `（期限: ${t.dueDate}）`}
            {isOverdue(t) && " ←期限切れ"}
          </li>
        ))}
      </ul>
    </div>
  );
}
