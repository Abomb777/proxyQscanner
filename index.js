const Queue = require('promise-queue');
const timeoutPromise = require('./helpers/timeout-promise');
const url = require('url');
const uagent = require('./helpers/agents');
const got = require('got');
const tunnel = require('tunnel');
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
  constructor(targets, proxies, callback){
    this.targets = targets;
    this.proxies = proxies;
    this.callback = callback;
    this.running = false;
    this.loading=false;

    this.maxQueue = Infinity;
    this.maxConcurrent =10;
    this.minQsize =20;
    this.queue = new Queue(this.maxConcurrent, this.maxQueue);
  }
  async start(){
    console.log("start");
    this.running = true;
     await this.targets();
    this.scan();
  }
  async stop(){
    console.log("stop");
  }
  async scan(){
    if(this.loading) {
      console.log('>>>>>>>>>>>>>>>>>>>');
      return;
    }
    this.loading=true;
    console.log("scan");
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

  async processor(proxy,targ) {
    targ.result = [];
    //requested++;
    this.queue.add( () => {
      return new Promise(function (resolve, reject) {
        this.makeRequestForReport(targ, proxy, resolve);
      }.bind(this)).then(async () => {
        if(this.queue.getQueueLength()<this.minQsize) {
          console.log("Load more "+this.queue.getQueueLength()+" < "+this.minQsize);
          await this.scan();
        }
 /*       if (this.queue.getQueueLength() < this.maxConcurrent) {
          console.log("**********************************************************************");
          //resolver();
        }*/
        //if(this.queue.getPendingLength() ==0 || this.queue.getQueueLength()==0) resolver();
        console.log("qq " + this.queue.getQueueLength());
        console.log("PP " + this.queue.getPendingLength());
      });
    })
  }

  async makeRequestForReport(target, proxy, callback){
//    console.log("+++++++++++++++++++++++++++++++++"+proxy);
    //console.log(target.url);
    let theUrl = url.parse(target.scannerRequest);

    let default_resp = {
      url: target.url,
      proxy: proxy,
      status: 404
    };
    let response = await timeoutPromise(7000 , async function (reso, reject) {
      try {
        let proxy = {
          host: 'localhost'
        };
        var httpheaders =  {
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
        let d= await got(target.scannerRequest, {
          headers: httpheaders,
          agent: {
            https: tunnel.httpsOverHttp({
              proxy: proxy
            }),
            http: tunnel.httpOverHttp({
              proxy: proxy
            })
          }
        });
        console.log(d);
        if(response.statusCode==200) addproxy({url: target.url, proxy: proxy, status: response.statusCode});
        reso({url: target.url, proxy: proxy, status: response.statusCode});

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
        console.log("ERROR ---> ");
        //console.log(e);
        reso(default_resp);
      }
    });
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