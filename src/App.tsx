import { useState } from "react";

type Status = "todo" | "doing" | "done";
type Todo = { id: string; title: string; status: Status };

export default function App() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text) return;
    setTodos([{ id: crypto.randomUUID(), title: text, status: "todo" }, ...todos]);
    setText("");
  };

  const visible =
    filter === "all" ? todos : todos.filter((t) => t.status === filter);

  return (
    <div>
      <h1>ToDo Status</h1>

      <select onChange={(e) => setFilter(e.target.value as any)}>
        <option value="all">全て</option>
        <option value="todo">未着手</option>
        <option value="doing">進行中</option>
        <option value="done">完了</option>
      </select>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>

      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            {t.title}
            <select
              value={t.status}
              onChange={(e) =>
                setTodos(
                  todos.map((x) =>
                    x.id === t.id ? { ...x, status: e.target.value as Status } : x
                  )
                )
              }
            >
              <option value="todo">未着手</option>
              <option value="doing">進行中</option>
              <option value="done">完了</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
