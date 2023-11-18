const {format}= require('date-fns');
const {v4:uuid }= require('uuid');
const fs =require('fs');
const fsPromises =require('fs').promises;
const path=require('path');

const logEvents= async (message,logFileName) => {
    const dateTime =`${format(new Date(),'yyyyMMdd\tHH:ss')}`;
    const logItem =`${dateTime}\t${uuid}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname,'..','Logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..','Logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','Logs',logFileName),logItem)
    } catch (error) {
        console.log(error)
    }
}
const logger =(req,res,next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`,'reqlog.log')
    console.log(`${req.method} ${req.path}`);
    next()
}
module.exports={logEvents ,logger}