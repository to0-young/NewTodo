import * as React from 'react';
import './dashboard.css'

export default function DataTable() {
  const myRows = [
    { title: 'Training', desc: 'To train in the hall', priority: 1, dueDate: new Date().toDateString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 1, dueDate: new Date().toDateString() },
    { title: 'Vacation', desc: 'Go with friends to nature', priority: 1, dueDate: new Date().toDateString() },
  ]

  const myRows2 = [
    { title: 'Cooking', desc: 'Prepare Borscht', priority: 1, dueDate: new Date().toDateString() },
    { title: 'Dog', desc: 'Walk the dog', priority: 1, dueDate: new Date().toDateString() },
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
