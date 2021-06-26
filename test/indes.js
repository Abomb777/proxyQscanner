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
    const list = '64.227.62.123:80,69.167.174.17:80,203.33.113.65:80,192.71.249.32:8060,210.186.175.14:80,194.71.227.114:8060,195.235.90.29:80,218.111.228.178:80,178.125.75.205:8080,207.157.25.44:80,78.47.16.54:80,118.140.160.84:80,51.91.157.66:80,203.75.190.21:80,101.205.120.102:80,175.143.37.162:80,136.243.211.104:80,121.54.167.155:80,203.33.113.31:80,49.248.152.247:80,195.154.67.61:3128,77.72.3.163:80,139.9.133.196:808,192.71.249.124:8060,49.248.152.240:80,118.140.160.85:80,118.174.146.131:80,165.227.173.87:33115,207.157.25.41:80,197.51.7.19:8080,89.135.188.201:9090,49.248.152.244:80';
        //'69.167.174.17:80,118.140.160.84:80,34.102.180.81:80,118.140.160.85:80,193.149.225.45:80,201.220.140.30:8181,125.99.106.250:3128,51.91.157.66:80,149.129.189.50:80,136.243.211.104:80,165.22.81.30:37023,129.226.183.56:80,101.205.120.102:80,175.143.37.162:80,50.216.231.214:80';
    const rrr = list.split(',').map((p) => {
        const pp = p.split(':');
        return { host: pp[0], port: parseInt(pp[1]) };
    });

    console.log("loading sources"); return Promise.resolve(rrr)};
let output = ()=>{console.log;};

let scanner = new Scanner(targets,proxies,output,{minq:150,parallel: 50});//, logger
scanner.start();
//console.log(scanner);
process.stdin.resume();