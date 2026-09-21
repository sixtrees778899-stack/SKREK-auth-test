import {inspectSameBrowserCheckpoint,unlockSameBrowserCheckpoint} from '../../src/diagnostics/same-browser-checkpoint-probe.js';

const first=document.querySelector('#first-stage');
const unlockSection=document.querySelector('#unlock-section');
const second=document.querySelector('#second-stage');
const stage=document.querySelector('#probe-stage');
const rows=value=>Object.entries(value).map(([key,item])=>`<dt>${key}</dt><dd>${String(item)}</dd>`).join('');

let record=null,lineage=null;
try{
  const result=await inspectSameBrowserCheckpoint({onStage:value=>{stage.textContent=`正在检查：${value}`;}});
  record=result.record;
  const state=result.firstStage;
  lineage=result.lineage;
  first.innerHTML=rows({'Classification':state.classification,'Checkpoint Candidate Count':lineage.candidateCount,'Related Operation Count':lineage.relatedOperationCount,'Operation ID Match':lineage.checks.operationMatch,'Resume Pointer Match':lineage.checks.pointerMatch,'Internal Version Identity':lineage.internalVersionIdentity??'UNAVAILABLE','Internal Version Treatment':lineage.internalVersionTreatment,'Review Mapping':lineage.checks.reviewMapping,'Source Version Mapping':lineage.checks.sourceMatch,'Resulting Version Mapping':lineage.checks.resultingMatch,'Snapshot Match':lineage.checks.snapshotMatch,'Archive Match':lineage.checks.archiveMatch,'Archive Size Source':lineage.archiveSizeSource,'Canonical Archive Identity':lineage.checks.archiveMatch,'TxID Match':lineage.checks.txMatch,'Lifecycle Continuity':lineage.checks.lifecycleContinuity,'Checkpoint Schema':lineage.checks.schemaRecognized,'Same Snapshot Fork':lineage.sameSnapshotFork?'YES':'NO','Same Resulting Version Fork':lineage.sameResultingFork?'YES':'NO','Competing U1/U2':lineage.competingOperation?'YES':'NO','Unique Lineage':lineage.checks.noIdentityFork,'Encrypted Payload':state.encryptedPayload,'localStorage read':result.localState.read,'Password Required For Next Step':state.passwordRequired?'YES':'NO'});
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
    const result=await unlockSameBrowserCheckpoint({record,password,lineage});
    second.innerHTML=rows({'Final Classification':result.classification,'Crypto Preparation':'PASS','AES-GCM':'PASS','Payload Decode':'PASS','Binding Validation':'PASS','Archive SHA Match':result.archiveShaMatch,'Archive Size Match':result.archiveSizeMatch,'Recovery Kit Present':result.kitReference,'Recovery Kit Identity Match':result.kitIdentityMatch,'Recovery Kit Reconstructable':result.kitReconstructable,'Evidence Present':result.evidenceReference,'Evidence TxID Match':result.evidenceTxidMatch,'Evidence Archive Match':result.evidenceArchiveMatch,'Evidence Snapshot/Kit Match':result.evidenceSnapshotMatch,'Evidence Reconstructable':result.evidenceReconstructable});
  }catch(error){
    second.innerHTML=rows({'Final Classification':error?.code??'BLOCKED','Exact Reason Code':error?.code??'BLOCKED'});
  }finally{input.value='';}
});
