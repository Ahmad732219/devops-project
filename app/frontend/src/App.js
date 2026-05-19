import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    setTitle('');
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center' }}>Task Manager</h1>
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new task..."
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>
          Add
        </button>
      </form>
      {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No tasks yet. Add one above!</p>}
      {tasks.map(task => (
        <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', marginBottom: '8px', background: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task._id, task.completed)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <span style={{ flex: 1, fontSize: '16px', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#999' : '#333' }}>
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)} style={{ padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      ))}
      <p style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '20px' }}>
        {tasks.filter(t => t.completed).length}/{tasks.length} tasks completed
      </p>
    </div>
  );
}

export default App;
