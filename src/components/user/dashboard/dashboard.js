import * as React from 'react';
import './dashboard.css'
import {useEffect} from "react";

export default function DataTable() {

  useEffect(() => {
    console.log("useEffect")
    getTasks()
  }, [])

  const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/v1/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    })

    const json = await res.json()
    console.log(getTasks)
    return json
  }

  const myRows = [
    { title: 'Training', desc: 'To train in the hall', priority: 1, dueDate: new Date().toDateString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 4, dueDate: new Date().toDateString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 2, dueDate: new Date().toDateString() },
  ]

  const myRows2 = [
    { title: 'Cooking', desc: 'Prepare Borscht', priority: 1, dueDate: new Date().toDateString() },
    { title: 'Dog', desc: 'Walk the dog', priority: 2, dueDate: new Date().toDateString() },
    { title: 'Cat', desc: 'Walk the cat', priority: 3, dueDate: new Date().toDateString() },
  ]
  return (
    <div className='dashboard'>
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Due date</th>
        </tr>

        {myRows2.map((row, index) => {
          return (
            <tr key={index}>
              <td>{row.title}</td>
              <td>{row.desc}</td>
              <td>{row.priority}</td>
              <td>{row.dueDate}</td>
            </tr>
          )
        })}
      </table>

      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Due date</th>
        </tr>

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
      </table>
    </div>
  )
}
