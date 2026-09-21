// src/ui/resume-checkpoint-crypto.js
var DOMAIN = "SKREK-LOCAL-RESUME-CHECKPOINT-V1";
var PARAMETERS = Object.freeze({ name: "PBKDF2", hash: "SHA-256", iterations: 3e5 });
var CIPHER = Object.freeze({ name: "AES-GCM", tagLength: 128 });
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function requireCrypto(cryptoImpl) {
  if (!cryptoImpl?.subtle || typeof cryptoImpl.getRandomValues !== "function") throw new Error("Web Crypto API is required");
  return cryptoImpl;
}
function concat(parts) {
  const size = parts.reduce((sum, item) => sum + item.byteLength, 0), out = new Uint8Array(size);
  let offset = 0;
  for (const item of parts) {
    out.set(item, offset);
    offset += item.byteLength;
  }
  return out;
}
function decodeBinary(value, buffers) {
  if (value && typeof value === "object" && !Array.isArray(value) && Number.isInteger(value.$bytes) && Object.keys(value).every((key) => ["$bytes", "length"].includes(key))) {
    const bytes = buffers[value.$bytes];
    if (!bytes || bytes.byteLength !== value.length) throw new Error("Invalid encrypted checkpoint binary reference");
    return bytes;
  }
  if (Array.isArray(value)) return value.map((item) => decodeBinary(item, buffers));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, decodeBinary(item, buffers)]));
  return value;
}
function decodeCheckpointPayload(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength < 8) throw new Error("Invalid encrypted checkpoint payload");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), count = view.getUint32(0), headerSize = 4 + 4 + count * 4;
  if (headerSize > bytes.byteLength) throw new Error("Invalid encrypted checkpoint header");
  const jsonLength = view.getUint32(4);
  let offset = headerSize;
  if (offset + jsonLength > bytes.byteLength) throw new Error("Invalid encrypted checkpoint JSON");
  const json = JSON.parse(decoder.decode(bytes.subarray(offset, offset + jsonLength)));
  offset += jsonLength;
  const buffers = [];
  for (let index = 0; index < count; index++) {
    const length = view.getUint32(8 + index * 4);
    if (offset + length > bytes.byteLength) throw new Error("Invalid encrypted checkpoint buffer");
    buffers.push(bytes.slice(offset, offset + length));
    offset += length;
  }
  if (offset !== bytes.byteLength) throw new Error("Invalid encrypted checkpoint trailing bytes");
  return decodeBinary(json, buffers);
}
function aadFor(envelope) {
  return encoder.encode(JSON.stringify({ checkpoint_schema: envelope.checkpoint_schema, operation_id: envelope.operation_id, draft_id: envelope.operation.draft_id, version_id: envelope.operation.version_id, snapshot_id: envelope.operation.snapshot_id, archive_sha256: envelope.operation.archive_sha256, kdf_domain: DOMAIN }));
}
async function deriveKey(password, salt, cryptoImpl) {
  if (typeof password !== "string" || !password.length) throw new Error("Recovery Password is required");
  const subtle = cryptoImpl.subtle, material = await subtle.importKey("raw", encoder.encode(password.normalize("NFC")), "PBKDF2", false, ["deriveKey"]), domainSalt = concat([encoder.encode(DOMAIN), new Uint8Array([0]), salt]);
  return subtle.deriveKey({ ...PARAMETERS, salt: domainSalt }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
function restoreFailure(code, cause) {
  const error = new Error("\u672C\u5730\u5B89\u5168\u72B6\u6001\u65E0\u6CD5\u6062\u590D\u3002");
  error.code = code;
  error.cause = cause;
  return error;
}
async function decryptResumeCheckpoint({ password, record: record2, cryptoImpl = globalThis.crypto }) {
  let cryptoApi, metadata, key;
  try {
    cryptoApi = requireCrypto(cryptoImpl);
    metadata = record2?.checkpoint_crypto;
    if (metadata?.format !== "SKREK_ENCRYPTED_RESUME_V1" || metadata.kdf?.domain !== DOMAIN || metadata.kdf?.iterations !== PARAMETERS.iterations || metadata.kdf?.hash !== PARAMETERS.hash) throw new Error("Unsupported encrypted checkpoint");
    key = await deriveKey(password, metadata.kdf.salt, cryptoApi);
  } catch (error) {
    throw restoreFailure("CHECKPOINT_CRYPTO_PREP_FAILED", error);
  }
  let plaintext;
  try {
    plaintext = new Uint8Array(await cryptoApi.subtle.decrypt({ ...CIPHER, iv: metadata.cipher.nonce, additionalData: aadFor(record2) }, key, record2.encrypted_payload));
  } catch (error) {
    throw restoreFailure("CHECKPOINT_AES_AUTH_FAILED", error);
  }
  try {
    return decodeCheckpointPayload(plaintext);
  } catch (error) {
    throw restoreFailure("CHECKPOINT_PAYLOAD_DECODE_FAILED", error);
  } finally {
    plaintext.fill(0);
  }
}
var RESUME_CHECKPOINT_CRYPTO = Object.freeze({ format: "SKREK_ENCRYPTED_RESUME_V1", domain: DOMAIN, parameters: PARAMETERS });

// src/diagnostics/checkpoint-identity-resolver.js
var same = (a, b) => typeof a === "string" && a.length > 0 && a === b;
var time = (value) => {
  const parsed = Date.parse(value ?? "");
  return Number.isFinite(parsed) ? parsed : null;
};
var pass = (value) => value ? "PASS" : "FAIL";
var CHECKPOINT_LINEAGE_AUTHORITY = Object.freeze({
  operation: Object.freeze({ id: "0ccee778-ed30-4f56-95ab-43f9a5ed6b85", reviewId: "ab91fd2a-472b-462b-8bcb-5865a1071e47", recoveryMapId: "edd54d1d-7aff-4897-b393-9d1a3f0de451", sourceVersionId: "d2652af5-87dd-48b4-b49c-841ad3d78fe5", draftId: "version-update-9b36fe8c-92c3-45fb-8efe-1723333e7e02", resultingVersionId: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4", status: "SYSTEM_LINKED", signingState: "COMPLETED", transactionId: "6MzUtDgH7PdByWeHogvchbadxljI4aU330MyzmZIeuE", createdAt: "2026-09-19T22:12:31.96847Z", signatureRequestedAt: "2026-09-20T04:59:50.23628Z", signedAt: "2026-09-20T05:04:20.183843Z", broadcastingAt: "2026-09-20T05:04:20.280345Z", broadcastedAt: "2026-09-20T05:05:15.595042Z", verifyingAt: "2026-09-20T05:05:19.619081Z", linkedAt: "2026-09-20T21:00:58.492286Z" }),
  review: Object.freeze({ id: "ab91fd2a-472b-462b-8bcb-5865a1071e47", recoveryMapId: "edd54d1d-7aff-4897-b393-9d1a3f0de451", baselineVersionId: "d2652af5-87dd-48b4-b49c-841ad3d78fe5", resultingVersionId: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4", status: "COMPLETED", verificationResult: "PASS", updateResolution: "SYSTEM_LINKED", startedAt: "2026-09-19T22:09:26.32333Z", completedAt: "2026-09-20T21:00:58.492286Z" }),
  sourceVersion: Object.freeze({ id: "d2652af5-87dd-48b4-b49c-841ad3d78fe5", recoveryMapId: "edd54d1d-7aff-4897-b393-9d1a3f0de451", versionNumber: 1, status: "HISTORICAL" }),
  resultingVersion: Object.freeze({ id: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4", recoveryMapId: "edd54d1d-7aff-4897-b393-9d1a3f0de451", internalVersionId: "version-version-update-9b36fe8c-92c3-45fb-8efe-1723333e7e02", versionNumber: 2, operationId: "0ccee778-ed30-4f56-95ab-43f9a5ed6b85", snapshotId: "v2-6b5380b4-bf28-49ae-a7ae-2805829097d1", transactionId: "6MzUtDgH7PdByWeHogvchbadxljI4aU330MyzmZIeuE", archiveSha256: "1f3956710061fbcce750370ef268ab91e5992fef99d7da0cef1dea0fe7338882", archiveSizeBytes: 3097659, status: "CURRENT", publishedAt: "2026-09-20T21:00:58.271Z" }),
  recoveryMap: Object.freeze({ id: "edd54d1d-7aff-4897-b393-9d1a3f0de451", currentVersionId: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4", status: "PUBLISHED" }),
  relatedOperations: Object.freeze([{ id: "0ccee778-ed30-4f56-95ab-43f9a5ed6b85", reviewId: "ab91fd2a-472b-462b-8bcb-5865a1071e47", sourceVersionId: "d2652af5-87dd-48b4-b49c-841ad3d78fe5", resultingVersionId: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4", snapshotId: "v2-6b5380b4-bf28-49ae-a7ae-2805829097d1", archiveSha256: "1f3956710061fbcce750370ef268ab91e5992fef99d7da0cef1dea0fe7338882" }])
});
function sanitizeCheckpointMetadata(record2) {
  return Object.freeze({ recordKey: record2?.operation_id ?? null, operationReference: record2?.operation?.operation_id ?? null, draftReference: record2?.operation?.draft_id ?? null, internalVersionReference: record2?.operation?.version_id ?? null, sourceVersionReference: record2?.operation?.source_version_id ?? null, snapshotReference: record2?.operation?.snapshot_id ?? null, transactionIdPresent: Boolean(record2?.operation?.transaction_id ?? record2?.evidence?.txid), createdAt: record2?.created_at ?? record2?.operation?.created_at ?? null, updatedAt: record2?.updated_at ?? record2?.operation?.updated_at ?? null, schema: record2?.checkpoint_schema ?? record2?.schema_version ?? null });
}
function resolveCheckpointIdentity({ records = [], resumePointer = null, authority = CHECKPOINT_LINEAGE_AUTHORITY } = {}) {
  const { operation, review, sourceVersion, resultingVersion, recoveryMap } = authority;
  const related = authority.relatedOperations ?? [];
  const candidates = records.filter((record3) => [record3?.operation_id, record3?.operation?.operation_id].includes(operation.id) || record3?.operation?.snapshot_id === resultingVersion.snapshotId || record3?.operation?.archive_sha256 === resultingVersion.archiveSha256 || record3?.operation?.version_id === resultingVersion.internalVersionId);
  const record2 = candidates.find((item) => item?.operation_id === operation.id) ?? null;
  const op = record2?.operation ?? {};
  const tx = op.transaction_id ?? record2?.evidence?.txid ?? null;
  const reviewOps = related.filter((item) => item.reviewId === review.id);
  const snapshotOps = related.filter((item) => item.snapshotId === resultingVersion.snapshotId);
  const resultOps = related.filter((item) => item.resultingVersionId === resultingVersion.id);
  const archiveOps = related.filter((item) => item.archiveSha256 === resultingVersion.archiveSha256);
  const operationMatch = same(record2?.operation_id, operation.id) && same(op.operation_id, operation.id);
  const pointerMatch = same(resumePointer, operation.id);
  const reviewMapping = reviewOps.length === 1 && same(reviewOps[0].id, operation.id) && same(operation.reviewId, review.id) && same(review.recoveryMapId, operation.recoveryMapId);
  const sourceMatch = same(operation.sourceVersionId, sourceVersion.id) && same(review.baselineVersionId, sourceVersion.id) && same(sourceVersion.recoveryMapId, operation.recoveryMapId) && (!op.source_version_id || same(op.source_version_id, sourceVersion.id));
  const resultingMatch = same(operation.resultingVersionId, resultingVersion.id) && same(review.resultingVersionId, resultingVersion.id) && same(recoveryMap.currentVersionId, resultingVersion.id) && same(resultingVersion.operationId, operation.id);
  const snapshotMatch = same(op.snapshot_id, resultingVersion.snapshotId);
  const archiveMatch = same(op.archive_sha256, resultingVersion.archiveSha256) && Number(op.archive_size ?? op.archive_size_bytes) === Number(resultingVersion.archiveSizeBytes);
  const txMatch = tx ? same(tx, operation.transactionId) && same(tx, resultingVersion.transactionId) : false;
  const lifecycleTimes = [review.startedAt, operation.createdAt, operation.signatureRequestedAt, operation.signedAt, operation.broadcastingAt, operation.broadcastedAt, operation.verifyingAt, resultingVersion.publishedAt, operation.linkedAt, review.completedAt].map(time);
  const timelineContinuous = lifecycleTimes.every((value) => value !== null) && lifecycleTimes.every((value, index) => index === 0 || value >= lifecycleTimes[index - 1]);
  const lifecycleContinuity = operation.status === "SYSTEM_LINKED" && operation.signingState === "COMPLETED" && review.status === "COMPLETED" && review.verificationResult === "PASS" && review.updateResolution === "SYSTEM_LINKED" && resultingVersion.status === "CURRENT" && timelineContinuous;
  const schemaRecognized = [2, 3].includes(Number(record2?.checkpoint_schema ?? record2?.schema_version));
  const competingOperation = reviewOps.length > 1;
  const sameSnapshotFork = snapshotOps.length > 1;
  const sameResultingFork = resultOps.length > 1;
  const sameArchiveFork = archiveOps.length > 1;
  const localCandidateFork = candidates.length > 1;
  const ambiguity = competingOperation || sameSnapshotFork || sameResultingFork || sameArchiveFork || localCandidateFork;
  const checks = { operationMatch, pointerMatch, reviewMapping, sourceMatch, resultingMatch, snapshotMatch, archiveMatch, txMatch, lifecycleContinuity, schemaRecognized, noIdentityFork: !ambiguity };
  const classification = ambiguity ? "MULTIPLE_OPERATION_AMBIGUITY" : Object.values(checks).every(Boolean) ? "SAFE_SAME_OPERATION_LINEAGE" : "FAIL_CLOSED";
  return Object.freeze({ classification, candidateCount: candidates.length, relatedOperationCount: related.length, competingOperation, sameSnapshotFork, sameResultingFork, sameArchiveFork, ambiguity, checks: Object.freeze(Object.fromEntries(Object.entries(checks).map(([key, value]) => [key, pass(value)]))), internalVersionIdentity: op.version_id ?? null, internalVersionTreatment: "INFO ONLY", candidateMetadata: Object.freeze(candidates.map(sanitizeCheckpointMetadata)) });
}

// src/diagnostics/same-browser-checkpoint-probe.js
var CHECKPOINT_PROBE_TARGET = Object.freeze({
  operationId: "0ccee778-ed30-4f56-95ab-43f9a5ed6b85",
  resultingVersionId: "ef93b4c5-8079-4cc1-ae5c-2d9f954fa7b4",
  internalVersionId: "version-version-update-9b36fe8c-92c3-45fb-8efe-1723333e7e02",
  snapshotId: "v2-6b5380b4-bf28-49ae-a7ae-2805829097d1"
});
var DB_NAME = "skrek-mainnet-operations-v1";
var STORE_NAME = "operations";
var ACTIVE_KEY = "skrek.mainnet.active-operation.v1";
var ACTIVE_DESCRIPTOR_KEY = "skrek.mainnet.active-operation-descriptor.v1";
var SANITIZE_PENDING_KEY = "skrek.mainnet.completed-sanitize-pending.v1";
var COMPLETED_RETENTION_STATE = "COMPLETED_SANITIZED";
var PROBE_STAGES = Object.freeze(["PAGE_INIT", "OPEN_INDEXEDDB", "DATABASE_OPEN_SUCCESS", "DATABASE_OPEN_BLOCKED", "DATABASE_OPEN_ERROR", "TRANSACTION_CREATE", "OBJECT_STORE_ACCESS", "U1_LOOKUP", "CHECKPOINT_READ", "LOCALSTORAGE_READ", "DELIVERY_STATE_READ", "CLASSIFICATION", "RENDER_RESULT", "TIMEOUT"]);
var DEFAULT_STAGE_TIMEOUT_MS = 8e3;
var DEFAULT_OVERALL_TIMEOUT_MS = 25e3;
var probeError = (code, stage2, cause = null) => Object.assign(new Error(code), { code, stage: stage2, cause });
var emitStage = (onStage, stage2) => {
  onStage?.(stage2);
};
function bounded(promise, { timeoutMs, stage: stage2, onStage, onTimeout = null }) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        onTimeout?.();
        emitStage(onStage, "TIMEOUT");
        reject(probeError("CHECKPOINT_PROBE_TIMEOUT", stage2));
      }, timeoutMs);
    })
  ]).finally(() => clearTimeout(timer));
}
var presentBytes = (value) => value instanceof Uint8Array && value.byteLength > 0;
var deliveryCount = (delivery) => ["kit", "evidence"].filter((kind) => delivery?.saved?.[kind] === true).length;
function classifyCleanup({ record: record2, delivery = null } = {}) {
  const executed = record2?.retention?.state === COMPLETED_RETENTION_STATE;
  if (!executed) return "NOT EXECUTED";
  if (!delivery) return "EXECUTED";
  const count = deliveryCount(delivery);
  if (count === 2 && delivery?.acknowledged === true) return "LEGITIMATE_POST_DELIVERY_CLEANUP";
  if (count === 0 || count === 1) return "PREMATURE_DELIVERY_CLEANUP_DEFECT";
  return "EXECUTED";
}
function classifyCheckpointRecord(record2, target = CHECKPOINT_PROBE_TARGET) {
  if (!record2) return Object.freeze({ classification: "CHECKPOINT_ABSENT", checkpoint: "ABSENT", encryptedPayload: "ABSENT", operationMatch: "FAIL", snapshotMatch: "FAIL", kitReference: "UNKNOWN", evidenceReference: "UNKNOWN", deliveryState: "UNKNOWN", cleanup: "UNKNOWN", passwordRequired: false });
  const operationMatch = record2.operation_id === target.operationId && record2.operation?.operation_id === target.operationId;
  const snapshotMatch = record2.operation?.snapshot_id === target.snapshotId;
  if (!operationMatch || !snapshotMatch) return Object.freeze({ classification: "CHECKPOINT_METADATA_MISMATCH", checkpoint: "PRESENT", encryptedPayload: presentBytes(record2.encrypted_payload) ? "PRESENT" : "ABSENT", operationMatch: operationMatch ? "PASS" : "FAIL", snapshotMatch: snapshotMatch ? "PASS" : "FAIL", kitReference: "UNKNOWN", evidenceReference: "UNKNOWN", deliveryState: "UNKNOWN", cleanup: classifyCleanup({ record: record2 }), passwordRequired: false });
  if (record2.retention?.state === COMPLETED_RETENTION_STATE || !presentBytes(record2.encrypted_payload)) return Object.freeze({ classification: "CHECKPOINT_ABSENT", checkpoint: "ABSENT", encryptedPayload: "ABSENT", operationMatch: "PASS", snapshotMatch: "PASS", kitReference: "ABSENT", evidenceReference: record2.evidence ? "PRESENT" : "UNKNOWN", deliveryState: "UNKNOWN", cleanup: classifyCleanup({ record: record2 }), passwordRequired: false });
  return Object.freeze({ classification: "CHECKPOINT_PRESENT_ARTIFACT_STATE_UNKNOWN", checkpoint: "PRESENT", encryptedPayload: "PRESENT", operationMatch: "PASS", snapshotMatch: "PASS", kitReference: "UNKNOWN", evidenceReference: record2.evidence ? "PRESENT" : "UNKNOWN", deliveryState: "UNKNOWN", cleanup: "NOT EXECUTED", passwordRequired: true });
}
function inspectUnlockedPayload({ record: record2, payload, target = CHECKPOINT_PROBE_TARGET } = {}) {
  const kitPresent = presentBytes(payload?.artifacts?.kitBytes);
  const evidence = payload?.evidence;
  const evidencePresent = Boolean(evidence && typeof evidence === "object");
  const identityMatch = record2?.operation_id === target.operationId && record2?.operation?.operation_id === target.operationId && record2?.operation?.snapshot_id === target.snapshotId && evidence?.recovery_kit_identifier === target.snapshotId && evidence?.archive_sha256 === record2?.operation?.archive_sha256 && (!record2?.operation?.transaction_id || evidence?.txid === record2.operation.transaction_id);
  const count = deliveryCount(payload?.delivery);
  const deliveryState = `${count}/2`;
  let classification = "CHECKPOINT_PAYLOAD_VALID_BUT_ARTIFACTS_MISSING";
  if (kitPresent && evidencePresent && identityMatch) classification = "V2_ARTIFACTS_RECOVERABLE";
  else if (kitPresent !== evidencePresent) classification = "V2_ARTIFACTS_PARTIAL";
  return Object.freeze({ classification, kitReference: kitPresent ? "PRESENT" : "ABSENT", evidenceReference: evidencePresent ? "PRESENT" : "ABSENT", identityMatch: identityMatch ? "PASS" : "FAIL", deliveryState, acknowledged: payload?.delivery?.acknowledged === true, cleanup: classifyCleanup({ record: record2, delivery: payload?.delivery }) });
}
async function openExistingDatabase(indexedDBImpl, { onStage, stageTimeoutMs }) {
  emitStage(onStage, "OPEN_INDEXEDDB");
  if (!indexedDBImpl || typeof indexedDBImpl.databases !== "function") throw probeError("CHECKPOINT_DATABASE_ENUMERATION_UNAVAILABLE", "OPEN_INDEXEDDB");
  const databases = await bounded(Promise.resolve().then(() => indexedDBImpl.databases()), { timeoutMs: stageTimeoutMs, stage: "OPEN_INDEXEDDB", onStage });
  if (!databases.some((item) => item.name === DB_NAME)) return null;
  let abandoned = false;
  return bounded(new Promise((resolve, reject) => {
    const request = indexedDBImpl.open(DB_NAME);
    request.onblocked = () => {
      emitStage(onStage, "DATABASE_OPEN_BLOCKED");
      reject(probeError("CHROME_INDEXEDDB_BLOCKED", "DATABASE_OPEN_BLOCKED"));
    };
    request.onerror = () => {
      emitStage(onStage, "DATABASE_OPEN_ERROR");
      reject(probeError("CHECKPOINT_DATABASE_OPEN_ERROR", "DATABASE_OPEN_ERROR", request.error));
    };
    request.onupgradeneeded = () => {
      request.transaction?.abort();
      reject(probeError("CHECKPOINT_SCHEMA_ACCESS_FAILED", "OPEN_INDEXEDDB"));
    };
    request.onsuccess = () => {
      if (abandoned) {
        request.result?.close();
        return;
      }
      emitStage(onStage, "DATABASE_OPEN_SUCCESS");
      resolve(request.result);
    };
  }), { timeoutMs: stageTimeoutMs, stage: "OPEN_INDEXEDDB", onStage, onTimeout: () => {
    abandoned = true;
  } });
}
async function readAllRecords(indexedDBImpl, options) {
  const { onStage, stageTimeoutMs } = options;
  const db = await openExistingDatabase(indexedDBImpl, options);
  if (!db) return [];
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    db.close();
    throw probeError("CHECKPOINT_STORE_UNAVAILABLE", "OBJECT_STORE_ACCESS");
  }
  emitStage(onStage, "TRANSACTION_CREATE");
  let tx, request;
  try {
    tx = db.transaction(STORE_NAME, "readonly");
    emitStage(onStage, "OBJECT_STORE_ACCESS");
    emitStage(onStage, "U1_LOOKUP");
    request = tx.objectStore(STORE_NAME).getAll();
  } catch (cause) {
    db.close();
    throw probeError("CHECKPOINT_TRANSACTION_FAILED", "TRANSACTION_CREATE", cause);
  }
  return bounded(new Promise((resolve, reject) => {
    request.onsuccess = () => {
      emitStage(onStage, "CHECKPOINT_READ");
      resolve(Array.isArray(request.result) ? request.result : []);
    };
    request.onerror = () => reject(probeError("CHECKPOINT_READ_FAILED", "U1_LOOKUP", request.error));
    tx.oncomplete = () => db.close();
    tx.onabort = () => {
      db.close();
      reject(probeError("CHECKPOINT_TRANSACTION_FAILED", "TRANSACTION_CREATE", tx.error));
    };
    tx.onerror = () => {
    };
  }), { timeoutMs: stageTimeoutMs, stage: "U1_LOOKUP", onStage }).finally(() => {
    try {
      db.close();
    } catch {
    }
  });
}
async function inspectSameBrowserCheckpoint({ indexedDBImpl = globalThis.indexedDB, localStorageImpl = globalThis.localStorage, target = CHECKPOINT_PROBE_TARGET, onStage = null, stageTimeoutMs = DEFAULT_STAGE_TIMEOUT_MS, overallTimeoutMs = DEFAULT_OVERALL_TIMEOUT_MS } = {}) {
  emitStage(onStage, "PAGE_INIT");
  const run = async () => {
    const records = await readAllRecords(indexedDBImpl, { onStage, stageTimeoutMs });
    const record2 = records.find((item) => item?.operation_id === target.operationId) ?? null;
    emitStage(onStage, "LOCALSTORAGE_READ");
    let pointer = null, descriptor = null, sanitizePending = null, localStorageRead = "PASS";
    try {
      pointer = localStorageImpl?.getItem(ACTIVE_KEY) ?? null;
      descriptor = localStorageImpl?.getItem(ACTIVE_DESCRIPTOR_KEY) ?? null;
      sanitizePending = localStorageImpl?.getItem(SANITIZE_PENDING_KEY) ?? null;
    } catch (cause) {
      localStorageRead = "FAIL";
    }
    emitStage(onStage, "DELIVERY_STATE_READ");
    emitStage(onStage, "CLASSIFICATION");
    const lineage = resolveCheckpointIdentity({ records, resumePointer: pointer, authority: CHECKPOINT_LINEAGE_AUTHORITY });
    const firstStage = record2 ? Object.freeze({ ...classifyCheckpointRecord(record2, target), classification: lineage.classification, operationMatch: lineage.checks.operationMatch, snapshotMatch: lineage.checks.snapshotMatch, passwordRequired: lineage.classification === "SAFE_SAME_OPERATION_LINEAGE" }) : classifyCheckpointRecord(null, target);
    return Object.freeze({ record: record2, records, firstStage, lineage, localState: Object.freeze({ read: localStorageRead, resumePointer: pointer === target.operationId ? "MATCH" : pointer ? "STALE" : "ABSENT", descriptorPresent: Boolean(descriptor), sanitizePending: sanitizePending === target.operationId ? "YES" : sanitizePending ? "OTHER" : "NO" }) });
  };
  return bounded(run(), { timeoutMs: overallTimeoutMs, stage: "OVERALL", onStage });
}
async function unlockSameBrowserCheckpoint({ record: record2, password, target = CHECKPOINT_PROBE_TARGET, cryptoImpl = globalThis.crypto } = {}) {
  const firstStage = classifyCheckpointRecord(record2, target);
  if (!["CHECKPOINT_PRESENT", "CHECKPOINT_PRESENT_ARTIFACT_STATE_UNKNOWN"].includes(firstStage.classification)) throw Object.assign(new Error("CHECKPOINT_NOT_UNLOCKABLE"), { code: "CHECKPOINT_NOT_UNLOCKABLE" });
  try {
    const payload = await decryptResumeCheckpoint({ password, record: record2, cryptoImpl });
    return inspectUnlockedPayload({ record: record2, payload, target });
  } catch (cause) {
    throw Object.assign(new Error("CHECKPOINT_UNLOCK_FAILED"), { code: "CHECKPOINT_UNLOCK_FAILED", cause });
  }
}

// web/internal/checkpoint-probe.js
var first = document.querySelector("#first-stage");
var unlockSection = document.querySelector("#unlock-section");
var second = document.querySelector("#second-stage");
var stage = document.querySelector("#probe-stage");
var rows = (value) => Object.entries(value).map(([key, item]) => `<dt>${key}</dt><dd>${String(item)}</dd>`).join("");
var record = null;
try {
  const result = await inspectSameBrowserCheckpoint({ onStage: (value) => {
    stage.textContent = `\u6B63\u5728\u68C0\u67E5\uFF1A${value}`;
  } });
  record = result.record;
  const state = result.firstStage;
  const lineage = result.lineage;
  first.innerHTML = rows({ "Classification": state.classification, "Checkpoint Candidate Count": lineage.candidateCount, "Related Operation Count": lineage.relatedOperationCount, "Operation ID Match": lineage.checks.operationMatch, "Resume Pointer Match": lineage.checks.pointerMatch, "Internal Version Identity": lineage.internalVersionIdentity ?? "UNAVAILABLE", "Internal Version Treatment": lineage.internalVersionTreatment, "Review Mapping": lineage.checks.reviewMapping, "Source Version Mapping": lineage.checks.sourceMatch, "Resulting Version Mapping": lineage.checks.resultingMatch, "Snapshot Match": lineage.checks.snapshotMatch, "Archive Match": lineage.checks.archiveMatch, "TxID Match": lineage.checks.txMatch, "Lifecycle Continuity": lineage.checks.lifecycleContinuity, "Checkpoint Schema": lineage.checks.schemaRecognized, "Same Snapshot Fork": lineage.sameSnapshotFork ? "YES" : "NO", "Same Resulting Version Fork": lineage.sameResultingFork ? "YES" : "NO", "Competing U1/U2": lineage.competingOperation ? "YES" : "NO", "Unique Lineage": lineage.checks.noIdentityFork, "Encrypted Payload": state.encryptedPayload, "localStorage read": result.localState.read, "Password Required For Next Step": state.passwordRequired ? "YES" : "NO" });
  unlockSection.hidden = !state.passwordRequired;
  stage.textContent = "\u68C0\u67E5\u5B8C\u6210\uFF1ARENDER_RESULT";
} catch (error) {
  const classification = error?.code ?? "CHECKPOINT_PROBE_FAILED";
  const message = classification === "CHROME_INDEXEDDB_BLOCKED" ? "\u5F53\u524D\u6D4F\u89C8\u5668\u4E2D\u7684\u672C\u5730\u6570\u636E\u5E93\u6682\u65F6\u88AB\u5176\u4ED6\u9875\u9762\u5360\u7528\uFF0C\u8BF7\u4FDD\u6301\u73B0\u6709\u6570\u636E\u4E0D\u53D8\u5E76\u8054\u7CFB\u5BA2\u670D\u3002" : "\u53EA\u8BFB\u68C0\u67E5\u672A\u80FD\u5728\u9650\u5B9A\u65F6\u95F4\u5185\u5B8C\u6210\uFF0C\u672A\u4FEE\u6539\u4EFB\u4F55\u672C\u5730\u6570\u636E\u3002";
  first.innerHTML = rows({ "Classification": classification, "Exact Stage": error?.stage ?? "UNKNOWN", "IndexedDB": classification === "CHROME_INDEXEDDB_BLOCKED" ? "BLOCKED" : "UNAVAILABLE", "Message": message, "Password Required For Next Step": "NO" });
  stage.textContent = `\u68C0\u67E5\u7ED3\u675F\uFF1A${error?.stage ?? "UNKNOWN"}`;
}
document.querySelector("#unlock-checkpoint").addEventListener("click", async () => {
  const input = document.querySelector("#checkpoint-password");
  const password = input.value;
  input.value = "";
  try {
    const result = await unlockSameBrowserCheckpoint({ record, password });
    second.innerHTML = rows({ "Classification": result.classification, "Identity Match": result.identityMatch, "Kit Artifact Reference": result.kitReference, "Evidence Artifact Reference": result.evidenceReference, "Delivery State": result.deliveryState, "Acknowledged": result.acknowledged ? "YES" : "NO", "Cleanup": result.cleanup });
  } catch (error) {
    second.innerHTML = rows({ "Classification": error?.code === "CHECKPOINT_UNLOCK_FAILED" ? "CHECKPOINT_UNLOCK_FAILED" : "CHECKPOINT_METADATA_MISMATCH" });
  } finally {
    input.value = "";
  }
});
