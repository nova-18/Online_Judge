const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const { stdout, stderr } = require("process");
const outputPathCpp = path.join(__dirname, "outputs","cpp");
const outputPathC = path.join(__dirname, "outputs","c");
const outputPathPy = path.join(__dirname, "outputs","py");
const outputPathJava = path.join(__dirname, "outputs", "java");
const outputPathKotlin = path.join(__dirname, "outputs", "kt"); 


if(!fs.existsSync(outputPathCpp)){
    fs.mkdirSync(outputPathCpp, {recursive: true});
}
if(!fs.existsSync(outputPathC)){
    fs.mkdirSync(outputPathC, {recursive: true});
}
if(!fs.existsSync(outputPathPy)){
    fs.mkdirSync(outputPathPy, {recursive: true});
}
if(!fs.existsSync(outputPathJava)){
    fs.mkdirSync(outputPathJava, {recursive: true});
}
if(!fs.existsSync(outputPathKotlin)){
    fs.mkdirSync(outputPathKotlin, {recursive: true});
}

const execute = (filepath, inputPath, language) => {
    const jobId = path.basename(filepath.split(".")[0]);

    if(language === "cpp"){
        const outputFileName = `${jobId}.exe`;
        const outPath = path.join(outputPathCpp, outputFileName);

        return new Promise((resolve, reject) => {
            exec(
                `g++ ${filepath} -o ${outPath} && cd ${outputPathCpp} && .\\${jobId}.exe < ${inputPath}`,
                (error, stdout, stderr) =>{
                if(error){
                    reject(error);
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }
    else if(language === "c"){
        const outputFileName = `${jobId}.exe`;
        const outPath = path.join(outputPathC, outputFileName);
        return new Promise((resolve, reject) => {
            exec(
                `gcc ${filepath} -o ${outPath} && cd ${outputPathC} && .\\${jobId}.exe < ${inputPath}`,
                (error, stdout, stderr) =>{
                if(error){
                    reject(error);
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }

    else if(language === "py"){ 
        console.log(filepath);
        console.log(inputPath);
        return new Promise((resolve, reject) => {
            exec(
                `python ${filepath} < ${inputPath}`,
                //`Get-Content ${inputPath} | python ${filepath}`,
                (error, stdout, stderr) =>{
                if(error){
                    reject(error);
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }
    else if(language === "java"){ 
        const outputFileName = `${jobId}.class`;
        const outPath = path.join(outputPathJava, outputFileName); 
        return new Promise((resolve, reject) => {
            exec(
                `javac ${filepath} -d ${outPath} && cd ${outputPathJava} && java ${jobId}.class < ${inputPath}`,
                (error, stdout, stderr) =>{
                if(error){
                    reject(error);
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        });     
    }
    else if(language == "kotlin"){
        const outputFileName = `${jobId}.class`;
        const outPath = path.join(outputPathKotlin, outputFileName);
        return new Promise((resolve, reject) => {   
            exec(
                `kotlinc ${filepath} -d ${outPath} && cd ${outputPathKotlin} && kotlin ${jobId}.class < ${inputPath}`,
                (error, stdout, stderr) =>{ 
                if(error){
                    reject(error);
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            });
        });
    }
    
    // const outputFileName = `${jobId}.exe`;
    // const outPath = path.join(outputPath, outputFileName);
    
    // return new Promise((resolve, reject) => {
    //     exec(
    //         `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inputPath}`,
    //         (error, stdout, stderr) =>{
    //         if(error){
    //             reject(error);
    //         }
    //         if(stderr){
    //             reject(stderr);
    //         }
    //         resolve(stdout);
    //     });
    // });
};

module.exports={
    execute,
}