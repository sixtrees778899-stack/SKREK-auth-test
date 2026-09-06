import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const missing=async path=>{try{await access(new URL(path,root));return false;}catch{return true;}};

test('every public legacy document uses the shared canonical redirect boundary',async()=>{
  const redirect=await read('web/legacy-entry-redirect.js');
  assert.match(redirect,/gate\.canonicalOrigin/);
  assert.match(redirect,/gate\.canonicalBase/);
  assert.match(redirect,/gate\.release/);
  assert.match(redirect,/location\.replace\(target\)/);
  assert.doesNotMatch(redirect,/file:\/\/|localhost|CJAS/);

  for(const[path,target]of [['index.html','home'],['web/index.html','home'],['web/v3-crypto/recover.html','recovery']]){
    const html=await read(path);
    assert.match(html,new RegExp(`data-legacy-entry="${target}"`),path);
    assert.match(html,/canonical-runtime-gate\.js/,path);
    assert.match(html,/legacy-entry-redirect\.js/,path);
    assert.doesNotMatch(html,/recover\.js|product-v1\.bundle\.js|SKREK|CJAS/,path);
  }
});

test('internal validation UI and legacy recovery assets are not in public output',async()=>{
  for(const path of [
    'test/version-rpc-validation.html','test/version-rpc-validation.bundle.js',
    'web/v3-crypto/recover.js','web/v3-crypto/styles.css','web/assets/skrek-logo-formal.png',
    'web/v2/assets/templates/SKREK_Module1_资产与账户_Canonical_V2.docx',
    'web/v2/assets/templates/SKREK_Module2_恢复所需条件与资料_Canonical_V2.docx',
    'web/v2/assets/templates/SKREK_Module3_位置与查找_单一平台信息_Canonical_V2.docx',
    'web/v2/assets/templates/SKREK_Module3_位置与查找_恢复信息位置汇总_Canonical_V2.docx',
    'web/v2/assets/templates/SKREK_Module4_恢复与转移步骤_单一平台恢复步骤_Canonical_V2.1.docx',
    'web/v2/assets/templates/SKREK_Module4_恢复与转移步骤_恢复步骤汇总_Canonical_V2.1.docx',
    'web/v2/assets/templates/SKREK_Module5_协助人_Canonical_V2.docx',
    'web/v2/assets/templates/SKREK_Module6_给未来恢复人的嘱托_Canonical_V3.1.docx'
  ]){
    assert.equal(await missing(path),true,`${path} must remain outside public deployment`);
  }
});

test('canonical customer entries remain present and release-aligned',async()=>{
  const manifest=JSON.parse(await read('web/release-manifest.json'));
  for(const path of ['web/v3-crypto/index.html','web/account/index.html','web/v2/index.html','web/recover.html']){
    const html=await read(path);
    assert.match(html,new RegExp(manifest.release.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),path);
    assert.match(html,/LEGAVIK/,path);
  }
});
