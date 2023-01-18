import * as React from 'react'
import './edit-task.css'
import TextField from '@mui/material/TextField'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { useParams } from 'react-router-dom'

function EditTask() {
  const history = useHistory()
  const params = useParams()
  console.log(params)

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

    if (task.title.length < 3) {
      valid = false
      appError.title = 'Sorry your title is too short'
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
      await postEditTask()
    }
  }

  const editChangeTitle = (e) => {
    changeTask({
      ...task,
      title: e.target.value,
    })
  }

  const editChangeDescription = (e) => {
    changeTask({
      ...task,
      description: e.target.value,
    })
  }

  const editChangePriority = (e) => {
    changeTask({
      ...task,
      priority: e.target.value,
    })
  }

  const editChangeDate = (value) => {
    changeTask({
      ...task,
      dueDate: value,
    })
  }

  const postEditTask = async () => {
    const res = await fetch('http://localhost:3000/api/v1/tasks', {
      method: 'POST',
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
    }
    return json
  }

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
          onChange={editChangeTitle}
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
          onChange={editChangeDescription}
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
          onChange={editChangePriority}
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
            onChange={editChangeDate}
            value={task.dueDate}
            minDate={new Date()}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <br />
        <Button type={'submit'} variant='contained' color='info'>
          save
        </Button>

        <br />
      </form>
    </div>
  )
}

const ConnectedEditTask = connect(null, actionCreator)(EditTask)
export default ConnectedEditTask
