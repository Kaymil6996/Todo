import React, { FC, ChangeEvent, useState } from 'react'
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  //@ts-ignore
  const [deadLine, setDeadLine] = useState<number>("");
  const [todo, setTodo] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDeadLine(Number(event.target.value));
    }
  }

  const addTask = () => {

    const newTask = {
      taskName: task,
      deadline: deadLine
    };
    console.log(newTask);
    //@ts-ignore
    if (task === "" || deadLine === "") {
      alert('dodaj task i ustaw jakiś deadline')
      return;
    }
    setTodo([...todo, newTask])
    setTask("");
    //@ts-ignore
    setDeadLine("")

  }

  const completeTask = (taskNameToDelete: string) => {
    setTodo(todo.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input type="text"
            placeholder='Task'
            name='task'
            value={task}
            onChange={handleChange} />

          <input type="number"
            placeholder='DeadLine w dniach'
            name='deadline'
            value={deadLine}
            onChange={handleChange} />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todo.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  )
}

export default App
