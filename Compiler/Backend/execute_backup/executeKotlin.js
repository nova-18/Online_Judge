const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");
const { stdout, stderr } = require("process");
const outputPath = path.join(__dirname, "outputs","kt");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}
const executeKotlin = (filepath, inputPath) => {
    const jobId = path.basename(filepath.split(".")[0]);
    const outputFileName = `${jobId}.exe`;
    const outPath = path.join(outputPath, outputFileName);
    
    return new Promise((resolve, reject) => {
        exec(
            `kotlinc ${filepath} -d ${outPath} && cd ${outputPath} && kotlin ${jobId} < ${inputPath}`,
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
};

module.exports={
    executeKotlin,
}