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
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlowOne}></div>
      <div style={styles.backgroundGlowTwo}></div>

      <div style={styles.app}>
        <div style={styles.leftPanel}>
          <p style={styles.badge}>React Project</p>
          <h1 style={styles.title}>Task Flow</h1>
          <p style={styles.description}>
            A modern task manager with clean UI, local storage, and smooth task
            control.
          </p>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statNumber}>{totalTasks}</span>
              <span style={styles.statLabel}>Tasks</span>
            </div>

            <div style={styles.statCard}>
              <span style={styles.statNumber}>{completedTasks}</span>
              <span style={styles.statLabel}>Completed</span>
            </div>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="Write a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            />
            <button onClick={addTask} style={styles.addButton}>
              Add
            </button>
          </div>

          <div style={styles.filterRow}>
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

          <div style={styles.taskList}>
            {filteredTasks.length === 0 ? (
              <div style={styles.emptyBox}>
                <h3 style={styles.emptyTitle}>Nothing here yet</h3>
                <p style={styles.emptyText}>Add a task to get started.</p>
              </div>
            ) : (
              filteredTasks.map((item) => (
                <div key={item.id} style={styles.taskCard}>
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#070b14",
    color: "white",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    position: "relative",
    overflow: "hidden",
  },
  backgroundGlowOne: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(59, 130, 246, 0.18)",
    filter: "blur(90px)",
    top: "-50px",
    left: "-80px",
  },
  backgroundGlowTwo: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(168, 85, 247, 0.18)",
    filter: "blur(90px)",
    bottom: "-60px",
    right: "-60px",
  },
  app: {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "24px",
    position: "relative",
    zIndex: 1,
  },
  leftPanel: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "32px",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
  },
  rightPanel: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "32px",
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(96, 165, 250, 0.12)",
    color: "#93c5fd",
    border: "1px solid rgba(96, 165, 250, 0.2)",
    marginBottom: "20px",
    fontSize: "14px",
  },
  title: {
    fontSize: "54px",
    lineHeight: 1,
    marginBottom: "16px",
  },
  description: {
    color: "#94a3b8",
    lineHeight: 1.8,
    fontSize: "16px",
    marginBottom: "28px",
    maxWidth: "420px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "14px",
  },
  statCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "20px",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "6px",
  },
  statLabel: {
    color: "#94a3b8",
  },
  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "220px",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "16px",
    fontSize: "16px",
    outline: "none",
  },
  addButton: {
    border: "none",
    borderRadius: "16px",
    padding: "16px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    color: "white",
    boxShadow: "0 10px 30px rgba(59,130,246,0.35)",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "22px",
    flexWrap: "wrap",
  },
  filterButton: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    padding: "10px 16px",
    borderRadius: "999px",
    cursor: "pointer",
  },
  filterButtonActive: {
    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
    border: "none",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  emptyBox: {
    padding: "40px 20px",
    textAlign: "center",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px dashed rgba(255,255,255,0.08)",
  },
  emptyTitle: {
    marginBottom: "8px",
  },
  emptyText: {
    color: "#94a3b8",
  },
  taskCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: 1,
    minWidth: "200px",
  },
  checkButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  checkButtonDone: {
    background: "linear-gradient(90deg, #22c55e, #16a34a)",
    border: "none",
  },
  taskText: {
    fontSize: "16px",
  },
  taskTextDone: {
    textDecoration: "line-through",
    color: "#94a3b8",
  },
  deleteButton: {
    background: "rgba(239,68,68,0.16)",
    color: "#fca5a5",
    border: "1px solid rgba(239,68,68,0.22)",
    padding: "10px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;