const got = require('got');
const tunnel = require('tunnel');

async function resolve(proxy) {
    const geoUrls = [
        {url: 'http://lumtest.com/myip.json',ip_path:'ip',geo_path:'country'},
        {url: 'http://ip-api.com/json/?fields=61439',ip_path:'query',geo_path:'countryCode'},
        {url: 'https://extreme-ip-lookup.com/json/',ip_path:'query',geo_path:'countryCode'},
        {url: 'https://ipapi.co/json/',ip_path:'ip',geo_path:'country'},
        {url: 'http://www.geoplugin.net/json.gp?ip=',ip_path:'geoplugin_request',geo_path:'geoplugin_countryCode'},
        {url: 'http://ifconfig.me/all.json',ip_path:'ip_addr'}
    ];
    let useproxy = {
        host: proxy.host,
        port: proxy.port
    };
    if(proxy.username && proxy.password) useproxy['proxyAuth'] = proxy.username+':'+proxy.password;
const options ={
    agent: {
        https: tunnel.httpsOverHttp({
            proxy: useproxy
        }),
        http: tunnel.httpOverHttp({
            proxy: useproxy
        })
    }
};
let ip = '';
let country = '';
for(let i=0; i<geoUrls.length;i++) {
    try {
        var response = (await got(geoUrls[i].url, options)).body;
        if (typeof response === 'string' && (response[0]=='{' ||response[0]=='[')) response = JSON.parse(response);
        ip = getByPath(response, geoUrls[i].ip_path);
        country = (geoUrls[i].geo_path) ? getByPath(response, geoUrls[i].geo_path) : '';
        //console.log('ip:' + ip + ' country: ' + country);
        if (typeof ip == 'string') break;//return [ip,country]
    } catch (e){
        //console.log("resolvv");
        //console.log(e);
    }
}
//console.log("resolved");
return {ip,country}
}

function getByPath(body, path) {
    //console.log(body);
    if(path==="*") return body;
    let iplocation = path.split('.');
    let rz = body;
    for(let l = 0; l < iplocation.length; l++) {
        //console.log("checking > "+ iplocation[l])
        rz = rz[iplocation[l]]
    }
    //console.log(">>>: "+rz)
    return rz
}

module.exports =resolve;