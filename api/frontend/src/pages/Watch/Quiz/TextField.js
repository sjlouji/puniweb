import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Quiz from './Quiz'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default function TextFields(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [Answer, setAnswer] = React.useState();
  const [mark, setMark] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [disable, setDisable] = React.useState(false);

  const handleTextChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  React.useEffect(() => {
        for (let [key, value] of Object.entries(props.value.choices)) {
            if(value.answer === true){
                setAnswer(value.choices)
            }
        }
        setMark(props.value.mark)
  },[]);

  let val ;    
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisable(true)

    console.log(Answer)
    console.log(value)
    if (value === Answer) {
        window.$mark = parseInt(window.$mark) + parseInt(mark)
        setHelperText('You got it!');
        setError(false);   
        props.handleNameChange(window.$mark)
    } else if (value !== Answer) {
        window.$mark = parseInt(window.$mark) +parseInt(0)
        console.log(window.$mark)
        setHelperText('Sorry, wrong answer!');
        setError(true);
        props.handleNameChange(window.$mark)
    } else {
        setHelperText('Please select an option.');
      setError(true);
    
    }
  };


  return (
      <div>
            <form onSubmit={handleSubmit}>

                            <div>
                                    <TextField
                                        id="standard-full-width"
                                        label="Answer"
                                        style={{ margin: 8, width: '250px' }}
                                        placeholder="Make it correct"
                                        margin="normal"
                                        value={value} 
                                        onChange={handleTextChange}
                                    />
                            </div>
                        
                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                Check Answer
                </Button>
            </form>
      </div>
  );
}
