export default {
  async fetch(request, env) {
  //let url = new URL(request.url);

  let url=request.url.substr(ASSET_URL.length);
  
//|| url.indexOf('.') == -1 

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

const ASSET_URL = 'https://raw.12345.com/'

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
  const html = `
  <!DOCTYPE html>
  <html lang="zh-Hans">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>
  body {background-color: #fbfbfb;font-family: Arial, sans-serif;}
  h1 {text-align: center;color: #444;}
  .container {display: flex;flex-direction: column;justify-content: center;align-items: center;height: 100vh;}
  form {background-color: white;box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 2rem;border-radius: 5px;}
  input,button,label{display: block;width: 100%;font-size: 18px;padding: 15px ;margin: 1rem 0;line-height:1.5;border-radius: 4px;}
  input {border: solid 1px #ccc;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;padding:5px 15px;}
  button {background-color: #0288d1;color: white;border: none; cursor: pointer;}
  button:hover {background-color: #039BE5;}
  </style>
  <title>Github acceleration</title>
  </head>
  <body>
  <div class="container">
    <!--h1>Github Acceleration</h1-->
    <form id="proxy-form">
      <input type="text" id="url" name="url" placeholder="https://github.com" required autofocus />
      <button type="submit">确定</button>
      <!--label>支持release、archive、raw和其他文件，右键复制出来的链接都是可用的。</label-->
    </form>
    </div>
    <script>
      const form = document.getElementById('proxy-form');
      form.addEventListener('submit', event => {
        event.preventDefault();
        const input = document.getElementById('url');
        const actualUrl = input.value;
        const proxyUrl =  '`+ASSET_URL+`' + actualUrl;
        location.href = proxyUrl;
      });
    </script>
  </body>
  </html>
  `;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
