const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin} = require('yargs/helpers');
const defaultValue = require('./config');

const argv = yargs(hideBin(process.argv))
    .options('city',{
        alias: 'c',
        type: "string",
        description: "Город в котором нужно получить погоду"
    }).argv

let city = argv.city!==''?argv.city:defaultValue.city
console.log(city)
http.get(`${defaultValue.url}?access_key=${defaultValue.token}&query=${city}`, (res)=>{
    const {statusCode} = res;
    if(statusCode!==200){
        console.log(`status: ${statusCode}`);
        return;
    }
    res.setEncoding('utf-8');
    let Data = '';
    res.on('data', (chunk)=>Data+=chunk);
    res.on('end',()=>{
        const parseData = JSON.parse(Data);
        console.log(parseData);
    })
})