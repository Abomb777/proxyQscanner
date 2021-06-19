# proxyQscanner
proxyQscanner

demo implementation
```js
const qscanner = require('proxyqscanner');

let targets = ()=>{console.log("loading targets"); return Promise.resolve([{"id":1,"domain":"www.bet365.com","scannerRequest":"https://www.bet365.com/defaultapi/sports-configuration","badString":" detected you are in a country that bet365","goodString":"WebsiteConfig","status":200},{"id":2,"domain":"www.marathonbet.com","scannerRequest":"https://www.marathonbet.com/en/live/popular?pageAction=default&_=1615806546272","badString":"Your IP address","goodString":"marathonEventId","status":200},{"id":3,"domain":"sport.xlivebet.com","scannerRequest":"https://sport.xlivebet.com/Live/Sports?langId=2&partnerId=14","badString":null,"goodString":"\"CNT\"","status":200},{"id":4,"domain":"sportsbook.draftkings.com","scannerRequest":"sportsbook.draftkings.com","badString":null,"goodString":"\"displayGroupInfos\"","status":200},{"id":5,"domain":"eu-offering.kambicdn.org","scannerRequest":"https://eu-offering.kambicdn.org/offering/v2018/ub/group.json?lang=en_GB&market=ZZ","badString":null,"goodString":"\"group\"","status":200},{"id":6,"domain":"cds-api.co.betmgm.com","scannerRequest":"https://cds-api.co.betmgm.com/bettingoffer/fixtures?x-bwin-accessid=OTU4NDk3MzEtOTAyNS00MjQzLWIxNWEtNTI2MjdhNWM3Zjk3&lang=en-us&country=us&fixtureTypes=Standard","badString":null,"goodString":"\"fixtures\"","status":200},{"id":7,"domain":"client.hola.org","scannerRequest":"https://client.hola.org/client_cgi/background_init?uuid=","badString":null,"goodString":"\"ver\"","status":200},{"id":8,"domain":"www.racebets.com","scannerRequest":"https://www.racebets.com/en/horse-racing/","badString":null,"goodString":null,"status":200},{"id":9,"domain":"betmgm.com","scannerRequest":"https://www.facebook.com/tr/?id=398072614313211&ev=PageView&dl=https%3A%2F%2Fsports.in.betmgm.com%2Fen%2Fsports%2Fmulti-builder&rl=https%3A%2F%2Fsports.in.betmgm.com%2Fen%2Fsports%3Fwm%3D%26btag%3D%26tdpeh%3D%26pid%3D&if=false&ts=1621854725488&sw=1920&sh=1080&v=2.9.40&r=stable&ec=2&o=30&fbp=fb.1.162","badString":null,"goodString":null,"status":200},
    {"id":10,"domain":"google.com","scannerRequest":"https://www.google.com","badString":null,"goodString":null,"status":200}])};
let proxies = ()=>{
    const list =
        '103.19.129.114:84,179.49.112.154:999,103.216.48.85:8080,1.1.220.100:8080,52.44.113.148:8888,191.253.23.75:8080,78.140.7.239:33943,46.209.106.66:8085,160.238.227.153:30222,112.218.125.140:8080,38.102.153.210:3128,164.77.177.30:999,170.254.104.13:8080,97.72.168.62:87,66.209.54.230:8080,202.142.147.87:8080,154.16.3.86:3128,45.71.68.51:8080,124.121.205.85:8080,174.32.108.254:87,125.27.251.87:58182,45.169.16.3:8080,103.81.77.33:83,138.185.190.46:8080,200.222.211.54:8080,185.23.110.106:8080,95.216.9.69:2020,157.230.103.189:33422,189.201.213.70:3128,190.104.142.78:8080,190.217.10.12:999,180.128.1.83:8080,185.23.80.17:8080,119.93.234.41:41731,103.137.199.129:8080,207.144.111.230:8080,81.91.137.44:8080,46.238.230.4:8080,187.45.127.87:20183,102.33.21.34:8080,161.35.212.51:3128,118.27.31.28:3128,181.209.108.250:999,177.184.139.81:38459,85.62.10.94:8080,185.104.252.10:9090,193.193.240.37:45944,177.55.76.196:8080,159.192.138.170:8080,79.173.64.46:3128,178.212.54.137:8080,190.60.104.218:3128,45.179.193.122:999,103.109.57.1:8080,45.182.240.73:3128,66.23.233.90:3128,182.52.140.57:8080,201.46.28.222:63238,82.114.118.142:1256,128.199.124.73:8080,45.171.145.138:8080,67.219.125.54:8080,177.70.243.5:8080,89.20.102.147:2580,200.68.62.10:8080,79.127.56.147:8080,162.155.10.150:55443,102.141.197.17:8080,82.147.118.164:8080,118.179.96.241:8080,37.57.130.244:8282,12.229.217.226:55443,103.148.157.51:3128,3.127.25.129:3128,190.61.63.83:999,91.92.180.45:8080,107.178.6.30:8080,45.7.132.194:999,195.46.124.94:4444,1.10.187.237:8080,118.127.99.93:53281,123.253.36.108:8080,136.232.209.70:47423,103.245.48.18:8080,188.225.252.203:8080,62.171.161.169:3128,160.202.9.53:8080,165.22.64.68:40447,83.168.86.170:8090,159.69.66.224:8080,202.80.231.67:8080,78.133.154.1:8080,195.140.226.244:8080,58.97.212.58:8080,110.38.57.243:8080,200.7.193.229:54954,103.7.27.186:8080,200.35.97.139:999,120.28.218.28:3128,157.230.103.189:37066,41.161.92.138:8080,159.192.130.233:8080,193.34.95.110:8080,89.250.221.106:53281,103.16.71.233:83,189.52.87.19:8080,93.170.118.249:8080,45.70.117.41:8080,138.36.151.20:8090,202.21.100.74:8080,183.89.44.181:8080,187.243.255.174:8080,117.222.62.41:8080,128.199.254.103:23352,200.29.109.112:44749,183.89.185.2:8080,71.172.1.52:8080,176.235.131.228:9090,47.90.132.228:8000,180.180.217.163:8080,103.136.36.14:8080,188.163.170.130:41209,103.25.155.217:83,177.37.165.50:8044,185.37.211.222:50330,24.245.100.212:48678,139.59.233.205:8080,105.27.116.46:30032,144.126.139.121:3128,206.189.146.202:8080,213.232.127.164:8080,184.155.36.194:8080,160.16.78.218:3128,185.108.141.114:8080,113.53.29.218:33885,103.124.86.1:8080,185.180.236.80:8081,45.178.133.59:999,189.11.248.162:8080,85.214.83.135:8085,200.6.217.3:8080,45.70.237.178:8080,195.154.119.202:443,175.29.178.126:8889,180.149.232.150:8080,160.16.109.191:3128,193.117.138.126:44805,140.227.65.129:58888,159.192.147.186:8080,167.99.62.12:8080,183.88.213.85:8080,103.221.254.102:48146,165.16.2.154:9999,178.128.178.169:3128,85.117.56.85:8080,92.245.142.215:8080,181.225.47.197:999,41.72.203.182:42928,188.166.238.22:8080,117.239.240.202:53281,51.159.24.172:3166,125.25.45.181:8080,49.231.159.165:8080,149.5.38.1:8080,178.219.161.211:8080,174.81.78.64:48678,187.188.200.20:999,78.128.124.9:50246,185.175.119.113:47174,118.163.13.200:8080,223.255.133.34:8080,142.93.79.56:3128,202.5.56.33:63141,77.28.96.206:56644,159.65.174.145:3128,45.65.224.14:8080,45.174.251.5:999,78.30.198.160:8080,190.171.180.162:50846,213.216.67.190:8080,134.122.22.233:3128,85.105.139.53:8090,187.216.90.46:53281,202.5.116.49:8080,118.174.196.112:36314,217.195.204.86:3162,5.58.50.5:8080,190.12.95.170:47029,110.164.59.98:8080,168.119.153.224:3128,187.44.1.172:8080,88.198.26.145:8080,181.129.98.146:8080,104.244.75.218:8080,143.198.56.222:8888,5.56.134.237:55963,2.236.16.113:3128,41.229.253.214:8080,168.138.211.5:8080,94.68.245.147:8080,111.90.179.74:8080,187.95.27.123:8080,45.65.135.250:8080,198.229.231.13:8080,103.86.49.193:3128,79.120.177.106:8080,182.237.16.7:83,129.146.180.91:3128,62.205.169.74:53281,24.113.42.177:48678,208.115.109.250:443,103.89.152.190:8080,179.108.123.210:51314,173.215.67.137:8080,167.71.90.203:8080,190.145.124.202:999,197.221.158.186:8080,167.71.171.14:8080,170.81.35.26:36681,92.247.2.26:21231,194.114.128.149:61213,34.68.8.13:3128,45.245.212.164:8080,181.143.106.162:52151,167.99.163.146:3128,103.248.30.14:8080,160.19.113.10:8080,110.78.138.55:8080,195.182.152.238:38178,34.122.246.161:3128,120.29.124.131:8080,110.44.113.105:8080,168.119.60.44:3128,78.47.104.35:3128,125.26.165.245:443,103.104.214.26:3127,195.239.217.102:8080,119.110.209.94:3128,168.0.86.146:8080,81.19.0.135:3128,103.81.114.140:3128,85.234.126.107:55555,167.249.181.236:8080,45.70.201.179:999,49.156.35.22:8080,82.114.106.40:1256,45.233.170.61:999,1.179.183.73:50178,35.245.254.223:3128,190.2.212.36:8080,150.129.201.30:6666,160.16.89.237:3128,188.225.177.82:8080,187.111.160.6:8080,65.182.5.212:8080,96.9.67.84:8080,200.155.139.242:3128,85.254.60.240:8080,77.236.239.95:1256,91.230.199.174:61440,185.189.14.93:1196,103.75.125.161:8080,82.102.13.142:8085,217.113.30.218:8080,192.140.42.83:31511,213.6.199.94:49044,110.78.112.198:8080,94.73.239.124:55443,103.70.130.134:84,200.60.79.11:53281,187.16.43.242:38278,143.110.151.242:3128,79.143.87.140:9090,143.255.52.67:31158,154.113.69.154:8080,78.154.167.68:8080,206.81.2.180:3128,128.199.207.96:8080,95.143.8.182:57169,34.212.203.168:443,177.101.0.199:8080,190.214.27.46:8080,27.145.55.211:8080,43.227.129.65:83,45.80.181.14:3128,159.89.199.39:3128,125.62.193.53:82,180.149.98.206:8080,27.105.130.93:8080,84.22.198.26:8080,77.236.248.237:8080,170.239.150.82:999,197.221.89.70:8080,3.16.109.9:3128,45.71.200.165:999,117.211.203.210:3128,190.152.182.150:55443,185.56.209.114:52342,170.0.87.204:999,45.64.11.13:8080,45.167.126.113:999,203.202.254.146:8080,80.87.213.111:8080,45.175.238.32:999,125.99.100.193:40390,45.162.75.4:999,95.9.194.13:56726,93.117.72.27:43631,139.59.124.237:3128,186.195.90.16:8080,103.248.93.5:8080,110.77.134.106:8080,185.239.105.211:3128,5.23.102.194:52803,110.44.119.71:8080,45.174.78.33:999,122.154.66.193:8080,140.227.62.35:58888,117.208.148.72:3128,170.0.54.254:49912,213.6.65.30:8080,195.123.247.22:3128,81.18.34.98:42535,5.16.0.174:8080,103.121.41.165:8080,212.248.42.202:3128,180.180.170.188:8080,160.16.144.198:3128,101.109.246.40:8080,82.137.247.179:8889,177.91.74.147:8080,45.233.143.14:999,187.60.209.78:8080,106.0.39.81:83,114.32.84.229:8080,209.33.9.244:8080,40.85.145.197:3128,176.107.176.62:3128,81.145.20.214:8080,216.169.73.65:34679,101.109.176.143:8080,80.245.117.131:8080,174.138.27.47:8080,80.241.251.54:8080,165.22.81.30:41790,58.82.151.242:8080,97.92.111.244:443,47.251.13.204:3128,187.109.37.53:20183,182.52.229.165:8080,46.35.249.189:41419,103.149.143.219:8080,68.183.221.156:41933,143.55.33.218:8080,190.140.31.22:55866,110.171.84.180:8080,142.93.24.89:3128,187.94.211.15:8080,180.180.171.121:8080,138.0.91.218:999,45.115.175.112:57919,84.44.2.2:8080,91.203.224.177:36731,49.135.33.141:3128,160.154.48.46:8080,203.143.7.201:8080,43.250.127.98:9001,110.39.174.189:8080,92.255.187.180:3128,191.100.20.14:8080,194.44.199.242:8880,140.227.68.230:58888,82.99.217.18:8080,186.226.184.54:666,92.207.253.226:38157,168.232.20.155:8080,177.52.221.166:999,212.126.96.154:8080,196.3.97.71:23500,45.228.48.4:53281,125.26.4.219:443,186.225.46.89:8080,110.74.203.250:8080,98.154.21.253:3128,46.209.30.12:8080,8.210.71.64:3128,186.192.104.126:8080,103.87.48.57:8080,181.13.209.34:8080,45.174.79.129:999,197.231.198.172:42461,156.155.176.220:8080,103.78.55.113:8080,96.30.53.125:3128,173.46.67.172:58517,78.157.254.58:51008,45.160.168.254:8080,70.169.141.35:3128,74.208.131.71:3128,177.11.84.238:8080';
    const rrr = list.split(',').map((p) => {
        const pp = p.split(':');
        return { host: pp[0], port: parseInt(pp[1]) };
    });

    console.log("loading sources"); return Promise.resolve(rrr)};
let output = ()=>{console.log;};

let scanner = new qscanner(targets,proxies,output,{minq:2000,parallel: 200});
scanner.start();
//console.log(scanner);
process.stdin.resume();
```