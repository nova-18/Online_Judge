const fs = require("fs");
const path = require("path");
const {v4 : uuid } = require("uuid");
const dirCodes = path.join(__dirname, "codes");
const dirCodesCpp = path.join(__dirname, "codes","cpp");
const dirCodesC = path.join(__dirname, "codes","c");
const dirCodesPy = path.join(__dirname, "codes","py");
const dirCodesJava = path.join(__dirname, "codes", "java");
const dirCodesKotlin = path.join(__dirname, "codes", "kt");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive: true});
}
if(!fs.existsSync(dirCodesCpp)){
    fs.mkdirSync(dirCodesCpp, {recursive: true});
}
if(!fs.existsSync(dirCodesC)){
    fs.mkdirSync(dirCodesC, {recursive: true});
}
if(!fs.existsSync(dirCodesPy)){
    fs.mkdirSync(dirCodesPy, {recursive: true});
}
if(!fs.existsSync(dirCodesJava)){
    fs.mkdirSync(dirCodesJava, {recursive: true});
}
if(!fs.existsSync(dirCodesKotlin)){
    fs.mkdirSync(dirCodesKotlin, {recursive: true});
}


const generateFile = async (code , language) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    //const filePath = path.join(dirCodes, filename);
    if("cpp" === language){
        const filePath = path.join(dirCodesCpp, filename);
        fs.writeFileSync(filePath, code);
        return(filePath);   
    }
    if("c" === language){       
        const filePath = path.join(dirCodesC, filename);
        fs.writeFileSync(filePath, code);   
        return(filePath);
    }
    if("py" === language){       
        const filePath = path.join(dirCodesPy, filename);
        fs.writeFileSync(filePath, code);   
        return(filePath);
    }       
    if("java" === language){        
        const filePath = path.join(dirCodesJava, filename); 
        fs.writeFileSync(filePath, code);
        return(filePath);   
    }
    if("kt" === language){        
        const filePath = path.join(dirCodesKotlin, filename); 
        fs.writeFileSync(filePath, code);
        return(filePath);   
    }           
    // fs.writeFileSync(filePath, code);
    // return(filePath);
};
module.exports={
    generateFile,
}