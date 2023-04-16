import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Form = () => {
  const locationState = useLocation().state
  const [taskName, setTaskName] = useState(locationState?.task?.name ?? '')
  const [taskDes, setTaskDes] = useState(locationState?.task?.description ?? '')
  const [checkInput, setCheckInput] = useState(
    locationState?.task?.isComplete ?? false
  )
  const [isSubmit, setIsSubmit] = useState(false)

  const sameInput = (e) => {
    if (e.target.name === 'name') {
      setTaskName(e.target.value)
    } else {
      setTaskDes(e.target.value)
    }
  }

  const checking = (e) => {
    setCheckInput(!checkInput)
  }

  const submitHandle = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    if (taskName === '' || taskDes === '') return

    const newTask = {
      name: taskName,
      description: taskDes,
      isComplete: checkInput
    }

    if (locationState?.index !== undefined) {
      const updatedTasks = JSON.parse(localStorage.getItem('tasks')) || []
      updatedTasks[locationState.index] = newTask
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } else {
      const updatedTasks = [
        ...JSON.parse(localStorage.getItem('tasks') || []),
        newTask
      ]
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    setTaskName('')
    setTaskDes('')
    setCheckInput(false)
    setIsSubmit(false)

    navigate('/home')
  }

  const navigate = useNavigate()

  return (
    <div>
      <form onSubmit={submitHandle}>
        <input name="name" value={taskName} onChange={sameInput} type="text" />
        {taskName === '' && isSubmit && <div>Please fill the box</div>}
        <input name="des" value={taskDes} onChange={sameInput} type="text" />
        {taskDes === '' && isSubmit && <div>Please fill the second box</div>}
        <input checked={checkInput} onChange={checking} type="checkbox" />
        <input type="submit" />
        <button onClick={() => navigate('/home')}>Go to Home</button>{' '}
      </form>{' '}
    </div>
  )
}

export default Form
