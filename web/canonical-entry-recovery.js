(()=>{
  const app=document.querySelector('#app'),gate=globalThis.SKREK_RUNTIME_GATE;
  if(!gate){app.innerHTML='<section class="card" role="alert"><h1>当前入口不受支持</h1><p>请使用正式 HTTPS 测试入口。</p><a href="https://sixtrees778899-stack.github.io/SKREK-auth-test/web/recover.html">打开正式 HTTPS 测试入口</a></section>';return;}
  gate.boot({rootId:'app',canonicalPath:'/web/recover.html',scripts:[{src:'./recover.js?v=recovery-workspace-batch1',type:'module',id:'recovery-app-script'}]});
})();
