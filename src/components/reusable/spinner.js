import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

export default function Spinner(props) {
  const { color, size } = props
  return (
    <div className='spinner'>
      <Stack sx={{ color: 'grey.500', width: '100%' }} spacing={2}>
        {<CircularProgress style={{ margin: 'auto', width: size, height: size }} color={color} />}
      </Stack>
    </div>
  )
}
