import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function ConfirmEmail() {
  const history = useHistory()

  useEffect(() => {
    confirm()
  }, [])

  const updateConfirmEmail = async () => {
    const searchParams = new URLSearchParams(history.location.search)
    const confirmToken = Object.fromEntries(searchParams).confirm_token
    const res = await fetch(`http://localhost:3000/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Authorization: confirmToken },
      body: JSON.stringify({
        email_confirmed: true,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      history.push('/login')
      alert('Please confirm your email')
      return json
    }
  }

  const confirm = () => {
    console.log(updateConfirmEmail())
  }
  return null
}

export default ConfirmEmail
