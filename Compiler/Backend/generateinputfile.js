const fs = require("fs");
const path = require("path");
const {v4 : uuid } = require("uuid");
const dirInputs = path.join(__dirname, "inputs");
const dirInputsCpp = path.join(__dirname, "inputs","cpp");
const dirInputsC = path.join(__dirname, "inputs","c");
const dirInputsPy = path.join(__dirname, "inputs","py");
const dirInputsJava = path.join(__dirname, "inputs", "java");
const dirInputsKotlin = path.join(__dirname, "inputs", "kt");

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs, {recursive: true});
}
if(!fs.existsSync(dirInputsCpp)){
    fs.mkdirSync(dirInputsCpp, {recursive: true});
}
if(!fs.existsSync(dirInputsC)){
    fs.mkdirSync(dirInputsC, {recursive: true});    
}
if(!fs.existsSync(dirInputsPy)){
    fs.mkdirSync(dirInputsPy, {recursive: true});
}
if(!fs.existsSync(dirInputsJava)){
    fs.mkdirSync(dirInputsJava, {recursive: true});    
}
if(!fs.existsSync(dirInputsKotlin)){
    fs.mkdirSync(dirInputsKotlin, {recursive: true});
}

const generateInputFile = async (input,filePath, language) => {
    const jobId = path.basename(filePath.split(".")[0]);
    const inputFilename = `${jobId}.txt`;
    if("cpp" === language){
        const inputFilePath = path.join(dirInputsCpp, inputFilename);
        fs.writeFileSync(inputFilePath , input);
        return(inputFilePath);
    }
    if("c" === language){       
        const inputFilePath = path.join(dirInputsC, inputFilename);
        fs.writeFileSync(inputFilePath , input);   
        return(inputFilePath);
    }
    if("py" === language){       
        const inputFilePath = path.join(dirInputsPy, inputFilename);
        fs.writeFileSync(inputFilePath , input);   
        return(inputFilePath);
    }       
    if("java" === language){        
        const inputFilePath = path.join(dirInputsJava, inputFilename); 
        fs.writeFileSync(inputFilePath , input);
        return(inputFilePath);   
    }
    if("kt" === language){        
        const inputFilePath = path.join(dirInputsKotlin, inputFilename); 
        fs.writeFileSync(inputFilePath , input);
        return(inputFilePath);   
    }
    // fs.writeFileSync(inputFilePath , input);
    // return(inputFilePath);
};
module.exports={
    generateInputFile,
}