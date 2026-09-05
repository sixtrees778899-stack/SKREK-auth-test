(()=>{
  const canonicalOrigin='https://sixtrees778899-stack.github.io';
  const canonicalBase='/SKREK-auth-test';
  const release='technical-residue-gate-20260905-1';
  const approvedPaths=new Set([`${canonicalBase}/web/account/index.html`,`${canonicalBase}/web/v2/index.html`,`${canonicalBase}/web/recover.html`]);
  const requestedRelease=()=>new URLSearchParams(location.search).get('release')??new URLSearchParams(location.search).get('deploy');
  const pageRelease=()=>document.querySelector('meta[name="skrek-release"]')?.content??'';
  const isApproved=()=>location.protocol==='https:'&&location.origin===canonicalOrigin&&approvedPaths.has(location.pathname)&&pageRelease()===release&&(!requestedRelease()||requestedRelease()===release);
  const canonicalUrl=path=>`${canonicalOrigin}${canonicalBase}${path.startsWith('/')?path:`/${path}`}`;
  const failureMarkup=({title,message,url})=>`<main style="min-height:70vh;display:grid;place-items:center;padding:24px;background:#f7f4ed;color:#17362d;font-family:system-ui,sans-serif"><section role="alert" style="width:min(620px,100%);padding:32px;border:1px solid #d8dfda;border-radius:16px;background:#fff"><p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em">SKREK 安全入口</p><h1 style="margin:0 0 12px;font-size:24px">${title}</h1><p style="margin:0 0 20px;line-height:1.65">${message}</p><a href="${url}" style="display:inline-block;padding:11px 16px;border-radius:8px;background:#174c3c;color:#fff;text-decoration:none">打开最新安全入口</a></section></main>`;
  const renderFailure=(root,{kind='unsupported',canonicalPath='/web/account/index.html?section=maps#center'}={})=>{
    if(!root)return;
    root.dataset.runtimeState='FAILED';
    root.removeAttribute('data-account-initializing');
    const content=kind==='stale'?{title:'当前页面版本已过期',message:'当前页面版本已过期，请重新打开最新测试入口。',url:canonicalUrl(canonicalPath)}:kind==='bundle'?{title:'页面资源未能加载',message:'当前页面资源不完整，请通过正式 HTTPS 测试入口重新打开。',url:canonicalUrl(canonicalPath)}:{title:'当前入口不受支持',message:'此页面不能通过本地文件、localhost 或未批准的网址作为正式验收入口。请使用正式 HTTPS 测试入口。',url:canonicalUrl(canonicalPath)};
    root.innerHTML=failureMarkup(content);
  };
  const loadScript=({src,type,id})=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;if(type)script.type=type;if(id)script.id=id;script.onload=resolve;script.onerror=reject;document.body.append(script);});
  const manifestCurrent=async()=>{try{const response=await fetch(`${canonicalOrigin}${canonicalBase}/web/release-manifest.json?ts=${Date.now()}`,{cache:'no-store'});if(!response.ok)return false;const manifest=await response.json();return manifest?.release===release;}catch{return false;}};
  const boot=({rootId,scripts,canonicalPath,bundleMarker})=>{
    const root=document.getElementById(rootId);
    if(root)root.dataset.runtimeState='LOADING';
    document.documentElement.dataset.skrekRelease=release;
    if(!isApproved()){renderFailure(root,{kind:pageRelease()&&pageRelease()!==release||requestedRelease()&&requestedRelease()!==release?'stale':'unsupported',canonicalPath});return false;}
    (async()=>{try{if(!await manifestCurrent())return renderFailure(root,{kind:'stale',canonicalPath});for(const script of scripts)await loadScript(script);if(bundleMarker&&document.documentElement.dataset[bundleMarker]!==release)renderFailure(root,{kind:'stale',canonicalPath});}catch{renderFailure(root,{kind:'bundle',canonicalPath});}})();
    const revalidate=async()=>{if(!await manifestCurrent()||pageRelease()!==release||document.documentElement.dataset.skrekRelease!==release)renderFailure(root,{kind:'stale',canonicalPath});};
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')revalidate();});
    setInterval(revalidate,60000);
    return true;
  };
  const deliveryMatches=(verifiedUrl,deliveredUrl)=>verifiedUrl===deliveredUrl&&(()=>{try{const url=new URL(deliveredUrl);return url.protocol==='https:'&&url.origin===canonicalOrigin&&approvedPaths.has(url.pathname)&&(url.searchParams.get('release')??url.searchParams.get('deploy'))===release;}catch{return false;}})();
  const markReady=root=>{if(root&&root.dataset.runtimeState==='LOADING')root.dataset.runtimeState='READY';};
  globalThis.SKREK_RUNTIME_GATE=Object.freeze({boot,isApproved,deliveryMatches,markReady,renderFailure,canonicalOrigin,canonicalBase,release});
})();
