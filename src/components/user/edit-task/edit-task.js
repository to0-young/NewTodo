import * as React from 'react'
import './edit-task.css'
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../../reusable/spinner'
import { apiUrl } from '../../../exp-const/constants'

function EditTask(props) {
  const params = useParams()
  const history = useHistory()
  const received = useSelector((state) => state.task.received)

  const [task, changeTask] = React.useState({
    title: '',
    description: '',
    priority: 1,
    dueDate: new Date(),
  })

  const [error, changeError] = React.useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  })

  const onValidation = () => {
    let valid = true
    const appError = {
      title: '',
      priority: '',
      dueDate: '',
    }

    if (task.title.length < 3 || task.title.length > 20) {
      valid = false
      appError.title = 'Sorry, your title should be between 3 and 20 characters'
    }
    if (task.priority.length < 1) {
      valid = false
      appError.priority = 'Sorry your priority is missing'
    }

    if (!valid) {
      changeError(appError)
    }
    return valid
  }

  const onEditTask = async (e) => {
    e.preventDefault()
    if (onValidation()) {
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  const changeTitle = (e) => {
    changeTask({
      ...task,
      title: e.target.value,
    })
  }

  const changeDescription = (e) => {
    changeTask({
      ...task,
      description: e.target.value,
    })
  }

  const changePriority = (e) => {
    changeTask({
      ...task,
      priority: e.target.value,
    })
  }

  const changeDate = (value) => {
    changeTask({
      ...task,
      dueDate: value,
    })
  }

  const updateTask = async () => {
    const res = await fetch(`${apiUrl}/api/v1/tasks/${task.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.dueDate,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      history.push('/dashboard')
      alert('Task updated')
      return json
    }
  }

  const getTask = async () => {
    const res = await fetch(`${apiUrl}/api/v1/tasks/${params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await res.json()
    if (res.ok) {
      props.getTaskSuccess(json)
      changeTask({ ...json, dueDate: json.due_date })
    }
  }

  if (received === false) return <Spinner />

  return (
    <div className='edit-task'>
      <form onSubmit={onEditTask} className='edit-task__form'>
        <br />
        <h2>Edit Task</h2>
        <br />

        <TextField
          className='title'
          value={task.title}
          error={'' !== error.title}
          helperText={error.title}
          onChange={changeTitle}
          id='standard-basic'
          type='string'
          label='Title'
          variant='standard'
          fullWidth
        />

        <br />
        <br />

        <TextField
          className='description'
          value={task.description}
          onChange={changeDescription}
          id='standard-basic'
          label='Description'
          variant='standard'
          fullWidth
        />

        <br />
        <br />

        <TextField
          className='priority'
          value={task.priority}
          error={'' !== error.priority}
          helperText={error.priority}
          onChange={changePriority}
          id='standard-basic'
          label='Priority'
          type={'number'}
          variant='standard'
          fullWidth
        />
        <br />
        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label='Due date'
            type={'date'}
            onChange={changeDate}
            value={task.dueDate}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <br />
        <Button type={'submit'} className='task__update-btn' onClick={updateTask} variant='contained' color='info'>
          save
        </Button>

        <br />
      </form>
    </div>
  )
}

const ConnectedEditTask = connect(null, actionCreator)(EditTask)
export default ConnectedEditTask
