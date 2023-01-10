import * as React from 'react';
import '../new-task/new-task.css'
import TextField from "@mui/material/TextField";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from "@mui/material/Button";

export default function NewTask() {
  return (
    <div className="new-task">
      <form className="new-task__form">
        <br/>
        <h2>New Task</h2>
        <br/>

        <TextField
          label="Title"
          variant="standard"
          fullWidth
        />

        <br/>
        <br/>

        <TextField
          label="Description"
          variant="standard"
          fullWidth
        />

        <br/>
        <br/>

        <TextField
          type="number"
          label="Priority"
          variant="standard"
          fullWidth
        />

        <br/>
        <br/>
        <br/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Due date"
            onChange={() => {}}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <br/>
        <Button type={"submit"} variant="contained" color="info">Choice</Button>
        <br/>
      </form>
    </div>
  );
}