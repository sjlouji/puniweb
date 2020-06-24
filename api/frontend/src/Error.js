import React from 'react'
import { SnackbarProvider, useSnackbar } from 'notistack';


export  default function Error(props) {
    const { enqueueSnackbar } = useSnackbar();
  
    const handleClick = () => {
      if(props.value.message==="Network Error"){
          enqueueSnackbar("No Response from the Server", {variant: 'warning'});
      }
      if(props.value==="Check  your Internet Connection"){
        enqueueSnackbar("Check  your Internet Connection", {variant: 'warning'});
      }
    };
  
    if(props){
      console.log(props)
      handleClick()
    }
    console.log(props.value.message)
    return (
      <React.Fragment>
        
      </React.Fragment>
    );
  }