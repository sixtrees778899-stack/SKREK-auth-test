import {inspectSameBrowserCheckpoint,unlockSameBrowserCheckpoint} from '../../src/diagnostics/same-browser-checkpoint-probe.js';

const first=document.querySelector('#first-stage');
const unlockSection=document.querySelector('#unlock-section');
const second=document.querySelector('#second-stage');
const stage=document.querySelector('#probe-stage');
const rows=value=>Object.entries(value).map(([key,item])=>`<dt>${key}</dt><dd>${String(item)}</dd>`).join('');

let record=null;
try{
  const result=await inspectSameBrowserCheckpoint({onStage:value=>{stage.textContent=`正在检查：${value}`;}});
  record=result.record;
  const state=result.firstStage;
  first.innerHTML=rows({'Classification':state.classification,'Checkpoint':state.checkpoint,'Encrypted Payload':state.encryptedPayload,'Operation Match':state.operationMatch,'Snapshot Match':state.snapshotMatch,'Kit Artifact Reference':state.kitReference,'Evidence Artifact Reference':state.evidenceReference,'Delivery State':state.deliveryState,'Cleanup':state.cleanup,'localStorage read':result.localState.read,'Resume Pointer':result.localState.resumePointer,'Password Required For Next Step':state.passwordRequired?'YES':'NO'});
  unlockSection.hidden=!state.passwordRequired;
  stage.textContent='检查完成：RENDER_RESULT';
}catch(error){
  const classification=error?.code??'CHECKPOINT_PROBE_FAILED';
  const message=classification==='CHROME_INDEXEDDB_BLOCKED'?'当前浏览器中的本地数据库暂时被其他页面占用，请保持现有数据不变并联系客服。':'只读检查未能在限定时间内完成，未修改任何本地数据。';
  first.innerHTML=rows({'Classification':classification,'Exact Stage':error?.stage??'UNKNOWN','IndexedDB':classification==='CHROME_INDEXEDDB_BLOCKED'?'BLOCKED':'UNAVAILABLE','Message':message,'Password Required For Next Step':'NO'});
  stage.textContent=`检查结束：${error?.stage??'UNKNOWN'}`;
}

document.querySelector('#unlock-checkpoint').addEventListener('click',async()=>{
  const input=document.querySelector('#checkpoint-password');
  const password=input.value;
  input.value='';
  try{
    const result=await unlockSameBrowserCheckpoint({record,password});
    second.innerHTML=rows({'Classification':result.classification,'Identity Match':result.identityMatch,'Kit Artifact Reference':result.kitReference,'Evidence Artifact Reference':result.evidenceReference,'Delivery State':result.deliveryState,'Acknowledged':result.acknowledged?'YES':'NO','Cleanup':result.cleanup});
  }catch(error){
    second.innerHTML=rows({'Classification':error?.code==='CHECKPOINT_UNLOCK_FAILED'?'CHECKPOINT_UNLOCK_FAILED':'CHECKPOINT_METADATA_MISMATCH'});
  }finally{input.value='';}
});
