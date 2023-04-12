import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Answer from "./Answer";

const App =() =>{
    
    const [input, setInput] = useState({
        //initializes postData to the ff values. we set "setPostData" as the setter function for the state variable "postData"
        answer:0,
        format: 0,
        divisor:"",
        dividend:""
    });
    const [postData, setPostData] = useState({
        //initializes postData to the ff values. we set "setPostData" as the setter function for the state variable "postData"
        answer:0,
        format: 0,
        divisor:"",
        dividend:""
    });
    useEffect(() => {
        console.log(postData);
        
        
    }, [postData.answer]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("logging desc");
        console.log(postData);
        if(postData.input == "" || !isInteger(postData.dividend) || !isInteger(postData.divisor)){
            console.log("error");
            clear();
        }
        else{
            setInput({...postData, answer:1});
            setPostData({...postData, answer:1});
            
            
        }
        
    };
    const clear = () => {
        setPostData({
          format: 0,
          answer:0,
          divisor:"",
          dividend:""
          
        });
        setInput({
            format: 0,
            answer:0,
            divisor:"",
            dividend:""
            
          });
    };
    
    function isInteger(value) {
        return /^\d+$/.test(value);
    }
    return(
        <div>
            <form autoComplete="off" noValidate  onSubmit={handleSubmit} >
            <Select
                
                value={postData.format}
                label="Format"
                name="format"
                onChange={(e) => {
                    setPostData({ ...postData, format: e.target.value });
                }}
            >
                <MenuItem value={0}>Decimal</MenuItem>
                <MenuItem value={1}>Binary</MenuItem>
            </Select>
            <TextField
                
                name="dividend"
                variant="outlined"
                label="Dividend"
                fullWidth
                value={postData.dividend}
                onChange={(e) => {
                    setPostData({ ...postData, dividend: e.target.value });
                }}
            />
            <TextField
                
                name="divisor"
                variant="outlined"
                label="Divisor"
                fullWidth
                value={postData.divisor}
                onChange={(e) => {
                    setPostData({ ...postData, divisor: e.target.value });
                }}
            />
            <Button
            
                variant="contained"
                size="large"
                type="submit"
                fullWidth
            >
                Submit{" "}
            </Button>
            </form>
            {input.answer==1 && (
                <Answer input={input}/>
            )}
        </div>
    )
}

export default App;