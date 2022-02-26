import React, { useCallback, useReducer, useRef } from 'react';

import './Todo.css'
import Typography from '@mui/material/Typography';
import { Box, Button, Card, Grid, TextField } from '@mui/material';


    interface todo{
        id:number;
    text:string
    }

  type actionType= | { type: "ADD"; text: string }
                               | { type: "REMOVE"; id: number };


const Todo = () => {


 const [todos, dispatch] = useReducer((state: todo[], action: actionType) => {

    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

    const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current?.value) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
     

    }
    console.log(todos)
  }, [todos]);

    return (
        <div>
            <Box  className='main'>

           
            <Typography variant='h4' sx={{color:'#000000', opacity:'61%', fontWeight:'bold', mt:'32px'}}>TODO App</Typography>

            <Box>
                <TextField placeholder='Type Something.....' sx={{width:'400px', backgroundColor:'#FFFFFF', borderRadius:'10px', mt:'18px' }} inputRef={newTodoRef}></TextField>  <br/>
                <Button variant="outlined" sx={{backgroundColor:'#4A4B4A',mt:'10px',color:'white','&:hover': {
        background: '#4A4B4A',
    }}} onClick={()=>onAddTodo()} >ADD</Button>
            </Box>
             </Box>

             <Box className="cards container" sx=
             {{mt:'54px'}}>
                 <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {todos.map(item =>(
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <Card variant="outlined" sx={{textAlign:'center',p:'15px',background: '#C4C4C4' , minHeight:'100px'}}>
                <Typography sx={{color:'#182B33'}} variant="body2">
                    {item.text.slice(0,150)}
                </Typography>
                <Button sx={{width:'80px',height:'30px',backgroundColor:'#F46060', color:'white','&:hover': {
        background: '#F46060'
    },mt:'10px'}} onClick={() => dispatch({ type: "REMOVE", id: item.id })}> Remove</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
               
             </Box>
        </div>
    );
};

export default Todo;