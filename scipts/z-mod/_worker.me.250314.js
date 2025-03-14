export default {
  async fetch(request, env) {

  let url=request.url.substr(22); //cal proxyurl length:[http://-->/]
  
  if (url.length < 1 || url.indexOf('/') == -1 || url == "favicon.ico" || url == "robots.txt") {
    return createLandingPage();
  }

  if (url.indexOf("https://")!=0){url="https://raw.githubusercontent.com/"+url}
  
  if (checkUrl(url)){
    let new_request=new Request(url,request);
    return fetch(new_request);
  }

  return env.ASSETS.fetch(request);
  } //fetch
}; //export

const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i

function checkUrl(u) {
    for (let i of [exp1, exp2, exp3, exp4, exp5, exp6]) {
        if (u.search(i) === 0) {
            return true
        }
    }
    return false
}

function createLandingPage() {
  const html = `<html><head><meta charset="utf-8"><meta name="viewport"content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><title>Github Acceleration</title><style>body{margin:auto auto;text-align:center;width:90%;max-width:700px}input,button{padding:0.8rem;font-size:1.1rem;width:100%;margin:0.8rem auto;outline:none;border-radius:3px}input{border:2px solid#ddd;box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}button{border:none;background-color:#26c;color:#fff}</style></head><body><form id="pform"style="margin-top:3rem;"><input type="text"id="url"name="url"placeholder="release, archive, raw"required=""autofocus=""style=""><button type="submit">Acceleration</button></form><script>const form=document.getElementById('pform');form.addEventListener('submit',event=>{event.preventDefault();const input=document.getElementById('url');const actualUrl=input.value;const proxyUrl='/'+actualUrl;location.href=proxyUrl});</script></body></html>
  `;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
