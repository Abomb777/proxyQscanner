const Queue = require('promise-queue');
const timeoutPromise = require('./helpers/timeout-promise');
const url = require('url');
const uagent = require('./helpers/agents');
const got = require('got');
const tunnel = require('tunnel');
const geo = require('./helpers/geo');
//const request = require('request');
/*
function Scanner(targets, sources, callback) {
  if (typeof targets === 'undefined') {
    throw new Error('undefined is not a valid targets or options object.')
  }

  var params = initParams(targets, sources, callback);

//  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
//    throw new Error('HTTP HEAD requests MUST NOT include a request body.')
//  }
  if(params) {
    console.log("params ok");

    return this;

  } else return new Scanner(targets, sources, callback, params)
}
*/

function initParams(targets, sources, callback) {
  return {queueMinSize:100,parallel:1};
	/*
  if (typeof options === 'function') {
    callback = options
  }

  var params = {}
  if (options !== null && typeof options === 'object') {
    extend(params, options, {uri: uri})
  } else if (typeof uri === 'string') {
    extend(params, {uri: uri})
  } else {
    extend(params, uri)
  }

  params.callback = callback || params.callback
  return params
  */
}




/*
// Backwards compatibility for request.debug
Object.defineProperty(Scanner, 'debug', {
  enumerable: true,
  get: function () {
    return Scanner.Scanner.debug
  },
  set: function (debug) {
    Scanner.Scanner.debug = debug
  }
})
*/


class Scanner {
  constructor(targets, proxies, callback, options){
    this.targets = targets;
    this.proxies = proxies;
    this.callback = callback;
    this.running = false;
    this.loading=false;

    if(!options.logger) {
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
      logger.warn("loading internal logger!");
      this.logger=logger;
    } else this.logger=options.logger;
    this.maxQueue = Infinity;
    this.maxConcurrent = options && options.parallel?options.parallel:10;
    this.minQsize = options && options.minq?options.minq:20;
    this.queue = new Queue(this.maxConcurrent, this.maxQueue);
  }
  async start(){
    this.logger.info("start");
    this.running = true;
     await this.targets();
    this.scan();
  }
  async stop(){
    console.log("stop");
  }
  async scan(){
    if(this.loading) {
      this.logger.info('>>>>>>>>>>>>>>>>>>>');
      return;
    }
    this.loading=true;
    this.logger.debug("scan");
    let targets =await this.targets();
    if(typeof targets.length=="undefined" || !(targets.length>0)) {
      setTimeout(()=>{
        console.log("retry load targets!!!");
        this.scan();
      },3000);
    }
    let proxies =await this.proxies();
    if(typeof proxies.length=="undefined" || !(proxies.length>0)) {
      setTimeout(()=>{
        console.log("retry load proxies!!!");
        this.scan();
      },3000);
    }
    //return new Promise(function (resolver,rej) {
    proxies.forEach( (proxy) => {
        targets.forEach(async (targ) => {
          //console.log(proxy);
          //console.log(targ);
          this.processor(proxy,targ)
        });
      });
    //});
    this.loading=false;
  }

  async test(x){
      console.log('1');
      console.log(x)
  }

  async qsize(){
    return this.queue.getQueueLength();
  }

  async processor(proxy,targ) {
    targ.result = [];
    //requested++;
    this.queue.add( () => {
      return new Promise(function (resolve, reject) {
        this.makeRequestForReport(targ, proxy, resolve);
      }.bind(this)).then(async () => {
        if(this.queue.getQueueLength()<this.minQsize) {
          this.logger.debug("Load more "+this.queue.getQueueLength()+" < "+this.minQsize);
          await this.scan();
        }
 /*       if (this.queue.getQueueLength() < this.maxConcurrent) {
          console.log("**********************************************************************");
          //resolver();
        }*/
        //if(this.queue.getPendingLength() ==0 || this.queue.getQueueLength()==0) resolver();
        this.logger.debug({pending : this.queue.getQueueLength(),processing: this.queue.getPendingLength()});

      });
    })
  }

  async makeRequestForReport(target, proxy, callback){
    let theUrl = url.parse(target.url);

    let default_resp = {
      url: target.url,
      proxy: proxy,
      status: 404
    };
    let gotresponse;
    let response = await timeoutPromise(7000 , async function (reso, reject) {
      this.logger.debug(proxy);
      try {
        let useproxy = {
          host: proxy.host,
          port: proxy.port
        };
        if(proxy.username && proxy.password) useproxy['proxyAuth'] = proxy.username+':'+proxy.password;
        var baseHeaders =  {
          'User-Agent': uagent(),
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'Host': theUrl.hostname,
          'Accept-Language' : 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': '*!/!*',
          'Referer': 'https://'+theUrl.hostname+'/',
          'Cookie': 'aps03=ct=96&lng=1'
        };
        let httpheaders = Object.assign(baseHeaders, target.headers);
        if(target.cookies) httpheaders = Object.assign(httpheaders,target.cookies);
        let gotresponse= await got(target.url, {
          headers: httpheaders,
          agent: {
            https: tunnel.httpsOverHttp({
              proxy: useproxy
            }),
            http: tunnel.httpOverHttp({
              proxy: useproxy
            })
          }
        });
        //console.log(response.body);
        let rGeo={};
        if(gotresponse.statusCode==200 && (target.goodString && gotresponse.body.indexOf(target.goodString)>-1)) {
          if(typeof proxy.ip=="undefined") rGeo=await geo(proxy);
         // console.log(r);
        //  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+target.scannerRequest);
        //  console.log({target, proxy: proxy, status: gotresponse.statusCode});
        //  this.callback({target, proxy: proxy, status: gotresponse.statusCode});
        }
        reso({target, proxy: Object.assign(proxy,rGeo), status: gotresponse.statusCode});

   /*
       // console.log(uagent());
        console.log(uagent())
        var options = {
          uri: target.url,
          //uri: 'http://mytinymart.com/tester.php',
          method: 'GET',
          proxy: "http://"+proxy,
          headers: {'User-Agent': uagent(),
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Host': theUrl.hostname,
            'Accept-Language' : 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': '*!/!*',
            'Referer': 'https://'+theUrl.hostname+'/',
            'Cookie': 'aps03=ct=96&lng=1'
          }
        };
        request.get(options,
            function (error, response, res) {
              if (response && typeof response.body !== "undefined") {
                //console.log("response.statusCode");
                //console.log(response.statusCode);
                if(response.statusCode==200) addproxy({url: target.url, proxy: proxy, status: response.statusCode});
                reso({url: target.url, proxy: proxy, status: response.statusCode});
              } else {
                //if(error) console.log(error);
                reso(default_resp);
              }
            });
*/
      } catch (e) {
        this.logger.debug("ERROR ---> "+(gotresponse && gotresponse.statusCode?gotresponse.statusCode:''));
        //console.log(e);
        reso(default_resp);
      }
    }.bind(this));
    //console.log(response);
    //console.log("n3");
//	console.log(response?response:default_resp);
    if(parseInt(response.status)===200) {
      //reportingFunction(response?response:default_resp);
      console.log(response ? response : default_resp);
    }
    callback(response?response:default_resp);
    //console.log("n4");
    //callback()
  }
}


module.exports = Scanner;