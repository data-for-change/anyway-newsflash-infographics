import React, { FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button, Tooltip } from '@material-ui/core';
interface IProps {
    
}

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const AnyWayGridFilterMenu: FunctionComponent<IProps> = ({ children }) => {
    const classes = useStyles();
    const [timeBack, setTimeBack] = React.useState(3);
    const [timeRangeActive,setTimeRangeActive] = React.useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());

    function  handleDateChange (d : any) {
      setSelectedDate(d);
      console.log('chosen date', d)
    };
    function  handleDateChangeEnd (d : any) {
      setSelectedDateEnd(d);
    };
    const devStyles = {
        width: '100%',
        height : '50px',
        display: 'inline-block'
        
    }
    const handleChange = (event:any) : void => {
        setTimeBack(event.target.value);
        
      };

    const handleTimeRangeClick = (event:any) : void => {
      setTimeRangeActive(!timeRangeActive);
      
    };
    return  <div style={devStyles} >
              <span style={{display : "inline-block", width : "100%"}}>
              <span style={{position: "absolute"}}>
                <Button onClick={handleTimeRangeClick}>
                  <Tooltip title ={'בחר טווח זמנים'}>
                    <CalendarTodayIcon/>
                  </Tooltip>
                </Button>
                <FormControl className={classes.formControl} style={{marginTop: "-20px"}}>
                  <InputLabel id="demo-simple-select-label"> זמן אחורה</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeBack}
                  onChange={handleChange}

                  >
                  <MenuItem value={3}>3 חודשים</MenuItem>
                  <MenuItem value={6}>חצי שנה</MenuItem>
                  <MenuItem value={12}>שנה</MenuItem>
                  <MenuItem value={60}>5 שנים</MenuItem>

                  </Select>

                  </FormControl>
                  </span>

                  <span style={{display : timeRangeActive ? "inline-block" : "None" , marginRight: "10px", float: "left", marginLeft: "56%", marginTop: "-36px"}}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" style={{float: "left", width : "150px",display:"inline-block"}}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="החל מתאריך"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                      <Grid container justify="space-around"style={{float: "left", width : "150px",display:"inline-block", marginLeft: "10px"}}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="עד תאריך"
                        value={selectedDateEnd}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      </Grid>
                </MuiPickersUtilsProvider>



                    
                  </span>
                
      
                  </span>
            </div>
}
export default AnyWayGridFilterMenu
