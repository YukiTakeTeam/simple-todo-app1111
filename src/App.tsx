import { useState } from "react";

type Todo = { id: string; title: string; status: number };

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState("status");

  const sorted = [...todos].sort((a, b) =>
    sort === "status" ? a.status - b.status : a.title.localeCompare(b.title)
  );

  return (
    <div>
      <h1>Sort Todos</h1>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="status">状態順</option>
        <option value="title">タイトル順</option>
      </select>

      <button
        onClick={() =>
          setTodos([
            ...todos,
            { id: crypto.randomUUID(), title: "task", status: Math.floor(Math.random() * 3) },
          ])
        }
      >
        Add dummy
      </button>

      <ul>
        {sorted.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
