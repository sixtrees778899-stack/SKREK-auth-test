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
  const subtle3 = cryptoImpl.subtle, material = await subtle3.importKey("raw", encoder.encode(password.normalize("NFC")), "PBKDF2", false, ["deriveKey"]), domainSalt = concat([encoder.encode(DOMAIN), new Uint8Array([0]), salt]);
  return subtle3.deriveKey({ ...PARAMETERS, salt: domainSalt }, material, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
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
  const archiveSize = record2?.evidence?.archive_size;
  const archiveSizePresent = Number.isSafeInteger(archiveSize) && archiveSize > 0;
  const archiveMatch = same(op.archive_sha256, resultingVersion.archiveSha256) && archiveSizePresent && archiveSize === Number(resultingVersion.archiveSizeBytes);
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
  return Object.freeze({ classification, candidateCount: candidates.length, relatedOperationCount: related.length, competingOperation, sameSnapshotFork, sameResultingFork, sameArchiveFork, ambiguity, checks: Object.freeze(Object.fromEntries(Object.entries(checks).map(([key, value]) => [key, pass(value)]))), archiveSizeSource: "evidence.archive_size", archiveSizePresent, archiveFailureReason: archiveMatch ? null : !archiveSizePresent ? "ARCHIVE_SIZE_MISSING" : "ARCHIVE_IDENTITY_MISMATCH", internalVersionIdentity: op.version_id ?? null, internalVersionTreatment: "INFO ONLY", candidateMetadata: Object.freeze(candidates.map(sanitizeCheckpointMetadata)) });
}

// src/domain/constants.js
var KNOWLEDGE_SCHEMA_VERSION = 1;
var RECOVERY_KIT_VERSION = 1;
var CONFIDENCE_STATUS = Object.freeze({ CRITICAL: "Critical Risk", ATTENTION: "Needs Attention", READY: "Ready for Rehearsal", VERIFIED: "Verified" });
var ENTITY_COLLECTIONS = Object.freeze(["assets", "locations", "contacts", "devices", "orders", "hints", "warnings", "attachments", "custom_categories", "custom_fields"]);

// src/shared/errors.js
var CjasError = class extends Error {
  constructor(code, message, details = []) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
};
var ValidationError = class extends CjasError {
};
var CryptoError = class extends CjasError {
};

// src/shared/encoding.js
var utf8 = { encode: (value) => new TextEncoder().encode(value), decode: (bytes) => new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
function bytesToBase64Url(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function base64UrlToBytes(value, { maxBytes = 64 * 1024 * 1024 } = {}) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]*$/.test(value)) throw new ValidationError("INVALID_BASE64URL", "Invalid base64url value");
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - value.length % 4) % 4);
  let binary;
  try {
    binary = atob(padded);
  } catch {
    throw new ValidationError("INVALID_BASE64URL", "Invalid base64url value");
  }
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  if (bytes.byteLength > maxBytes) throw new ValidationError("VALUE_TOO_LARGE", "Decoded value exceeds allowed size");
  return bytes;
}
function concatBytes(...parts) {
  const result = new Uint8Array(parts.reduce((sum, part) => sum + part.byteLength, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.byteLength;
  }
  return result;
}

// src/crypto/crypto-engine.js
var subtle = globalThis.crypto?.subtle;
if (!subtle) throw new Error("Web Crypto API is required");
function requireBytes(value, name, length) {
  if (!(value instanceof Uint8Array)) throw new ValidationError("INVALID_BYTES", `${name} must be Uint8Array`);
  if (length && value.byteLength !== length) throw new ValidationError("INVALID_LENGTH", `${name} must be ${length} bytes`);
}
var CryptoEngine = class {
  generateDataKey() {
    const key = new Uint8Array(32);
    globalThis.crypto.getRandomValues(key);
    return key;
  }
  generateNonce() {
    const nonce = new Uint8Array(12);
    globalThis.crypto.getRandomValues(nonce);
    return nonce;
  }
  async hash(bytes) {
    requireBytes(bytes, "bytes");
    return new Uint8Array(await subtle.digest("SHA-256", bytes));
  }
  async hashHex(bytes) {
    return Array.from(await this.hash(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  async encryptSnapshot(snapshotBytes2, { dataKey, nonce = this.generateNonce(), aad = utf8.encode("CJAS-VAULT-SNAPSHOT-V1") } = {}) {
    requireBytes(snapshotBytes2, "snapshotBytes");
    requireBytes(dataKey, "dataKey", 32);
    requireBytes(nonce, "nonce", 12);
    requireBytes(aad, "aad");
    const key = await subtle.importKey("raw", dataKey, "AES-GCM", false, ["encrypt"]);
    const ciphertext = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv: nonce, additionalData: aad, tagLength: 128 }, key, snapshotBytes2));
    return { algorithm: "AES-256-GCM", nonce, aad, ciphertext };
  }
  async decryptSnapshot(envelope, { dataKey, expectedAad } = {}) {
    if (!envelope || envelope.algorithm !== "AES-256-GCM") throw new ValidationError("UNSUPPORTED_CIPHER", "Unsupported snapshot cipher");
    requireBytes(dataKey, "dataKey", 32);
    requireBytes(envelope.nonce, "nonce", 12);
    requireBytes(envelope.aad, "aad");
    requireBytes(envelope.ciphertext, "ciphertext");
    if (expectedAad && !this.constantTimeEqual(envelope.aad, expectedAad)) throw new CryptoError("AAD_MISMATCH", "Snapshot context does not match");
    try {
      const key = await subtle.importKey("raw", dataKey, "AES-GCM", false, ["decrypt"]);
      return new Uint8Array(await subtle.decrypt({ name: "AES-GCM", iv: envelope.nonce, additionalData: envelope.aad, tagLength: 128 }, key, envelope.ciphertext));
    } catch {
      throw new CryptoError("DECRYPT_FAILED", "Snapshot authentication failed");
    }
  }
  constantTimeEqual(a, b) {
    if (!(a instanceof Uint8Array) || !(b instanceof Uint8Array) || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
  }
  wipeSensitiveReference(bytes) {
    if (bytes instanceof Uint8Array) bytes.fill(0);
    return { best_effort_only: true, limitation: "JavaScript runtimes may retain copies outside application control." };
  }
};
var cryptoEngine = new CryptoEngine();

// src/shared/canonical-json.js
var FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function normalize(value, seen) {
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "string") return value.normalize("NFC");
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new ValidationError("NON_FINITE_NUMBER", "Canonical JSON rejects non-finite numbers");
    return Object.is(value, -0) ? 0 : value;
  }
  if (Array.isArray(value)) return value.map((item) => normalize(item, seen));
  if (typeof value !== "object") throw new ValidationError("UNSUPPORTED_VALUE", `Canonical JSON rejects ${typeof value}`);
  if (seen.has(value)) throw new ValidationError("CYCLIC_VALUE", "Canonical JSON rejects cyclic values");
  seen.add(value);
  const result = {};
  for (const key of Object.keys(value).sort()) {
    if (FORBIDDEN_KEYS.has(key)) throw new ValidationError("FORBIDDEN_KEY", `Forbidden key: ${key}`);
    if (value[key] === void 0) throw new ValidationError("UNDEFINED_VALUE", `Undefined value at ${key}`);
    result[key.normalize("NFC")] = normalize(value[key], seen);
  }
  seen.delete(value);
  return result;
}
function canonicalize(value) {
  return JSON.stringify(normalize(value, /* @__PURE__ */ new WeakSet()));
}
function canonicalBytes(value) {
  return new TextEncoder().encode(canonicalize(value));
}

// src/recovery-kit/recovery-kit-builder.js
var MAGIC = utf8.encode("CJASKIT");
var MAX_KIT_BYTES = 1024 * 1024;
var SHA256 = /^[a-f0-9]{64}$/;
var PAYLOAD_FIELDS = /* @__PURE__ */ new Set(["kit_version", "vault_format", "snapshot_id", "kdf", "wrap_algorithm", "wrapped_dek", "ciphertext_sha256", "storage_locators", "created_at", "tool_compatibility"]);
function randomBytes(length) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}
function aadFields(payload) {
  const { wrapped_dek, ...aad } = payload;
  return aad;
}
function assertHex(value) {
  if (!SHA256.test(value ?? "")) throw new ValidationError("INVALID_CIPHERTEXT_HASH", "Ciphertext SHA-256 must be lowercase hex");
}
var RecoveryKitBuilder = class {
  async wrapDataKey(dataKey, kek, { nonce = randomBytes(12), aad }) {
    if (!(dataKey instanceof Uint8Array) || dataKey.length !== 32 || !(kek instanceof Uint8Array) || kek.length !== 32) throw new ValidationError("INVALID_KEY", "DEK and KEK must be 32 bytes");
    return cryptoEngine.encryptSnapshot(dataKey, { dataKey: kek, nonce, aad });
  }
  async unwrapDataKey(wrapped, kek, { aad }) {
    return cryptoEngine.decryptSnapshot({ algorithm: "AES-256-GCM", nonce: wrapped.nonce, aad, ciphertext: wrapped.ciphertext }, { dataKey: kek, expectedAad: aad });
  }
  async createKit({ password, dataKey, snapshotId, ciphertextSha256, storageLocators, kdfProvider: kdfProvider2, kdfParameters, createdAt, toolCompatibility = ">=0.1.0" }) {
    if (!kdfProvider2) throw new ValidationError("KDF_REQUIRED", "Explicit KDF provider is required");
    assertHex(ciphertextSha256);
    if (!Array.isArray(storageLocators) || storageLocators.length === 0) throw new ValidationError("LOCATOR_REQUIRED", "At least one storage locator is required");
    const salt = randomBytes(16), nonce = randomBytes(12);
    kdfProvider2.validateParameters(kdfParameters);
    const kek = await kdfProvider2.deriveKey(password, salt, kdfParameters);
    const publicPayload = { kit_version: RECOVERY_KIT_VERSION, vault_format: "cjas-vault-snapshot-v1", snapshot_id: snapshotId, kdf: { kdf_id: kdfProvider2.algorithm, algorithm: kdfProvider2.algorithm, parameters: kdfParameters, salt: bytesToBase64Url(salt) }, wrap_algorithm: { algorithm: "AES-256-GCM", nonce: bytesToBase64Url(nonce) }, ciphertext_sha256: ciphertextSha256, storage_locators: storageLocators, created_at: createdAt, tool_compatibility: toolCompatibility };
    const aad = canonicalBytes(publicPayload);
    const wrapped = await this.wrapDataKey(dataKey, kek, { nonce, aad });
    cryptoEngine.wipeSensitiveReference(kek);
    const payload = { ...publicPayload, wrapped_dek: bytesToBase64Url(wrapped.ciphertext) };
    return this.encode(payload);
  }
  encode(payload) {
    const body = utf8.encode(canonicalize(payload));
    if (body.length > MAX_KIT_BYTES) throw new ValidationError("KIT_TOO_LARGE", "Recovery Kit exceeds size limit");
    const header = new Uint8Array(12);
    header.set(MAGIC, 0);
    header[7] = RECOVERY_KIT_VERSION;
    new DataView(header.buffer).setUint32(8, body.length, false);
    return concatBytes(header, body);
  }
  parseKit(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length < 12 || bytes.length > MAX_KIT_BYTES) throw new ValidationError("INVALID_KIT_LENGTH", "Recovery Kit length is invalid");
    for (let i = 0; i < MAGIC.length; i++) if (bytes[i] !== MAGIC[i]) throw new ValidationError("INVALID_KIT_MAGIC", "Not a CJAS Recovery Kit");
    if (bytes[7] !== RECOVERY_KIT_VERSION) throw new ValidationError("UNSUPPORTED_KIT_VERSION", "Unsupported Recovery Kit version");
    const length = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(8, false);
    if (length !== bytes.length - 12) throw new ValidationError("INVALID_KIT_LENGTH", "Recovery Kit payload length mismatch");
    let payload;
    try {
      payload = JSON.parse(utf8.decode(bytes.slice(12)));
    } catch {
      throw new ValidationError("INVALID_KIT_ENCODING", "Recovery Kit payload is invalid");
    }
    this.validateKit(payload);
    return payload;
  }
  validateKit(payload) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new ValidationError("INVALID_KIT", "Recovery Kit payload must be an object");
    for (const key of Object.keys(payload)) if (!PAYLOAD_FIELDS.has(key)) throw new ValidationError("UNKNOWN_KIT_FIELD", `Unknown Kit field: ${key}`);
    for (const field of PAYLOAD_FIELDS) if (!(field in payload)) throw new ValidationError("MISSING_KIT_FIELD", `Missing Kit field: ${field}`);
    if (payload.kit_version !== RECOVERY_KIT_VERSION || payload.vault_format !== "cjas-vault-snapshot-v1") throw new ValidationError("UNSUPPORTED_KIT_VERSION", "Unsupported Kit or Vault format");
    if (typeof payload.snapshot_id !== "string" || payload.snapshot_id.length < 3) throw new ValidationError("INVALID_SNAPSHOT_ID", "Invalid snapshot ID");
    assertHex(payload.ciphertext_sha256);
    if (!Array.isArray(payload.storage_locators) || !payload.storage_locators.length || payload.storage_locators.some((x) => typeof x !== "string" || !x)) throw new ValidationError("INVALID_LOCATORS", "Invalid storage locators");
    if (typeof payload.kdf?.kdf_id !== "string" || payload.kdf.kdf_id !== payload.kdf.algorithm) throw new ValidationError("INVALID_KDF_ID", "Recovery Kit KDF identity is invalid");
    base64UrlToBytes(payload.kdf?.salt ?? "", { maxBytes: 64 });
    base64UrlToBytes(payload.wrap_algorithm?.nonce ?? "", { maxBytes: 32 });
    base64UrlToBytes(payload.wrapped_dek ?? "", { maxBytes: 128 });
    if (payload.wrap_algorithm?.algorithm !== "AES-256-GCM") throw new ValidationError("UNSUPPORTED_WRAP", "Unsupported DEK wrapping algorithm");
    return true;
  }
  async unwrapKit({ kitBytes, password, kdfProvider: kdfProvider2, expectedSnapshotId, expectedCiphertextSha256 }) {
    const payload = this.parseKit(kitBytes);
    if (payload.snapshot_id !== expectedSnapshotId || payload.ciphertext_sha256 !== expectedCiphertextSha256) throw new CryptoError("KIT_VERSION_MISMATCH", "Recovery Kit does not belong to this Vault Version");
    if (kdfProvider2?.algorithm !== payload.kdf.algorithm) throw new CryptoError("KDF_MISMATCH", "Required KDF provider is unavailable; downgrade is forbidden");
    kdfProvider2.validateParameters(payload.kdf.parameters);
    const salt = base64UrlToBytes(payload.kdf.salt, { maxBytes: 64 }), kek = await kdfProvider2.deriveKey(password, salt, payload.kdf.parameters);
    const aad = canonicalBytes(aadFields(payload));
    try {
      return await this.unwrapDataKey({ nonce: base64UrlToBytes(payload.wrap_algorithm.nonce, { maxBytes: 32 }), ciphertext: base64UrlToBytes(payload.wrapped_dek, { maxBytes: 128 }) }, kek, { aad });
    } catch {
      throw new CryptoError("KIT_UNLOCK_FAILED", "Recovery Password is incorrect or Kit is damaged");
    } finally {
      cryptoEngine.wipeSensitiveReference(kek);
    }
  }
};
var recoveryKitBuilder = new RecoveryKitBuilder();

// src/knowledge/schema.js
var knowledgeSchemaV1 = Object.freeze({
  schema_version: KNOWLEDGE_SCHEMA_VERSION,
  unknown_fields: "reject",
  id_pattern: "^[A-Za-z0-9][A-Za-z0-9._:-]{2,127}$",
  collections: {
    assets: ["id", "label", "category", "existence_note", "recovery_goal", "location_refs", "contact_refs", "device_refs", "order_refs", "hint_refs", "warning_refs", "attachment_refs", "custom_field_refs"],
    locations: ["id", "label", "location_type", "description", "access_prerequisites", "verification_note", "custom_field_refs"],
    contacts: ["id", "label", "role", "contact_method", "when_to_contact", "reason_to_contact", "knows", "does_not_know", "alternate_contact_ref", "critical", "custom_field_refs"],
    devices: ["id", "label", "device_type", "usual_location_ref", "identifying_features", "prerequisites", "risk_note", "asset_refs", "order_refs", "custom_field_refs"],
    orders: ["id", "label", "sequence", "action", "prerequisites", "prerequisite_order_refs", "expected_result", "failure_action", "risk_level", "asset_refs", "location_refs", "contact_refs", "device_refs", "warning_refs", "hint_refs", "attachment_refs", "custom_field_refs"],
    hints: ["id", "label", "content", "applies_to_refs", "display_timing", "misuse_risk", "custom_field_refs"],
    warnings: ["id", "label", "risk_level", "trigger", "instruction", "stop_condition", "contact_refs", "order_refs", "custom_field_refs"],
    attachments: ["id", "display_name", "media_type", "size", "sha256", "owner_refs", "purpose", "sensitive_acknowledged", "custom_field_refs"],
    custom_categories: ["id", "label", "description", "enabled"],
    custom_fields: ["id", "label", "value", "description", "owner_refs"]
  }
});

// src/knowledge/validator.js
var ID_RE = new RegExp(knowledgeSchemaV1.id_pattern);
var ROOT_FIELDS = /* @__PURE__ */ new Set(["schema_version", "vault_title", "reviewed_at", "next_review_at", "global_instructions", ...ENTITY_COLLECTIONS]);

// src/knowledge/schema-v2.js
var KNOWLEDGE_SCHEMA_VERSION_V2 = 2;
var STANDARD_MODULE_IDS = Object.freeze(["assets-accounts", "recovery-conditions", "locations-finding", "contacts-assistance", "recovery-order-exceptions", "evidence-messages"]);
var V2_COLLECTIONS = Object.freeze(["standard_modules", "custom_modules", "assets", "recovery_conditions", "fallback_paths", "locations", "contacts", "recovery_steps", "warnings", "attachments", "custom_fields"]);
var knowledgeSchemaV2 = Object.freeze({
  schema_version: KNOWLEDGE_SCHEMA_VERSION_V2,
  root_fields: ["schema_version", "vault_title", "plan_type", "reviewed_at", "standard_modules", "custom_modules", "assets", "recovery_conditions", "fallback_paths", "locations", "assistance", "contacts", "recovery_steps", "warnings", "attachments", "personal_message", "custom_fields"],
  collections: {
    standard_modules: ["id", "order"],
    custom_modules: ["id", "name", "order", "enabled", "custom_field_refs", "attachment_refs"],
    assets: ["id", "type", "label", "exists", "platform_hint", "condition_refs", "location_refs", "contact_refs", "step_refs", "attachment_refs", "custom_field_refs"],
    recovery_conditions: ["id", "type", "exists", "asset_refs", "location_refs", "fallback_path_refs", "notes", "custom_field_refs"],
    fallback_paths: ["id", "condition_ref", "scenario", "action", "contact_refs", "location_refs", "stop_condition"],
    locations: ["id", "label", "type", "finding_instructions", "access_prerequisites", "attachment_refs", "custom_field_refs"],
    contacts: ["id", "label", "role", "when_to_contact", "assistance_boundary", "alternate_contact_ref", "custom_field_refs"],
    recovery_steps: ["id", "sequence", "risk_level", "action", "completion_check", "failure_action", "stop_condition", "asset_refs", "condition_refs", "location_refs", "contact_refs", "warning_refs", "attachment_refs"],
    warnings: ["id", "risk_level", "instruction", "applies_to_refs"],
    attachments: ["id", "display_name", "media_type", "byte_length", "sha256", "module_refs", "owner_entity_refs", "purpose", "sensitive_acknowledged"],
    custom_fields: ["id", "module_ref", "label", "field_type", "value"]
  }
});

// src/review/rules-v2.js
var RULE_CATALOG_V2 = Object.freeze([
  { id: "ASSET_REQUIRED", severity: "critical", blocking: true, module_id: "assets-accounts", predicate: "at_least_one_asset" },
  { id: "ASSET_CONDITION_REQUIRED", severity: "critical", blocking: true, module_id: "recovery-conditions", predicate: "asset_has_condition" },
  { id: "ASSET_LOCATION_REQUIRED", severity: "critical", blocking: true, module_id: "locations-finding", predicate: "asset_has_location" },
  { id: "ASSET_STEP_REQUIRED", severity: "critical", blocking: true, module_id: "recovery-order-exceptions", predicate: "asset_has_step" },
  { id: "FALLBACK_REQUIRED", severity: "critical", blocking: true, module_id: "recovery-conditions", predicate: "missing_condition_has_fallback" },
  { id: "CONTACT_REQUIRED", severity: "critical", blocking: true, module_id: "contacts-assistance", predicate: "contact_when_assistance_needed" },
  { id: "ALTERNATE_CONTACT_SUGGESTED", severity: "attention", blocking: false, module_id: "contacts-assistance", predicate: "alternate_contact_suggested" },
  { id: "HIGH_RISK_FAILURE_ACTION_REQUIRED", severity: "critical", blocking: true, module_id: "recovery-order-exceptions", predicate: "high_risk_failure_action" },
  { id: "HIGH_RISK_STOP_CONDITION_REQUIRED", severity: "critical", blocking: true, module_id: "recovery-order-exceptions", predicate: "high_risk_stop_condition" },
  { id: "ATTACHMENT_MODULE_REQUIRED", severity: "critical", blocking: true, module_id: "evidence-messages", predicate: "attachment_has_module" },
  { id: "ATTACHMENT_PURPOSE_REQUIRED", severity: "critical", blocking: true, module_id: "evidence-messages", predicate: "attachment_has_purpose" }
]);

// src/crypto/kdf-provider.js
var subtle2 = globalThis.crypto?.subtle;
function requireSalt(salt) {
  if (!(salt instanceof Uint8Array) || salt.byteLength < 16 || salt.byteLength > 64) throw new ValidationError("INVALID_KDF_SALT", "KDF salt must be 16-64 bytes");
}
var KdfProvider = class {
  constructor(algorithm) {
    this.algorithm = algorithm;
  }
  capability() {
    return { algorithm: this.algorithm, available: false, reason: "Provider has no implementation" };
  }
  validateParameters(_parameters) {
    throw new Error("validateParameters must be implemented");
  }
  async deriveKey(_password, _salt, _parameters) {
    throw new Error("deriveKey must be implemented");
  }
};
var Pbkdf2Provider = class extends KdfProvider {
  constructor({ minIterations = 1e5, maxIterations = 5e6 } = {}) {
    super("PBKDF2-HMAC-SHA-256");
    this.minIterations = minIterations;
    this.maxIterations = maxIterations;
  }
  capability() {
    return { algorithm: this.algorithm, available: Boolean(subtle2), native_webcrypto: Boolean(subtle2), wasm: false };
  }
  validateParameters(parameters) {
    const iterations = parameters?.iterations;
    if (!Number.isInteger(iterations) || iterations < this.minIterations || iterations > this.maxIterations) throw new ValidationError("INVALID_KDF_PARAMETERS", `PBKDF2 iterations must be ${this.minIterations}-${this.maxIterations}`);
    if (parameters.hash !== "SHA-256") throw new ValidationError("INVALID_KDF_PARAMETERS", "PBKDF2 hash must be SHA-256");
    return true;
  }
  async deriveKey(password, salt, parameters) {
    if (typeof password !== "string" || password.length === 0) throw new ValidationError("INVALID_PASSWORD", "Recovery Password is required");
    requireSalt(salt);
    this.validateParameters(parameters);
    if (!subtle2) throw new CryptoError("KDF_UNAVAILABLE", "Web Crypto PBKDF2 is unavailable");
    const material = await subtle2.importKey("raw", utf8.encode(password.normalize("NFC")), "PBKDF2", false, ["deriveBits"]);
    return new Uint8Array(await subtle2.deriveBits({ name: "PBKDF2", salt, iterations: parameters.iterations, hash: "SHA-256" }, material, 256));
  }
};

// src/ui/vault-pipeline.js
var EXPERIENCE_KDF_PARAMETERS = Object.freeze({ iterations: 3e5, hash: "SHA-256" });
var kdfProvider = new Pbkdf2Provider();
var kitBuilder = new RecoveryKitBuilder();

// tools/ar-generic-file-mainnet-pilot/file-format-policy.js?v=final-whitelist-v2
var formats = {
  pdf: { label: "PDF", category: "DOCUMENT", extensions: [".pdf"], mimes: ["application/pdf"] },
  docx: { label: "DOCX", category: "DOCUMENT", extensions: [".docx"], mimes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] },
  txt: { label: "TXT", category: "DOCUMENT", extensions: [".txt"], mimes: ["text/plain"] },
  png: { label: "PNG", category: "IMAGE", extensions: [".png"], mimes: ["image/png"] },
  jpeg: { label: "JPG/JPEG", category: "IMAGE", extensions: [".jpg", ".jpeg"], mimes: ["image/jpeg", "image/jpg"] },
  heic: { label: "HEIC/HEIF", category: "IMAGE", extensions: [".heic", ".heif"], mimes: ["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"] },
  mp3: { label: "MP3", category: "AUDIO", extensions: [".mp3"], mimes: ["audio/mpeg", "audio/mp3"] },
  m4a: { label: "M4A", category: "AUDIO", extensions: [".m4a"], mimes: ["audio/mp4", "audio/x-m4a", "audio/m4a"] },
  wav: { label: "WAV", category: "AUDIO", extensions: [".wav"], mimes: ["audio/wav", "audio/x-wav", "audio/wave", "audio/vnd.wave"] },
  mp4: { label: "MP4", category: "VIDEO", extensions: [".mp4"], mimes: ["video/mp4"] },
  mov: { label: "MOV", category: "VIDEO", extensions: [".mov"], mimes: ["video/quicktime", "video/mov", "video/x-quicktime"] }
};
var FILE_FORMAT_POLICY = Object.freeze(Object.fromEntries(Object.entries(formats).map(([key, value]) => [key, Object.freeze({ ...value, extensions: Object.freeze(value.extensions), mimes: Object.freeze(value.mimes) })])));
var FILE_FORMAT_LABELS = Object.freeze(Object.values(FILE_FORMAT_POLICY).map((rule) => rule.label));
var FILE_INPUT_ACCEPT = Object.freeze([...new Set(Object.values(FILE_FORMAT_POLICY).flatMap((rule) => [...rule.extensions, ...rule.mimes]))]).join(",");

// tools/ar-generic-file-mainnet-pilot/generic-archive.js?v=final-whitelist-v2
var MAGIC2 = utf8.encode("CJASGEN1");
var VERSION = 1;
var HEADER_BYTES = 57;
var MAX_FILE_BYTES = 10 * 1024 * 1024;
var AAD = utf8.encode("CJAS-GENERIC-FILE-MAINNET-PILOT-V1");
var GENERIC_ARCHIVE_LIMITS = Object.freeze({ max_file_bytes: MAX_FILE_BYTES, header_bytes: HEADER_BYTES, version: VERSION });

// tools/ar-generic-file-mainnet-pilot/pilot-core.js?v=final-whitelist-v2
var KIT = new RecoveryKitBuilder();
var KDF = new Pbkdf2Provider();

// tools/ar-unified-multi-file-mainnet-pilot/pilot-core.js
var UNIFIED_LIMITS = Object.freeze({ max_total_original_bytes: 50 * 1024 * 1024, gateway_concurrency: 2 });

// src/ui/mainnet-stability.js
var MAINNET_STAGES = Object.freeze({ PREPARING: "PREPARING", LOCAL_ARTIFACTS_READY: "LOCAL_ARTIFACTS_READY", CHECKPOINT_DURABLE: "CHECKPOINT_DURABLE", WALLET_DETECTED: "WALLET_DETECTED", WALLET_CONNECTED: "WALLET_CONNECTED", QUOTE_READY: "QUOTE_READY", FEE_CONFIRMED: "FEE_CONFIRMED", SIGNING: "SIGNING", SIGNED_CHECKPOINTED: "SIGNED_CHECKPOINTED", UPLOADING: "UPLOADING", TX_ACCEPTED: "TX_ACCEPTED", EVIDENCE_READY: "EVIDENCE_READY", VERIFYING: "VERIFYING", COMPLETE: "COMPLETE", TX_RECONCILIATION: "TX_RECONCILIATION", RECOVERY: "RECOVERY", PREPARATION: "PREPARING", SNAPSHOT: "LOCAL_ARTIFACTS_READY", ARCHIVE: "LOCAL_ARTIFACTS_READY", RECOVERY_KIT: "LOCAL_ARTIFACTS_READY", WALLET_PROVIDER: "WALLET_DETECTED", WALLET_CONNECT: "WALLET_CONNECTED", QUOTE: "QUOTE_READY", BALANCE: "QUOTE_READY", SIGNATURE: "SIGNING", BROADCAST: "UPLOADING", EVIDENCE: "EVIDENCE_READY", GATEWAY: "VERIFYING", DECRYPT: "RECOVERY" });
var MAINNET_STATE_ORDER = Object.freeze(["PREPARING", "LOCAL_ARTIFACTS_READY", "CHECKPOINT_DURABLE", "WALLET_DETECTED", "WALLET_CONNECTED", "QUOTE_READY", "FEE_CONFIRMED", "SIGNING", "SIGNED_CHECKPOINTED", "UPLOADING", "TX_ACCEPTED", "EVIDENCE_READY", "VERIFYING", "COMPLETE"]);
var QUOTE_TTL_MS = 2 * 60 * 1e3;
var FEE_TOLERANCE = Object.freeze({ ratio: 0.1, absoluteAR: 1e-6 });
var walletCodes = Object.freeze({ 4001: "USER_REJECTED", 4100: "WALLET_UNAUTHORIZED", 4900: "WALLET_DISCONNECTED" });
var COMPLETED_EVIDENCE_FIELDS = Object.freeze(["status", "network", "broadcasts", "archive_filename", "archive_size", "archive_sha256", "recovery_kit_identifier", "format_version", "txid", "actual_fee_ar", "broadcasted_at", "evidence_ready_at", "first_downloadable_at", "download_gateway", "mainnet_download_size", "mainnet_download_sha256", "mainnet_hash_match", "background_verification"]);

// src/ui/mainnet-connector.js
var MAINNET_NETWORK = "Arweave Mainnet";
var MAINNET_GATEWAYS = Object.freeze(["https://arweave.net", "https://ardrive.net"]);
function validateMainnetEvidence(value) {
  if (!value || value.network !== MAINNET_NETWORK || typeof value.txid !== "string" || !/^[-_A-Za-z0-9]{43}$/.test(value.txid) || !Number.isSafeInteger(value.archive_size) || value.archive_size <= 0 || !/^[a-f0-9]{64}$/.test(value.archive_sha256) || typeof value.recovery_kit_identifier !== "string" || !value.recovery_kit_identifier) throw new Error("Mainnet Recovery Evidence\u6587\u4EF6\u4E0D\u5B8C\u6574\u6216\u65E0\u6CD5\u8BC6\u522B\u3002");
  return value;
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
var diagnosticFailure = (code, cause = null) => Object.assign(new Error(code), { code, cause });
var unlockFailureCode = (code) => ({ CHECKPOINT_CRYPTO_PREP_FAILED: "CRYPTO_PREP_FAILED", CHECKPOINT_AES_AUTH_FAILED: "AES_GCM_AUTH_FAILED", CHECKPOINT_PAYLOAD_DECODE_FAILED: "PAYLOAD_DECODE_FAILED" })[code] ?? "CHECKPOINT_UNLOCK_FAILED";
var reconstructable = (bytes, type) => {
  try {
    const blob = new Blob([bytes], { type });
    return blob.size === bytes.byteLength;
  } catch {
    return false;
  }
};
async function inspectUnlockedPayload({ record: record2, payload, target = CHECKPOINT_PROBE_TARGET, authority = CHECKPOINT_LINEAGE_AUTHORITY, hashBytes = (bytes) => cryptoEngine.hashHex(bytes) } = {}) {
  if (record2?.operation_id !== authority.operation.id || record2?.operation?.operation_id !== authority.operation.id || record2?.operation?.snapshot_id !== authority.resultingVersion.snapshotId || record2?.operation?.transaction_id !== authority.operation.transactionId) throw diagnosticFailure("BINDING_VALIDATION_FAILED");
  const archiveBytes = payload?.artifacts?.archiveBytes;
  const kitPresent = presentBytes(payload?.artifacts?.kitBytes);
  const evidence = payload?.evidence;
  const evidencePresent = Boolean(evidence && typeof evidence === "object");
  if (!presentBytes(archiveBytes)) throw diagnosticFailure("ARTIFACT_LOOKUP_FAILED");
  const archiveHash = await hashBytes(archiveBytes), archiveShaMatch = archiveHash === authority.resultingVersion.archiveSha256 && archiveHash === record2.operation.archive_sha256;
  const archiveSizeMatch = archiveBytes.byteLength === authority.resultingVersion.archiveSizeBytes && archiveBytes.byteLength === record2.evidence?.archive_size;
  if (!archiveShaMatch || !archiveSizeMatch) throw diagnosticFailure("ARTIFACT_IDENTITY_FAILED");
  const count = deliveryCount(payload?.delivery);
  const deliveryState = `${count}/2`;
  if (!kitPresent && !evidencePresent) return Object.freeze({ classification: "CHECKPOINT_PAYLOAD_VALID_BUT_ARTIFACTS_MISSING", archiveShaMatch: "PASS", archiveSizeMatch: "PASS", kitReference: "ABSENT", kitIdentityMatch: "UNAVAILABLE", kitReconstructable: "NO", evidenceReference: "ABSENT", evidenceTxidMatch: "UNAVAILABLE", evidenceArchiveMatch: "UNAVAILABLE", evidenceSnapshotMatch: "UNAVAILABLE", evidenceReconstructable: "NO", identityMatch: "UNAVAILABLE", deliveryState, acknowledged: payload?.delivery?.acknowledged === true, cleanup: classifyCleanup({ record: record2, delivery: payload?.delivery }) });
  let kitIdentityMatch = "UNAVAILABLE", kitReconstructable = "NO";
  if (kitPresent) {
    let kit;
    try {
      kit = recoveryKitBuilder.parseKit(payload.artifacts.kitBytes);
    } catch (cause) {
      throw diagnosticFailure("ARTIFACT_RECONSTRUCTION_FAILED", cause);
    }
    kitIdentityMatch = kit.snapshot_id === authority.resultingVersion.snapshotId && kit.ciphertext_sha256 === authority.resultingVersion.archiveSha256 ? "PASS" : "FAIL";
    if (kitIdentityMatch === "FAIL") throw diagnosticFailure("ARTIFACT_IDENTITY_FAILED");
    kitReconstructable = reconstructable(payload.artifacts.kitBytes, "application/octet-stream") ? "YES" : "NO";
    if (kitReconstructable === "NO") throw diagnosticFailure("ARTIFACT_RECONSTRUCTION_FAILED");
  }
  let evidenceTxidMatch = "UNAVAILABLE", evidenceArchiveMatch = "UNAVAILABLE", evidenceSnapshotMatch = "UNAVAILABLE", evidenceReconstructable = "NO";
  if (evidencePresent) {
    try {
      validateMainnetEvidence(evidence);
    } catch (cause) {
      throw diagnosticFailure("ARTIFACT_RECONSTRUCTION_FAILED", cause);
    }
    evidenceTxidMatch = evidence.txid === authority.resultingVersion.transactionId ? "PASS" : "FAIL";
    evidenceArchiveMatch = evidence.archive_sha256 === authority.resultingVersion.archiveSha256 && evidence.archive_size === authority.resultingVersion.archiveSizeBytes ? "PASS" : "FAIL";
    evidenceSnapshotMatch = evidence.recovery_kit_identifier === authority.resultingVersion.snapshotId ? "PASS" : "FAIL";
    if (evidence.status !== "READY_FOR_INDEPENDENT_RECOVERY" || evidence.background_verification !== "PASS" || [evidenceTxidMatch, evidenceArchiveMatch, evidenceSnapshotMatch].includes("FAIL")) throw diagnosticFailure("ARTIFACT_IDENTITY_FAILED");
    let bytes;
    try {
      bytes = new TextEncoder().encode(JSON.stringify(evidence, null, 2));
    } catch (cause) {
      throw diagnosticFailure("ARTIFACT_RECONSTRUCTION_FAILED", cause);
    }
    evidenceReconstructable = reconstructable(bytes, "application/json") ? "YES" : "NO";
    if (evidenceReconstructable === "NO") throw diagnosticFailure("ARTIFACT_RECONSTRUCTION_FAILED");
  }
  const classification = kitPresent && evidencePresent ? "V2_ARTIFACTS_RECOVERABLE" : "V2_ARTIFACTS_PARTIAL", identityMatch = classification === "V2_ARTIFACTS_RECOVERABLE" ? "PASS" : "PARTIAL";
  return Object.freeze({ classification, archiveShaMatch: "PASS", archiveSizeMatch: "PASS", kitReference: kitPresent ? "PRESENT" : "ABSENT", kitIdentityMatch, kitReconstructable, evidenceReference: evidencePresent ? "PRESENT" : "ABSENT", evidenceTxidMatch, evidenceArchiveMatch, evidenceSnapshotMatch, evidenceReconstructable, identityMatch, deliveryState, acknowledged: payload?.delivery?.acknowledged === true, cleanup: classifyCleanup({ record: record2, delivery: payload?.delivery }) });
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
    const lineage2 = resolveCheckpointIdentity({ records, resumePointer: pointer, authority: CHECKPOINT_LINEAGE_AUTHORITY });
    const firstStage = record2 ? Object.freeze({ ...classifyCheckpointRecord(record2, target), classification: lineage2.classification, operationMatch: lineage2.checks.operationMatch, snapshotMatch: lineage2.checks.snapshotMatch, passwordRequired: lineage2.classification === "SAFE_SAME_OPERATION_LINEAGE" }) : classifyCheckpointRecord(null, target);
    return Object.freeze({ record: record2, records, firstStage, lineage: lineage2, localState: Object.freeze({ read: localStorageRead, resumePointer: pointer === target.operationId ? "MATCH" : pointer ? "STALE" : "ABSENT", descriptorPresent: Boolean(descriptor), sanitizePending: sanitizePending === target.operationId ? "YES" : sanitizePending ? "OTHER" : "NO" }) });
  };
  return bounded(run(), { timeoutMs: overallTimeoutMs, stage: "OVERALL", onStage });
}
async function unlockSameBrowserCheckpoint({ record: record2, password, lineage: lineage2, target = CHECKPOINT_PROBE_TARGET, cryptoImpl = globalThis.crypto, hashBytes } = {}) {
  const firstStage = classifyCheckpointRecord(record2, target);
  if (lineage2?.classification !== "SAFE_SAME_OPERATION_LINEAGE" || !["CHECKPOINT_PRESENT", "CHECKPOINT_PRESENT_ARTIFACT_STATE_UNKNOWN"].includes(firstStage.classification)) throw diagnosticFailure("BINDING_VALIDATION_FAILED");
  let payload;
  try {
    payload = await decryptResumeCheckpoint({ password, record: record2, cryptoImpl });
  } catch (cause) {
    throw diagnosticFailure(unlockFailureCode(cause?.code), cause);
  }
  return inspectUnlockedPayload({ record: record2, payload, target, hashBytes });
}

// web/internal/checkpoint-probe.js
var first = document.querySelector("#first-stage");
var unlockSection = document.querySelector("#unlock-section");
var second = document.querySelector("#second-stage");
var stage = document.querySelector("#probe-stage");
var rows = (value) => Object.entries(value).map(([key, item]) => `<dt>${key}</dt><dd>${String(item)}</dd>`).join("");
var record = null;
var lineage = null;
try {
  const result = await inspectSameBrowserCheckpoint({ onStage: (value) => {
    stage.textContent = `\u6B63\u5728\u68C0\u67E5\uFF1A${value}`;
  } });
  record = result.record;
  const state = result.firstStage;
  lineage = result.lineage;
  first.innerHTML = rows({ "Classification": state.classification, "Checkpoint Candidate Count": lineage.candidateCount, "Related Operation Count": lineage.relatedOperationCount, "Operation ID Match": lineage.checks.operationMatch, "Resume Pointer Match": lineage.checks.pointerMatch, "Internal Version Identity": lineage.internalVersionIdentity ?? "UNAVAILABLE", "Internal Version Treatment": lineage.internalVersionTreatment, "Review Mapping": lineage.checks.reviewMapping, "Source Version Mapping": lineage.checks.sourceMatch, "Resulting Version Mapping": lineage.checks.resultingMatch, "Snapshot Match": lineage.checks.snapshotMatch, "Archive Match": lineage.checks.archiveMatch, "Archive Size Source": lineage.archiveSizeSource, "Canonical Archive Identity": lineage.checks.archiveMatch, "TxID Match": lineage.checks.txMatch, "Lifecycle Continuity": lineage.checks.lifecycleContinuity, "Checkpoint Schema": lineage.checks.schemaRecognized, "Same Snapshot Fork": lineage.sameSnapshotFork ? "YES" : "NO", "Same Resulting Version Fork": lineage.sameResultingFork ? "YES" : "NO", "Competing U1/U2": lineage.competingOperation ? "YES" : "NO", "Unique Lineage": lineage.checks.noIdentityFork, "Encrypted Payload": state.encryptedPayload, "localStorage read": result.localState.read, "Password Required For Next Step": state.passwordRequired ? "YES" : "NO" });
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
    const result = await unlockSameBrowserCheckpoint({ record, password, lineage });
    second.innerHTML = rows({ "Final Classification": result.classification, "Crypto Preparation": "PASS", "AES-GCM": "PASS", "Payload Decode": "PASS", "Binding Validation": "PASS", "Archive SHA Match": result.archiveShaMatch, "Archive Size Match": result.archiveSizeMatch, "Recovery Kit Present": result.kitReference, "Recovery Kit Identity Match": result.kitIdentityMatch, "Recovery Kit Reconstructable": result.kitReconstructable, "Evidence Present": result.evidenceReference, "Evidence TxID Match": result.evidenceTxidMatch, "Evidence Archive Match": result.evidenceArchiveMatch, "Evidence Snapshot/Kit Match": result.evidenceSnapshotMatch, "Evidence Reconstructable": result.evidenceReconstructable });
  } catch (error) {
    second.innerHTML = rows({ "Final Classification": error?.code ?? "BLOCKED", "Exact Reason Code": error?.code ?? "BLOCKED" });
  } finally {
    input.value = "";
  }
});
