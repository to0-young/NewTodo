import * as React from 'react'
import './dashboard.css'
import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import Spinner from '../../reusable/spinner'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import Pagination from '../../reusable/pagination'

function Dashboard(props) {
  const tasks = useSelector((state) => state.task.list)
  const fetched = useSelector((state) => state.task.fetched)

  useEffect(() => {
    getTasks()
  }, [])

  const updateCompletedTask = (taskId) => async () => {
    const res = await fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: true,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      props.updateTaskSuccess(json)
      return json
    }
  }

  const donCompletedTask = (taskId) => async () => {
    const res = await fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: false,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      props.updateTaskSuccess(json)
      return json
    }
  }

  const deleteTask = (task) => async () => {
    if (window.confirm(`Are you sure you want to delete task with ID ${task.id}`)) {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      const json = await res.json()
      if (res.ok) {
        props.deleteTaskSuccess(task)
      }
      return json
    }
  }

  const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/v1/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await res.json()
    if (res.ok) {
      props.fetchTasksSuccess(json)
    }
    return json
  }

  if (fetched === false) return <Spinner />

  return (
    <div className='dashboard'>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((row, index) => {
            const crossedClass = row.completed ? 'dashboard__td_crossed' : ''
            return (
              <tr key={index}>
                <td className={crossedClass}>{row.title}</td>
                <td className={crossedClass}>{row.description}</td>
                <td className={crossedClass}>{row.priority}</td>
                <td className={crossedClass}>{new Date(row.due_date).toLocaleString()}</td>
                <td className={`dashboard__task-btns ${crossedClass}`}>
                  <button className='dashboard__task-btn' onClick={deleteTask(row)}>
                    <DeleteForeverIcon />
                  </button>
                  <Link to={`/tasks/${row.id}`}>
                    <EditIcon />
                  </Link>

                  {row.completed ? (
                    <button className='dashboard__task-btn' onClick={donCompletedTask(row.id)}>
                      <Brightness1OutlinedIcon />
                    </button>
                  ) : (
                    <button className='dashboard__task-btn' onClick={updateCompletedTask(row.id)}>
                      <CheckCircleOutlineOutlinedIcon />
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination />
      </div>
    </div>
  )
}

const ConnectedDashboard = connect(null, actionCreator)(Dashboard)
export default ConnectedDashboard
