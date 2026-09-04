(()=>{
  const canonicalOrigin='https://sixtrees778899-stack.github.io';
  const canonicalBase='/SKREK-auth-test';
  const release='canonical-https-entry-20260904-2';
  const localHosts=new Set(['localhost','127.0.0.1']);
  const approvedPath=path=>path.startsWith(`${canonicalBase}/web/`);
  const localPath=path=>path.startsWith('/web/');
  const isApproved=()=>location.protocol==='https:'&&location.origin===canonicalOrigin&&approvedPath(location.pathname)||location.protocol==='http:'&&localHosts.has(location.hostname)&&localPath(location.pathname);
  const canonicalUrl=path=>`${canonicalOrigin}${canonicalBase}${path.startsWith('/')?path:`/${path}`}`;
  const failureMarkup=({title,message,url})=>`<main style="min-height:70vh;display:grid;place-items:center;padding:24px;background:#f7f4ed;color:#17362d;font-family:system-ui,sans-serif"><section role="alert" style="width:min(620px,100%);padding:32px;border:1px solid #d8dfda;border-radius:16px;background:#fff"><p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em">SKREK RUNTIME</p><h1 style="margin:0 0 12px;font-size:24px">${title}</h1><p style="margin:0 0 20px;line-height:1.65">${message}</p><a href="${url}" style="display:inline-block;padding:11px 16px;border-radius:8px;background:#174c3c;color:#fff;text-decoration:none">打开正式 HTTPS 测试入口</a><p style="margin:18px 0 0;font-size:12px;color:#66766f">Release: ${release}</p></section></main>`;
  const renderFailure=(root,{kind='unsupported',canonicalPath='/web/account/index.html?section=maps#center'}={})=>{
    if(!root)return;
    root.removeAttribute('data-account-initializing');
    root.innerHTML=failureMarkup(kind==='bundle'?{title:'页面资源未能加载',message:'当前页面资源不完整，请通过正式 HTTPS 测试入口重新打开。',url:canonicalUrl(canonicalPath)}:{title:'当前入口不受支持',message:'此页面不能通过本地文件或未批准的网址运行。请使用正式 HTTPS 测试入口。',url:canonicalUrl(canonicalPath)});
  };
  const loadScript=({src,type,id})=>new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;if(type)script.type=type;if(id)script.id=id;script.onload=resolve;script.onerror=reject;document.body.append(script);});
  const boot=({rootId,scripts,canonicalPath})=>{
    const root=document.getElementById(rootId);
    document.documentElement.dataset.skrekRelease=release;
    if(!isApproved()){renderFailure(root,{canonicalPath});return false;}
    (async()=>{try{for(const script of scripts)await loadScript(script);}catch{renderFailure(root,{kind:'bundle',canonicalPath});}})();
    return true;
  };
  globalThis.SKREK_RUNTIME_GATE=Object.freeze({boot,isApproved,canonicalOrigin,canonicalBase,release});
})();
