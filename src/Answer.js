import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const Answer =({input})=>{
    const [result, setResult] = useState({
        //Contains the input in binary. Use this state variable to formulate the answer and solution.
        M:"",
        nM:"",
        Q:"",
        A:""
    });
    const textToBinary = async() => {
        console.log("WOW")
        if(input.format==0){
            input.dividend=parseInt(input.dividend,10).toString(2)
            input.divisor=parseInt(input.divisor,10).toString(2)
            console.log(input.dividend)
            console.log(input.divisor)
            if(input.divisor.length<=input.dividend.length){
                while(input.divisor.length<input.dividend.length+1){
                    input.divisor = "0".concat(input.divisor)
                }
            }
            let tempA = "";
            while (tempA.length<input.divisor.length){
                tempA = tempA.concat("0");
            }
            setResult({...result, Q: input.dividend, A: tempA, M:input.divisor});
        }
        
    
        
    };
    useEffect(() => {
        if(input.format==0){
            textToBinary();
        }
        else{
            if(input.divisor.length<=input.dividend.length){
                while(input.divisor.length<input.dividend.length+1){
                    input.divisor = "0".concat(input.divisor)
                }
            }
            let tempA = "";
            while (tempA.length<input.divisor.length){
                tempA = tempA.concat("0");
            }
            setResult({...result, Q: input.dividend, A: tempA, M:input.divisor});
        }
        
    }, [input]);
    return(
      
            <>
                {result.Q!="" && (
                    <>
                    <div>Dividend: {result.Q}</div>
                    <div>Divisor: {result.M}</div>
                    <div>A: {result.A}</div>
                    </>
                )}
            </>
        
    )
}

export default Answer;