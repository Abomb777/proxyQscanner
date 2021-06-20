const Scanner = require('../index');

/*
const { createLogger, transports ,format} = require('winston');
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.json(),
        format.timestamp()
    ),
    transports: [
        // - Write all logs error (and below) to `somefile.log`.
        new transports.Console(),
        //new transports.File({ filename: 'somefile.log', level: 'error' })
    ]
});
logger.log('error', 'Hello log files!');
*/


let targets = ()=>{console.log("loading targets"); return Promise.resolve([ {"id":1,"domain":"google.com","scannerRequest":"https://www.google.com","badString":null,"goodString":"Google Inc.","status":200},{"id":1,"domain":"msn.com","scannerRequest":"https://www.msn.com","badString":null,"goodString":"MSNAvailToken","status":200}])};
let proxies = ()=>{
    const list =
        '69.167.174.17:80,118.140.160.84:80,34.102.180.81:80,118.140.160.85:80,193.149.225.45:80,201.220.140.30:8181,125.99.106.250:3128,51.91.157.66:80,149.129.189.50:80,136.243.211.104:80,165.22.81.30:37023,129.226.183.56:80,101.205.120.102:80,175.143.37.162:80,50.216.231.214:80';
    const rrr = list.split(',').map((p) => {
        const pp = p.split(':');
        return { host: pp[0], port: parseInt(pp[1]) };
    });

    console.log("loading sources"); return Promise.resolve(rrr)};
let output = ()=>{console.log;};

let scanner = new Scanner(targets,proxies,output,{minq:150,parallel: 10});//, logger
scanner.start();
//console.log(scanner);
process.stdin.resume();