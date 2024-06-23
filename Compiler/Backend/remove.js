const fs = require("fs");
const path = require("path");
const {v4 : uuid } = require("uuid");

const removefiles = async (code , language) => {
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