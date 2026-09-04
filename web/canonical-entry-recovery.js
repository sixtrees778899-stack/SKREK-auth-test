(()=>{
  const app=document.querySelector('#app'),gate=globalThis.SKREK_RUNTIME_GATE;
  if(!gate){app.innerHTML='<section class="card" role="alert"><h1>当前入口不受支持</h1><p>请使用正式 HTTPS 测试入口。</p><a href="https://sixtrees778899-stack.github.io/SKREK-auth-test/web/recover.html">打开正式 HTTPS 测试入口</a></section>';return;}
  const query=new URLSearchParams(location.search),diagnosticRelease='p0-attachment-contract-20260905-1',diagnosticMode=query.get('mode')==='version-update'&&query.get('version_number')==='4';
  if(diagnosticMode){
    const releaseIdentity=document.querySelector('meta[name="skrek-release"]')?.content??'';
    const validEntry=location.protocol==='https:'&&location.origin===gate.canonicalOrigin&&location.pathname===`${gate.canonicalBase}/web/recover.html`&&(query.get('release')??query.get('deploy'))===diagnosticRelease&&releaseIdentity===diagnosticRelease;
    const canonicalDiagnosticUrl=new URL(`${gate.canonicalOrigin}${gate.canonicalBase}/web/recover.html`);
    for(const [key,value] of query)if(key!=='deploy'&&key!=='release')canonicalDiagnosticUrl.searchParams.append(key,value);
    canonicalDiagnosticUrl.searchParams.set('release',diagnosticRelease);
    if(!validEntry){
      app.innerHTML=`<section class="card" role="alert"><p class="eyebrow">DIAGNOSTIC ENTRY</p><h1>错误/旧诊断入口</h1><p>此页面不能用于 V4 诊断解锁。请只使用当前唯一的 HTTPS 诊断入口。</p><a class="button" href="${canonicalDiagnosticUrl.href}">打开唯一 V4 诊断入口</a><p><small>DIAGNOSTIC V4 · ${diagnosticRelease}</small></p></section>`;
      return;
    }
    const banner=document.createElement('div');
    banner.id='diagnostic-v4-identity';
    banner.setAttribute('role','status');
    banner.textContent=`DIAGNOSTIC V4 · ${diagnosticRelease}`;
    banner.style.cssText='position:relative;z-index:20;padding:10px 16px;text-align:center;background:#173f34;color:#fff;font:700 13px/1.4 system-ui,sans-serif;letter-spacing:.08em';
    document.body.prepend(banner);
    document.documentElement.dataset.diagnosticRelease=diagnosticRelease;
  }
  const pagesRuntime=location.origin===gate.canonicalOrigin;
  const appScript=pagesRuntime?'./recover.bundle.js?v=p0-attachment-contract-20260905-1':'./recover.js?v=p0-attachment-contract-20260905-1';
  const approved=gate.boot({rootId:'app',canonicalPath:'/web/recover.html?release=p0-attachment-contract-20260905-1',bundleMarker:'recoveryBundleRelease',scripts:[{src:appScript,type:'module',id:'recovery-app-script'}]});
  if(!approved)return;
  setTimeout(()=>{if(app?.dataset.runtimeState!=='LOADING')return;app.dataset.runtimeState='FAILED';app.innerHTML='<section class="card initialization-failure" role="alert"><h1>安全工作区未能正常打开</h1><p>请重新加载，或返回客户中心后再次进入。</p><div class="actions"><button id="reload-secure-workspace">重新加载</button><a class="button secondary" href="./account/index.html?section=maps&release=p0-attachment-contract-20260905-1#center">返回客户中心</a></div></section>';document.querySelector('#reload-secure-workspace')?.addEventListener('click',()=>location.reload());},12000);
})();
