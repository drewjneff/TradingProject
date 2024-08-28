import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#414141',
          borderRadius: '4px',
          marginLeft: '10px',
          width: '142px',
          height: '40px',
          padding: '0',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              height: '45px',
              borderStyle: 'none',
            },
            '&:hover fieldset': {
              borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7c7c7c',
            },
            '& input': {
              padding: '0 0 0 5px',
              height: '40px',
              lineHeight: '40px',
              boxSizing: 'border-box',
              color: 'white',
              fontSize: '16px',
              width: 'calc(100% - 21px)',
            },
            '& .MuiInputAdornment-root': {
              height: '40px',
              marginRight: '0px',
              paddingLeft: '0px',
              color: 'white',
              marginLeft: 'auto',
            },
            '& svg': {
              width: '16px',
              height: '16px',
              color: 'white',
            },
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: '#414141',
          '&.Mui-selected': {
            backgroundColor: '#5a5a5a',
          },
          '&.MuiPickersDay-today': {
            border: '1px solid white',
          },
          '&:hover': {
            backgroundColor: '#5a5a5a',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#414141',
          color: 'white',
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        switchViewButton: {
          color: 'white',
        },
        label: {
          color: 'white',
        },
        iconButton: {
          color: 'white',
          '&:hover': {
            backgroundColor: '#5a5a5a',
          },
        },
      },
    },
    MuiPickersDayHeader: {
      styleOverrides: {
        weekDayLabel: {
          color: 'white',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: 'white',
        }
      }
    }
  },
});

export default function MyDatePicker({ defaultDate, selectedDate, setSelectedDate }) {
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate.format('YYYY-MM-DD'));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          '.MuiInputLabel-root': {
            color: 'white',
          },
          '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7c7c7c',
          },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="YYYY/MM/DD"
          value={dayjs(selectedDate)}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              className: 'date-picker-input',
            },
          }}
          PopperProps={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 8],
                },
              },
            ],
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
