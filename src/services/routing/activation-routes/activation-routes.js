import React from 'react'
import Button from '@mui/material/Button'
import './activation-routes.css'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreator from '../../store/action-creator'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'

function ActivationRoutes(props) {
  const history = useHistory()

  const onExit = async () => {
    const res = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await res.json()
    if (res.ok) {
      props.deleteSessionSuccess()
      history.push('/login')
    }
    return json
  }

  return (
    <div className='action'>
      <form className='action__routes'>
        <MarkEmailReadIcon></MarkEmailReadIcon>
        <h2>Confirm your account</h2>

        <br />

        <Button onClick={onExit} variant='contained' color='info'>
          exit
        </Button>

        <br />

        <p> Once confirmed, this email will be uniquely associated with your Todo account.</p>
      </form>
    </div>
  )
}

const ConnectedActivationRoutes = connect(null, actionCreator)(ActivationRoutes)
export default ConnectedActivationRoutes
