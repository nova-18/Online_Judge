const express = require("express");
const {generateFile} = require('./generateFile');

const {execute} = require("./execute");
const { generateInputFile } = require("./generateinputfile")
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.get("/" ,(req,res) => {
    res.send("Hello World")
});

app.post("/run",async (req,res) =>{
    const {language = 'cpp', code, input} = req.body;
    if(code === undefined){
        return res.status(500).json({success: false, error: "Empty code body!"});
    }
    try{
        const filePath = await generateFile(code, language);
        const inputPath = await generateInputFile(input, filePath, language);
        const output = await execute(filePath, inputPath, language);
        res.json({filePath, inputPath, output});
    }
    catch(error){
        res.status(500).json({ success: false, error: error.message});
    }
});
app.listen(8000, () =>{
    console.log("Server is listening to port 8000");
});