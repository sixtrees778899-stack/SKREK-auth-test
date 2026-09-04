(()=>{
  const app=document.querySelector('#app'),gate=globalThis.SKREK_RUNTIME_GATE;
  if(!gate){app.innerHTML='<section class="card" role="alert"><h1>当前入口不受支持</h1><p>请使用正式 HTTPS 测试入口。</p><a class="button" href="https://sixtrees778899-stack.github.io/SKREK-auth-test/web/account/index.html?section=maps#center">打开正式 HTTPS 测试入口</a></section>';return;}
  const pagesRuntime=location.origin===gate.canonicalOrigin;
  const appScript=pagesRuntime?'./v2-app.bundle.js?v=batch3-20260904-1':'./v2-app.js?v=batch3-20260904-1';
  const approved=gate.boot({rootId:'app',canonicalPath:'/web/v2/index.html?entry=guide&release=batch3-20260904-1',bundleMarker:'recoveryMapBundleRelease',scripts:[{src:'../account/public-config.js?v=batch3-20260904-1'},{src:'../account/account-nav-bridge.bundle.js?v=batch3-20260904-1'},{src:appScript,type:'module',id:'recovery-map-app'}]});
  if(!approved)return;
  const renderFailure=()=>{if(!app||app.dataset.runtimeState!=='LOADING')return;app.dataset.runtimeState='FAILED';app.innerHTML='<section class="card initialization-failure" role="alert"><h1>Recovery Map 未能正常打开</h1><p>请重新加载，或返回客户中心后再次进入。</p><div class="actions"><button id="reload-recovery-map">重新加载</button><a class="button secondary" href="../account/index.html?section=maps&release=batch3-20260904-1#center">返回客户中心</a></div></section>';document.querySelector('#reload-recovery-map')?.addEventListener('click',()=>location.reload());};
  setTimeout(renderFailure,12000);
})();
