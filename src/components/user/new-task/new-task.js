import * as React from 'react';
import '../new-task/new-task.css'
import TextField from "@mui/material/TextField";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";

export default function NewTask() {
  const [task, changeTask] = React.useState( {
    title: "",
    description: "",
    priority: 1,
    dueDate: new Date()
  })

  const [error, changeError] = React.useState({
    title: "",
    description: "",
    priority: "",
    dueDate: ""
  })


const onValidation = () => {
  let valid = true
  const appError = {
    title: "",
    priority: "",
    dueDate: ""
  }

  if (task.title.length < 3 ) {
    valid = false
    appError.title = "Sorry your title is too short"
  }
  if (task.priority.length < 1 ) {
    valid = false
    appError.priority = "Sorry your priority is too short"
  }
  if (task.dueDate) {
    valid = false
    appError.dueDate = "Sorry your due-Date is too short"
  }
  if(!valid) {
    changeError(appError)
  }
  return valid
  }

  const onNewTask = async (e) => {
    e.preventDefault()
    if (onValidation()) {
      await postTask()
    }
  }

  const onChangeTitle = (e) => {
    changeTask({
      ...task,
      title: e.target.value
    })
  }

  const onChangeDescription = (e) => {
    changeTask({
      ...task,
      description: e.target.value
    })
  }

  const onChangePriority = (e) => {
    changeTask({
      ...task,
      priority: e.target.value
    })
  }

  const onChangeDate = (value) => {
    changeTask({
      ...task,
      dueDate: value
    })
  }

  const postTask = async () => {
    const res = await fetch('http://localhost:3000/api/v1/tasks', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.dueDate
      })
    })

    const json = await res.json()
    if (res.ok) {
    } else {
      if (json.errors) {
        const titleError = json.errors.title[0],
          priorityError = json.errors.priority[0],
          due_dateError = json.errors.dueDate[0]
        changeError({
          title: titleError,
          priority: priorityError,
          due_date: due_dateError
        })
      }
    }
    return json
  }

    return (
      <div className="new-task">
        <form onSubmit={onNewTask} className="new-task__form">
          <br/>
          <h2>New Task</h2>
          <br/>
          <TextField
            value={task.title}
            error={"" !== error.title}
            helperText={error.title}
            onChange={onChangeTitle}
            type="string"
            label="Title"
            variant="standard"
            fullWidth
          />

          <br/>
          <br/>

          <TextField
            value={task.description}
            onChange={onChangeDescription}
            label="Description"
            variant="standard"
            fullWidth
          />

          <br/>
          <br/>

          <TextField
            value={task.priority}
            error={"" !== error.priority}
            helperText={error.priority}
            onChange={onChangePriority}
            label="Priority"
            type={'number'}
            variant="standard"
            fullWidth
          />
          <br/>
          <br/>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Due date"
              onChange={onChangeDate}
              value={task.dueDate}
              minDate={new Date()}
              fullWidth
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>


          <br/>
          <Button type={"submit"}  variant="contained" color="info">Create</Button>
          <br/>
        </form>
      </div>
    );
}
