(()=>{
  const app=document.querySelector('#account-app'),gate=globalThis.SKREK_RUNTIME_GATE;
  if(!gate){app.innerHTML='<main><section role="alert"><h1>当前入口不受支持</h1><p>请使用正式 HTTPS 测试入口。</p><a href="https://sixtrees778899-stack.github.io/SKREK-auth-test/web/account/index.html?section=maps#center">打开正式 HTTPS 测试入口</a></section></main>';return;}
  const approved=gate.boot({rootId:'account-app',canonicalPath:'/web/account/index.html?section=maps#center',scripts:[{src:'./public-config.js?v=payment-test-gate-v2'},{src:'./account-nav-bridge.bundle.js?v=payment-test-gate-v2'},{src:'./account-app.bundle.js?v=customer-center-init-v2',type:'module',id:'account-app-script'}]});
  if(!approved)return;
  let finished=false;
  const fail=()=>{if(finished||!app?.hasAttribute('data-account-initializing'))return;finished=true;app.innerHTML='<main><section class="auth-layout"><div class="auth-card"><h1>客户中心未能正常打开</h1><p>请重新加载，或返回安全入口后再次进入。</p><div class="auth-links"><button id="account-shell-reload">重新加载</button><a class="secondary-link" href="../v3-crypto/index.html?release=global-nav-v1#home">返回安全入口</a></div></div></section></main>';document.querySelector('#account-shell-reload')?.addEventListener('click',()=>location.reload());};
  new MutationObserver(()=>{if(app&&!app.textContent.includes('正在打开 SKREK 客户中心')){app.removeAttribute('data-account-initializing');finished=true;}}).observe(app,{childList:true,subtree:true});
  addEventListener('error',fail);addEventListener('unhandledrejection',fail);setTimeout(fail,12000);
})();
