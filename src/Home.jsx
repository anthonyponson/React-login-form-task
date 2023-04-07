import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
    console.log(storedTasks)
  }, [])

  const edit = (e) => {
    const index = e.target.dataset.index
    const removedTasks = tasks[index]
    console.log('removed', removedTasks)
    setTasks((prevTasks) => prevTasks.filter((task) => task !== index))
    navigate('/form', { state: { task: tasks[index], index } })
    // setTasks([])
  }
  const deleteButton = (e) => {
    const index = e.target.dataset.index
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }
  const goToForm = () => {
    navigate('/form')
  }
  return (
    <>
      <div>
        <nav className="nav">
          <li onClick={goToForm} className="list-item">
            Form
          </li>
        </nav>
      </div>
      <h1>Tasks:</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.taskName} - {task.taskDes}:{' '}
            <input type="checkbox" checked={task.checked} />
            <label>{task.checked ? 'Completed' : 'Not completed'}</label>
            {/* {task.checked ? 'Completed' : 'Not completed'} */}
            <button onClick={edit} data-index={index}>
              Edit
            </button>
            <button onClick={deleteButton} data-index={index} data-index={index}>delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
