import * as React from 'react';
import './dashboard.css'
import {useEffect} from "react";
import {connect, useSelector} from "react-redux";
import actionCreator from "../../../services/store/action-creator";
import Spinner from "../../reusable/spinner";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Dashboard(props) {
  const tasks = useSelector((state) => state.task.list)
  const fetched = useSelector((state) => state.task.fetched)

  useEffect(() => {
    getTasks()
  }, [])

  const deleteTask = (taskId) => async () => {
    if (window.confirm(`Are you sure you want to delete task with ID ${taskId}`)) {
      const res = await fetch(`http://localhost:3000/api/v1/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
      })

      const json = await res.json()
      if (res.ok) {
        props.deleteTaskSuccess(taskId)
      }
      return json
    }
  }

  const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/v1/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    })

    const json = await res.json()
    if (res.ok) {
      props.getTaskSuccess(json)
    }
    return json
  }

  const myRows = [
    { title: 'Training', desc: 'To train in the hall', priority: 1, dueDate: new Date().toLocaleString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 4, dueDate: new Date().toLocaleString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 2, dueDate: new Date().toLocaleString() },
  ]

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
            return (
              <tr key={index}>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.priority}</td>
                <td>{new Date(row.due_date).toLocaleString()}</td>
                <td>
                  <button onClick={deleteTask(row.id)}><DeleteForeverIcon /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>


      <table>
       <thead>
       <tr>
         <th>Title</th>
         <th>Description</th>
         <th>Priority</th>
         <th>Due date</th>
       </tr>
       </thead>

        <tbody>
        {myRows.map((row, index) => {
          return (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.desc}</td>
              <td>{row.priority}</td>
              <td>{row.dueDate}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

const ConnectedDashboard = connect(null, actionCreator)(Dashboard);
export default ConnectedDashboard;

