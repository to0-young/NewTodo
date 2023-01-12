import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export default function Spinner() {
  return (
    <Stack sx={{color: 'grey.500', width: '100%'}} spacing={2}>
      {<CircularProgress style={{margin: 'auto'}} color="inherit"/>}
    </Stack>
  )
}

