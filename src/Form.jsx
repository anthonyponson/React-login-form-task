import React, { useState, useEffect } from 'react'
import {
  useNavigate,
  useLocation,
  BrowserRouter,
  Route,
  Router,
  Link
} from 'react-router-dom'
import './styles.css'

function Form() {
  const [taskName, setName] = useState('')
  const [taskDes, setDes] = useState('')
  const [checked, setChecked] = useState(false)
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [task, setTask] = useState(location.state?.task || {})
  const index = location.state?.index

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
    if (task.taskName || task.taskDes || task.checked) {
      const { taskName = '', taskDes = '', checked = false } = task
      setName(taskName)
      setDes(taskDes)
      setChecked(checked)
    }
  }, [])

  const inputChange = (e) => {
    console.log(e.target.value)
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else {
      setDes(e.target.value)
    }
  }

  const checkboxChecked = (e) => {
    setChecked(e.target.checked)
  }

  const handleClicksubmit = (e) => {
    e.preventDefault()
    setIsFormSubmited(true)
    if (taskName === '' || taskDes === '') return

    const newTask = { taskName, taskDes, checked }
    if (index !== undefined) {
      tasks[index] = newTask
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
      setTasks([...tasks, newTask])
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
    }

    setName('')
    setDes('')
    setChecked(false)
    setIsFormSubmited(false)
    // navigate('/home')
  }
  const goToHome = () => {
    navigate('/home')
  }
  const goToForm = () => {
    navigate('/form')
  }

  return (
    <>
      <div>
        <nav className="nav">
          <li className="list-item" onClick={goToHome}>
            Home
          </li>
        </nav>
      </div>

      <form onSubmit={handleClicksubmit}>
        <input
          name="name"
          value={taskName}
          onChange={inputChange}
          type="text"
        />
        {taskName === '' && isFormSubmited && (
          <div className="task-dev">task name required</div>
        )}

        <input name="des" value={taskDes} onChange={inputChange} type="text" />

        {taskDes === '' && isFormSubmited && (
          <div className="task-dev">task des required</div>
        )}

        <input checked={checked} type="checkbox" onChange={checkboxChecked} />
        <input type="submit" />
      </form>

      <div>
        <h1>Tasks: </h1>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {' '}
              {task.taskName} - {task.taskDes} :
              <input type="checkbox" checked={task.checked} />
              <label>{task.checked ? 'Completed' : 'Not completed'}</label>
            </li>
          ))}{' '}
        </ul>
      </div>
    </>
  )
}

export default Form
