import {apiUrl} from '../../exp-const/constants'

export const loginUser = async (user, props, history, setErrorMsg) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/sessions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })

    const json = await res.json();
    if (res.ok) {
      props.getSessionSuccess(json)
      history.push('/dashboard')
    } else {
      setErrorMsg(json.message)
    }

    return json
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error)
    throw error
  }
}

export const loginWithGoogle = async (data, props, history, setErrorMsg) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/google`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        google: {
          email: data.email,
          google_id: data.sub,
        },
      }),
    })

    const json = await res.json()
    if (res.ok) {
      props.getSessionSuccess(json)
      history.push('/dashboard')
    } else {
      setErrorMsg(json.message)
    }

    return json
  } catch (error) {
    console.error('Error during request execution:', error)
    throw error
  }
}

export const forgetPassword = async (user, setErrorMsg) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/forget_passwords`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    const json = await res.json();
    if (res.ok) {
      alert('We have sent you a password change request')
    } else {
      setErrorMsg(json.message)
    }

    return json
  } catch (error) {
    console.error('Error during request execution:', error)
    throw error
  }
}

export const updatePassword = async (apiUrl, user, recoveryToken, history) => {
  try {
    const res = await fetch(`${apiUrl}/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: recoveryToken,
      },
      body: JSON.stringify({
        password: user.password,
        password_confirmation: user.confirmationPassword,
      }),
    });

    if (res.ok) {
      alert('Your password has been successfully changed')
      history.push('/login')
    }

    const json = await res.json()
    return json
  } catch (error) {
    console.error('Error during request execution:', error)
    throw error
  }
}

export const createUser = async (apiUrl, user, file, history, setDisabled, setFetched, changeError) => {
  try {
    setDisabled(true)
    setFetched(true)

    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('first_name', user.firstName)
    formData.append('last_name', user.lastName)
    formData.append('password', user.password)
    formData.append('email', user.email)

    const res = await fetch(`${apiUrl}/api/v1/users`, {
      method: 'POST',
      credentials: 'include',
      // headers: {'Content-Type': 'application/json'}
      body: formData,
    });

    const json = await res.json()

    if (res.ok) {
      alert('Please confirm your email registration')
      history.push('/login')
    } else {
      if (json.errors) {
        const firstError = json.errors.first_name ? json.errors.first_name[0] : ''
        const lastError = json.errors.last_name ? json.errors.last_name[0] : ''
        const emailError = json.errors.email ? json.errors.email[0] : ''
        const passwordError = json.errors.password ? json.errors.password[0] : ''

        changeError({
          firstName: firstError,
          lastName: lastError,
          password: passwordError,
          email: emailError,
        });
      }
      setDisabled(false)
      setFetched(false)
    }
    // localStorage.setItem('firstName', user.firstName)  Приклад збереження в локалстор
    // localStorage.setItem('lastName', user.lastName)
    // localStorage.setItem('email', user.email)

    return json
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error)
    throw error
  }
}


export const fetchMessages = async (apiUrl, setMessages) => {
  try {
    const res = await fetch(`${apiUrl}/messages`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error)
  }
};

export const sendMessage = async (apiUrl, msg, session) => {
  try {
    const res = await fetch(`${apiUrl}/messages`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: msg,
        first_name: session.user.first_name,
      }),
    })

    if (!res.ok) {
      throw new Error('Помилка при відправці повідомлення')
    }
  } catch (error) {
    console.error('Помилка при виконанні запиту:', error)
    throw error
  }
}



