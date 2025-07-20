import React, { useState, useEffect } from 'react';
import styles from './MyComponent.module.css';

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : ['Eat Breakfast', 'Drink Water'];
  });

  const [newTask, setNewTask] = useState('');

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className={styles.to_do_list}>
        <h1>TO-DO-LIST APP</h1>
        <div className={styles.below_heading}>
          <input
            type='text'
            placeholder='Enter a new task'
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />
          <button className={styles.add_button} onClick={addTask}>Add</button>

          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                <span className={styles.text}>{task}</span>
                <button className={styles.delete_button} onClick={() => deleteTask(index)}>Delete</button>
                <button className={styles.task_up_button} onClick={() => moveTaskUp(index)}>⬆️</button>
                <button className={styles.task_down_button} onClick={() => moveTaskDown(index)}>⬇️</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
