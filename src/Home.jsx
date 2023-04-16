import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const tasksFromLocalStorage =
      JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(tasksFromLocalStorage)
  }, [])

  const navigate = useNavigate()

  const deleteTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    let tasksFromLS = JSON.parse(localStorage.getItem('tasks')) || []
    tasksFromLS.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasksFromLS))
  }

  const editTask = (task, index) => {
    navigate('/form', { state: { task, index } })
  }

  return (
    <div>
      {tasks.map((task, index) => {
        return (
          <ul key={index}>
            <li>
              {task.name} - {task.description}
              <input type="checkbox" checked={task.isComplete} />
              <button onClick={() => editTask(task, index)}>Edit</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          </ul>
        )
      })}

      <button onClick={() => navigate('/form')}>Go to Form</button>
    </div>
  )
}

export default Home

