import { useEffect, useMemo, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((item) => !item.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    if (filter === "Active") {
      return tasks.filter((item) => !item.completed);
    }

    if (filter === "Completed") {
      return tasks.filter((item) => item.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((item) => item.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div>
            <p style={styles.badge}>React Project</p>
            <h1 style={styles.title}>Task Manager</h1>
            <p style={styles.subtitle}>
              A clean and modern to-do app built with React and localStorage.
            </p>
          </div>

          <div style={styles.statsBox}>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>{totalTasks}</span>
              <span style={styles.statLabel}>Total</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>{activeTasks}</span>
              <span style={styles.statLabel}>Active</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>{completedTasks}</span>
              <span style={styles.statLabel}>Done</span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Enter a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            />

            <button onClick={addTask} style={styles.addButton}>
              Add Task
            </button>
          </div>

          <div style={styles.toolbar}>
            <div style={styles.filterGroup}>
              <button
                onClick={() => setFilter("All")}
                style={{
                  ...styles.filterButton,
                  ...(filter === "All" ? styles.filterButtonActive : {}),
                }}
              >
                All
              </button>

              <button
                onClick={() => setFilter("Active")}
                style={{
                  ...styles.filterButton,
                  ...(filter === "Active" ? styles.filterButtonActive : {}),
                }}
              >
                Active
              </button>

              <button
                onClick={() => setFilter("Completed")}
                style={{
                  ...styles.filterButton,
                  ...(filter === "Completed" ? styles.filterButtonActive : {}),
                }}
              >
                Completed
              </button>
            </div>

            <button onClick={clearCompleted} style={styles.clearButton}>
              Clear Completed
            </button>
          </div>

          {filteredTasks.length === 0 ? (
            <div style={styles.emptyState}>
              <h3 style={styles.emptyTitle}>No tasks found</h3>
              <p style={styles.emptyText}>
                Add a new task or change the filter.
              </p>
            </div>
          ) : (
            <ul style={styles.list}>
              {filteredTasks.map((item) => (
                <li key={item.id} style={styles.listItem}>
                  <div style={styles.taskLeft}>
                    <button
                      onClick={() => toggleTask(item.id)}
                      style={{
                        ...styles.checkButton,
                        ...(item.completed ? styles.checkButtonDone : {}),
                      }}
                    >
                      {item.completed ? "✓" : ""}
                    </button>

                    <span
                      style={{
                        ...styles.taskText,
                        ...(item.completed ? styles.taskTextDone : {}),
                      }}
                    >
                      {item.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(item.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(56, 189, 248, 0.15), transparent 25%), #0f172a",
    color: "white",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  wrapper: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(56, 189, 248, 0.12)",
    border: "1px solid rgba(56, 189, 248, 0.25)",
    color: "#67e8f9",
    fontSize: "14px",
    marginBottom: "14px",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    lineHeight: "1.7",
    maxWidth: "600px",
  },
  statsBox: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  statNumber: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    backdropFilter: "blur(12px)",
  },
  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "240px",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #334155",
    outline: "none",
    fontSize: "16px",
    background: "#0f172a",
    color: "white",
  },
  addButton: {
    background: "linear-gradient(90deg, #38bdf8, #22d3ee)",
    color: "#0f172a",
    border: "none",
    padding: "14px 18px",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  filterButton: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    cursor: "pointer",
  },
  filterButtonActive: {
    background: "linear-gradient(90deg, #38bdf8, #22d3ee)",
    color: "#0f172a",
    border: "none",
    fontWeight: "bold",
  },
  clearButton: {
    background: "transparent",
    color: "#fca5a5",
    border: "1px solid rgba(252, 165, 165, 0.25)",
    padding: "10px 14px",
    borderRadius: "999px",
    cursor: "pointer",
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
    border: "1px dashed rgba(255,255,255,0.1)",
    borderRadius: "16px",
  },
  emptyTitle: {
    marginBottom: "8px",
  },
  emptyText: {
    color: "#94a3b8",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    background: "#0f172a",
    border: "1px solid #334155",
    padding: "14px 16px",
    borderRadius: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: "220px",
  },
  checkButton: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    border: "1px solid #475569",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  checkButtonDone: {
    background: "#22c55e",
    border: "1px solid #22c55e",
    color: "white",
  },
  taskText: {
    fontSize: "16px",
  },
  taskTextDone: {
    textDecoration: "line-through",
    color: "#94a3b8",
  },
  deleteButton: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;