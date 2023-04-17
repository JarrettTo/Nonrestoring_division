import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
const Answer =({input})=>{
    const [result, setResult] = useState({
        //Contains the input in binary. Use this state variable to formulate the answer and solution.
        M:"",
        nM:"",
        Q:"",
        A:"",
        FQ:"",
        FA:""
    });
    const [solution, setSolution] = useState(null);
    const [stepNo, setStepNo] = useState(1);
    const useStyles = makeStyles({
        paperWithBorder: {
          border: '1px solid #000000',
          padding: '10px',
          marginBottom:"20px",
          marginTop:"10px"
        },
      });
      const classes= useStyles();
    function pass(A1, A2, A3, Q1, Q2){
        this.A1 = A1;
        this.A2 = A2;
        this.A3 = A3;
        this.Q1 = Q1;
        this.A2 = Q2;
    };
    const incStep = async () => {
        
        setStepNo(stepNo+1);
        
    };
    const textToBinary = async() => {
        console.log("WOW")
        if(input.format==0){
            input.dividend=parseInt(input.dividend,10).toString(2)
            input.divisor=parseInt(input.divisor,10).toString(2)
            //input.dividend = "0".concat(input.dividend)
            console.log(input.dividend)
            console.log(input.divisor)
            if(input.divisor.length<=input.dividend.length){
                while(input.divisor.length<input.dividend.length+1){
                    input.divisor = "0".concat(input.divisor)
                }
            }
            console.log(input.dividend);
            console.log(input.divisor);
            doNRD();
        }   
    };
    const doNRD = async() => {
        let tempA = "";
        while (tempA.length<input.divisor.length){
            tempA = tempA.concat("0");
        }
        var compM = parseInt((~parseInt(input.divisor,2) + 1 >>> 0).toString(10),10).toString(2).slice(-1*input.divisor.length);
        let negM = parseInt((parseInt(input.divisor,2)).toString(10),10)*-1;
        let M = parseInt((parseInt(input.divisor,2)).toString(10),10);
        let passes = new Array();
        console.log(negM);
        console.log(M);
        let n = input.dividend.length;
        let tempA1 = tempA;
        let tempQ1 = input.dividend
        let tempA2 = tempA;
        let tempQ2 = input.dividend
        for(let i = 0; i < n; i++){
            console.log("Pass #" + (i+1));
            console.log(tempA2.slice(-1*input.dividend.length), " ", tempQ2.charAt(0));
            if (tempA2.charAt(0) == '0'){
                tempA1 = tempA2.slice(-1*input.dividend.length) + tempQ2.charAt(0);
                tempQ1 = tempQ2.slice(-1*(n-1)) + "_"
                tempA2 = (parseInt(parseInt(parseInt(tempA1,2).toString(10),10) + negM,10) >>> 0).toString(2).slice(-1*input.divisor.length).padStart(input.divisor.length, "0");
                if (tempA2.charAt(0) == '0')
                    tempQ2 = tempQ1.slice(0,n-1) + "1";
                else
                    tempQ2 = tempQ1.slice(0,n-1) + "0";
                console.log(tempA1, " ", tempQ1);
                console.log(tempA2, " ", tempQ1);
                console.log(tempA2, " ", tempQ2);
                if(i<n-1){
                    let pass = {"A1": tempA1, "A2": tempA2, "A3": tempA2, "Q1": tempQ1, "Q2": tempQ2};
                    passes.push(pass);
                }
            }
            else{
                tempA1 = tempA2.slice(-1*input.dividend.length) + tempQ2.charAt(0);
                tempQ1 = tempQ2.slice(-1*(n-1)) + "_"
                tempA2 = (parseInt(parseInt(parseInt(tempA1,2).toString(10),10) + M,10) >>> 0).toString(2).slice(-1*input.divisor.length).padStart(input.divisor.length, "0");
                if (tempA2.charAt(0) == '0')
                    tempQ2 = tempQ1.slice(0,n-1) + "1";
                else
                    tempQ2 = tempQ1.slice(0,n-1) + "0";
                console.log(tempA1);
                console.log(tempQ1);
                console.log(tempA2);
                console.log(tempQ2);
                if(i<n-1){
                    let pass = {"A1": tempA1, "A2": tempA2, "A3": tempA2, "Q1": tempQ1, "Q2": tempQ2};
                    passes.push(pass);
                }
            }
        }
        if (tempA2.charAt(0) == '1'){
            console.log("A is negative. Restore")
            tempA2 = (parseInt(parseInt(parseInt(tempA2,2).toString(10),10) + M,10) >>> 0).toString(2).slice(-1*input.divisor.length);
            let pass = {"A1": tempA1, "A2": tempA2, "A3": tempA2, "Q1": tempQ1, "Q2": tempQ2};
            passes.push(pass);
        }
        console.log(passes);
        console.log("Final");
        console.log("Quotient");
        console.log("Binary: " + tempQ2);
        console.log("Decimal: " + parseInt((parseInt(tempQ2,2)).toString(10),10))
        console.log("Remainder");
        console.log("Binary: " + tempA2);
        console.log("Decimal: " + parseInt((parseInt(tempA2,2)).toString(10),10))
        setResult({...result, Q: input.dividend, A: tempA, M:input.divisor, nM:compM, FQ: tempQ2, FQ10: parseInt((parseInt(tempQ2,2)).toString(10),10), FA: tempA2, FA10: parseInt((parseInt(tempA2,2)).toString(10),10)});

        setSolution(passes);
        console.log(solution);
    };
    useEffect(() => {
        console.log("SHE")
        setSolution(null);
        setStepNo(1)
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

                {(solution && solution.length > 0 && input.step==0) ? solution.map((pass,idx)=>
                    <>
                    <Paper className={classes.paperWithBorder}>
                        <Typography>Pass #{idx+1}:</Typography>
                        <Typography>A:{"\t"+pass.A1+"\tQ:"+pass.Q1}</Typography>
                        <Typography>A:{"\t"+pass.A2+"\tQ"+pass.Q1}</Typography>
                        <Typography>A:{"\t"+pass.A3+"\tQ:"+pass.Q2}</Typography>
                    </Paper>
                    </>
                ): "loading"}
                
                {(solution && solution.length > 0 && input.step==1) ? solution.slice(0,stepNo).map((pass,idx)=>
                    <>
                    <Paper className={classes.paperWithBorder}>
                        <Typography>Pass #{idx+1}:</Typography>
                        <Typography>A:{"\t"+pass.A1+"\tQ:"+pass.Q1}</Typography>
                        <Typography>A:{"\t"+pass.A2+"\tQ"+pass.Q1}</Typography>
                        <Typography>A:{"\t"+pass.A3+"\tQ:"+pass.Q2}</Typography>
                    </Paper>
                    </>
                ): "loading"}
                {(solution && solution.length > 0 && input.step==1) ? 
                    (<Button onClick={incStep}> Next Step</Button>)
                : "loading"}
            </>
        
    )
}

export default Answer;