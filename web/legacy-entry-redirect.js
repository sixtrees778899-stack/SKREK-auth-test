(()=>{
  const gate=globalThis.SKREK_RUNTIME_GATE;
  const root=document.querySelector('[data-legacy-entry]');
  if(!gate||!root){
    document.body.innerHTML='<main><h1>入口未能安全打开</h1><p>请使用 LEGAVIK 正式 HTTPS 首页。</p></main>';
    return;
  }
  const destinations={
    home:`${gate.canonicalOrigin}${gate.canonicalBase}/web/v3-crypto/index.html?release=${gate.release}#home`,
    recovery:`${gate.canonicalOrigin}${gate.canonicalBase}/web/recover.html?source=recovery-center&release=${gate.release}`,
    account:`${gate.canonicalOrigin}${gate.canonicalBase}/web/account/index.html?section=maps&release=${gate.release}#center`
  };
  const target=destinations[root.dataset.legacyEntry];
  if(!target){
    document.body.innerHTML='<main><h1>入口未能安全打开</h1><p>请使用 LEGAVIK 正式 HTTPS 首页。</p></main>';
    return;
  }
  location.replace(target);
})();
