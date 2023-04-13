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
    function pass(A1, A2, A3, Q1, Q2){
        this.A1 = A1;
        this.A2 = A2;
        this.A3 = A3;
        this.Q1 = Q1;
        this.A2 = Q2;
    };
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
            doNRD();
        }   
    };
    const doNRD = async() => {
        let tempA = "";
        while (tempA.length<input.divisor.length){
            tempA = tempA.concat("0");
        }
        var compM = parseInt((~parseInt(input.divisor,2) + 1 >>> 0).toString(10),10).toString(2).slice(-1*input.divisor.length);
        setResult({...result, Q: input.dividend, A: tempA, M:input.divisor, nM:compM});
        let negM = parseInt((parseInt(input.divisor,2)).toString(10),10)*-1;
        let M = parseInt((parseInt(input.divisor,2)).toString(10),10);
        console.log(negM);
        console.log(M);
        let n = input.dividend.length;
        let tempA1 = tempA;
        let tempQ1 = input.dividend
        let tempA2 = tempA;
        let tempQ2 = input.dividend
        for(let i = 0; i < n; i++){
            if (tempA2.charAt(0) == '0'){
                tempA1 = tempA2.slice(-1*(tempA2.length-1)) + tempQ2.charAt(0);
                tempQ1 = tempQ2.slice(-1*(tempQ2.length-1)) + "_"
                tempA2 = (parseInt(parseInt(parseInt(tempA1,2).toString(10),10) + negM,10) >>> 0).toString(2).slice(-1*input.divisor.length);
                if (tempA2.charAt(0) == '0')
                    tempQ2 = tempQ1.slice(0,tempQ1.length-1) + "1";
                else
                    tempQ2 = tempQ1.slice(0,tempQ1.length-1) + "0";
                console.log(tempA1);
                console.log(tempQ1);
                console.log(tempA2);
                console.log(tempQ2);
            }
            else{
                tempA1 = tempA2.slice(-1*(tempA2.length-1)) + tempQ2.charAt(0);
                tempQ1 = tempQ2.slice(-1*(tempQ2.length-1)) + "_"
                tempA2 = (parseInt(parseInt(parseInt(tempA1,2).toString(10),10) + M,10) >>> 0).toString(2).slice(-1*input.divisor.length);
                if (tempA2.charAt(0) == '0')
                    tempQ2 = tempQ1.slice(0,tempQ1.length-1) + "1";
                else
                    tempQ2 = tempQ1.slice(0,tempQ1.length-1) + "0";
                console.log(tempA1);
                console.log(tempQ1);
                console.log(tempA2);
                console.log(tempQ2);
            }
        }
        if (tempA2.charAt(0) == '1'){
            console.log("A is negative. Restore")
            tempA2 = (parseInt(parseInt(parseInt(tempA2,2).toString(10),10) + M,10) >>> 0).toString(2).slice(-1*input.divisor.length);
        }
        console.log("Final");
        console.log("Quotient");
        console.log("Binary: " + tempQ2);
        console.log("Decimal: " + parseInt((parseInt(tempQ2,2)).toString(10),10))
        console.log("Remainder");
        console.log("Binary: " + tempA2);
        console.log("Decimal: " + parseInt((parseInt(tempA2,2)).toString(10),10))
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
            doNRD();
        }
    }, [input]);
    return(
      
            <>
                {result.Q!="" && (
                    <>
                    <div>Dividend: {result.Q}</div>
                    <div>Divisor: {result.M}</div>
                    <div>A: {result.A}</div>
                    <div>-M: {result.nM}</div>
                    </>
                )}
            </>
        
    )
}

export default Answer;