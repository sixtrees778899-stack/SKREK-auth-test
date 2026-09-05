// src/ui/brand-contract.js
var LEGAVIK_BRAND = Object.freeze({
  name: "LEGAVIK",
  wordmark: "LEGAVIK",
  tagline: "Digital Asset Recovery & Legacy",
  category: "Digital Asset Recovery Infrastructure",
  logo: Object.freeze({
    masterV1: "../assets/legavik-brand-master-v1.png",
    alt: "LEGAVIK \u2014 Digital Asset Recovery & Legacy"
  }),
  browserTitle: "LEGAVIK \xB7 Digital Asset Recovery & Legacy",
  shortDescription: "\u4E3A\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u7559\u4E0B\u6E05\u6670\u3001\u53EF\u6062\u590D\u7684\u8DEF\u5F84\u3002"
});
var customerBrand = LEGAVIK_BRAND;

// web/v3-crypto/brand-config.js
var brand = Object.freeze({
  brand_name: customerBrand.name,
  wordmark: customerBrand.wordmark,
  tagline: customerBrand.tagline,
  category: customerBrand.category,
  logo: customerBrand.logo,
  browser_title: customerBrand.browserTitle,
  short_description: customerBrand.shortDescription,
  legal_name: "[Legal name pending]",
  support_email: "support@example.invalid"
});

// web/v3-crypto/product-content.js
var content = Object.freeze({
  pains: [
    { n: "01", title: "\u8D44\u4EA7\u5165\u53E3\u5206\u6563", body: "\u4EA4\u6613\u5E73\u53F0\u3001\u94B1\u5305\u3001\u8BBE\u5907\u548C\u6062\u590D\u4FE1\u606F\u6563\u843D\u5728\u4E0D\u540C\u4F4D\u7F6E\u3002" },
    { n: "02", title: "\u91CD\u8981\u4FE1\u606F\u53EA\u6709\u4F60\u77E5\u9053", body: "\u5982\u679C\u4F60\u65E0\u6CD5\u4EB2\u81EA\u5904\u7406\uFF0C\u6307\u5B9A\u7684\u4EBA\u53EF\u80FD\u8FDE\u4ECE\u54EA\u91CC\u5F00\u59CB\u90FD\u4E0D\u77E5\u9053\u3002" },
    { n: "03", title: "\u6062\u590D\u65B9\u5F0F\u5404\u4E0D\u76F8\u540C", body: "\u4E0D\u540C\u5E73\u53F0\u3001\u94B1\u5305\u4E0E\u8D44\u4EA7\uFF0C\u9700\u8981\u4E0D\u540C\u7684\u6062\u590D\u6761\u4EF6\u548C\u6B65\u9AA4\u3002" }
  ],
  how: [
    { n: "01", title: "\u6574\u7406", body: "\u8BB0\u5F55\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u53CA\u5176\u6062\u590D\u4F4D\u7F6E\u3002" },
    { n: "02", title: "\u4FDD\u62A4", body: "\u5C06\u771F\u6B63\u9700\u8981\u4FDD\u5B58\u7684\u8D44\u6599\u5728\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6\uFF0C\u521B\u5EFA\u5B89\u5168\u6062\u590D\u7248\u672C\u3002" },
    { n: "03", title: "\u6062\u590D", body: "\u9700\u8981\u65F6\uFF0C\u4F7F\u7528\u4F60\u4FDD\u5B58\u7684\u6062\u590D\u6750\u6599\u72EC\u7ACB\u6062\u590D\u3002" }
  ],
  explore: [
    { id: "digital-assets", title: "Digital Assets", zh: "\u6570\u5B57\u8D44\u4EA7", body: "\u4ECE\u4EA4\u6613\u5E73\u53F0\u3001\u94B1\u5305\u5230DeFi\uFF0C\u5EFA\u7ACB\u6E05\u6670\u7684\u8D44\u4EA7\u6062\u590D\u5730\u56FE\u3002" },
    { id: "security", title: "Security & Privacy", zh: "\u5B89\u5168\u4E0E\u9690\u79C1", body: "\u654F\u611F\u8D44\u6599\u5728\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6\uFF0C\u5E73\u53F0\u4E0D\u8BFB\u53D6\u6062\u590D\u5BC6\u7801\u3002" },
    { id: "recovery", title: "Recovery & Succession", zh: "\u6062\u590D\u4E0E\u5EF6\u7EED", body: "\u8BA9\u672A\u6765\u7684\u4F60\u6216\u6307\u5B9A\u8054\u7CFB\u4EBA\u77E5\u9053\u4ECE\u54EA\u91CC\u5F00\u59CB\u3002" }
  ],
  faq: [
    { q: "LEGAVIK\u662F\u4E91\u76D8\u6216\u5BC6\u7801\u7BA1\u7406\u5668\u5417\uFF1F", a: "\u4E0D\u662F\u3002LEGAVIK\u5E2E\u52A9\u4F60\u5EFA\u7ACB\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8DEF\u5F84\uFF0C\u5E76\u4FDD\u62A4\u6062\u590D\u6240\u9700\u8D44\u6599\u3002\u8BF7\u52FF\u8BB0\u5F55\u79C1\u94A5\u3001\u52A9\u8BB0\u8BCD\u3001OTP\u6216\u5B8C\u6574\u5BC6\u7801\u3002" },
    { q: "LEGAVIK\u80FD\u770B\u5230\u6211\u7684\u6062\u590D\u5BC6\u7801\u5417\uFF1F", a: "\u4E0D\u80FD\u3002\u6062\u590D\u5BC6\u7801\u53EA\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u7528\u4E8E\u672C\u5730\u52A0\u5BC6\uFF0CLEGAVIK\u65E0\u6CD5\u627E\u56DE\u3002" },
    { q: "\u6211\u53EF\u4EE5\u72EC\u7ACB\u6062\u590D\u5417\uFF1F", a: "\u53EF\u4EE5\u3002\u4F7F\u7528\u540C\u4E00\u6B21\u521B\u5EFA\u7684Recovery Kit\u3001Mainnet Recovery Evidence\u4E0ERecovery Password\uFF0C\u53EF\u901A\u8FC7\u72EC\u7ACB\u6062\u590D\u5165\u53E3\u6062\u590D\u3002" }
  ],
  cryptoCategories: [
    { id: "cex", zh: "\u4E2D\u5FC3\u5316\u4EA4\u6613\u5E73\u53F0", en: "Centralized Exchanges", brands: ["Binance", "OKX", "Coinbase"] },
    { id: "hot-wallet", zh: "\u70ED\u94B1\u5305", en: "Hot Wallets", brands: ["MetaMask", "Trust Wallet", "Phantom", "Rabby"] },
    { id: "hardware", zh: "\u51B7\u94B1\u5305\u4E0E\u786C\u4EF6\u94B1\u5305", en: "Cold & Hardware Wallets", brands: ["Ledger", "Trezor", "Coldcard", "Keystone"] },
    { id: "defi", zh: "DeFi / \u53BB\u4E2D\u5FC3\u5316\u534F\u8BAE", en: "DeFi & Decentralized Protocols", brands: ["Uniswap", "Aave", "Lido"] },
    { id: "multisig", zh: "\u591A\u7B7E\u4E0E\u667A\u80FD\u8D26\u6237", en: "Multisig & Smart Accounts", brands: ["Safe"] },
    { id: "custom", zh: "\u5176\u4ED6 / \u81EA\u5B9A\u4E49", en: "Other / Custom", brands: ["NFT / Digital Collectibles", "Staking / Earn"] }
  ]
});

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

// src/domain/constants.js
var KNOWLEDGE_SCHEMA_VERSION = 1;
var SNAPSHOT_SCHEMA_VERSION = 1;
var RECOVERY_KIT_VERSION = 1;
var CONFIDENCE_STATUS = Object.freeze({ CRITICAL: "Critical Risk", ATTENTION: "Needs Attention", READY: "Ready for Rehearsal", VERIFIED: "Verified" });
var ENTITY_COLLECTIONS = Object.freeze(["assets", "locations", "contacts", "devices", "orders", "hints", "warnings", "attachments", "custom_categories", "custom_fields"]);

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

// src/shared/mime-type.js
var MIME_TYPE_RE = /^[a-z0-9][a-z0-9!#$&^_.+-]{0,126}\/[a-z0-9][a-z0-9!#$&^_.+-]{0,126}$/i;
function normalizeMimeType(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  if (!MIME_TYPE_RE.test(normalized)) throw new ValidationError("INVALID_MIME_TYPE", "Attachment MIME type is invalid");
  return normalized;
}

// src/knowledge/validator.js
var ID_RE = new RegExp(knowledgeSchemaV1.id_pattern);
var SHA256_RE = /^[a-f0-9]{64}$/;
var ROOT_FIELDS = /* @__PURE__ */ new Set(["schema_version", "vault_title", "reviewed_at", "next_review_at", "global_instructions", ...ENTITY_COLLECTIONS]);
var REQUIRED = {
  assets: ["id", "label", "category", "recovery_goal"],
  locations: ["id", "label", "location_type", "description"],
  contacts: ["id", "label", "role"],
  devices: ["id", "label", "device_type"],
  orders: ["id", "label", "sequence", "action", "prerequisites", "expected_result", "failure_action", "risk_level"],
  hints: ["id", "label", "content"],
  warnings: ["id", "label", "risk_level", "instruction"],
  attachments: ["id", "display_name", "media_type", "size", "sha256", "owner_refs", "purpose", "sensitive_acknowledged"],
  custom_categories: ["id", "label", "enabled"],
  custom_fields: ["id", "label", "value", "owner_refs"]
};
var REF_FIELDS = { location_refs: "locations", contact_refs: "contacts", device_refs: "devices", order_refs: "orders", hint_refs: "hints", warning_refs: "warnings", attachment_refs: "attachments", custom_field_refs: "custom_fields", asset_refs: "assets", owner_refs: "*", applies_to_refs: "*", prerequisite_order_refs: "orders", usual_location_ref: "locations", alternate_contact_ref: "contacts" };
var issue = (errors, path, code, message) => errors.push({ path, code, message });
var isText = (value) => typeof value === "string" && value.trim().length > 0 && value.length <= 1e4;
function validateKnowledgeMap(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, errors: [{ path: "$", code: "TYPE", message: "Knowledge map must be an object" }] };
  for (const key of Object.keys(input)) if (!ROOT_FIELDS.has(key)) issue(errors, `$.${key}`, "UNKNOWN_FIELD", "Unknown root field");
  if (input.schema_version !== KNOWLEDGE_SCHEMA_VERSION) issue(errors, "$.schema_version", "UNSUPPORTED_VERSION", "Knowledge schema version must be 1");
  if (!isText(input.vault_title)) issue(errors, "$.vault_title", "REQUIRED", "Vault title is required");
  if (!isText(input.reviewed_at)) issue(errors, "$.reviewed_at", "REQUIRED", "Reviewed date is required");
  const ids = /* @__PURE__ */ new Map();
  for (const collection of ENTITY_COLLECTIONS) {
    if (!Array.isArray(input[collection])) {
      issue(errors, `$.${collection}`, "TYPE", `${collection} must be an array`);
      continue;
    }
    if (input[collection].length > 1e4) issue(errors, `$.${collection}`, "LIMIT", "Collection is too large");
    input[collection].forEach((entity, index) => {
      const path = `$.${collection}[${index}]`;
      if (!entity || typeof entity !== "object" || Array.isArray(entity)) {
        issue(errors, path, "TYPE", "Entity must be an object");
        return;
      }
      const allowed = new Set(knowledgeSchemaV1.collections[collection]);
      for (const key of Object.keys(entity)) if (!allowed.has(key)) issue(errors, `${path}.${key}`, "UNKNOWN_FIELD", "Unknown entity field");
      for (const field of REQUIRED[collection]) if (!(field in entity) || entity[field] === "" || entity[field] === null) issue(errors, `${path}.${field}`, "REQUIRED", "Required field is missing");
      if (!ID_RE.test(entity.id ?? "")) issue(errors, `${path}.id`, "INVALID_ID", "Invalid entity ID");
      else if (ids.has(entity.id)) issue(errors, `${path}.id`, "DUPLICATE_ID", `Duplicate ID also used at ${ids.get(entity.id).path}`);
      else ids.set(entity.id, { collection, path });
      for (const [key, value] of Object.entries(entity)) if (key.endsWith("_refs") || key === "owner_refs" || key === "applies_to_refs" || key === "prerequisites") {
        if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) issue(errors, `${path}.${key}`, "TYPE", `${key} must be a string array`);
      }
      if (collection === "orders") {
        if (!Number.isInteger(entity.sequence) || entity.sequence < 1) issue(errors, `${path}.sequence`, "RANGE", "Order sequence must be positive");
        if (!["low", "medium", "high", "critical"].includes(entity.risk_level)) issue(errors, `${path}.risk_level`, "ENUM", "Invalid risk level");
      }
      if (collection === "attachments") {
        if (!Number.isSafeInteger(entity.size) || entity.size < 0 || entity.size > 1024 ** 3) issue(errors, `${path}.size`, "RANGE", "Attachment size is invalid");
        if (!SHA256_RE.test(entity.sha256 ?? "")) issue(errors, `${path}.sha256`, "FORMAT", "Attachment SHA-256 must be lowercase hex");
        try {
          if (normalizeMimeType(entity.media_type) !== entity.media_type) issue(errors, `${path}.media_type`, "FORMAT", "Attachment MIME type must be normalized");
        } catch {
          issue(errors, `${path}.media_type`, "FORMAT", "Attachment MIME type is invalid");
        }
        if (typeof entity.sensitive_acknowledged !== "boolean") issue(errors, `${path}.sensitive_acknowledged`, "TYPE", "Sensitive acknowledgement must be boolean");
      }
    });
  }
  for (const collection of ENTITY_COLLECTIONS) for (const [index, entity] of (Array.isArray(input[collection]) ? input[collection] : []).entries()) {
    if (!entity || typeof entity !== "object") continue;
    for (const [field, expected] of Object.entries(REF_FIELDS)) {
      if (!(field in entity)) continue;
      const values = field.endsWith("_ref") ? [entity[field]] : entity[field];
      if (!Array.isArray(values)) continue;
      for (const ref of values) {
        if (!ref) continue;
        const target = ids.get(ref);
        if (!target) issue(errors, `$.${collection}[${index}].${field}`, "MISSING_REFERENCE", `Reference does not exist: ${ref}`);
        else if (expected !== "*" && target.collection !== expected) issue(errors, `$.${collection}[${index}].${field}`, "WRONG_REFERENCE_TYPE", `Expected ${expected}, got ${target.collection}`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

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

// src/knowledge/validator-v2.js
var ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,127}$/;
var SHA = /^[a-f0-9]{64}$/;
var RISK = /* @__PURE__ */ new Set(["low", "medium", "high", "critical"]);
var REQUIRED2 = { standard_modules: ["id", "order"], custom_modules: ["id", "name", "order", "enabled"], assets: ["id", "type", "label", "exists"], recovery_conditions: ["id", "type", "exists", "asset_refs"], fallback_paths: ["id", "condition_ref", "scenario", "action"], locations: ["id", "label", "type", "finding_instructions"], contacts: ["id", "label", "role", "when_to_contact", "assistance_boundary"], recovery_steps: ["id", "sequence", "risk_level", "action", "completion_check"], warnings: ["id", "risk_level", "instruction"], attachments: ["id", "display_name", "media_type", "byte_length", "sha256", "module_refs", "owner_entity_refs", "purpose", "sensitive_acknowledged"], custom_fields: ["id", "module_ref", "label", "field_type", "value"] };
var REF_TARGETS = { condition_refs: "recovery_conditions", location_refs: "locations", contact_refs: "contacts", step_refs: "recovery_steps", attachment_refs: "attachments", custom_field_refs: "custom_fields", asset_refs: "assets", fallback_path_refs: "fallback_paths", warning_refs: "warnings", alternate_contact_ref: "contacts", condition_ref: "recovery_conditions" };
var issue2 = (issues, path, code, message, module_id = null, field_id = null) => issues.push({ path, code, message, module_id, field_id, blocking: true });
var text = (value) => typeof value === "string" && value.trim().length > 0 && [...value].length <= 1e4;
var refs = (value) => Array.isArray(value) && value.every((item) => typeof item === "string");
var list = (value) => Array.isArray(value) ? value : [];
function validateKnowledgeMapV2(input) {
  const issues = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) return { valid: false, issues: [{ path: "$", code: "TYPE", message: "Knowledge Map\u5FC5\u987B\u662F\u5BF9\u8C61", blocking: true }] };
  const allowedRoot = new Set(knowledgeSchemaV2.root_fields);
  for (const key of Object.keys(input)) if (!allowedRoot.has(key)) issue2(issues, `$.${key}`, "UNKNOWN_FIELD", "\u5B58\u5728\u672A\u77E5\u6839\u5B57\u6BB5");
  if (input.schema_version !== 2) issue2(issues, "$.schema_version", "UNSUPPORTED_VERSION", "Knowledge Schema\u7248\u672C\u5FC5\u987B\u4E3A2");
  if (!text(input.vault_title)) issue2(issues, "$.vault_title", "REQUIRED", "\u6062\u590D\u8BA1\u5212\u540D\u79F0\u4E3A\u5FC5\u586B\u9879");
  if (!text(input.plan_type)) issue2(issues, "$.plan_type", "REQUIRED", "\u6062\u590D\u8BA1\u5212\u7C7B\u578B\u4E3A\u5FC5\u586B\u9879");
  if (!Number.isFinite(Date.parse(input.reviewed_at))) issue2(issues, "$.reviewed_at", "FORMAT", "\u590D\u6838\u65E5\u671F\u683C\u5F0F\u4E0D\u6B63\u786E");
  const ids = /* @__PURE__ */ new Map();
  for (const collection of V2_COLLECTIONS) {
    const values = input[collection];
    if (!Array.isArray(values)) {
      issue2(issues, `$.${collection}`, "TYPE", `${collection}\u5FC5\u987B\u662F\u6570\u7EC4`);
      continue;
    }
    if (values.length > 1e4) issue2(issues, `$.${collection}`, "LIMIT", `${collection}\u6570\u91CF\u8D85\u9650`);
    values.forEach((entity, index) => {
      const path = `$.${collection}[${index}]`, moduleId = collection === "standard_modules" || collection === "custom_modules" ? entity?.id : null;
      if (!entity || typeof entity !== "object" || Array.isArray(entity)) {
        issue2(issues, path, "TYPE", "\u6761\u76EE\u5FC5\u987B\u662F\u5BF9\u8C61", moduleId);
        return;
      }
      const allowed = new Set(knowledgeSchemaV2.collections[collection]);
      for (const key of Object.keys(entity)) if (!allowed.has(key)) issue2(issues, `${path}.${key}`, "UNKNOWN_FIELD", "\u6761\u76EE\u5305\u542B\u672A\u77E5\u5B57\u6BB5", moduleId, key);
      for (const field of REQUIRED2[collection]) if (!(field in entity) || entity[field] === null || entity[field] === "") issue2(issues, `${path}.${field}`, "REQUIRED", "\u5FC5\u586B\u5B57\u6BB5\u7F3A\u5931", moduleId, field);
      if (!ID.test(entity.id ?? "")) issue2(issues, `${path}.id`, "INVALID_ID", "\u6761\u76EE\u6807\u8BC6\u683C\u5F0F\u4E0D\u6B63\u786E", moduleId, "id");
      else if (ids.has(entity.id)) issue2(issues, `${path}.id`, "DUPLICATE_ID", "\u6761\u76EE\u6807\u8BC6\u91CD\u590D", moduleId, "id");
      else ids.set(entity.id, { collection, path });
      for (const [key, value] of Object.entries(entity)) if (key.endsWith("_refs") || ["asset_refs", "owner_entity_refs", "module_refs", "applies_to_refs"].includes(key)) {
        if (!refs(value)) issue2(issues, `${path}.${key}`, "TYPE", "\u5F15\u7528\u5B57\u6BB5\u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4", moduleId, key);
      }
    });
  }
  const standard = list(input.standard_modules), customModules = list(input.custom_modules), standardIds = standard.map((item) => item?.id);
  for (const id of STANDARD_MODULE_IDS) if (!standardIds.includes(id)) issue2(issues, "$.standard_modules", "STANDARD_MODULE_MISSING", `\u7F3A\u5C11\u6807\u51C6\u6A21\u5757\uFF1A${id}`, id);
  if (new Set(standardIds).size !== standardIds.length) issue2(issues, "$.standard_modules", "DUPLICATE_MODULE", "\u6807\u51C6\u6A21\u5757\u4E0D\u5F97\u91CD\u590D");
  for (const item of standard) if (!STANDARD_MODULE_IDS.includes(item?.id)) issue2(issues, "$.standard_modules", "STANDARD_MODULE_INVALID", "\u6807\u51C6\u6A21\u5757\u96C6\u5408\u5305\u542B\u975E\u6807\u51C6ID", item?.id);
  for (const module of standard) if (!Number.isInteger(module?.order)) issue2(issues, "$.standard_modules.order", "TYPE", "\u6807\u51C6\u6A21\u5757\u987A\u5E8F\u5FC5\u987B\u662F\u6574\u6570", module?.id, "order");
  for (const custom of customModules) {
    if (STANDARD_MODULE_IDS.includes(custom?.id)) issue2(issues, "$.custom_modules", "STANDARD_MODULE_OVERRIDE", "\u81EA\u5B9A\u4E49\u6A21\u5757\u4E0D\u5F97\u66FF\u6362\u6807\u51C6\u6A21\u5757", custom?.id);
    if (!text(custom?.name)) issue2(issues, "$.custom_modules.name", "TYPE", "\u81EA\u5B9A\u4E49\u6A21\u5757\u540D\u79F0\u5FC5\u987B\u662F\u6587\u5B57", custom?.id, "name");
    if (!Number.isInteger(custom?.order)) issue2(issues, "$.custom_modules.order", "TYPE", "\u81EA\u5B9A\u4E49\u6A21\u5757\u987A\u5E8F\u5FC5\u987B\u662F\u6574\u6570", custom?.id, "order");
    if (typeof custom?.enabled !== "boolean") issue2(issues, "$.custom_modules", "TYPE", "\u81EA\u5B9A\u4E49\u6A21\u5757enabled\u5FC5\u987B\u662F\u5E03\u5C14\u503C", custom?.id, "enabled");
  }
  const allModuleIds = /* @__PURE__ */ new Set([...STANDARD_MODULE_IDS, ...customModules.map((item) => item?.id)]);
  for (const collection of V2_COLLECTIONS) for (const [index, entity] of (Array.isArray(input[collection]) ? input[collection] : []).entries()) {
    if (!entity || typeof entity !== "object") continue;
    const path = `$.${collection}[${index}]`;
    for (const [field, targetCollection] of Object.entries(REF_TARGETS)) {
      if (!(field in entity)) continue;
      const values = field.endsWith("_ref") ? [entity[field]] : entity[field];
      if (!Array.isArray(values)) continue;
      for (const ref of values) {
        if (!ref) continue;
        const target = ids.get(ref);
        if (!target) issue2(issues, `${path}.${field}`, "MISSING_REFERENCE", `\u5F15\u7528\u4E0D\u5B58\u5728\uFF1A${ref}`, null, field);
        else if (target.collection !== targetCollection) issue2(issues, `${path}.${field}`, "WRONG_REFERENCE_TYPE", `\u5F15\u7528\u7C7B\u578B\u5E94\u4E3A${targetCollection}`, null, field);
      }
    }
    for (const ref of entity.module_refs ?? []) if (!allModuleIds.has(ref)) issue2(issues, `${path}.module_refs`, "MISSING_REFERENCE", `\u6A21\u5757\u5F15\u7528\u4E0D\u5B58\u5728\uFF1A${ref}`, ref, "module_refs");
    for (const ref of entity.owner_entity_refs ?? []) if (!ids.has(ref)) issue2(issues, `${path}.owner_entity_refs`, "MISSING_REFERENCE", `\u5B9E\u4F53\u5F15\u7528\u4E0D\u5B58\u5728\uFF1A${ref}`, null, "owner_entity_refs");
    for (const ref of entity.applies_to_refs ?? []) if (!ids.has(ref)) issue2(issues, `${path}.applies_to_refs`, "MISSING_REFERENCE", `\u5B9E\u4F53\u5F15\u7528\u4E0D\u5B58\u5728\uFF1A${ref}`, null, "applies_to_refs");
    if ("module_ref" in entity && !allModuleIds.has(entity.module_ref)) issue2(issues, `${path}.module_ref`, "MISSING_REFERENCE", `\u6A21\u5757\u5F15\u7528\u4E0D\u5B58\u5728\uFF1A${entity.module_ref}`, entity.module_ref, "module_ref");
  }
  if (!input.assistance || typeof input.assistance !== "object" || Array.isArray(input.assistance) || typeof input.assistance.needed !== "boolean") issue2(issues, "$.assistance", "TYPE", "\u5FC5\u987B\u660E\u786E\u662F\u5426\u9700\u8981\u534F\u52A9", "contacts-assistance", "needed");
  if (input.personal_message !== null && input.personal_message !== void 0) {
    const value = input.personal_message;
    if (!value || typeof value !== "object" || Array.isArray(value)) issue2(issues, "$.personal_message", "TYPE", "\u4E2A\u4EBA\u7559\u8A00\u5FC5\u987B\u662F\u5BF9\u8C61\u6216null", "evidence-messages");
    else {
      for (const key of Object.keys(value)) if (!["text", "attachment_refs", "disclaimer_acknowledged"].includes(key)) issue2(issues, `$.personal_message.${key}`, "UNKNOWN_FIELD", "\u4E2A\u4EBA\u7559\u8A00\u5305\u542B\u672A\u77E5\u5B57\u6BB5", "evidence-messages", key);
      if ("text" in value && typeof value.text !== "string") issue2(issues, "$.personal_message.text", "TYPE", "\u4E2A\u4EBA\u7559\u8A00\u6587\u5B57\u683C\u5F0F\u4E0D\u6B63\u786E", "evidence-messages", "text");
      if (!refs(value.attachment_refs ?? [])) issue2(issues, "$.personal_message.attachment_refs", "TYPE", "\u4E2A\u4EBA\u7559\u8A00\u9644\u4EF6\u5F15\u7528\u5FC5\u987B\u662F\u6570\u7EC4", "evidence-messages", "attachment_refs");
      else for (const ref of value.attachment_refs ?? []) if (ids.get(ref)?.collection !== "attachments") issue2(issues, "$.personal_message.attachment_refs", "MISSING_REFERENCE", `\u4E2A\u4EBA\u7559\u8A00\u9644\u4EF6\u4E0D\u5B58\u5728\uFF1A${ref}`, "evidence-messages", "attachment_refs");
      if ("disclaimer_acknowledged" in value && typeof value.disclaimer_acknowledged !== "boolean") issue2(issues, "$.personal_message.disclaimer_acknowledged", "TYPE", "\u514D\u8D23\u58F0\u660E\u786E\u8BA4\u5FC5\u987B\u662F\u5E03\u5C14\u503C", "evidence-messages", "disclaimer_acknowledged");
    }
  }
  for (const asset of list(input.assets)) if (typeof asset?.exists !== "boolean") issue2(issues, "$.assets.exists", "TYPE", "\u8D44\u4EA7\u5B58\u5728\u6027\u5FC5\u987B\u662F\u5E03\u5C14\u503C", "assets-accounts", "exists");
  for (const condition of list(input.recovery_conditions)) if (typeof condition?.exists !== "boolean") issue2(issues, "$.recovery_conditions.exists", "TYPE", "\u6062\u590D\u6761\u4EF6\u5B58\u5728\u6027\u5FC5\u987B\u662F\u5E03\u5C14\u503C", "recovery-conditions", "exists");
  for (const step of list(input.recovery_steps)) {
    if (!Number.isInteger(step?.sequence) || step.sequence < 1) issue2(issues, "$.recovery_steps.sequence", "RANGE", "\u6B65\u9AA4\u987A\u5E8F\u5FC5\u987B\u4E3A\u6B63\u6574\u6570", "recovery-order-exceptions", "sequence");
    if (!RISK.has(step?.risk_level)) issue2(issues, "$.recovery_steps.risk_level", "ENUM", "\u98CE\u9669\u7B49\u7EA7\u4E0D\u6B63\u786E", "recovery-order-exceptions", "risk_level");
  }
  for (const attachment of list(input.attachments)) {
    if (!Number.isSafeInteger(attachment?.byte_length) || attachment.byte_length < 0 || attachment.byte_length > 1024 ** 3) issue2(issues, "$.attachments.byte_length", "RANGE", "\u9644\u4EF6\u957F\u5EA6\u4E0D\u6B63\u786E", "evidence-messages", "byte_length");
    if (!SHA.test(attachment?.sha256 ?? "")) issue2(issues, "$.attachments.sha256", "FORMAT", "\u9644\u4EF6SHA-256\u4E0D\u6B63\u786E", "evidence-messages", "sha256");
    if (typeof attachment?.sensitive_acknowledged !== "boolean") issue2(issues, "$.attachments.sensitive_acknowledged", "TYPE", "\u9644\u4EF6\u654F\u611F\u4FE1\u606F\u786E\u8BA4\u5FC5\u987B\u662F\u5E03\u5C14\u503C", "evidence-messages", "sensitive_acknowledged");
    try {
      if (normalizeMimeType(attachment.media_type) !== attachment.media_type) issue2(issues, "$.attachments.media_type", "FORMAT", "\u9644\u4EF6MIME\u4E0D\u89C4\u8303", "evidence-messages", "media_type");
    } catch {
      issue2(issues, "$.attachments.media_type", "FORMAT", "\u9644\u4EF6MIME\u4E0D\u6B63\u786E", "evidence-messages", "media_type");
    }
  }
  return { valid: issues.length === 0, issues };
}

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
var text2 = (value) => typeof value === "string" && value.trim().length > 0;
var list2 = (value) => Array.isArray(value) ? value : [];
var make = (rule, { entity_id = null, field_id = null, entry_index = null } = {}) => ({ ...rule, entity_id, field_id, entry_index, message_key: rule.id });
var PREDICATES = {
  at_least_one_asset: (map, rule) => list2(map.assets).length ? [] : [make(rule, { field_id: "assets" })],
  asset_has_condition: (map, rule) => list2(map.assets).flatMap((item, index) => list2(item.condition_refs).length ? [] : [make(rule, { entity_id: item.id, field_id: "condition_refs", entry_index: index })]),
  asset_has_location: (map, rule) => list2(map.assets).flatMap((item, index) => list2(item.location_refs).length ? [] : [make(rule, { entity_id: item.id, field_id: "location_refs", entry_index: index })]),
  asset_has_step: (map, rule) => list2(map.assets).flatMap((item, index) => list2(item.step_refs).length ? [] : [make(rule, { entity_id: item.id, field_id: "step_refs", entry_index: index })]),
  missing_condition_has_fallback: (map, rule) => list2(map.recovery_conditions).flatMap((item, index) => item.exists === false && !list2(item.fallback_path_refs).length ? [make(rule, { entity_id: item.id, field_id: "fallback_path_refs", entry_index: index })] : []),
  contact_when_assistance_needed: (map, rule) => {
    const hasContact = list2(map.contacts).length > 0;
    const hasAssistantAttachment = list2(map.attachments).some((item) => list2(item.module_refs).includes("contacts-assistance"));
    return map.assistance?.needed === true && !hasContact && !hasAssistantAttachment ? [make(rule, { field_id: "contacts" })] : [];
  },
  alternate_contact_suggested: (map, rule) => map.assistance?.needed === true && list2(map.contacts).length && !list2(map.contacts).some((item) => text2(item.alternate_contact_ref)) ? [make(rule, { field_id: "alternate_contact_ref" })] : [],
  high_risk_failure_action: (map, rule) => list2(map.recovery_steps).flatMap((item, index) => ["high", "critical"].includes(item.risk_level) && !text2(item.failure_action) ? [make(rule, { entity_id: item.id, field_id: "failure_action", entry_index: index })] : []),
  high_risk_stop_condition: (map, rule) => list2(map.recovery_steps).flatMap((item, index) => ["high", "critical"].includes(item.risk_level) && !text2(item.stop_condition) ? [make(rule, { entity_id: item.id, field_id: "stop_condition", entry_index: index })] : []),
  attachment_has_module: (map, rule) => list2(map.attachments).flatMap((item, index) => list2(item.module_refs).length ? [] : [make(rule, { entity_id: item.id, field_id: "module_refs", entry_index: index })]),
  attachment_has_purpose: (map, rule) => list2(map.attachments).flatMap((item, index) => text2(item.purpose) ? [] : [make(rule, { entity_id: item.id, field_id: "purpose", entry_index: index })])
};
function evaluateKnowledgeRulesV2(map, { rehearsalCompleted = false } = {}) {
  const structural = validateKnowledgeMapV2(map).issues.map((item) => ({ ...item, severity: "critical", blocking: true, message_key: item.code }));
  const product = structural.length ? [] : RULE_CATALOG_V2.flatMap((rule) => PREDICATES[rule.predicate](map, rule));
  const issues = [...structural, ...product], blocking = issues.filter((item) => item.blocking), attention = issues.filter((item) => !item.blocking);
  return { schema_version: 2, valid: blocking.length === 0, blocking, attention, issues, rehearsal_completed: rehearsalCompleted, standard_module_ids: STANDARD_MODULE_IDS };
}

// src/knowledge/dispatcher.js
function validateKnowledgeMapByVersion(input, options = {}) {
  if (input?.schema_version === 1) return { ...validateKnowledgeMap(input), schema_version: 1 };
  if (input?.schema_version === 2) {
    const result = evaluateKnowledgeRulesV2(input, options);
    return { valid: result.valid, errors: result.blocking, issues: result.issues, schema_version: 2 };
  }
  return { valid: false, errors: [{ path: "$.schema_version", code: "UNSUPPORTED_VERSION", message: "Unsupported Knowledge Schema version", blocking: true }], schema_version: input?.schema_version ?? null };
}
function assertValidKnowledgeMapByVersion(input, options = {}) {
  const result = validateKnowledgeMapByVersion(input, options);
  if (!result.valid) throw new ValidationError("INVALID_KNOWLEDGE_MAP", "Recovery Knowledge Map validation failed", result.errors);
  return input;
}

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

// src/snapshot/snapshot-builder.js
var ID_RE2 = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,127}$/;
var attachmentLength = (item, knowledgeVersion) => knowledgeVersion === 2 ? item.byte_length : item.size;
async function buildSnapshot({ snapshotId, vaultId, wizardConfigVersion, createdAt, knowledgeGraph, attachmentPayloads = {} }) {
  if (!ID_RE2.test(snapshotId ?? "") || !ID_RE2.test(vaultId ?? "")) throw new ValidationError("INVALID_ID", "Snapshot and Vault IDs are required");
  if (!Number.isInteger(wizardConfigVersion) || wizardConfigVersion < 1) throw new ValidationError("INVALID_WIZARD_VERSION", "Wizard config version must be positive");
  if (!Number.isFinite(Date.parse(createdAt))) throw new ValidationError("INVALID_DATE", "createdAt must be ISO-8601");
  assertValidKnowledgeMapByVersion(knowledgeGraph);
  const manifest = new Map(knowledgeGraph.attachments.map((item) => [item.id, item]));
  const payloads = {};
  for (const [id, value] of Object.entries(attachmentPayloads)) {
    if (!manifest.has(id)) throw new ValidationError("UNDECLARED_ATTACHMENT", `Attachment payload is not declared: ${id}`);
    if (!(value instanceof Uint8Array)) throw new ValidationError("INVALID_ATTACHMENT", `Attachment ${id} must be Uint8Array`);
    const item = manifest.get(id), hash = await cryptoEngine.hashHex(value);
    if (value.byteLength !== attachmentLength(item, knowledgeGraph.schema_version) || hash !== item.sha256) throw new ValidationError("ATTACHMENT_MISMATCH", `Attachment integrity mismatch: ${id}`);
    payloads[id] = bytesToBase64Url(value);
  }
  for (const id of manifest.keys()) if (!(id in payloads)) throw new ValidationError("ATTACHMENT_MISSING", `Attachment payload missing: ${id}`);
  const core = { snapshot_id: snapshotId, vault_id: vaultId, snapshot_schema_version: SNAPSHOT_SCHEMA_VERSION, wizard_config_version: wizardConfigVersion, created_at: createdAt, knowledge_graph: knowledgeGraph, attachment_payloads: payloads };
  const integrity = {
    algorithm: "SHA-256",
    knowledge_sha256: await cryptoEngine.hashHex(canonicalBytes(knowledgeGraph)),
    attachment_manifest_sha256: await cryptoEngine.hashHex(canonicalBytes(knowledgeGraph.attachments)),
    snapshot_payload_sha256: await cryptoEngine.hashHex(canonicalBytes(core))
  };
  return { ...core, integrity };
}
function serializeSnapshot(snapshot) {
  return canonicalize(snapshot);
}
function snapshotBytes(snapshot) {
  return utf8.encode(serializeSnapshot(snapshot));
}

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
    const header2 = new Uint8Array(12);
    header2.set(MAGIC, 0);
    header2[7] = RECOVERY_KIT_VERSION;
    new DataView(header2.buffer).setUint32(8, body.length, false);
    return concatBytes(header2, body);
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

// src/ui/artifact-codec.js
function encodeEncryptedArchive(envelope) {
  return utf8.encode(canonicalize({ archive_format_version: 1, algorithm: envelope.algorithm, nonce: bytesToBase64Url(envelope.nonce), aad: bytesToBase64Url(envelope.aad), ciphertext: bytesToBase64Url(envelope.ciphertext) }));
}

// src/ui/vault-pipeline.js
var EXPERIENCE_KDF_PARAMETERS = Object.freeze({ iterations: 3e5, hash: "SHA-256" });
var kdfProvider = new Pbkdf2Provider();
var kitBuilder = new RecoveryKitBuilder();
async function createVaultArtifacts({ knowledgeGraph, attachmentPayloads, password, wizardConfigVersion = 1, vaultId, snapshotId, createdAt }) {
  let stage = "snapshot";
  let dataKey;
  try {
    const snapshot = await buildSnapshot({ snapshotId, vaultId, wizardConfigVersion, createdAt, knowledgeGraph, attachmentPayloads });
    stage = "data-key";
    dataKey = cryptoEngine.generateDataKey();
    stage = "archive";
    const envelope = await cryptoEngine.encryptSnapshot(snapshotBytes(snapshot), { dataKey });
    const archiveBytes = encodeEncryptedArchive(envelope);
    const ciphertextSha256 = await cryptoEngine.hashHex(archiveBytes);
    const archiveName = `CJAS-Vault-${snapshotId}.cjasvault`;
    stage = "recovery-kit";
    const kitBytes = await kitBuilder.createKit({ password, dataKey, snapshotId, ciphertextSha256, storageLocators: [archiveName], kdfProvider, kdfParameters: EXPERIENCE_KDF_PARAMETERS, createdAt, toolCompatibility: ">=0.2.0" });
    return { snapshot, kitBytes, archiveBytes, archiveName, ciphertextSha256 };
  } catch (error) {
    if (error && typeof error === "object" && !error.stage) error.stage = stage;
    throw error;
  } finally {
    if (dataKey) cryptoEngine.wipeSensitiveReference(dataKey);
  }
}

// web/v3-crypto/product-adapter.js
var safeId = (prefix, value, index) => `${prefix}-${index}-${String(value).normalize("NFKD").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "custom"}`;
async function createCryptoProductArtifacts({ assets, attachments, password, createdAt = (/* @__PURE__ */ new Date()).toISOString(), idFactory = () => crypto.randomUUID() }) {
  if (!assets.length) throw new Error("\u81F3\u5C11\u9700\u8981\u4E00\u9879\u52A0\u5BC6\u8D44\u4EA7\u3002");
  const prepared = [];
  for (let index = 0; index < attachments.length; index++) {
    const item = attachments[index], sha256 = await cryptoEngine.hashHex(item.bytes), id = `attachment-${String(index + 1).padStart(4, "0")}-${sha256.slice(0, 16)}`;
    prepared.push({ ...item, id, sha256 });
  }
  const assetRows = assets.map((asset, index) => {
    const id = safeId("crypto-asset", asset.name, index + 1), condition = `condition-${index + 1}`, location2 = `location-${index + 1}`, step = `step-${index + 1}`, attachmentRefs = prepared.filter((item) => item.assetId === asset.id).map((item) => item.id);
    return { id, condition, location: location2, step, attachmentRefs, asset, index };
  });
  const customFields = [];
  for (const row of assetRows) {
    customFields.push({ id: `field-category-${row.index + 1}`, module_ref: "assets-accounts", label: "Crypto Category", field_type: "text", value: row.asset.category }, { id: `field-note-${row.index + 1}`, module_ref: "evidence-messages", label: "Recovery Note", field_type: "text", value: row.asset.note || "" });
  }
  const graph = { schema_version: 2, vault_title: "CJAS Crypto Recovery Map", plan_type: "crypto-product-v1", reviewed_at: createdAt, standard_modules: STANDARD_MODULE_IDS.map((id, index) => ({ id, order: (index + 1) * 10 })), custom_modules: [], assets: assetRows.map((row) => ({ id: row.id, type: "crypto", label: row.asset.name, exists: true, platform_hint: row.asset.category, condition_refs: [row.condition], location_refs: [row.location], contact_refs: [], step_refs: [row.step], attachment_refs: row.attachmentRefs, custom_field_refs: [`field-category-${row.index + 1}`, `field-note-${row.index + 1}`] })), recovery_conditions: assetRows.map((row) => ({ id: row.condition, type: "recovery-materials", exists: true, asset_refs: [row.id], location_refs: [row.location], fallback_path_refs: [], notes: row.asset.note || "\u5F85\u6301\u6709\u4EBA\u8865\u5145\u6062\u590D\u8BF4\u660E", custom_field_refs: [] })), fallback_paths: [], locations: assetRows.map((row) => ({ id: row.location, label: `${row.asset.name} \u6062\u590D\u8D44\u6599\u4F4D\u7F6E`, type: "digital", finding_instructions: row.asset.note || "\u67E5\u770B\u672C\u8D44\u4EA7\u5173\u8054\u7684\u6062\u590D\u8BF4\u660E\u548C\u9644\u4EF6", access_prerequisites: [], attachment_refs: row.attachmentRefs, custom_field_refs: [] })), assistance: { needed: false }, contacts: [], recovery_steps: assetRows.map((row) => ({ id: row.step, sequence: row.index + 1, risk_level: "medium", action: `\u6309\u6301\u6709\u4EBA\u8BF4\u660E\u6062\u590D ${row.asset.name}`, completion_check: "\u6838\u5BF9\u516C\u5F00\u8D44\u4EA7\u4FE1\u606F\u5E76\u786E\u8BA4\u63A7\u5236\u6743", failure_action: "\u505C\u6B62\u64CD\u4F5C\u5E76\u8054\u7CFB\u5B98\u65B9\u6216\u53EF\u4FE1\u4E13\u4E1A\u4EBA\u58EB", stop_condition: "\u8EAB\u4EFD\u3001\u5730\u5740\u3001\u7F51\u7EDC\u6216\u6388\u6743\u8303\u56F4\u4E0D\u4E00\u81F4", asset_refs: [row.id], condition_refs: [row.condition], location_refs: [row.location], contact_refs: [], warning_refs: ["warning-secrets"], attachment_refs: row.attachmentRefs })), warnings: [{ id: "warning-secrets", risk_level: "high", instruction: "\u4E0D\u5F97\u5728Recovery Map\u4E2D\u4FDD\u5B58\u79C1\u94A5\u3001\u52A9\u8BB0\u8BCD\u3001\u5B8C\u6574\u5BC6\u7801\u3001OTP\u6216\u9A8C\u8BC1\u7801\u3002", applies_to_refs: assetRows.map((row) => row.id) }], attachments: prepared.map((item) => {
    const row = assetRows.find((value) => value.asset.id === item.assetId);
    return { id: item.id, display_name: item.name, media_type: item.mimeType, byte_length: item.bytes.length, sha256: item.sha256, module_refs: ["evidence-messages"], owner_entity_refs: [row.id], purpose: "Crypto Recovery Map\u8F85\u52A9\u6750\u6599", sensitive_acknowledged: true };
  }), personal_message: null, custom_fields: customFields };
  const snapshotId = `crypto-v1-${idFactory()}`, vaultId = `crypto-product-${idFactory()}`, attachmentPayloads = Object.fromEntries(prepared.map((item) => [item.id, item.bytes])), artifacts = await createVaultArtifacts({ knowledgeGraph: graph, attachmentPayloads, password, wizardConfigVersion: 3, vaultId, snapshotId, createdAt });
  return { ...artifacts, snapshotId, vaultId, fileCount: prepared.length, totalOriginalBytes: prepared.reduce((sum, item) => sum + item.bytes.length, 0) };
}

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
function resolveFileIdentity(filename, mimeType = "") {
  const lower = String(filename ?? "").toLowerCase(), reported = String(mimeType ?? "").toLowerCase();
  for (const [fileType, rule] of Object.entries(FILE_FORMAT_POLICY)) {
    if (!rule.extensions.some((extension) => lower.endsWith(extension))) continue;
    if (reported && !rule.mimes.includes(reported)) return null;
    return { fileType, mimeType: reported || rule.mimes[0], rule };
  }
  return null;
}

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
function sanitizeFilename(name) {
  const clean = String(name ?? "").split(/[\\/]/).pop().replace(/[\u0000-\u001f\u007f]/g, "").replace(/[:*?"<>|]/g, "_").trim();
  if (!clean || clean === "." || clean === "..") throw new Error("\u6587\u4EF6\u540D\u65E0\u6548\u3002");
  return clean.slice(0, 240);
}
function has(bytes, needle) {
  const text3 = new TextDecoder("latin1").decode(bytes);
  return text3.includes(needle);
}
var starts = (bytes, values, offset = 0) => values.every((value, index) => bytes[offset + index] === value);
var ftypOffset = (bytes) => {
  const limit = Math.min(bytes.length - 4, 4096);
  for (let offset = 4; offset <= limit; offset++) if (starts(bytes, [102, 116, 121, 112], offset)) return offset;
  return -1;
};
var isoBmff = (bytes) => bytes.length >= 12 && ftypOffset(bytes) >= 4;
var heifBrand = (bytes) => {
  const offset = ftypOffset(bytes);
  if (offset < 4) return false;
  const brands = new TextDecoder("latin1").decode(bytes.slice(offset + 4, Math.min(bytes.length, offset + 60)));
  return ["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1", "msf1", "heif"].some((brand2) => brands.includes(brand2));
};
var textContent = (bytes) => {
  if (bytes.includes(0)) {
    const utf16le = starts(bytes, [255, 254]), utf16be = starts(bytes, [254, 255]);
    if (!utf16le && !utf16be) return false;
    try {
      new TextDecoder(utf16le ? "utf-16le" : "utf-16be", { fatal: true }).decode(bytes.slice(2));
      return true;
    } catch {
      return false;
    }
  }
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return true;
  } catch {
    return false;
  }
};
var waveContainer = (bytes) => bytes.length >= 12 && (has(bytes.slice(0, 4), "RIFF") || has(bytes.slice(0, 4), "RIFX") || has(bytes.slice(0, 4), "RF64")) && has(bytes.slice(8, 12), "WAVE");
function identifyAndValidateFile({ name, type, size }, bytes) {
  if (!(bytes instanceof Uint8Array) || !Number.isSafeInteger(size) || size !== bytes.length || size <= 0) throw new Error("\u8BF7\u9009\u62E9\u6D4F\u89C8\u5668\u53EF\u8BFB\u53D6\u7684\u975E\u7A7A\u6587\u4EF6\u3002");
  if (size > GENERIC_ARCHIVE_LIMITS.max_file_bytes) throw new Error("\u5355\u6587\u4EF6\u4E0D\u5F97\u8D85\u8FC7 10 MiB\uFF0810,485,760 bytes\uFF09\u3002");
  const filename = sanitizeFilename(name), identity = resolveFileIdentity(filename, type);
  if (!identity) throw new Error(`\u6587\u4EF6\u6269\u5C55\u540D\u4E0E MIME \u4E0D\u5728\u6B63\u5F0F\u767D\u540D\u5355\u5185\uFF1A${FILE_FORMAT_LABELS.join("\u3001")}\u3002`);
  const { fileType, mimeType } = identity;
  const valid = fileType === "pdf" ? starts(bytes, [37, 80, 68, 70, 45]) : fileType === "txt" ? textContent(bytes) : fileType === "png" ? starts(bytes, [137, 80, 78, 71, 13, 10, 26, 10]) : fileType === "jpeg" ? bytes.length >= 4 && starts(bytes, [255, 216]) && has(bytes.slice(Math.max(0, bytes.length - 64)), String.fromCharCode(255, 217)) : fileType === "heic" ? heifBrand(bytes) : fileType === "mp3" ? bytes.length >= 3 && (starts(bytes, [73, 68, 51]) || bytes[0] === 255 && (bytes[1] & 224) === 224) : fileType === "m4a" ? isoBmff(bytes) : fileType === "wav" ? waveContainer(bytes) : fileType === "mp4" || fileType === "mov" ? isoBmff(bytes) : bytes.length >= 22 && starts(bytes, [80, 75]) && [3, 5, 7].includes(bytes[2]) && [4, 6, 8].includes(bytes[3]) && has(bytes, "[Content_Types].xml") && has(bytes, "word/document.xml");
  if (!valid) throw new Error(`\u8BE5\u6587\u4EF6\u5185\u5BB9\u4E0D\u662F\u53EF\u8BC6\u522B\u7684 ${identity.rule.label} \u683C\u5F0F\u3002`);
  return { fileType, filename, mimeType, size };
}

// tools/ar-unified-multi-file-mainnet-pilot/pilot-core.js
var UNIFIED_LIMITS = Object.freeze({ max_total_original_bytes: 50 * 1024 * 1024, gateway_concurrency: 2 });
async function validateIncomingFiles(files, existing = []) {
  const incoming = [...files];
  if (!incoming.length) throw new Error("\u8BF7\u9009\u62E9\u9700\u8981\u8FFD\u52A0\u7684\u6587\u4EF6\u3002");
  const names = new Set(existing.map((item) => item.file.name.normalize("NFC").toLowerCase()));
  for (const file of incoming) {
    const name = file.name.normalize("NFC").toLowerCase();
    if (names.has(name)) throw new Error(`\u6587\u4EF6 ${file.name} \u5DF2\u5B58\u5728\uFF0C\u672A\u8986\u76D6\u539F\u6587\u4EF6\u3002`);
    names.add(name);
  }
  const total = existing.reduce((sum, item) => sum + item.file.size, 0) + incoming.reduce((sum, file) => sum + file.size, 0);
  if (total > UNIFIED_LIMITS.max_total_original_bytes) throw new Error("\u7D2F\u8BA1\u6587\u4EF6\u603B\u5927\u5C0F\u8D85\u8FC750 MiB\uFF0C\u8BF7\u5220\u9664\u90E8\u5206\u6587\u4EF6\u540E\u91CD\u8BD5\u3002");
  const added = [];
  for (const file of incoming) {
    const bytes = new Uint8Array(await file.arrayBuffer()), identity = identifyAndValidateFile(file, bytes);
    added.push({ file, bytes, identity });
  }
  return added;
}

// tools/ar-generic-file-mainnet-pilot/material-delivery.js
async function saveMaterial(bytes, filename, mimeType = "application/octet-stream", { preferPicker = true, windowRef = globalThis.window, documentRef = globalThis.document, urlApi = globalThis.URL } = {}) {
  const blob = new Blob([bytes], { type: mimeType });
  if (preferPicker && typeof windowRef.showSaveFilePicker === "function") {
    try {
      const handle = await windowRef.showSaveFilePicker({ suggestedName: filename }), writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return { saved: true, method: "save-picker", filename };
    } catch (error) {
      if (error?.name === "AbortError") return { saved: false, cancelled: true, method: "save-picker", filename };
      throw new Error("\u4FDD\u5B58\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u4FDD\u5B58\u4F4D\u7F6E\u540E\u91CD\u8BD5\u3002");
    }
  }
  let url;
  try {
    url = urlApi.createObjectURL(blob);
    const link = documentRef.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    documentRef.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => urlApi.revokeObjectURL(url), 1e3);
    return { saved: true, method: "browser-download", filename };
  } catch {
    if (url) urlApi.revokeObjectURL(url);
    throw new Error("\u4E0B\u8F7D\u672A\u80FD\u542F\u52A8\uFF0C\u8BF7\u5141\u8BB8\u6D4F\u89C8\u5668\u4E0B\u8F7D\u540E\u91CD\u8BD5\u3002");
  }
}

// src/ui/password-policy.js
var countCodePoints = (value) => [...value].length;
var CATEGORY_TESTS = Object.freeze({
  uppercase: /\p{Lu}/u,
  lowercase: /\p{Ll}/u,
  number: /\p{Nd}/u,
  special: /[^\p{L}\p{N}\s]/u
});
var LABELS = Object.freeze({ uppercase: "\u5927\u5199\u5B57\u6BCD", lowercase: "\u5C0F\u5199\u5B57\u6BCD", number: "\u6570\u5B57", special: "\u7279\u6B8A\u5B57\u7B26" });
function validateRecoveryPassword(password, confirmation, acknowledged, { policy, vaultName = "" } = {}) {
  const issues = [];
  if (!policy || !Number.isInteger(policy.min_code_points) || !Number.isInteger(policy.max_code_points) || !Number.isInteger(policy.minimum_character_classes)) throw new TypeError("Password policy configuration is required");
  const value = typeof password === "string" ? password : "", length = countCodePoints(value), categories = Object.fromEntries(Object.entries(CATEGORY_TESTS).map(([key, pattern]) => [key, pattern.test(value)])), satisfied = Object.values(categories).filter(Boolean).length;
  if (length < policy.min_code_points) issues.push({ code: "PASSWORD_TOO_SHORT", message: `\u6062\u590D\u5BC6\u7801\u81F3\u5C11\u9700\u8981 ${policy.min_code_points} \u4E2A\u5B57\u7B26` });
  if (length > policy.max_code_points) issues.push({ code: "PASSWORD_TOO_LONG", message: `\u6062\u590D\u5BC6\u7801\u4E0D\u80FD\u8D85\u8FC7 ${policy.max_code_points} \u4E2A\u5B57\u7B26` });
  if (value.trim().length === 0) issues.push({ code: "PASSWORD_BLANK", message: "\u6062\u590D\u5BC6\u7801\u4E0D\u80FD\u5168\u90E8\u7531\u7A7A\u683C\u7EC4\u6210" });
  if (satisfied < policy.minimum_character_classes) {
    const missing = Object.entries(categories).filter(([, present]) => !present).map(([key]) => LABELS[key]);
    issues.push({ code: "PASSWORD_CLASSES", message: `\u8BF7\u81F3\u5C11\u4F7F\u7528\u56DB\u7C7B\u5B57\u7B26\u4E2D\u7684\u4E09\u7C7B\uFF1B\u5F53\u524D\u8FD8\u53EF\u52A0\u5165\uFF1A${missing.join("\u3001")}` });
  }
  if (value !== confirmation) issues.push({ code: "PASSWORD_MISMATCH", message: "\u4E24\u6B21\u8F93\u5165\u7684\u6062\u590D\u5BC6\u7801\u4E0D\u4E00\u81F4" });
  if (vaultName && value.normalize("NFC") === vaultName.normalize("NFC")) issues.push({ code: "PASSWORD_EQUALS_VAULT_NAME", message: "\u6062\u590D\u5BC6\u7801\u4E0D\u80FD\u4E0E\u6062\u590D\u8BA1\u5212\u540D\u79F0\u5B8C\u5168\u76F8\u540C" });
  if (policy.weak_passwords.some((item) => item.normalize("NFC").toLocaleLowerCase() === value.normalize("NFC").toLocaleLowerCase())) issues.push({ code: "PASSWORD_COMMON", message: "\u8BE5\u5BC6\u7801\u8FC7\u4E8E\u5E38\u89C1\uFF0C\u8BF7\u4F7F\u7528\u66F4\u72EC\u7279\u7684\u5BC6\u7801\u77ED\u8BED" });
  if (!acknowledged) issues.push({ code: "PASSWORD_ACK_REQUIRED", message: "\u8BF7\u5148\u786E\u8BA4\u60A8\u7406\u89E3\u5E73\u53F0\u65E0\u6CD5\u627E\u56DE\u6062\u590D\u5BC6\u7801" });
  const valid = issues.length === 0, status = !valid ? "\u4E0D\u7B26\u5408\u8981\u6C42" : length >= 20 && satisfied === 4 ? "\u8F83\u5F3A" : "\u57FA\u672C\u7B26\u5408";
  return { valid, status, length, categories, satisfied_classes: satisfied, required_classes: policy.minimum_character_classes, issues };
}

// src/ui/canonical-customer-links.js
var APPROVED_TEST_ORIGIN = "https://sixtrees778899-stack.github.io";
var APPROVED_TEST_BASE = "/SKREK-auth-test";
var CURRENT_TEST_RELEASE = "legavik-phase3c-20260905-1";
var ROUTES = Object.freeze({
  home: "/web/v3-crypto/index.html",
  account: "/web/account/index.html",
  create: "/web/v2/index.html",
  recovery: "/web/recover.html"
});
function canonicalCustomerUrl(route2, { params = {}, hash = "" } = {}) {
  const pathname = ROUTES[route2];
  if (!pathname) throw new TypeError(`Unknown canonical customer route: ${route2}`);
  const url = new URL(`${APPROVED_TEST_BASE}${pathname}`, APPROVED_TEST_ORIGIN);
  for (const [key, value] of Object.entries(params)) if (value !== void 0 && value !== null && value !== "") url.searchParams.set(key, String(value));
  url.searchParams.set("release", CURRENT_TEST_RELEASE);
  url.hash = hash ? `#${String(hash).replace(/^#/, "")}` : "";
  return url.href;
}
var canonicalHomeUrl = (hash = "home") => canonicalCustomerUrl("home", { hash });
var canonicalAccountUrl = (hash = "login", params = {}) => canonicalCustomerUrl("account", { params, hash });
var canonicalCreateUrl = (params = {}) => canonicalCustomerUrl("create", { params: { entry: "guide", ...params } });
var canonicalRecoveryUrl = (source = "recovery-center", params = {}) => canonicalCustomerUrl("recovery", { params: { source, ...params } });

// src/ui/skrek-global-header.js
var SKREK_GLOBAL_NAV = [
  ["digital-assets", "\u6570\u5B57\u8D44\u4EA7"],
  ["security", "\u5B89\u5168\u4E0E\u9690\u79C1"],
  ["pricing", "\u4EA7\u54C1\u4E0E\u670D\u52A1"],
  ["knowledge", "\u77E5\u8BC6\u5E93"],
  ["professionals", "\u4E13\u4E1A\u5408\u4F5C"],
  ["about", "\u8054\u7CFB\u6211\u4EEC"]
];
var esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
function skrekGlobalHeader({ brand: brand2 = customerBrand, activeRoute = "home", mode = "product", productBase = canonicalHomeUrl(""), accountBase = canonicalAccountUrl("", {}).replace(/#$/, ""), logoBase = customerBrand.logo.masterV1, recoveryBase = canonicalRecoveryUrl("recovery-center") } = {}) {
  const wordmark = esc(brand2?.wordmark ?? customerBrand.wordmark), logoAlt = esc(brand2?.logo?.alt ?? customerBrand.logo.alt);
  const href = (id) => mode === "map" ? `${productBase}#${id}` : `#${id}`;
  return `<div class="nav-shell"><a id="product-home-logo" class="wordmark" data-route="home" href="${href("home")}" aria-label="${wordmark}\u9996\u9875"><img src="${logoBase}" alt="${logoAlt}"></a><nav aria-label="\u4E3B\u8981\u5BFC\u822A">${SKREK_GLOBAL_NAV.map(([id, label]) => `<a data-route="${id}" href="${href(id)}" class="${activeRoute === id ? "active" : ""}">${label}</a>`).join("")}</nav><div class="nav-actions"><a class="text-button account-state-link" data-account-state href="${accountBase}#login">\u767B\u5F55 / \u6CE8\u518C</a><a class="button small recovery-center-link" href="${recoveryBase}">\u6211\u7684\u6062\u590D\u4E2D\u5FC3</a><button id="menu" class="menu" aria-label="\u6253\u5F00\u5BFC\u822A" aria-expanded="false">\u2630</button></div></div>`;
}

// web/v3-crypto/product-v1.js
var main = document.querySelector("#main");
var header = document.querySelector("#site-header");
var footer = document.querySelector("#site-footer");
var overlay = document.querySelector("#overlay-root");
var toast = document.querySelector("#toast");
var qaMode = new URLSearchParams(location.search).get("qa") === "1";
var safe = (value) => String(value ?? "").replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
var uid = () => crypto.randomUUID();
var MiB = 1024 * 1024;
var defaultState = { route: "home", category: null, assets: [], attachments: [], account: null, artifacts: null, kitSaved: false, showTechnical: false };
var stored = history.state?.skrekProductState ?? null;
var state = { ...defaultState, ...stored, attachments: [], artifacts: null, kitSaved: false };
var persist = () => history.replaceState({ ...history.state, skrekProductState: { route: state.route, category: state.category, assets: state.assets.map(({ id, category: category2, name }) => ({ id, category: category2, name, note: "" })), account: state.account } }, "");
if (!location.hash) history.replaceState(history.state, "", `${location.pathname}${location.search}#home`);
var route = () => location.hash.replace(/^#/, "").split("?")[0] || "home";
var navigate = (next) => {
  location.hash = next;
};
var announce = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
};
var category = (id) => content.cryptoCategories.find((item) => item.id === id);
var totalBytes = () => state.attachments.reduce((sum, item) => sum + item.bytes.length, 0);
var readiness = () => {
  if (!state.assets.length) return 0;
  const described = state.assets.filter((item) => item.note?.trim()).length, attached = new Set(state.attachments.map((item) => item.assetId)).size;
  return Math.round((state.assets.length * 45 + described * 35 + attached * 20) / state.assets.length);
};
var homePains = [
  { n: "01", title: "\u95EE\u9898", body: "\u6570\u5B57\u65F6\u4EE3\uFF0C\u5F88\u591A\u91CD\u8981\u8D44\u4EA7\u5E76\u6CA1\u6709\u6D88\u5931\uFF0C\u771F\u6B63\u6D88\u5931\u7684\u5F80\u5F80\u662F\u77E5\u9053\u5982\u4F55\u627E\u5230\u548C\u6062\u590D\u5B83\u4EEC\u7684\u4EBA\u3002", note: "\u6570\u5B57\u8D44\u4EA7\u3001\u8D26\u6237\u548C\u6062\u590D\u65B9\u5F0F\u9AD8\u5EA6\u5206\u6563\uFF0C\u800C\u771F\u6B63\u7406\u89E3\u5B83\u4EEC\u7684\u4EBA\u5F80\u5F80\u53EA\u6709\u672C\u4EBA\u3002" },
  { n: "02", title: `${brand.brand_name} \u505A\u4EC0\u4E48`, body: `${brand.brand_name} \u5E2E\u52A9\u4F60\u63D0\u524D\u68B3\u7406\u6570\u5B57\u8D44\u4EA7\u3001\u6570\u5B57\u8EAB\u4EFD\u548C\u91CD\u8981\u8D26\u6237\u7684\u6062\u590D\u7EBF\u7D22\u4E0E\u8DEF\u5F84\u3002`, note: "\u628A\u5206\u6563\u5728\u8BB0\u5FC6\u3001\u8BBE\u5907\u548C\u4E0D\u540C\u4F4D\u7F6E\u7684\u4FE1\u606F\uFF0C\u6574\u7406\u6210\u7ED3\u6784\u5316 Recovery Map\u3002" },
  { n: "03", title: "\u6700\u7EC8\u7ED3\u679C", body: "\u8BA9\u672A\u6765\u7684\u81EA\u5DF1\u3001\u5BB6\u4EBA\u6216\u6307\u5B9A\u6062\u590D\u4EBA\uFF0C\u5728\u771F\u6B63\u9700\u8981\u7684\u65F6\u5019\u77E5\u9053\u6709\u4EC0\u4E48\u3001\u5728\u54EA\u91CC\u3001\u5982\u4F55\u5F00\u59CB\u3002", note: "\u4E0D\u5FC5\u5728\u6700\u56F0\u96BE\u7684\u65F6\u5019\u91CD\u65B0\u731C\u6D4B\u548C\u5BFB\u627E\u6062\u590D\u8DEF\u5F84\u3002" }
];
var homeSteps = [
  { n: "01", title: "\u6574\u7406", body: "\u901A\u8FC7 Recovery Map \u7CFB\u7EDF\u68B3\u7406\u8D44\u4EA7\u5165\u53E3\u3001\u6062\u590D\u6761\u4EF6\u3001\u8D44\u6599\u4F4D\u7F6E\u3001\u64CD\u4F5C\u6B65\u9AA4\u548C\u534F\u52A9\u5173\u7CFB\u3002" },
  { n: "02", title: "\u4FDD\u62A4", body: "\u5728\u6D4F\u89C8\u5668\u672C\u5730\u5B8C\u6210\u8D44\u6599\u52A0\u5BC6\uFF0C\u5F62\u6210\u5B8C\u6574\u3001\u957F\u671F\u4FDD\u5B58\u7684\u52A0\u5BC6\u6062\u590D\u7248\u672C\u3002" },
  { n: "03", title: "\u6062\u590D", body: "\u771F\u6B63\u9700\u8981\u65F6\uFF0C\u4F7F\u7528\u81EA\u5DF1\u4FDD\u5B58\u7684\u6062\u590D\u8D44\u6599\uFF0C\u901A\u8FC7\u72EC\u7ACB\u6062\u590D\u8DEF\u5F84\u91CD\u65B0\u83B7\u5F97 Recovery Map \u4E0E\u9644\u4EF6\u3002" }
];
var homeExplore = [
  { id: "digital-assets", title: "Digital Assets", zh: "\u6570\u5B57\u8D44\u4EA7", body: "\u4ECE\u4EA4\u6613\u5E73\u53F0\u3001\u94B1\u5305\u3001DeFi\uFF0C\u5230\u6570\u5B57\u8EAB\u4EFD\u548C\u91CD\u8981\u8D26\u6237\uFF0C\u9010\u6B65\u5EFA\u7ACB\u6E05\u6670\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u5730\u56FE\u3002" },
  { id: "security", title: "Security & Privacy", zh: "\u5B89\u5168\u4E0E\u9690\u79C1", body: "\u91CD\u8981\u8D44\u6599\u5148\u5728\u672C\u5730\u5B8C\u6210\u52A0\u5BC6\uFF0C\u5E73\u53F0\u63A5\u89E6\u5230\u7684\u662F\u52A0\u5BC6\u7248\u672C\uFF0C\u800C\u4E0D\u662F\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6\u7684\u539F\u59CB\u5185\u5BB9\u3002" },
  { id: "recovery", title: "Recovery & Succession", zh: "\u6062\u590D\u4E0E\u5EF6\u7EED", body: "\u4ECE\u81EA\u4E3B\u6062\u590D\u5F00\u59CB\uFF0C\u8BA9\u672A\u6765\u7684\u81EA\u5DF1\u6216\u6307\u5B9A\u6062\u590D\u4EBA\u77E5\u9053\u5982\u4F55\u63A5\u624B\uFF1B\u672A\u6765\u9010\u6B65\u63A2\u7D22\u66F4\u5B89\u5168\u3001\u53D7\u63A7\u7684\u534F\u52A9\u6062\u590D\u673A\u5236\u3002" }
];
var pricingPlans = {
  Essential: { positioning: "\u5EFA\u7ACB\u4E00\u4EFD\u5B89\u5168\u3001\u6E05\u6670\u3001\u957F\u671F\u4FDD\u5B58\u7684 Recovery Map\u3002", prices: { USD: 599, AUD: 849 }, features: ["\u5B8C\u6574 Recovery Map \u5EFA\u7ACB", "\u6587\u4EF6\u4E0A\u4F20\u524D\u52A0\u5BC6\u4FDD\u62A4", "\u4E00\u6B21\u4ED8\u8D39\uFF0C\u957F\u671F\u52A0\u5BC6\u5B58\u50A8", "\u57FA\u7840\u586B\u5199\u4E0E\u6062\u590D\u6307\u5BFC", "Recovery Center \u72EC\u7ACB\u6062\u590D\u5165\u53E3"] },
  Standard: { positioning: "\u5728\u5B8C\u6574 Recovery Map \u57FA\u7840\u4E0A\uFF0C\u52A0\u5165\u6301\u7EED\u68C0\u67E5\u3001\u66F4\u65B0\u3001\u6062\u590D\u6F14\u7EC3\u548C\u4E13\u4EBA\u6307\u5BFC\u3002", prices: { USD: 1199, AUD: 1699 }, features: ["\u5305\u542B Essential \u5168\u90E8\u80FD\u529B", "\u5B8C\u6574\u9644\u4EF6\u586B\u5199\u6A21\u677F\u4E0E\u8FDB\u9636\u6307\u5BFC", "\u5E74\u5EA6 Recovery Check", "\u9996\u5E74\u6700\u591A 4 \u6B21 Recovery Map \u66F4\u65B0", "Recovery Readiness Review", "Annual Recovery Drill", "\u4E00\u5BF9\u4E00\u4E13\u4EBA\u6307\u5BFC\uFF0C\u7528\u4E8E Recovery Map \u586B\u5199\u3001\u66F4\u65B0\u548C\u6062\u590D\u8FC7\u7A0B\u4E2D\u7684\u5FC5\u8981\u6307\u5BFC", "Priority Support", "\u6570\u5B57\u8EAB\u4EFD\u4E0E\u91CD\u8981\u8D26\u6237\u6269\u5C55\u6574\u7406"] },
  Family: { positioning: "\u9002\u7528\u4E8E\u5BB6\u5EAD\u591A\u6210\u5458\u573A\u666F\u7684\u72EC\u7ACB\u6062\u590D\u4E0E\u8FDE\u7EED\u6027\u5B89\u6392\u3002", prices: { USD: 1999, AUD: 2799 }, features: ["Standard \u7684\u4E3B\u8981\u7CFB\u7EDF\u80FD\u529B", "2 \u540D\u6210\u4EBA\u7684\u72EC\u7ACB Recovery System", "\u6BCF\u540D\u6210\u5458\u4FDD\u6301\u81EA\u5DF1\u7684\u79C1\u4EBA Recovery Map", "Family Recovery Relationship", "\u9002\u5F53\u7684 Recovery Contact / assistance relationship", "Family Recovery Review", "Family Recovery Drill", "Priority Support", "\u5FC5\u8981\u7684\u5BB6\u5EAD\u6062\u590D\u6307\u5BFC"] },
  "Legacy / Private": { positioning: "\u9762\u5411\u590D\u6742\u3001\u9AD8\u4EF7\u503C\u3001\u5BB6\u5EAD\u4F20\u627F\u6216\u8DE8\u5883\u573A\u666F\u7684\u5B9A\u5236\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u65B9\u6848\u3002", prices: { USD: 5e3, AUD: 6999 }, from: true, features: ["\u5305\u542B Standard \u9002\u7528\u7684\u5168\u90E8\u6838\u5FC3\u80FD\u529B\uFF0C\u5E76\u6839\u636E\u5BA2\u6237\u60C5\u51B5\u5B9A\u5236", "\u590D\u6742\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u89C4\u5212", "\u5BB6\u5EAD\u4E0E\u6307\u5B9A\u6062\u590D\u4EBA\u5B89\u6392", "\u591A\u65B9\u6062\u590D\u89D2\u8272\u4E0E\u6743\u9650\u8BBE\u8BA1", "\u5F8B\u5E08\u3001\u8D22\u5BCC\u987E\u95EE\u6216\u4E13\u4E1A\u673A\u6784\u534F\u4F5C", "Trustee / Executor \u534F\u540C\u5B89\u6392", "\u6062\u590D\u6750\u6599\u5206\u914D\u4E0E\u6388\u6743\u65B9\u6848", "\u5B9A\u5236 Recovery Drill", "\u5FC5\u8981\u7684 Assisted Recovery", "\u5BB6\u5EAD / \u6062\u590D\u4EBA\u8BF4\u660E\u4E0E\u6307\u5BFC", "\u8DE8\u5883\u6216\u7279\u6B8A\u8D44\u4EA7\u573A\u666F\u89C4\u5212"] }
};
var continuityPrices = { individual: { USD: { annual: 399, monthly: 39 }, AUD: { annual: 569, monthly: 55 } }, family: { USD: { annual: 599, monthly: 59 }, AUD: { annual: 849, monthly: 79 } } };
var pricingComparison = [
  ["\u5B8C\u6574 Recovery Map \u5EFA\u7ACB", "\u2713", "\u2713"],
  ["\u6587\u4EF6\u4E0A\u4F20\u524D\u52A0\u5BC6\u4FDD\u62A4", "\u2713", "\u2713"],
  ["\u957F\u671F\u52A0\u5BC6\u5B58\u50A8", "\u2713", "\u2713"],
  ["\u57FA\u7840\u586B\u5199\u4E0E\u6062\u590D\u6307\u5BFC", "\u2713", "\u2713"],
  ["Recovery Center \u72EC\u7ACB\u6062\u590D\u5165\u53E3", "\u2713", "\u2713"],
  ["\u9644\u4EF6\u586B\u5199\u6A21\u677F\u4E0E\u8FDB\u9636\u6307\u5BFC", "\u2014", "\u2713"],
  ["\u5E74\u5EA6 Recovery Check", "\u2014", "\u2713"],
  ["\u9996\u5E74\u66F4\u65B0\u6743\u76CA", "\u57FA\u7840\u66F4\u65B0", "\u6700\u591A 4 \u6B21"],
  ["Recovery Readiness Review", "\u2014", "\u2713"],
  ["Annual Recovery Drill", "\u2014", "\u2713"],
  ["\u4E00\u5BF9\u4E00\u4E13\u4EBA\u6307\u5BFC", "\u2014", "\u2713"],
  ["Priority Support", "\u2014", "\u2713"],
  ["\u6570\u5B57\u8EAB\u4EFD\u4E0E\u91CD\u8981\u8D26\u6237\u6269\u5C55\u6574\u7406", "\u2014", "\u2713"]
];
var publicPricingPlans = ["Essential", "Standard", "Legacy / Private"];
var continuityServiceItems = ["Recovery Map \u6301\u7EED\u66F4\u65B0", "\u5B9A\u671F Recovery Check", "Recovery Readiness Review", "Recovery Material \u72B6\u6001\u68C0\u67E5", "Annual Recovery Drill", "\u4F18\u5148\u652F\u6301\u4E0E\u5FC5\u8981\u7684\u5728\u7EBF\u4EBA\u5DE5\u6307\u5BFC"];
var continuityComparison = [
  ["\u5DF2\u5B8C\u6210\u7684 Recovery Map", "\u2713", "\u2713"],
  ["Recovery Map \u66F4\u65B0", "\u2713", "\u2014"],
  ["Recovery Check & Readiness", "\u2713", "\u2014"],
  ["Annual Recovery Drill", "\u2713", "\u2014"],
  ["\u4F18\u5148\u652F\u6301\u4E0E\u4E13\u4EBA\u6307\u5BFC", "\u2713", "\u2014"]
];
var pricingState = { plan: "Standard", currency: "USD", comparisonOpen: false };
var pricingAmount = (value) => value.toLocaleString("en-US");
function nav() {
  header.innerHTML = skrekGlobalHeader({ brand, activeRoute: state.route, productBase: canonicalHomeUrl(""), accountBase: canonicalAccountUrl().replace(/#login$/, ""), logoBase: brand.logo.masterV1, recoveryBase: canonicalRecoveryUrl("recovery-center") });
}
function foot() {
  footer.innerHTML = `<div class="footer-grid"><div><strong>${brand.wordmark}</strong><p>${brand.short_description}</p></div><div><b>\u4EA7\u54C1</b><button data-route="digital-assets">Digital Assets</button><button data-route="how-it-works">\u5982\u4F55\u8FD0\u4F5C</button><button data-recovery-map>\u521B\u5EFARecovery Map</button><button data-independent-recovery>\u72EC\u7ACB\u6062\u590D</button></div><div><b>\u8D44\u6E90</b><button data-route="knowledge">\u77E5\u8BC6\u5E93</button><button data-route="help">\u5E2E\u52A9\u4E0EFAQ</button><button data-help>\u586B\u5199\u6307\u5357</button></div><div><b>\u6CD5\u5F8B</b><span>Privacy \xB7 Planned</span><span>Terms \xB7 Planned</span><span>Security</span></div></div><div class="footer-bottom"><span>\xA9 2026 ${brand.brand_name}</span><span>${brand.tagline}</span></div>`;
}
var compass = (value = readiness()) => `<div class="compass"><svg viewBox="0 0 42 42" aria-hidden="true"><circle class="compass-track" cx="21" cy="21" r="15.9" pathLength="100"></circle><circle class="compass-value" cx="21" cy="21" r="15.9" pathLength="100" stroke-dasharray="${value} 100"></circle></svg><div><strong>${value}%</strong><span>Recovery Readiness</span></div></div>`;
function home() {
  main.innerHTML = `
  <section class="hero dark"><div class="hero-copy"><p class="kicker">${brand.tagline}</p><h1>\u4E3A\u4F60\u7684\u6570\u5B57\u8D44\u4EA7\uFF0C<br>\u7559\u4E0B\u6E05\u6670\u3001\u53EF\u6062\u590D\u7684\u8DEF\u5F84\u3002</h1><p>\u5F53\u4F60\u65E0\u6CD5\u4EB2\u81EA\u5904\u7406\u65F6\uFF0C\u4F60\u6307\u5B9A\u7684\u4EBA\u4ECD\u7136\u80FD\u591F\u77E5\u9053\u91CD\u8981\u8D44\u4EA7\u5728\u54EA\u91CC\u3001\u9700\u8981\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u5982\u4F55\u5F00\u59CB\u6062\u590D\u3002</p><div class="actions"><button class="button light" data-recovery-map>\u5F00\u59CB\u5EFA\u7ACBRecovery Map</button><button class="button ghost-light" data-video>\u25B6 \u89C2\u770B60\u79D2\u4ECB\u7ECD</button><button class="hero-recovery-link" data-independent-recovery>\u5DF2\u6709\u6062\u590D\u6750\u6599\uFF1F\u72EC\u7ACB\u6062\u590D \u2192</button></div><div class="promise"><span>\u4E00\u6B21\u521B\u5EFA</span><span>\u52A0\u5BC6\u4FDD\u62A4</span><span>\u957F\u671F\u4FDD\u5B58</span><span>\u53EF\u72EC\u7ACB\u6062\u590D</span></div></div><div class="hero-visual" aria-label="Recovery Map\u516D\u6A21\u5757\u6982\u5FF5\u56FE"><div class="recovery-map-concept"><div><strong>Recovery Map</strong><small>6\u4E2A\u5173\u952E\u6A21\u5757</small></div>${["01 \u8D44\u4EA7", "02 \u6062\u590D\u6761\u4EF6", "03 \u4F4D\u7F6E", "04 \u6062\u590D\u6B65\u9AA4", "05 \u534F\u52A9", "06 \u5631\u6258"].map((label, index) => `<span class="concept-${index + 1}">${label}</span>`).join("")}</div></div></section>
  <section class="section pain"><div class="section-title"><p class="kicker">WHY PREPARE</p><h2>\u91CD\u8981\u7684\u4E0D\u662F\u4FDD\u5B58\u66F4\u591A\uFF0C<br>\u800C\u662F\u8BA9\u6062\u590D\u8DEF\u5F84\u4E0D\u518D\u53EA\u5B58\u5728\u4E8E\u8BB0\u5FC6\u91CC\u3002</h2></div><div class="three-grid">${homePains.map((x) => `<article><span>${x.n}</span><h3>${x.title}</h3><p>${x.body}</p><small>${x.note}</small></article>`).join("")}</div></section>
  <section class="section soft"><div class="section-title centered"><p class="kicker">HOW ${brand.brand_name} WORKS</p><h2>\u4E09\u6B65\u5EFA\u7ACB\u957F\u671F\u6062\u590D\u7248\u672C</h2></div><div class="steps">${homeSteps.map((x) => `<article><b>${x.n}</b><h3>${x.title}</h3><p>${x.body}</p></article>`).join("")}</div><div class="center"><button class="text-link" data-route="how-it-works">\u4E86\u89E3\u5B8C\u6574\u6D41\u7A0B \u2192</button></div></section>
  <section class="section"><div class="section-title"><p class="kicker">EXPLORE</p><h2>\u5148\u7406\u89E3\uFF0C\u518D\u51B3\u5B9A\u5982\u4F55\u5F00\u59CB\u3002</h2></div><div class="explore-grid">${homeExplore.map((x, i) => `<article class="explore-card tone-${i + 1}" data-route="${x.id}"><div><span>${x.title}</span><h3>${x.zh}</h3><p>${x.body}</p></div><b>Learn more \u2192</b></article>`).join("")}</div></section>
  <section class="trust dark"><div><p class="kicker">SECURITY BY DESIGN</p><h2>\u771F\u6B63\u7684\u9690\u79C1\uFF0C\u4E0D\u53EA\u662F\u627F\u8BFA\u4E0D\u770B\uFF0C<br>\u800C\u662F\u8BA9\u5E73\u53F0\u6CA1\u6709\u6761\u4EF6\u5355\u72EC\u770B\u5230\u3002</h2><p>\u4F60\u7684\u6062\u590D\u8D44\u6599\u5C5E\u4E8E\u4F60\uFF0C\u5173\u952E\u63A7\u5236\u6743\u59CB\u7EC8\u7559\u5728\u4F60\u624B\u4E2D\u3002</p><p class="trust-summary">\u5E73\u53F0\u65E0\u6CD5\u5355\u72EC\u8BFB\u53D6\u3001\u65E0\u6CD5\u5355\u72EC\u6062\u590D\uFF0C\u771F\u6B63\u7684\u6062\u590D\u63A7\u5236\u6743\u59CB\u7EC8\u7559\u5728\u60A8\u624B\u4E2D\u3002</p><button class="button light" data-route="security">\u4E86\u89E3\u6211\u4EEC\u7684\u5B89\u5168\u8BBE\u8BA1 \u2192</button></div><div class="trust-list"><span><b>01\uFF5C\u5148\u52A0\u5BC6\uFF0C\u518D\u4E0A\u94FE</b><small>\u8D44\u6599\u5148\u5728\u672C\u5730\u5B8C\u6210\u52A0\u5BC6\uFF0C\u518D\u8FDB\u5165\u533A\u5757\u94FE\u957F\u671F\u5B58\u50A8\u7F51\u7EDC\uFF1B\u5E73\u53F0\u63A5\u89E6\u5230\u7684\u59CB\u7EC8\u662F\u52A0\u5BC6\u6587\u4EF6\u3002</small></span><span><b>02\uFF5C\u6062\u590D\u5BC6\u7801\u53EA\u7531\u60A8\u638C\u63E1</b><small>Recovery Password \u7531\u60A8\u672C\u4EBA\u8BBE\u7F6E\u5E76\u72EC\u7ACB\u4FDD\u7BA1\u3002${brand.brand_name} \u4E0D\u4FDD\u5B58\uFF0C\u4E5F\u65E0\u6CD5\u66FF\u60A8\u4F7F\u7528\u5BC6\u7801\u89E3\u5BC6\u8D44\u6599\u3002</small></span><span><b>03\uFF5C\u4E13\u5C5E\u6062\u590D\u7EC4\u5408\u624D\u80FD\u6253\u5F00</b><small>\u53EA\u6709\u4E13\u5C5E\u6062\u590D\u5305\u4E0E\u60A8\u7684 Recovery Password \u6B63\u786E\u5339\u914D\uFF0C\u624D\u80FD\u9A8C\u8BC1\u5E76\u6062\u590D\u8D44\u6599\u3002</small></span></div></section>
  <section class="section faq-preview"><div><p class="kicker">COMMON QUESTIONS</p><h2>\u5F00\u59CB\u524D\uFF0C\u4F60\u53EF\u80FD\u60F3\u77E5\u9053\u3002</h2><button class="text-link" data-route="help">\u67E5\u770B\u5168\u90E8\u5E2E\u52A9 \u2192</button></div><div>${[`${brand.brand_name} \u662F\u4E91\u76D8\u6216\u5BC6\u7801\u7BA1\u7406\u5668\u5417\uFF1F`, `${brand.brand_name} \u80FD\u770B\u5230\u6211\u7684 Recovery Map \u5417\uFF1F`, `\u5982\u679C ${brand.brand_name} \u672A\u6765\u505C\u6B62\u8FD0\u8425\uFF0C\u6211\u8FD8\u80FD\u6062\u590D\u5417\uFF1F`].map((q) => `<details><summary>${q}</summary><p>${q.includes("\u4E91\u76D8") ? `\u4E0D\u662F\u3002${brand.brand_name}\u7528\u4E8E\u5EFA\u7ACB\u52A0\u5BC6\u3001\u53EF\u72EC\u7ACB\u6062\u590D\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8DEF\u5F84\u3002` : q.includes("\u770B\u5230") ? "\u4E0D\u80FD\u3002\u8D44\u6599\u5148\u5728\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6\uFF0C\u5E73\u53F0\u63A5\u89E6\u5230\u7684\u662F\u52A0\u5BC6\u7248\u672C\u3002" : "\u53EF\u4EE5\u3002\u4F7F\u7528\u81EA\u5DF1\u4FDD\u5B58\u4E14\u5339\u914D\u7684\u6062\u590D\u6750\u6599\u4E0E\u5BC6\u7801\uFF0C\u53EF\u901A\u8FC7\u72EC\u7ACB\u6062\u590D\u8DEF\u5F84\u6062\u590D\u3002"}</p></details>`).join("")}</div></section>
  <section class="final-cta"><p class="kicker">YOUR NEXT STEP</p><h2>\u73B0\u5728\uFF0C\u7528\u51E0\u5206\u949F\u5F00\u59CB\u6574\u7406\u7B2C\u4E00\u9879\u6570\u5B57\u8D44\u4EA7\u3002</h2><div class="actions center-actions"><button class="button light" data-recovery-map>\u5F00\u59CB\u5EFA\u7ACBRecovery Map</button><button class="button ghost-light" data-independent-recovery>\u72EC\u7ACB\u6062\u590D</button></div></section>`;
}
var digitalAssetGroups = [
  ["01", "\u52A0\u5BC6\u8D44\u4EA7", "\u60A8\u5B58\u5728\u4EA4\u6613\u6240\u3001\u8F6F\u4EF6\u94B1\u5305\u3001\u786C\u4EF6\u94B1\u5305\u3001DeFi\u3001\u591A\u7B7E\u8D26\u6237\u53CA\u5176\u4ED6\u94FE\u4E0A\u73AF\u5883\u4E2D\u7684\u5404\u7C7B\u52A0\u5BC6\u8D44\u4EA7\u3002"],
  ["02", "\u6570\u5B57\u8EAB\u4EFD\u4E0E\u91CD\u8981\u8D26\u6237", "Google\u3001Apple\u3001\u793E\u4EA4\u5A92\u4F53\u3001GitHub\u3001AI \u670D\u52A1\u3001\u4E91\u670D\u52A1\u3001\u90AE\u7BB1\u53CA\u5176\u4ED6\u91CD\u8981\u5728\u7EBF\u8D26\u6237\u3002"],
  ["03", "\u6570\u5B57\u521B\u4F5C\u4E0E\u5185\u5BB9\u8D44\u4EA7", "\u7167\u7247\u3001\u89C6\u9891\u3001\u6587\u7AE0\u3001\u97F3\u4E50\u3001\u8BBE\u8BA1\u3001\u8BFE\u7A0B\u3001\u6570\u5B57\u4F5C\u54C1\u53CA\u957F\u671F\u79EF\u7D2F\u7684\u5185\u5BB9\u3002"],
  ["04", "\u77E5\u8BC6\u4EA7\u6743\u4E0E\u6280\u672F\u8D44\u4EA7", "\u57DF\u540D\u3001\u5546\u6807\u3001\u7248\u6743\u3001\u4E13\u5229\u3001\u8F6F\u4EF6\u3001\u4EE3\u7801\u3001\u6570\u636E\u5E93\u3001\u4EA7\u54C1\u8BBE\u8BA1\u53CA\u5176\u4ED6\u6280\u672F\u6210\u679C\u3002"],
  ["05", "\u5546\u4E1A\u4E0E\u4E13\u4E1A\u6570\u5B57\u8D44\u4EA7", "\u5BA2\u6237\u8D44\u6599\u3001\u9879\u76EE\u8D44\u6599\u3001\u4E1A\u52A1\u6D41\u7A0B\u3001\u91CD\u8981\u7CFB\u7EDF\u3001\u4E13\u4E1A\u65B9\u6CD5\u53CA\u957F\u671F\u79EF\u7D2F\u7684\u4E1A\u52A1\u77E5\u8BC6\u3002"],
  ["06", "\u4E2A\u4EBA\u6570\u5B57\u8D44\u6599\u4E0E\u8BB0\u5FC6", "\u5BB6\u5EAD\u8D44\u6599\u3001\u79C1\u4EBA\u5F71\u50CF\u3001\u8BC1\u4E66\u3001\u4E2A\u4EBA\u8BB0\u5F55\u53CA\u5176\u4ED6\u91CD\u8981\u6570\u5B57\u8D44\u6599\u3002"]
];
function digitalAssetsGuide() {
  main.innerHTML = `
  <article class="assets-guide">
    <section class="assets-intro">
      <div class="assets-intro-copy">
        <p class="kicker">DIGITAL ASSETS</p>
        <h1>\u4F60\u7684\u6570\u5B57\u8D44\u4EA7\uFF0C<br>\u53EF\u80FD\u6BD4\u4F60\u60F3\u8C61\u7684\u66F4\u591A</h1>
        <div class="assets-intro-text">
          <p>\u5F88\u591A\u6570\u5B57\u8D44\u4EA7\uFF0C\u5E73\u65F6\u53EA\u6709\u4F60\u81EA\u5DF1\u6700\u6E05\u695A\u5B83\u4EEC\u5728\u54EA\u91CC\u3001\u5982\u4F55\u4F7F\u7528\u3002</p>
          <p>\u771F\u6B63\u7684\u98CE\u9669\uFF0C\u662F\u5F53\u4F60\u4E0D\u65B9\u4FBF\u4EB2\u81EA\u5904\u7406\u3001\u9700\u8981\u7D27\u6025\u4EA4\u63A5\uFF0C\u751A\u81F3\u5DF2\u7ECF\u6CA1\u6709\u673A\u4F1A\u518D\u4ECE\u5934\u8BF4\u660E\u65F6\uFF0C\u624D\u53D1\u73B0\u8FD9\u4E9B\u91CD\u8981\u8D44\u4EA7\u548C\u6062\u590D\u7EBF\u7D22\u8FD8\u6CA1\u6709\u88AB\u6574\u7406\u6E05\u695A\u3002</p>
        </div>
        <p class="assets-emphasis">LEGAVIK \u9996\u5148\u5E2E\u52A9\u4F60\u505A\u7684\u662F\uFF0C\u91CD\u65B0\u68B3\u7406\u4E00\u6B21\u81EA\u5DF1\u7684\u6570\u5B57\u8D44\u4EA7\u3002</p>
      </div>
      <div class="assets-art" aria-hidden="true"><img src="../assets/skrek-digital-asset-map-v1.png" alt=""></div>
    </section>

    <section class="assets-categories" aria-labelledby="assets-categories-title">
      <div class="assets-section-heading"><p class="kicker">WHAT COUNTS</p><h2 id="assets-categories-title">\u6570\u5B57\u8D44\u4EA7\u7684\u8303\u56F4\uFF0C\u8FDC\u4E0D\u6B62\u4E00\u79CD\u3002</h2></div>
      <div class="assets-category-grid">${digitalAssetGroups.map(([number, title, description], index) => `<article class="assets-category ${index === 0 ? "featured" : ""}"><span>${number}</span><h3>${title}</h3><p>${description}</p></article>`).join("")}</div>
    </section>

    <section class="assets-pause"><span aria-hidden="true"></span><p>\u5728\u4ECE\u5BB9\u65F6\u51C6\u5907\uFF0C\u5728\u5173\u952E\u65F6\u4F7F\u7528\uFF0C<br>\u8FD9\u4F1A\u8BA9\u4F60\u66F4\u4ECE\u5BB9\u3002</p></section>

    <section class="assets-map-logic">
      <div><p class="kicker">RECOVERY MAP</p><h2>\u5148\u68B3\u7406\uFF0C\u518D\u5EFA\u7ACB Recovery Map</h2><p>LEGAVIK \u5E2E\u52A9\u4F60\u628A\u6563\u843D\u5728\u4E0D\u540C\u5E73\u53F0\u3001\u8D26\u6237\u3001\u8BBE\u5907\u548C\u5B58\u50A8\u7A7A\u95F4\u4E2D\u7684\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u91CD\u65B0\u68B3\u7406\u51FA\u6765\uFF0C\u5E76\u4E3A\u5B83\u4EEC\u5EFA\u7ACB\u6E05\u6670\u7684 Recovery Map\u3002</p></div>
      <ol aria-label="Recovery Map\u68B3\u7406\u987A\u5E8F">${["\u6709\u4EC0\u4E48", "\u5728\u54EA\u91CC", "\u5982\u4F55\u8FDB\u5165", "\u6062\u590D\u9700\u8981\u4EC0\u4E48", "\u5173\u952E\u8D44\u6599\u5728\u54EA\u91CC", "\u9700\u8981\u65F6\u5982\u4F55\u627E\u5230"].map((item) => `<li>${item}</li>`).join("")}</ol>
    </section>

    <section class="assets-boundary">
      <div><p class="kicker">WHAT LEGAVIK SAVES</p><h2>\u4FDD\u5B58\u7684\u662F\u6062\u590D\u7EBF\u7D22\uFF0C<br>\u4E0D\u662F\u628A\u6240\u6709\u8D44\u4EA7\u642C\u5230 LEGAVIK</h2></div>
      <div class="assets-boundary-copy"><p>\u7167\u7247\u3001\u89C6\u9891\u3001\u4EE3\u7801\u3001\u6570\u5B57\u4F5C\u54C1\u7B49\u5185\u5BB9\uFF0C\u4ECD\u7136\u53EF\u4EE5\u4FDD\u5B58\u5728\u60A8\u539F\u6765\u7684\u8BBE\u5907\u3001\u4E91\u7A7A\u95F4\u3001\u4E13\u4E1A\u5E73\u53F0\u6216\u5176\u4ED6\u5B58\u50A8\u4F4D\u7F6E\u3002</p><p>LEGAVIK \u5E2E\u52A9\u60A8\u6574\u7406\u5E76\u957F\u671F\u4FDD\u5B58\u8FD9\u4E9B\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u7684\uFF1A</p><ul>${["\u4F4D\u7F6E", "\u5165\u53E3", "\u5173\u7CFB", "\u6062\u590D\u6761\u4EF6", "\u5173\u952E\u8D44\u6599\u4F4D\u7F6E", "\u6062\u590D\u8DEF\u5F84"].map((item) => `<li>${item}</li>`).join("")}</ul><strong>LEGAVIK \u4E0D\u662F\u6570\u5B57\u8D44\u4EA7\u4E91\u5B58\u50A8\u5E73\u53F0\uFF0C\u800C\u662F\u5E2E\u52A9\u60A8\u68B3\u7406\u548C\u4FDD\u5B58\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8DEF\u5F84\u7684\u5DE5\u5177\u3002</strong></div>
    </section>

    <section class="assets-cta"><h2>\u5F00\u59CB\u6574\u7406\u5C5E\u4E8E\u4F60\u7684\u6062\u590D\u8DEF\u5F84\u3002</h2><div class="actions center-actions"><button class="button" data-recovery-map>\u5F00\u59CB\u68B3\u7406\u6211\u7684\u6570\u5B57\u8D44\u4EA7</button><button class="text-link" data-recovery-map>\u4E86\u89E3 Recovery Map \u2192</button></div></section>
  </article>`;
}
function securityPrivacyGuide() {
  main.innerHTML = `
  <article class="security-guide">
    <section class="security-intro">
      <div class="security-intro-copy">
        <p class="kicker">SECURITY &amp; PRIVACY</p>
        <h1><span>\u5B89\u5168\u4E0E\u9690\u79C1\uFF0C</span><span>\u8D2F\u7A7F\u8D44\u6599\u4FDD\u62A4\u7684\u6BCF\u4E00\u6B65</span></h1>
        <p>LEGAVIK \u901A\u8FC7\u4EA7\u54C1\u4E0E\u6280\u672F\u8BBE\u8BA1\uFF0C\u5C06\u5B89\u5168\u4E0E\u9690\u79C1\u4FDD\u62A4\u843D\u5B9E\u5230\u8D44\u6599\u4E0A\u4F20\u3001\u5B58\u50A8\u548C\u6062\u590D\u7684\u6BCF\u4E00\u4E2A\u73AF\u8282\u3002</p>
      </div>
      <div class="security-intro-index" aria-label="\u4E94\u9879\u6838\u5FC3\u5B89\u5168\u80FD\u529B">
        <span><b>01</b>\u8BBE\u5907\u5185\u5148\u5B8C\u6210\u52A0\u5BC6</span>
        <span><b>02</b>\u6838\u5FC3\u6062\u590D\u6750\u6599\u7531\u60A8\u638C\u63E1</span>
        <span><b>03</b>\u957F\u671F\u3001\u53EF\u9A8C\u8BC1\u7684\u52A0\u5BC6\u5B58\u50A8</span>
        <span><b>04</b>\u9700\u8981\u65F6\u4E3B\u52A8\u542F\u52A8\u6062\u590D</span>
        <span><b>05</b>\u9700\u8981\u5E2E\u52A9\u65F6\u83B7\u5F97\u652F\u6301</span>
      </div>
    </section>

    <section class="security-capabilities" aria-labelledby="security-capabilities-title">
      <figure class="security-capabilities-visual">
        <img src="../assets/security-privacy-visual.png" alt="LEGAVIK \u5B89\u5168\u4E0E\u9690\u79C1\u4FDD\u62A4\u793A\u610F\u56FE">
      </figure>
      <header><p class="kicker">FIVE PRINCIPLES</p><h2 id="security-capabilities-title">\u4FDD\u62A4\u65B9\u5F0F\uFF0C\u4ECE\u4E00\u5F00\u59CB\u5C31\u6E05\u6670\u3002</h2></header>
      <article class="security-capability">
        <span>01</span><div><h3>\u6240\u6709\u8D44\u6599\u5148\u52A0\u5BC6\uFF0C\u518D\u4E0A\u4F20</h3><p>\u6240\u6709\u8D44\u6599\u90FD\u4F1A\u5148\u7531 LEGAVIK \u7684\u52A0\u5BC6\u7A0B\u5E8F\u5728\u60A8\u5F53\u524D\u4F7F\u7528\u7684\u8BBE\u5907\u4E2D\u5B8C\u6210\u52A0\u5BC6\uFF0C\u518D\u4E0A\u4F20\u52A0\u5BC6\u540E\u7684\u6587\u4EF6\u3002</p><p>\u6587\u4EF6\u5B8C\u6210\u52A0\u5BC6\u540E\uFF0C\u5E73\u53F0\u65E0\u6CD5\u770B\u5230\u4EFB\u4F55\u539F\u59CB\u660E\u6587\u4FE1\u606F\u3002</p></div>
      </article>
      <article class="security-capability">
        <span>02</span><div><h3>\u6838\u5FC3\u6062\u590D\u6750\u6599\u7531\u60A8\u638C\u63E1</h3><p>\u5728 LEGAVIK \u6807\u51C6\u5957\u9910\u670D\u52A1\u4E2D\uFF0CRecovery Password\u3001Recovery Kit \u7B49\u6838\u5FC3\u6062\u590D\u6750\u6599\u7531\u5BA2\u6237\u81EA\u884C\u4FDD\u7BA1\uFF0C\u5E73\u53F0\u4E0D\u4FDD\u7559\u4EFB\u4F55\u7528\u4E8E\u89E3\u5BC6\u60A8\u8D44\u6599\u7684\u6062\u590D\u5BC6\u94A5\u3002</p><p>\u6CA1\u6709\u6B63\u786E\u7684\u6062\u590D\u5BC6\u7801\u548C\u5BF9\u5E94\u6062\u590D\u6750\u6599\uFF0C\u5373\u4F7F\u53D6\u5F97\u52A0\u5BC6\u6587\u4EF6\uFF0C\u4E5F\u65E0\u6CD5\u76F4\u63A5\u8BFB\u53D6\u6216\u6062\u590D\u5176\u4E2D\u7684\u539F\u59CB\u8D44\u6599\u3002</p><p>\u5BF9\u4E8E\u9700\u8981\u4E13\u4E1A\u534F\u52A9\u7684\u5B9A\u5236\u5316\u670D\u52A1\uFF0C\u53EF\u6839\u636E\u5BA2\u6237\u5B9E\u9645\u9700\u6C42\u8BBE\u8BA1\u76F8\u5E94\u7684\u6062\u590D\u6750\u6599\u4FDD\u7BA1\u4E0E\u6388\u6743\u65B9\u6848\u3002</p></div>
      </article>
      <article class="security-capability">
        <span>03</span><div><h3>\u957F\u671F\u3001\u53EF\u9A8C\u8BC1\u7684\u52A0\u5BC6\u5B58\u50A8</h3><p>\u5B8C\u6210\u52A0\u5BC6\u540E\u7684 Recovery Map \u4F1A\u5F62\u6210\u72EC\u7ACB\u7684\u5B58\u50A8\u8BB0\u5F55\uFF0C\u5E76\u4FDD\u5B58\u4E8E\u53BB\u4E2D\u5FC3\u5316\u6C38\u4E45\u5B58\u50A8\u7F51\u7EDC\u3002</p><p>\u5B58\u50A8\u5728\u7F51\u7EDC\u4E2D\u7684\u4ECD\u7136\u662F\u7ECF\u8FC7\u52A0\u5BC6\u5904\u7406\u7684\u6570\u636E\uFF0C\u6BCF\u4E2A Recovery Map \u90FD\u6709\u5BF9\u5E94\u7684\u5B58\u50A8\u548C\u9A8C\u8BC1\u4FE1\u606F\u3002</p><p>\u5F53\u8D44\u6599\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u60A8\u53EF\u4EE5\u968F\u65F6\u66F4\u65B0\u81EA\u5DF1\u7684 Recovery Map\u3002</p></div>
      </article>
      <article class="security-capability">
        <span>04</span><div><h3>\u9700\u8981\u65F6\uFF0C\u60A8\u53EF\u4EE5\u968F\u65F6\u901A\u8FC7\u6062\u590D\u4E2D\u5FC3\u542F\u52A8\u6062\u590D</h3><p>\u5F53\u60A8\u9700\u8981\u53D6\u56DE\u81EA\u5DF1\u7684 Recovery Map \u65F6\uFF0C\u53EF\u4EE5\u901A\u8FC7 LEGAVIK \u6062\u590D\u4E2D\u5FC3\uFF0C\u4F7F\u7528\u4E0E\u5F53\u524D\u8D44\u6599\u5BF9\u5E94\u7684\u6062\u590D\u5BC6\u7801\u548C\u6062\u590D\u6750\u6599\u542F\u52A8\u6062\u590D\u3002</p><p>\u6574\u4E2A\u6062\u590D\u8FC7\u7A0B\u7531\u60A8\u4E3B\u52A8\u53D1\u8D77\uFF0C\u5E76\u6839\u636E\u5BF9\u5E94\u7684\u6062\u590D\u4FE1\u606F\u5B8C\u6210\u8D44\u6599\u53D6\u5F97\u548C\u6062\u590D\u3002</p><p>\u6062\u590D\u8FC7\u7A0B\u4E2D\uFF0C\u7CFB\u7EDF\u4F1A\u8FDB\u884C\u5FC5\u8981\u7684\u8D44\u6599\u548C\u7248\u672C\u9A8C\u8BC1\uFF0C\u5E2E\u52A9\u60A8\u786E\u8BA4\u6062\u590D\u7684\u662F\u6B63\u786E\u5185\u5BB9\u3002</p></div>
      </article>
      <article class="security-capability">
        <span>05</span><div><h3>\u5F53\u60A8\u9700\u8981\u5E2E\u52A9\u65F6\uFF0C\u6211\u4EEC\u5C06\u968F\u65F6\u63D0\u4F9B\u76F8\u5E94\u7684\u652F\u6301</h3><p>\u6570\u5B57\u8D44\u4EA7\u7684\u6574\u7406\u548C\u6062\u590D\u53EF\u80FD\u6D89\u53CA\u4E0D\u540C\u8D26\u6237\u3001\u8BBE\u5907\u548C\u5E73\u53F0\uFF0C\u5728\u586B\u5199\u3001\u66F4\u65B0\u6216\u6062\u590D\u8FC7\u7A0B\u4E2D\u4EA7\u751F\u7591\u95EE\u5F88\u6B63\u5E38\u3002</p><p>\u6839\u636E\u60A8\u6240\u9009\u62E9\u7684\u670D\u52A1\u65B9\u6848\uFF0CLEGAVIK \u5C06\u63D0\u4F9B\u76F8\u5E94\u7684\u5BA2\u6237\u54A8\u8BE2\u3001\u64CD\u4F5C\u652F\u6301\u53CA\u4E00\u5BF9\u4E00\u6307\u5BFC\uFF0C\u5E2E\u52A9\u60A8\u66F4\u987A\u5229\u5730\u5B8C\u6210\u8D44\u6599\u6574\u7406\u3001\u66F4\u65B0\u548C\u6062\u590D\u3002</p></div>
      </article>
    </section>

    <section class="security-path" aria-labelledby="security-path-title">
      <div class="security-path-heading"><p class="kicker">PROTECTION PATH</p><h2 id="security-path-title">\u4ECE\u8D44\u6599\u51C6\u5907\uFF0C\u5230\u9700\u8981\u65F6\u6062\u590D\u3002</h2><p>\u5B89\u5168\u673A\u5236\u793A\u610F\u56FE\u5C06\u5728\u540E\u7EED\u5B8C\u5584\u3002\u5F53\u524D\u4EE5\u7B80\u6D01\u8DEF\u5F84\u8BF4\u660E\u8D44\u6599\u4E0E\u6062\u590D\u6750\u6599\u5404\u81EA\u5982\u4F55\u88AB\u4FDD\u62A4\u3002</p></div>
      <div class="security-path-lines">
        <div><strong>\u8D44\u6599\u8DEF\u5F84</strong><ol><li>\u60A8\u7684\u8D44\u6599</li><li>\u5F53\u524D\u8BBE\u5907\u5B8C\u6210\u52A0\u5BC6</li><li>\u52A0\u5BC6\u6863\u6848</li><li>\u957F\u671F\u5B58\u50A8</li></ol></div>
        <div><strong>\u6062\u590D\u8DEF\u5F84</strong><ol><li>Recovery Password / Recovery Kit / \u76F8\u5173\u6062\u590D\u6750\u6599</li><li>\u7531\u5BA2\u6237\u4FDD\u7BA1</li><li>\u9700\u8981\u65F6\u5B8C\u6210\u6062\u590D</li></ol></div>
      </div>
    </section>

    <section class="security-commitment">
      <span aria-hidden="true"></span>
      <p class="kicker">SECURITY BY DESIGN</p>
      <h2>\u60A8\u7684\u5B89\u5168\u4E0E\u9690\u79C1\uFF0C<br>\u662F LEGAVIK \u4EA7\u54C1\u8BBE\u8BA1\u7684\u4E00\u90E8\u5206\u3002</h2>
      <p class="security-commitment-lead">\u60A8\u7684\u5B89\u5168\u4E0E\u9690\u79C1\uFF0C\u6211\u4EEC\u59CB\u7EC8\u5341\u5206\u91CD\u89C6\u3002</p>
      <p>LEGAVIK \u901A\u8FC7\u4EA7\u54C1\u4E0E\u6280\u672F\u8BBE\u8BA1\uFF0C\u5C06\u5B89\u5168\u4E0E\u9690\u79C1\u4FDD\u62A4\u843D\u5B9E\u5230\u8D44\u6599\u4E0A\u4F20\u3001\u5B58\u50A8\u548C\u6062\u590D\u7684\u6BCF\u4E00\u4E2A\u73AF\u8282\u3002</p>
    </section>
  </article>`;
}
function control() {
  main.innerHTML = `<section class="page-head dark"><p class="kicker">CUSTOMER CONTROL CENTER</p><h1>${state.account ? `\u6B22\u8FCE\u56DE\u6765\uFF0C${safe(state.account.name || state.account.email)}` : "\u4F60\u7684\u6062\u590D\u51C6\u5907\u4E2D\u5FC3"}</h1><p>\u7B2C\u4E00\u773C\u770B\u6E05\u5F53\u524D\u7248\u672C\u3001\u51C6\u5907\u5EA6\u4E0E\u4E0B\u4E00\u6B65\u3002</p></section><section class="section control-grid"><div class="control-primary">${compass()}<div><p class="kicker">RECOMMENDED NEXT ACTION</p><h2>${state.assets.length ? "\u7EE7\u7EED\u5B8C\u5584Recovery Map" : "\u6DFB\u52A0\u7B2C\u4E00\u9879\u6570\u5B57\u8D44\u4EA7"}</h2><p>${state.assets.length ? `\u4F60\u5DF2\u6709${state.assets.length}\u9879\u8D44\u4EA7\uFF0C\u5EFA\u8BAE\u8865\u5145\u6062\u590D\u8BF4\u660E\u5E76\u6267\u884C\u9884\u89C8\u3002` : "\u4ECE\u4EA4\u6613\u5E73\u53F0\u3001\u94B1\u5305\u6216\u786C\u4EF6\u94B1\u5305\u5F00\u59CB\u3002"}</p><button class="button" data-route="${state.assets.length ? "map" : "digital-assets"}">\u7EE7\u7EED</button></div></div><div class="control-card"><span>Current Recovery Version</span><strong>${state.artifacts ? "Local Experience Version" : "\u5C1A\u672A\u521B\u5EFA"}</strong><small>Last updated \xB7 ${(/* @__PURE__ */ new Date()).toLocaleDateString("zh-CN")}</small></div><div class="control-card"><span>Digital Asset Completion</span><strong>${readiness()}%</strong><small>${state.assets.length}\u9879\u8D44\u4EA7</small></div><div class="control-card"><span>Trusted People</span><strong>\u89C4\u5212\u4E2D</strong><small>\u5C1A\u672A\u542F\u7528\u4EA4\u4ED8\u6216\u6CD5\u5F8B\u6D41\u7A0B</small></div><nav class="control-links"><button data-route="digital-assets">My Assets</button><button data-route="map">Recovery Map</button><button data-route="preview">Recovery Versions</button><button data-route="help">Help</button></nav></section>`;
}
function register() {
  main.innerHTML = `<section class="auth-shell"><div><p class="kicker">ACCOUNT MANAGEMENT</p><h1>\u4FDD\u5B58\u8349\u7A3F\u4E0E\u7248\u672C\u8BB0\u5F55</h1><p>\u8D26\u53F7\u7528\u4E8E\u8349\u7A3F\u7BA1\u7406\u3001\u901A\u77E5\u4E0E\u8BA2\u9605\u3002\u8D26\u53F7\u7BA1\u7406\u4E0D\u7B49\u4E8E\u5E73\u53F0\u53EF\u4EE5\u8BFB\u53D6\u4F60\u7684\u6062\u590D\u6750\u6599\u3002</p><ul><li>\u654F\u611F\u8D44\u6599\u4ECD\u5728\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6</li><li>Recovery Password\u4E0D\u4F1A\u63D0\u4EA4\u7ED9\u5E73\u53F0</li><li>2FA\u4E0ESign in with Apple\u4E3A\u540E\u7EED\u80FD\u529B</li></ul></div><form id="register-form" class="auth-card"><h2>${state.account ? "\u66F4\u65B0\u4F53\u9A8C\u8D26\u6237" : "\u521B\u5EFA\u4F53\u9A8C\u8D26\u6237"}</h2><label>\u59D3\u540D\uFF08\u53EF\u9009\uFF09<input name="name" value="${safe(state.account?.name)}"></label><label>Email<input required name="email" type="email" value="${safe(state.account?.email)}"></label><button class="button wide" type="submit">${state.account ? "\u4FDD\u5B58" : "\u521B\u5EFA\u8D26\u6237\u5E76\u7EE7\u7EED"}</button><p>\u672C\u5730\u4F53\u9A8C\u7248\u4EC5\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u4F1A\u8BDD\u4FDD\u5B58\u8D26\u53F7\u5C55\u793A\u4FE1\u606F\u3002</p></form></section>`;
}
function pricingPage() {
  const plan = pricingPlans[pricingState.plan], currency = pricingState.currency, individual = continuityPrices.individual[currency];
  const comparisonCell = (cell) => cell === "\u2713" ? '<span class="comparison-check" aria-label="\u5305\u542B">\u2713</span>' : cell === "\u2014" ? '<span class="comparison-dash" aria-label="\u4E0D\u5305\u542B">\u2014</span>' : safe(cell);
  main.innerHTML = `<article class="pricing-page">
    <header class="pricing-intro"><div><p class="kicker">PRODUCTS &amp; SERVICES</p><h1>\u9009\u62E9\u9002\u5408\u60A8\u7684 Recovery Map \u65B9\u6848</h1><p>\u6240\u6709\u9996\u5E74\u65B9\u6848\u5747\u4E3A\u4E00\u6B21\u6027\u4ED8\u8D39\uFF0C\u5E76\u5305\u542B\u5BF9\u5E94\u7684\u9996\u5E74\u670D\u52A1\u6743\u76CA\u3002</p></div></header>
    <section class="pricing-products"><div class="pricing-products-toolbar"><p class="pricing-region-note">\u6FB3\u5927\u5229\u4E9A\u5BA2\u6237\u9ED8\u8BA4\u663E\u793A\u6FB3\u5143\u4EF7\u683C\uFF0C\u5176\u4ED6\u5730\u533A\u9ED8\u8BA4\u663E\u793A\u7F8E\u5143\u4EF7\u683C\u3002\u5B9E\u9645\u4ED8\u6B3E\u65B9\u5F0F\u4EE5\u7ED3\u8D26\u9875\u9762\u652F\u6301\u7684\u9009\u9879\u4E3A\u51C6\u3002</p><div class="currency-switch" role="group" aria-label="\u9009\u62E9\u663E\u793A\u5E01\u79CD">${["USD", "AUD"].map((code) => `<button data-pricing-currency="${code}" class="${currency === code ? "active" : ""}" aria-pressed="${currency === code}">${code}</button>`).join("")}</div></div><div class="pricing-workspace">
      <nav class="pricing-plan-list" aria-label="\u4EA7\u54C1\u9009\u62E9">${publicPricingPlans.map((name) => `<button data-pricing-plan="${safe(name)}" class="${pricingState.plan === name ? "active" : ""}" aria-pressed="${pricingState.plan === name}"><span>${safe(name)}</span>${name === "Standard" ? "<small>RECOMMENDED \xB7 MOST POPULAR</small>" : ""}</button>`).join("")}</nav>
      <section class="pricing-detail">
        <div class="pricing-detail-head"><div><p class="kicker">${pricingState.plan === "Standard" ? "RECOMMENDED" : "LEGAVIK PLAN"}</p><h2>${pricingState.plan === "Legacy / Private" ? "Legacy / Private" : safe(pricingState.plan)}</h2><p>${safe(plan.positioning)}</p></div><div class="pricing-primary-price"><strong><span>${currency}</span>${pricingAmount(plan.prices[currency])}${plan.from ? "<em>\u8D77</em>" : ""}</strong><small>${plan.from ? "\u5B9A\u5236\u65B9\u6848" : "\u9996\u5E74 / \u4E00\u6B21\u6027\u4ED8\u8D39"}</small></div></div>
        <div class="pricing-value"><section><h3><span>A</span> \u9996\u5E74\u5305\u542B</h3><ul>${plan.features.map((item) => `<li>${safe(item)}</li>`).join("")}</ul></section></div>
        ${plan.from ? `<div class="pricing-action"><p>\u590D\u6742\u3001\u9AD8\u4EF7\u503C\u6216\u7279\u6B8A\u60C5\u5F62\u5C06\u6839\u636E\u5B9E\u9645\u9700\u6C42\u8BC4\u4F30\u670D\u52A1\u8303\u56F4\u3002\u76F8\u5173\u534F\u4F5C\u4E0D\u6784\u6210\u6CD5\u5F8B\u7ED3\u679C\u6216\u8D44\u4EA7\u5B89\u5168\u7ED3\u679C\u627F\u8BFA\u3002</p><button class="button" data-consultation>\u9884\u7EA6\u54A8\u8BE2</button></div>` : `<div class="pricing-action"><p>\u5F53\u524D\u6B63\u5F0F\u652F\u4ED8\u63A5\u5165\u5C1A\u672A\u542F\u7528\u3002\u73B0\u9636\u6BB5\u7EE7\u7EED\u6CBF\u7528\u73B0\u6709\u6D4B\u8BD5\u8D2D\u4E70\u4E0E\u786E\u8BA4\u6D41\u7A0B\uFF0C\u4E0D\u751F\u6210\u6B63\u5F0F\u8BA2\u5355\u6216\u4ED8\u6B3E\u8BB0\u5F55\u3002</p><button class="button" data-buy-plan="${safe(pricingState.plan)}">\u9009\u62E9 ${safe(pricingState.plan)}</button></div>`}
      </section>
    </div></section>
    <section class="pricing-comparison"><button class="pricing-comparison-toggle" data-pricing-comparison aria-expanded="${pricingState.comparisonOpen}" aria-controls="pricing-comparison-panel">${pricingState.comparisonOpen ? "\u6536\u8D77\u5B8C\u6574\u6BD4\u8F83 \u2191" : "\u67E5\u770B Essential \u4E0E Standard \u5B8C\u6574\u6BD4\u8F83 \u2193"}</button><div id="pricing-comparison-panel" class="pricing-comparison-panel${pricingState.comparisonOpen ? " open" : ""}"><div><header><p class="kicker">PLAN COMPARISON</p><h2>Essential \u4E0E Standard \u5B8C\u6574\u6BD4\u8F83</h2><p>\u6E05\u6670\u67E5\u770B\u4E24\u6863\u6807\u51C6\u65B9\u6848\u7684\u670D\u52A1\u5DEE\u5F02\u3002</p></header><div class="pricing-comparison-scroll"><table><thead><tr><th>\u529F\u80FD\u9879</th><th>Essential</th><th class="recommended-column">Standard<small>RECOMMENDED</small></th></tr></thead><tbody>${pricingComparison.map((row) => `<tr><th>${safe(row[0])}</th>${row.slice(1, 3).map((cell, column) => `<td class="${column === 1 ? "recommended-column" : ""}">${comparisonCell(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div></div></section>
    <section class="continuity-service"><header><p class="kicker">CONTINUITY \xB7 FROM YEAR 2</p><h2>\u8BA9\u60A8\u7684 Recovery Map \u6301\u7EED\u4FDD\u6301\u6700\u65B0\u3001\u7ECF\u8FC7\u68C0\u67E5\uFF0C\u5E76\u5728\u9700\u8981\u65F6\u771F\u6B63\u53EF\u6267\u884C\u3002</h2><p>\u9996\u5E74\u7684 Continuity \u670D\u52A1\u5DF2\u7ECF\u5305\u542B\u5728\u6240\u9009\u65B9\u6848\u4E2D\u3002\u7B2C\u4E8C\u5E74\u8D77\uFF0C\u901A\u8FC7\u6301\u7EED\u66F4\u65B0\u3001\u5B9A\u671F\u68C0\u67E5\u3001\u6062\u590D\u6F14\u7EC3\u548C\u4E13\u4E1A\u652F\u6301\uFF0C\u8BA9\u60A8\u7684 Recovery Map \u968F\u8D44\u4EA7\u4E0E\u6062\u590D\u6761\u4EF6\u53D8\u5316\u6301\u7EED\u4FDD\u6301\u53EF\u7528\u3002</p></header><div class="continuity-service-grid"><div><div class="continuity-service-price"><strong><span>${currency}</span>${pricingAmount(individual.monthly)}</strong><small>/ \u6708</small></div><p>\u53EF\u9009\u62E9\u5E74\u5EA6\u4ED8\u8D39\u65B9\u6848</p><ul>${continuityServiceItems.map((item) => `<li>${safe(item)}</li>`).join("")}</ul></div><aside><h3>\u7B2C\u4E8C\u5E74\u8D77\u5982\u4F55\u5EF6\u7EED</h3><p>\u9996\u5E74 Continuity \u5DF2\u5305\u542B\u3002\u9996\u6B21\u8D2D\u4E70\u65F6\u53EF\u660E\u786E\u6388\u6743\u7B2C\u4E8C\u5E74\u8D77\u81EA\u52A8\u6309\u6708\u5EF6\u7EED\uFF1B\u9996\u5E74\u53EA\u6536\u9996\u5E74\u8D39\u7528\uFF0C\u7B2C\u4E00\u5E74\u5EA6\u7ED3\u675F\u540E\u624D\u5F00\u59CB\u6708\u5EA6\u6263\u8D39\u3002</p><p>\u5230\u671F\u524D\u7EA6 30 \u5929\u53D1\u9001\u63D0\u9192\uFF0C\u5BA2\u6237\u53EF\u6309\u89C4\u5219\u53D6\u6D88\u672A\u6765\u7EED\u8BA2\u3002</p></aside></div><div class="continuity-comparison"><table><thead><tr><th>\u670D\u52A1</th><th>Continuity</th><th>\u672A\u7EED\u8BA2</th></tr></thead><tbody>${continuityComparison.map((row) => `<tr><th>${safe(row[0])}</th><td>${comparisonCell(row[1])}</td><td>${comparisonCell(row[2])}</td></tr>`).join("")}</tbody></table><p>\u5DF2\u5B8C\u6210\u5E76\u5B58\u50A8\u7684 Recovery Map \u7248\u672C\u4FDD\u7559\u539F\u6709\u6062\u590D\u7528\u9014\uFF1BContinuity \u63D0\u4F9B\u7684\u662F\u540E\u7EED\u66F4\u65B0\u3001\u68C0\u67E5\u3001\u6F14\u7EC3\u4E0E\u652F\u6301\u670D\u52A1\u3002</p></div></section>
  </article>`;
  document.querySelectorAll("[data-pricing-plan]").forEach((button) => button.onclick = () => {
    pricingState.plan = button.dataset.pricingPlan;
    pricingPage();
  });
  document.querySelectorAll("[data-pricing-currency]").forEach((button) => button.onclick = () => {
    pricingState.currency = button.dataset.pricingCurrency;
    pricingPage();
  });
  document.querySelector("[data-pricing-comparison]")?.addEventListener("click", () => {
    pricingState.comparisonOpen = !pricingState.comparisonOpen;
    pricingPage();
    document.querySelector("[data-pricing-comparison]")?.focus();
  });
  document.querySelector("[data-buy-plan]")?.addEventListener("click", (event) => {
    const selected = event.currentTarget.dataset.buyPlan, price = pricingPlans[selected].prices[pricingState.currency];
    location.href = canonicalAccountUrl("signup", { purchase: "1", plan: selected, currency: pricingState.currency, price: String(price) });
  });
  document.querySelector("[data-consultation]")?.addEventListener("click", () => navigate("help"));
}
var knowledgeTopics = [
  { id: "recovery-map", number: "01", shortTitle: "LEGAVIK \u4E0E Recovery Map", title: "LEGAVIK \u4E0E Recovery Map \u4F7F\u7528\u6307\u5357", description: "\u4ECE\u5EFA\u7ACB\u3001\u586B\u5199\u3001\u66F4\u65B0\u5230 Recovery Center\u3001Recovery Drill \u4E0E Continuity\uFF0C\u4E86\u89E3\u5982\u4F55\u5EFA\u7ACB\u548C\u7EF4\u62A4\u60A8\u7684 Recovery Map\u3002", keywords: "\u586B\u5199 \u66F4\u65B0 \u6062\u590D\u4E2D\u5FC3 \u6F14\u7EC3 \u6301\u7EED\u670D\u52A1 Recovery Map \u5E94\u8BB0\u5F55\u4EC0\u4E48 Continuity \u670D\u52A1", children: [["LEGAVIK \u5165\u95E8", "\u4E86\u89E3 LEGAVIK \u4E0E Recovery Map \u7684\u7528\u9014\u548C\u57FA\u672C\u8FB9\u754C\u3002"], ["\u5EFA\u7ACB\u524D\u51C6\u5907", "\u5F00\u59CB\u524D\u6574\u7406\u8D44\u4EA7\u8303\u56F4\u3001\u8D44\u6599\u4F4D\u7F6E\u4E0E\u6062\u590D\u76EE\u6807\u3002"], ["Recovery Map \u516D\u6A21\u5757\u8BF4\u660E", "\u7406\u89E3\u516D\u4E2A\u6A21\u5757\u5206\u522B\u89E3\u51B3\u7684\u6062\u590D\u95EE\u9898\u3002"], ["Recovery Map \u586B\u5199\u6307\u5357", "\u6309\u6A21\u5757\u8BB0\u5F55\u6E05\u6670\u3001\u53EF\u6267\u884C\u4E14\u4E0D\u66B4\u9732\u79D8\u5BC6\u7684\u4FE1\u606F\u3002"], ["\u9644\u4EF6\u4E0E\u8BF4\u660E\u6750\u6599", "\u51C6\u5907\u6709\u52A9\u4E8E\u6062\u590D\u4F46\u4E0D\u5E94\u5305\u542B\u660E\u6587\u79D8\u5BC6\u7684\u6750\u6599\u3002"], ["Review \u4E0E\u63D0\u4EA4", "\u63D0\u4EA4\u524D\u68C0\u67E5\u5B8C\u6574\u6027\u3001\u51C6\u786E\u6027\u4E0E\u505C\u6B62\u6761\u4EF6\u3002"], ["Recovery Center", "\u4E86\u89E3\u72EC\u7ACB\u6062\u590D\u5165\u53E3\u4E0E\u6062\u590D\u6750\u6599\u7684\u4F7F\u7528\u65B9\u5F0F\u3002"], ["Recovery Map \u66F4\u65B0", "\u8D44\u4EA7\u6216\u6062\u590D\u6761\u4EF6\u53D8\u5316\u540E\u66F4\u65B0\u73B0\u6709\u7248\u672C\u3002"], ["Recovery Drill", "\u901A\u8FC7\u6F14\u7EC3\u68C0\u67E5\u6062\u590D\u8DEF\u5F84\u662F\u5426\u4ECD\u7136\u53EF\u6267\u884C\u3002"], ["Continuity \u4E0E\u670D\u52A1\u652F\u6301", "\u4E86\u89E3\u6301\u7EED\u66F4\u65B0\u3001\u68C0\u67E5\u3001\u6F14\u7EC3\u4E0E\u652F\u6301\u670D\u52A1\u3002"]] },
  { id: "crypto-recovery", number: "02", shortTitle: "Crypto \u4E0E\u5E73\u53F0\u6062\u590D", title: "Crypto \u4E0E\u5E73\u53F0\u6062\u590D", description: "\u56F4\u7ED5\u4EA4\u6613\u6240\u3001\u8F6F\u4EF6\u94B1\u5305\u3001\u786C\u4EF6\u94B1\u5305\u3001Multisig\u3001DeFi \u4E0E\u5E38\u89C1 Crypto \u6062\u590D\u573A\u666F\u3002", keywords: "MetaMask \u6062\u590D Ledger \u6062\u590D \u624B\u673A\u4E22\u5931 \u4EA4\u6613\u6240 \u94B1\u5305", children: [["\u4E2D\u5FC3\u5316\u4EA4\u6613\u6240\u6062\u590D", "\u68B3\u7406\u767B\u5F55\u3001\u8EAB\u4EFD\u8BA4\u8BC1\u4E0E\u5B98\u65B9\u652F\u6301\u6240\u9700\u6761\u4EF6\u3002"], ["\u8F6F\u4EF6\u94B1\u5305\u6062\u590D", "\u7406\u89E3\u8F6F\u4EF6\u94B1\u5305\u5E38\u89C1\u6062\u590D\u6750\u6599\u4E0E\u5B89\u5168\u6B65\u9AA4\u3002"], ["\u786C\u4EF6\u94B1\u5305\u6062\u590D", "\u51C6\u5907\u8BBE\u5907\u635F\u574F\u6216\u9057\u5931\u540E\u7684\u5B98\u65B9\u6062\u590D\u8DEF\u5F84\u3002"], ["Multisig / Collaborative Wallet Recovery", "\u68B3\u7406\u591A\u65B9\u7B7E\u540D\u89D2\u8272\u3001\u9608\u503C\u4E0E\u534F\u4F5C\u6062\u590D\u6761\u4EF6\u3002"], ["DeFi \u4E0E\u94FE\u4E0A\u8D44\u4EA7\u6062\u590D", "\u8BC6\u522B\u94FE\u4E0A\u8D44\u4EA7\u5165\u53E3\u3001\u5408\u7EA6\u4EA4\u4E92\u4E0E\u6062\u590D\u4F9D\u8D56\u3002"], ["Crypto Recovery Materials", "\u7406\u89E3\u6062\u590D\u6750\u6599\u7C7B\u578B\u3001\u4FDD\u7BA1\u4F4D\u7F6E\u4E0E\u4F7F\u7528\u8FB9\u754C\u3002"], ["Crypto \u8EAB\u4EFD\u4E0E\u8BA4\u8BC1\u6062\u590D", "\u6574\u7406\u90AE\u7BB1\u30012FA\u3001\u8BBE\u5907\u4E0E\u5E73\u53F0\u8EAB\u4EFD\u9A8C\u8BC1\u8DEF\u5F84\u3002"], ["Crypto \u6062\u590D\u5B89\u5168\u4E0E\u8BC8\u9A97", "\u8BC6\u522B\u5047\u5BA2\u670D\u3001\u9493\u9C7C\u5165\u53E3\u4E0E\u6062\u590D\u8BC8\u9A97\u98CE\u9669\u3002"]] },
  { id: "security-readiness", number: "03", shortTitle: "\u5B89\u5168\u4E0E Recovery Readiness", title: "\u5B89\u5168\u4E0E Recovery Readiness", description: "\u6062\u590D\u6750\u6599\u3001\u5B89\u5168\u5907\u4EFD\u3001\u8EAB\u4EFD\u8BA4\u8BC1\u3001\u5355\u70B9\u6545\u969C\u3001\u6062\u590D\u6F14\u7EC3\u4E0E\u6570\u5B57\u8D44\u4EA7\u707E\u5907\u601D\u7EF4\u3002", keywords: "2FA \u4E22\u5931 \u5B89\u5168 \u5907\u4EFD readiness", children: [["Recovery Material \u5B89\u5168", "\u5B89\u5168\u4FDD\u7BA1\u5BC6\u7801\u3001\u6062\u590D\u6750\u6599\u4E0E\u9A8C\u8BC1\u4FE1\u606F\u3002"], ["\u5355\u70B9\u6545\u969C", "\u68C0\u67E5\u4EBA\u5458\u3001\u8BBE\u5907\u4E0E\u8D44\u6599\u4F4D\u7F6E\u7684\u5355\u4E00\u4F9D\u8D56\u3002"], ["\u8BBE\u5907\u5B89\u5168\u4E0E\u707E\u5907", "\u4E3A\u8BBE\u5907\u635F\u574F\u3001\u9057\u5931\u4E0E\u4E0D\u53EF\u7528\u60C5\u51B5\u63D0\u524D\u51C6\u5907\u3002"], ["\u8EAB\u4EFD\u8BA4\u8BC1\u6062\u590D", "\u68B3\u7406 2FA\u3001Passkey\u3001\u90AE\u7BB1\u4E0E\u5907\u7528\u8BA4\u8BC1\u65B9\u5F0F\u3002"], ["\u6570\u636E\u4E0E\u9644\u4EF6\u5B89\u5168", "\u964D\u4F4E\u9644\u4EF6\u3001\u5907\u4EFD\u548C\u8D44\u6599\u4F20\u8F93\u4E2D\u7684\u66B4\u9732\u98CE\u9669\u3002"], ["\u6062\u590D\u4EBA / \u534F\u52A9\u4EBA\u5B89\u5168", "\u660E\u786E\u534F\u52A9\u8FB9\u754C\u3001\u8EAB\u4EFD\u6838\u9A8C\u4E0E\u505C\u6B62\u6761\u4EF6\u3002"], ["Recovery Readiness", "\u8BC4\u4F30\u5F53\u524D\u6062\u590D\u51C6\u5907\u662F\u5426\u5B8C\u6574\u4E14\u53EF\u6267\u884C\u3002"], ["Recovery Drill", "\u5728\u4E0D\u66B4\u9732\u79D8\u5BC6\u7684\u524D\u63D0\u4E0B\u9A8C\u8BC1\u6062\u590D\u8DEF\u5F84\u3002"], ["\u6062\u590D\u8FC7\u7A0B\u5B89\u5168", "\u5728\u771F\u5B9E\u6062\u590D\u671F\u95F4\u8BC6\u522B\u98CE\u9669\u5E76\u4FDD\u6301\u53EF\u9A8C\u8BC1\u64CD\u4F5C\u3002"]] },
  { id: "digital-assets", number: "04", shortTitle: "\u6570\u5B57\u8D44\u4EA7\u4E0E\u8D26\u6237", title: "\u6570\u5B57\u8D44\u4EA7\u4E0E\u8D26\u6237", description: "\u6570\u5B57\u8EAB\u4EFD\u3001\u90AE\u7BB1\u3001\u4E91\u670D\u52A1\u3001\u57DF\u540D\u3001\u5F00\u53D1\u8005\u8D26\u6237\u3001AI\u8D26\u6237\u53CA\u5176\u4ED6\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u3002", keywords: "\u8D26\u6237 \u90AE\u7BB1 \u4E91\u670D\u52A1 \u57DF\u540D GitHub", children: [["\u6570\u5B57\u8EAB\u4EFD", "\u68B3\u7406\u4E0E\u4E2A\u4EBA\u6216\u4E1A\u52A1\u8EAB\u4EFD\u76F8\u5173\u7684\u91CD\u8981\u6570\u5B57\u5165\u53E3\u3002"], ["Email", "\u8BB0\u5F55\u90AE\u7BB1\u6062\u590D\u5165\u53E3\u3001\u9A8C\u8BC1\u65B9\u5F0F\u4E0E\u5173\u8054\u8D26\u6237\u3002"], ["Cloud Storage", "\u68B3\u7406\u4E91\u7AEF\u8D44\u6599\u3001\u8BBF\u95EE\u6761\u4EF6\u4E0E\u6062\u590D\u8DEF\u5F84\u3002"], ["Apple / Google \u751F\u6001", "\u7406\u89E3\u8BBE\u5907\u8D26\u6237\u3001\u5907\u4EFD\u4E0E\u751F\u6001\u6062\u590D\u4F9D\u8D56\u3002"], ["Domain / Website", "\u6574\u7406\u57DF\u540D\u3001\u7F51\u7AD9\u3001\u6258\u7BA1\u4E0E\u7BA1\u7406\u6743\u9650\u3002"], ["Developer Assets", "\u8BB0\u5F55\u4EE3\u7801\u4ED3\u5E93\u3001\u5F00\u53D1\u5E73\u53F0\u4E0E\u5173\u952E\u670D\u52A1\u5165\u53E3\u3002"], ["AI Accounts", "\u68B3\u7406 AI \u670D\u52A1\u8D26\u6237\u3001\u6570\u636E\u4E0E\u8BBF\u95EE\u6062\u590D\u6761\u4EF6\u3002"], ["\u793E\u4EA4\u4E0E\u901A\u4FE1\u8D26\u6237", "\u6574\u7406\u91CD\u8981\u793E\u4EA4\u3001\u901A\u4FE1\u4E0E\u8054\u7CFB\u4EBA\u6062\u590D\u65B9\u5F0F\u3002"], ["\u5546\u4E1A\u4E0E\u4E13\u4E1A\u6570\u5B57\u8D44\u4EA7", "\u8BB0\u5F55\u4E1A\u52A1\u7CFB\u7EDF\u3001\u4E13\u4E1A\u8D44\u6599\u4E0E\u5173\u952E\u6570\u5B57\u6743\u76CA\u3002"], ["\u4ED8\u8D39\u8D26\u6237\u4E0E\u8BA2\u9605", "\u68B3\u7406\u81EA\u52A8\u6263\u8D39\u3001\u5468\u671F\u8BA2\u9605\u3001\u652F\u4ED8\u65B9\u5F0F\uFF0C\u4EE5\u53CA\u672A\u6765\u9700\u8981\u505C\u6B62\u6216\u4FDD\u7559\u7684\u670D\u52A1\u3002"]] },
  { id: "questions", number: "05", shortTitle: "\u95EE\u7B54\u4E2D\u5FC3", title: "\u95EE\u7B54\u4E2D\u5FC3", description: "\u56F4\u7ED5 LEGAVIK\u3001Recovery Map\u3001\u6062\u590D\u3001\u5B89\u5168\u3001\u4EF7\u683C\u3001Continuity\u3001\u8D26\u6237\u4E0E\u652F\u6301\u7684\u5E38\u89C1\u95EE\u9898\u3002", keywords: "FAQ \u95EE\u9898 \u4EF7\u683C Continuity", children: [["\u5173\u4E8E LEGAVIK", "\u4E86\u89E3\u4EA7\u54C1\u5B9A\u4F4D\u3001\u670D\u52A1\u8303\u56F4\u4E0E\u4F7F\u7528\u8FB9\u754C\u3002"], ["Recovery Map \u586B\u5199", "\u67E5\u770B\u586B\u5199\u5185\u5BB9\u4E0E\u5E38\u89C1\u64CD\u4F5C\u95EE\u9898\u3002"], ["Recovery Map \u66F4\u65B0", "\u4E86\u89E3\u4F55\u65F6\u66F4\u65B0\u4EE5\u53CA\u5982\u4F55\u7EF4\u62A4\u5DF2\u6709\u7248\u672C\u3002"], ["\u6062\u590D\u4E0E Recovery Center", "\u67E5\u770B\u6062\u590D\u5165\u53E3\u3001\u6750\u6599\u4E0E\u64CD\u4F5C\u95EE\u9898\u3002"], ["\u5B89\u5168\u4E0E\u9690\u79C1", "\u4E86\u89E3\u52A0\u5BC6\u3001\u4FDD\u7BA1\u548C\u9690\u79C1\u4FDD\u62A4\u539F\u5219\u3002"], ["\u4EA7\u54C1\u4E0E\u4EF7\u683C", "\u67E5\u770B\u65B9\u6848\u3001\u4EF7\u683C\u548C\u9996\u5E74\u670D\u52A1\u95EE\u9898\u3002"], ["Continuity", "\u4E86\u89E3\u7B2C\u4E8C\u5E74\u8D77\u7684\u66F4\u65B0\u3001\u68C0\u67E5\u4E0E\u652F\u6301\u3002"], ["Account & Billing", "\u67E5\u770B\u8D26\u6237\u3001\u4ED8\u6B3E\u4E0E\u8D26\u5355\u76F8\u5173\u95EE\u9898\u3002"], ["Support", "\u4E86\u89E3\u5E2E\u52A9\u5165\u53E3\u4E0E\u4EBA\u5DE5\u652F\u6301\u65B9\u5F0F\u3002"]] }
];
var knowledgeState = { openTopic: null, returnTopic: null, returnScrollY: 0, topicPages: {} };
var knowledgeQuestions = [
  { title: "Recovery Map \u5E94\u8BE5\u8BB0\u5F55\u54EA\u4E9B\u4FE1\u606F\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u5EFA\u8BAE\u5148\u8BB0\u5F55\u8D44\u4EA7\u5165\u53E3\u3001\u6062\u590D\u6761\u4EF6\u3001\u8D44\u6599\u4F4D\u7F6E\u3001\u6062\u590D\u6B65\u9AA4\u3001\u534F\u52A9\u5173\u7CFB\u4E0E\u5FC5\u8981\u5631\u6258\uFF1B\u4E0D\u8981\u628A\u5B83\u5F53\u4F5C\u79D8\u5BC6\u660E\u6587\u4ED3\u5E93\u3002", keywords: "\u586B\u5199 \u8BB0\u5F55" },
  { title: "Seed phrase \u662F\u5426\u5E94\u8BE5\u76F4\u63A5\u8BB0\u5F55\u5728 Recovery Map \u4E2D\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u4E0D\u5EFA\u8BAE\u76F4\u63A5\u8BB0\u5F55 Seed phrase\u3001\u79C1\u94A5\u3001\u5B8C\u6574\u5BC6\u7801\u6216\u4E00\u6B21\u6027\u9A8C\u8BC1\u7801\uFF1B\u5E94\u8BB0\u5F55\u5B89\u5168\u4FDD\u7BA1\u4F4D\u7F6E\u4E0E\u6062\u590D\u6761\u4EF6\u3002", keywords: "\u52A9\u8BB0\u8BCD \u79C1\u94A5 \u5B89\u5168" },
  { title: "MetaMask \u6240\u5728\u624B\u673A\u4E22\u5931\u540E\uFF0C\u5E94\u8BE5\u4ECE\u54EA\u91CC\u5F00\u59CB\u6062\u590D\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u5EFA\u8BAE\u5148\u786E\u8BA4\u53EF\u7528\u6062\u590D\u6750\u6599\u3001\u5B98\u65B9\u5E94\u7528\u5165\u53E3\u3001\u76EE\u6807\u94B1\u5305\u5730\u5740\u548C\u5B89\u5168\u8BBE\u5907\uFF0C\u518D\u6309\u5B98\u65B9\u6062\u590D\u8DEF\u5F84\u64CD\u4F5C\u3002", keywords: "MetaMask \u624B\u673A\u4E22\u5931 \u8F6F\u4EF6\u94B1\u5305" },
  { title: "Ledger \u8BBE\u5907\u635F\u574F\u540E\uFF0C\u6062\u590D\u901A\u5E38\u9700\u8981\u4EC0\u4E48\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u5EFA\u8BAE\u5148\u6838\u5BF9\u6062\u590D\u77ED\u8BED\u7684\u5B89\u5168\u4FDD\u7BA1\u72B6\u6001\u3001\u66FF\u4EE3\u786C\u4EF6\u4E0E Ledger \u5B98\u65B9\u6062\u590D\u8BF4\u660E\uFF0C\u907F\u514D\u5411\u4EFB\u4F55\u4EBA\u900F\u9732\u6062\u590D\u77ED\u8BED\u3002", keywords: "Ledger \u786C\u4EF6\u94B1\u5305 \u635F\u574F" },
  { title: "2FA \u4E22\u5931\u4EE5\u540E\uFF0C\u8D26\u6237\u6062\u590D\u5E94\u8BE5\u5148\u68C0\u67E5\u4EC0\u4E48\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u5EFA\u8BAE\u5148\u68C0\u67E5\u5907\u7528\u4EE3\u7801\u3001\u5DF2\u767B\u5F55\u8BBE\u5907\u3001\u5B98\u65B9\u8EAB\u4EFD\u9A8C\u8BC1\u6D41\u7A0B\u548C\u8D26\u6237\u7ED1\u5B9A\u90AE\u7BB1\uFF0C\u907F\u514D\u901A\u8FC7\u975E\u5B98\u65B9\u8054\u7CFB\u4EBA\u64CD\u4F5C\u3002", keywords: "2FA \u4E22\u5931 \u8D26\u6237\u6062\u590D" },
  { title: "Recovery Drill \u662F\u4EC0\u4E48\uFF0C\u4E3A\u4EC0\u4E48\u9700\u8981\u5B9A\u671F\u8FDB\u884C\uFF1F", answer: "\u5F53\u524D\u77E5\u8BC6\u5E93\u5C06 Recovery Drill \u5B9A\u4E49\u4E3A\u4E0D\u66B4\u9732\u79D8\u5BC6\u7684\u6062\u590D\u8DEF\u5F84\u6F14\u7EC3\uFF0C\u7528\u4E8E\u68C0\u67E5\u8D44\u6599\u4F4D\u7F6E\u3001\u6761\u4EF6\u4E0E\u6B65\u9AA4\u662F\u5426\u4ECD\u7136\u53EF\u6267\u884C\u3002", keywords: "\u6F14\u7EC3 readiness" }
];
var knowledgeGuides = [
  { category: "\u786C\u4EF6\u94B1\u5305", title: "Ledger \u8BBE\u5907\u65E0\u6CD5\u6B63\u5E38\u4F7F\u7528\u65F6\uFF0C\u5E94\u5982\u4F55\u5F00\u59CB\u6062\u590D\uFF1F", summary: "\u4ECE\u6062\u590D\u6750\u6599\u3001\u66FF\u4EE3\u8BBE\u5907\u548C\u5B98\u65B9\u8DEF\u5F84\u5F00\u59CB\u5EFA\u7ACB\u5B89\u5168\u68C0\u67E5\u987A\u5E8F\u3002", minutes: "5 min", updated: "2026-08-18", keywords: "Ledger \u6062\u590D \u786C\u4EF6\u94B1\u5305" },
  { category: "\u8F6F\u4EF6\u94B1\u5305", title: "MetaMask \u624B\u673A\u4E22\u5931\u540E\u7684\u6062\u590D\u51C6\u5907\u6E05\u5355", summary: "\u5148\u786E\u8BA4\u6062\u590D\u6750\u6599\u3001\u94B1\u5305\u5730\u5740\u4E0E\u53EF\u4FE1\u8BBE\u5907\uFF0C\u518D\u8FDB\u5165\u5B98\u65B9\u6062\u590D\u6D41\u7A0B\u3002", minutes: "5 min", updated: "2026-08-17", keywords: "MetaMask \u624B\u673A\u4E22\u5931 \u6062\u590D" },
  { category: "\u4EA4\u6613\u6240", title: "\u4E2D\u5FC3\u5316\u4EA4\u6613\u6240\u8D26\u6237\u65E0\u6CD5\u767B\u5F55\u65F6\uFF0C\u5E94\u5148\u68C0\u67E5\u54EA\u4E9B\u6062\u590D\u6761\u4EF6\uFF1F", summary: "\u68B3\u7406\u90AE\u7BB1\u30012FA\u3001\u8EAB\u4EFD\u9A8C\u8BC1\u3001\u5DF2\u767B\u5F55\u8BBE\u5907\u4E0E\u5B98\u65B9\u652F\u6301\u5165\u53E3\u3002", minutes: "6 min", updated: "2026-08-15", keywords: "\u4EA4\u6613\u6240 \u65E0\u6CD5\u767B\u5F55 2FA" },
  { category: "Recovery Readiness", title: "\u5982\u4F55\u68C0\u67E5\u81EA\u5DF1\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8BA1\u5212\u662F\u5426\u5B58\u5728\u5355\u70B9\u6545\u969C\uFF1F", summary: "\u68C0\u67E5\u5173\u952E\u8D44\u6599\u3001\u8BBE\u5907\u3001\u4EBA\u5458\u4E0E\u9A8C\u8BC1\u6B65\u9AA4\u662F\u5426\u8FC7\u5EA6\u4F9D\u8D56\u5355\u4E00\u5165\u53E3\u3002", minutes: "7 min", updated: "2026-08-12", keywords: "\u5355\u70B9\u6545\u969C \u5B89\u5168 \u5907\u4EFD" }
];
var knowledgeRecent = [
  { title: "Recovery Map \u586B\u5199\u524D\u7684\u8D44\u6599\u51C6\u5907\u6E05\u5355", category: "\u4F7F\u7528\u6307\u5357", updated: "2026-08-19" },
  { title: "2FA \u5907\u7528\u4EE3\u7801\u5E94\u5982\u4F55\u5B89\u5168\u4FDD\u7BA1\uFF1F", category: "\u5B89\u5168\u4E0E\u51C6\u5907\u5EA6", updated: "2026-08-18" },
  { title: "\u786C\u4EF6\u94B1\u5305\u6062\u590D\u524D\u7684\u505C\u6B62\u6761\u4EF6", category: "Crypto \u4E0E\u5E73\u53F0\u6062\u590D", updated: "2026-08-16" },
  { title: "Continuity \u5982\u4F55\u652F\u6301\u6301\u7EED\u66F4\u65B0\u4E0E\u68C0\u67E5\uFF1F", category: "\u4EA7\u54C1\u4E0E\u670D\u52A1", updated: "2026-08-14" }
];
var productKnowledge = globalThis.SKREK_PRODUCT_KNOWLEDGE || [];
var approvedKnowledge = globalThis.SKREK_APPROVED_KNOWLEDGE || [];
var publishedKnowledge = [...productKnowledge, ...approvedKnowledge];
var cryptoTopic = knowledgeTopics.find((item) => item.id === "crypto-recovery");
if (cryptoTopic) cryptoTopic.children = approvedKnowledge.filter((item) => item.domain === "crypto-v1").map((item) => [item.title, `${item.category} \xB7 ${item.summary}`]);
function recordKnowledgeSearchEvent({ query, timestamp, language, resultCount, clickedResult = null, noResult }) {
  return { query, timestamp, language, resultCount, clickedResult, noResult };
}
function knowledgeNormalize(value) {
  return String(value || "").toLocaleLowerCase("zh-CN").replace(/丢了|忘了/g, "\u9057\u5931").replace(/丢失/g, "\u9057\u5931").replace(/假客服/g, "\u865A\u5047\u5BA2\u670D").replace(/unavailable/g, "\u4E0D\u53EF\u7528").replace(/lost/g, "\u9057\u5931").replace(/forgot(?:ten)?/g, "\u9057\u5931").replace(/frozen/g, "\u51BB\u7ED3").replace(/customer service/g, "\u5BA2\u670D").replace(/\s+/g, " ").trim();
}
function knowledgeTerms(value) {
  const normalized = knowledgeNormalize(value), terms = new Set(normalized.match(/[a-z0-9]+(?:[-_/][a-z0-9]+)*/g) || []);
  for (const part of normalized.match(/[\u3400-\u9fff]+/g) || []) {
    if (part.length === 1) terms.add(part);
    else for (let index = 0; index < part.length - 1; index++) terms.add(part.slice(index, index + 2));
  }
  return [...terms];
}
function knowledgeScore(item, query) {
  const terms = knowledgeTerms(query);
  if (!terms.length) return 0;
  const summary = item.summary || item.answer || item.description, fields = [[item.title, 10], [summary, 6], [item.keywords, 5], [item.tags, 5], [item.platform, 4], [item.category, 4], [item.relatedKnowledge, 3], [item.searchText || item.markdown, 1]];
  let score = item.type === "\u77E5\u8BC6\u6587\u7AE0" ? 12 : 0, matched = 0;
  for (const term of terms) {
    let termScore = 0;
    for (const [value, weight] of fields) if (knowledgeNormalize(Array.isArray(value) ? value.join(" ") : value).includes(term)) termScore = Math.max(termScore, weight);
    if (termScore) {
      matched++;
      score += termScore;
    }
  }
  if (knowledgeNormalize(`${item.title || ""} ${summary || ""}`).includes(knowledgeNormalize(query))) score += 30;
  return matched >= Math.max(1, Math.ceil(terms.length * 0.35)) ? score : 0;
}
function knowledgeSearch(query) {
  if (!query.trim()) return [];
  const entries = [...knowledgeTopics.map((item) => ({ ...item, type: "\u4E3B\u9898" })), ...knowledgeQuestions.map((item) => ({ ...item, type: "\u70ED\u95E8\u95EE\u9898" })), ...knowledgeGuides.map((item) => ({ ...item, type: "\u7CBE\u9009\u6307\u5357" })), ...publishedKnowledge.map((item) => ({ ...item, type: "\u77E5\u8BC6\u6587\u7AE0", summary: item.summary || item.markdown.split("\n\n")[1] || "" }))];
  return entries.map((item) => ({ ...item, relevance: knowledgeScore(item, query) })).filter((item) => item.relevance > 0).sort((left, right) => right.relevance - left.relevance || left.title.localeCompare(right.title, "zh-CN"));
}
function renderKnowledgeResults(query) {
  const target = document.querySelector("#knowledge-search-results");
  if (!target) return;
  const results = knowledgeSearch(query), visible = results.slice(0, 5);
  recordKnowledgeSearchEvent({ query, timestamp: (/* @__PURE__ */ new Date()).toISOString(), language: "zh-CN", resultCount: results.length, clickedResult: null, noResult: results.length === 0 });
  target.hidden = false;
  target.innerHTML = results.length ? `<div class="knowledge-results-head"><strong>\u627E\u5230 ${results.length} \u6761\u76F8\u5173\u5185\u5BB9</strong><span>\u5173\u952E\u8BCD\uFF1A${safe(query)}</span></div><div class="knowledge-result-list">${visible.map((item) => `<article><div><h3>${safe(item.title)}</h3><span>${safe(item.category || item.type)} \xB7 ${safe(item.type)}</span><p>${safe(item.description || item.answer || item.summary)}</p></div><button data-knowledge-result="${safe(item.title)}">\u67E5\u770B\u7B54\u6848 \u2192</button></article>`).join("")}</div>${results.length > visible.length ? '<button class="knowledge-results-all">\u67E5\u770B\u5168\u90E8\u641C\u7D22\u7ED3\u679C \u2192</button>' : ""}` : `<div class="knowledge-empty"><h2>\u6CA1\u6709\u627E\u5230\u5B8C\u5168\u5339\u914D\u7684\u7B54\u6848\u3002</h2><a href="#help">\u83B7\u53D6\u5E2E\u52A9 \u2192</a></div>`;
  target.querySelectorAll("[data-knowledge-result]").forEach((button) => button.addEventListener("click", () => {
    recordKnowledgeSearchEvent({ query, timestamp: (/* @__PURE__ */ new Date()).toISOString(), language: "zh-CN", resultCount: results.length, clickedResult: button.dataset.knowledgeResult, noResult: false });
    if (publishedKnowledge.some((item) => item.title === button.dataset.knowledgeResult)) knowledgeArticlePage(button.dataset.knowledgeResult);
  }));
}
function knowledgeInline(text3) {
  return safe(text3).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>').replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
function knowledgeArticleBody(article) {
  let section = "", html = "", internalSection = false;
  const lines = article.markdown.split("\n");
  for (let index = 0; index < lines.length; ) {
    const line = lines[index].trim();
    if (!line) {
      index++;
      continue;
    }
    if (line.startsWith("## ")) {
      section = line.slice(3);
      internalSection = ["\u76F8\u5173 Recovery Map \u6A21\u5757", "Related Recovery Map Module", "Internal Knowledge / AI Retrieval Metadata", "Needs Review"].includes(section);
      if (!internalSection) html += `<section><h2>${knowledgeInline(section)}</h2>`;
      index++;
      continue;
    }
    if (internalSection) {
      index++;
      continue;
    }
    if (line.startsWith("### ")) {
      html += `<h3>${knowledgeInline(line.slice(4))}</h3>`;
      index++;
      continue;
    }
    if (line.startsWith("#### ")) {
      html += `<h4>${knowledgeInline(line.slice(5))}</h4>`;
      index++;
      continue;
    }
    if (/^\|.*\|$/.test(line) && /^\|(?:\s*:?-+:?\s*\|)+$/.test((lines[index + 1] || "").trim())) {
      const cells = (value) => value.trim().slice(1, -1).split("|").map((cell) => cell.trim()), headers = cells(line), rows = [];
      index += 2;
      while (index < lines.length && /^\|.*\|$/.test(lines[index].trim())) rows.push(cells(lines[index++]));
      html += `<div class="knowledge-table-scroll"><table><thead><tr>${headers.map((cell) => `<th>${knowledgeInline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${knowledgeInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      continue;
    }
    if (/^[-] /.test(line)) {
      const items = [];
      while (index < lines.length && /^[-] /.test(lines[index].trim())) items.push(lines[index++].trim().slice(2));
      html += "<ul>" + items.map((item) => {
        const related = section === "\u76F8\u5173\u77E5\u8BC6" && publishedKnowledge.some((articleItem) => articleItem.title === item);
        return related ? `<li><button data-knowledge-article="${safe(item)}">${knowledgeInline(item)} \u2192</button></li>` : `<li>${knowledgeInline(item)}</li>`;
      }).join("") + "</ul>";
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) items.push(lines[index++].trim().replace(/^\d+\. /, ""));
      html += "<ol>" + items.map((item) => `<li>${knowledgeInline(item)}</li>`).join("") + "</ol>";
      continue;
    }
    if (line === "---") {
      index++;
      continue;
    }
    html += `<p>${knowledgeInline(line)}</p>`;
    index++;
  }
  return html.replace(/<section>/g, "</section><section>").replace(/^<\/section>/, "") + "</section>";
}
function knowledgeScrollTo(top) {
  window.scrollTo(0, top);
}
function knowledgeArticlePage(title, rememberPosition = true) {
  const article = publishedKnowledge.find((item) => item.title === title);
  if (!article) return;
  if (rememberPosition && document.querySelector(".knowledge-page")) {
    knowledgeState.returnTopic = knowledgeState.openTopic;
    knowledgeState.returnScrollY = window.scrollY;
  }
  const returnLabel = article.domain === "crypto-v1" ? "Crypto \u4E0E\u5E73\u53F0\u6062\u590D" : "LEGAVIK \u4E0E Recovery Map \u4F7F\u7528\u6307\u5357";
  main.innerHTML = `<article class="knowledge-article-page"><header><h1>${safe(article.title)}</h1><button class="knowledge-article-back">\u2190 \u8FD4\u56DE ${returnLabel}</button></header><div class="knowledge-article-body">${knowledgeArticleBody(article)}</div></article>`;
  knowledgeScrollTo(0);
  document.querySelector(".knowledge-article-back")?.addEventListener("click", () => {
    const topic = knowledgeState.returnTopic, top = knowledgeState.returnScrollY;
    knowledgeBasePage();
    bind();
    if (topic) {
      knowledgeState.openTopic = topic;
      const row = document.querySelector(`[data-topic="${topic}"]`);
      row?.querySelector(".knowledge-topic-toggle")?.setAttribute("aria-expanded", "true");
      if (row?.querySelector(".knowledge-topic-panel")) row.querySelector(".knowledge-topic-panel").hidden = false;
    }
    knowledgeScrollTo(top);
  });
  document.querySelectorAll("[data-knowledge-article]").forEach((button) => button.addEventListener("click", () => knowledgeArticlePage(button.dataset.knowledgeArticle, false)));
}
var KNOWLEDGE_TOPIC_PAGE_SIZE = 10;
function knowledgeSubtopicMarkup(item, page = 1) {
  const totalPages = Math.ceil(item.children.length / KNOWLEDGE_TOPIC_PAGE_SIZE), currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1)), start = (currentPage - 1) * KNOWLEDGE_TOPIC_PAGE_SIZE, visible = item.children.slice(start, start + KNOWLEDGE_TOPIC_PAGE_SIZE);
  return `<div class="knowledge-subtopic-list">${visible.map(([title, description], index) => `<button data-knowledge-subtopic="${safe(title)}"><span>${String(start + index + 1).padStart(2, "0")}</span><div><strong>${safe(title)}</strong><p>${safe(description)}</p></div><b>\u67E5\u770B \u2192</b></button>`).join("")}</div>${totalPages > 1 ? `<nav class="knowledge-topic-pagination" aria-label="${safe(item.title)} \u5206\u9875"><span>\u5171 ${item.children.length} \u6761</span><div><button data-knowledge-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>\u4E0A\u4E00\u9875</button>${Array.from({ length: totalPages }, (_, index) => `<button data-knowledge-page="${index + 1}" ${index + 1 === currentPage ? 'aria-current="page"' : ""}>${index + 1}</button>`).join("")}<button data-knowledge-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>\u4E0B\u4E00\u9875</button></div></nav>` : ""}`;
}
function knowledgeBasePage() {
  knowledgeState.openTopic = null;
  main.innerHTML = `<article class="knowledge-page">
  <header class="knowledge-hero"><div><p class="kicker">KNOWLEDGE BASE</p><h1>\u627E\u5230\u6E05\u6670\u3001\u53EF\u4FE1\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u7B54\u6848\u3002</h1><p>\u4ECE Recovery Map\u3001\u94B1\u5305\u4E0E\u4EA4\u6613\u6240\u6062\u590D\uFF0C\u5230\u5B89\u5168\u3001\u6062\u590D\u51C6\u5907\u548C\u6570\u5B57\u8D44\u4EA7\u7BA1\u7406\uFF0CLEGAVIK \u6301\u7EED\u6574\u7406\u6E05\u6670\u3001\u53EF\u6267\u884C\u7684\u6062\u590D\u77E5\u8BC6\u3002</p><form class="knowledge-search" role="search"><span aria-hidden="true">\u2315</span><input name="query" aria-label="\u641C\u7D22\u77E5\u8BC6\u5E93" placeholder="\u641C\u7D22\u60A8\u5173\u5FC3\u7684\u95EE\u9898\uFF0C\u4F8B\u5982\uFF1AMetaMask \u624B\u673A\u4E22\u5931\u540E\u5982\u4F55\u6062\u590D\uFF1F"><button type="submit">\u641C\u7D22</button></form><nav class="knowledge-quick" aria-label="\u77E5\u8BC6\u5206\u7C7B\u5FEB\u6377\u5165\u53E3">${knowledgeTopics.map((item) => `<button data-knowledge-topic-link="${item.id}">${safe(item.shortTitle)}</button>`).join("")}</nav><a class="knowledge-hero-help" href="#help">\u6CA1\u6709\u627E\u5230\u7B54\u6848\uFF1F\u83B7\u53D6\u5E2E\u52A9 \u2192</a><section id="knowledge-search-results" class="knowledge-search-results" hidden aria-live="polite"></section></div></header>
  <section class="knowledge-section knowledge-browse"><header><p class="kicker">BROWSE BY TOPIC</p><h2>\u6309\u4E3B\u9898\u6D4F\u89C8</h2><p>\u5C55\u5F00\u4E00\u7EA7\u4E3B\u9898\uFF0C\u67E5\u770B\u53EF\u6301\u7EED\u6269\u5C55\u7684\u4E8C\u7EA7\u77E5\u8BC6\u76EE\u5F55\u3002</p></header><div class="knowledge-topic-list">${knowledgeTopics.map((item) => `<article class="knowledge-topic-row" data-topic="${item.id}"><button class="knowledge-topic-toggle" data-knowledge-topic="${item.id}" aria-expanded="false" aria-controls="knowledge-topic-${item.id}"><span>${item.number}</span><div><h3>${safe(item.title)}</h3><p>${safe(item.description)}</p></div><b aria-hidden="true">\u2304</b></button><div id="knowledge-topic-${item.id}" class="knowledge-topic-panel" hidden>${knowledgeSubtopicMarkup(item, knowledgeState.topicPages[item.id] || 1)}</div></article>`).join("")}</div></section>
  <section class="knowledge-section knowledge-popular"><header><p class="kicker">POPULAR QUESTIONS \xB7 Q&amp;A</p><h2>\u70ED\u95E8\u95EE\u9898</h2><p>\u95EE\u7B54\u4E2D\u5FC3\u7684\u7CBE\u9009\u5165\u53E3\uFF0C\u5148\u56DE\u7B54\u6700\u5E38\u89C1\u7684\u586B\u5199\u3001\u6062\u590D\u4E0E\u5B89\u5168\u95EE\u9898\u3002</p></header><div class="knowledge-question-list">${knowledgeQuestions.map((item, index) => `<details><summary><span>0${index + 1}</span>${safe(item.title)}</summary><div><p>${safe(item.answer)}</p></div></details>`).join("")}</div><button class="knowledge-all-questions" data-open-questions>\u67E5\u770B\u5168\u90E8\u95EE\u7B54 \u2192</button></section>
  <section class="knowledge-section knowledge-recent"><header><p class="kicker">RECENTLY UPDATED</p><h2>\u6700\u8FD1\u66F4\u65B0</h2></header><div>${knowledgeRecent.map((item) => `<article><h3>${safe(item.title)}</h3><span>${safe(item.category)}</span><time datetime="${item.updated}">Updated ${item.updated}</time></article>`).join("")}</div></section>
  <section id="help" class="knowledge-help"><div><p class="kicker">LEGAVIK SUPPORT</p><h2>\u6CA1\u6709\u627E\u5230\u60A8\u9700\u8981\u7684\u7B54\u6848\uFF1F</h2><p>\u767B\u5F55\u5BA2\u6237\u53EF\u4EE5\u8FDB\u5165\u5E2E\u52A9\u5165\u53E3\uFF0C\u6216\u8054\u7CFB LEGAVIK Support \u83B7\u53D6\u8FDB\u4E00\u6B65\u534F\u52A9\u3002</p></div><button class="button" data-route="help">\u83B7\u53D6\u5E2E\u52A9</button></section>
</article>`;
  document.querySelector(".knowledge-search")?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderKnowledgeResults(new FormData(event.currentTarget).get("query") || "");
  });
  document.querySelector(".knowledge-search input")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderKnowledgeResults(event.currentTarget.value);
    }
  });
  const alignKnowledgeTopic = (row) => {
    const nav2 = document.querySelector(".global-header,.site-header,body>header"), navBottom = Math.max(0, nav2?.getBoundingClientRect().bottom || 0), top = window.scrollY + row.getBoundingClientRect().top - navBottom - 28;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };
  const openKnowledgeTopic = (id, align = false) => {
    const opening = knowledgeState.openTopic !== id;
    knowledgeState.openTopic = opening ? id : null;
    document.querySelectorAll("[data-topic]").forEach((row) => {
      const open = row.dataset.topic === knowledgeState.openTopic;
      row.querySelector(".knowledge-topic-toggle").setAttribute("aria-expanded", String(open));
      row.querySelector(".knowledge-topic-panel").hidden = !open;
    });
    if (opening && align) requestAnimationFrame(() => alignKnowledgeTopic(document.querySelector(`[data-topic="${id}"]`)));
  };
  document.querySelectorAll("[data-knowledge-topic]").forEach((button) => button.addEventListener("click", () => openKnowledgeTopic(button.dataset.knowledgeTopic, true)));
  document.querySelectorAll("[data-knowledge-topic-link]").forEach((button) => button.addEventListener("click", () => openKnowledgeTopic(button.dataset.knowledgeTopicLink, true)));
  const bindKnowledgePanel = (panel) => {
    panel.querySelectorAll("[data-knowledge-subtopic]").forEach((button) => button.addEventListener("click", () => {
      if (publishedKnowledge.some((item) => item.title === button.dataset.knowledgeSubtopic)) knowledgeArticlePage(button.dataset.knowledgeSubtopic);
    }));
    panel.querySelectorAll("[data-knowledge-page]").forEach((button) => button.addEventListener("click", () => {
      const row = panel.closest("[data-topic]"), item = knowledgeTopics.find((topic) => topic.id === row.dataset.topic), page = Number(button.dataset.knowledgePage);
      knowledgeState.topicPages[item.id] = page;
      panel.innerHTML = knowledgeSubtopicMarkup(item, page);
      bindKnowledgePanel(panel);
    }));
  };
  document.querySelectorAll(".knowledge-topic-panel").forEach(bindKnowledgePanel);
  document.querySelector("[data-open-questions]")?.addEventListener("click", () => openKnowledgeTopic("questions", true));
}
function simplePage(id) {
  const pages = {
    "digital-assets": ["Digital Assets", "\u4ECE\u5206\u6563\u5165\u53E3\u5230\u6E05\u6670\u6062\u590D\u8DEF\u5F84", "LEGAVIK\u5E2E\u52A9\u4F60\u6574\u7406\u4EA4\u6613\u5E73\u53F0\u3001\u94B1\u5305\u3001\u786C\u4EF6\u8BBE\u5907\u3001DeFi\u4E0E\u591A\u7B7E\u8D44\u4EA7\uFF1B\u771F\u6B63\u7684Recovery Map\u4F7F\u7528\u7EDF\u4E00\u9009\u62E9\u5668\u8FDB\u5165\u5B8C\u6574\u516D\u6B65\u6D41\u7A0B\u3002", ["\u4E2D\u5FC3\u5316\u4EA4\u6613\u5E73\u53F0", "\u70ED\u94B1\u5305\u4E0E\u786C\u4EF6\u94B1\u5305", "DeFi\u4E0E\u591A\u7B7E", "\u81EA\u5B9A\u4E49\u6570\u5B57\u8D44\u4EA7\u9879\u76EE"]],
    security: ["Security & Privacy", "\u5B89\u5168\u4ECE\u5BA2\u6237\u638C\u63A7\u5F00\u59CB", "\u8D44\u6599\u5728\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6\uFF1BRecovery Password\u4E0D\u53D1\u9001\u7ED9\u5E73\u53F0\u3002\u6062\u590D\u65F6\u7EE7\u7EED\u6267\u884CArchive\u5927\u5C0F\u4E0ESHA-256\u5B8C\u6574\u6027\u95E8\u63A7\u3002", ["\u6D4F\u89C8\u5668\u672C\u5730\u52A0\u5BC6", "\u5BA2\u6237\u4FDD\u5B58\u6062\u590D\u6750\u6599", "\u72EC\u7ACB\u6062\u590D\u5165\u53E3", "\u4E25\u683C\u5B8C\u6574\u6027\u9A8C\u8BC1"]],
    recovery: ["Recovery & Succession", "\u8BA9\u672A\u6765\u7684\u6062\u590D\u4ECE\u6E05\u6670\u8DEF\u5F84\u5F00\u59CB", "\u5F53\u524D\u4EA7\u54C1\u63D0\u4F9B\u672C\u4EBA\u51C6\u5907\u4E0E\u72EC\u7ACB\u6062\u590D\u80FD\u529B\u3002Trusted Person\u3001\u6CD5\u5F8B\u4EA4\u4ED8\u548C\u591A\u65B9\u6062\u590D\u4ECD\u4E3A\u672A\u6765\u67B6\u6784\uFF0C\u4E0D\u4F5C\u5F53\u524D\u627F\u8BFA\u3002", ["Prepare \xB7 \u6574\u7406\u6062\u590D\u8DEF\u5F84", "Protect \xB7 \u52A0\u5BC6\u5173\u952E\u8D44\u6599", "Recover \xB7 \u72EC\u7ACB\u6062\u590D", "Deliver \xB7 \u672A\u6765\u80FD\u529B"]],
    "how-it-works": ["How It Works", "\u4ECE\u6574\u7406\u5230\u72EC\u7ACB\u6062\u590D", "\u5148\u514D\u8D39\u5EFA\u7ACBRecovery Map\u5E76\u67E5\u770B\u51C6\u5907\u5EA6\uFF1B\u521B\u5EFA\u6B63\u5F0F\u7248\u672C\u524D\u7ECF\u8FC7Payment Gate\uFF0C\u518D\u8BBE\u7F6E\u5BC6\u7801\u3001\u672C\u5730\u52A0\u5BC6\u5E76\u5B89\u5168\u5B58\u50A8\u3002", ["\u5EFA\u7ACBRecovery Map", "\u9884\u89C8\u4E0E\u51C6\u5907\u5EA6", "Payment Gate", "\u672C\u5730\u52A0\u5BC6", "\u6062\u590D\u6750\u6599\u4EA4\u4ED8", "\u72EC\u7ACB\u6062\u590D"]],
    help: ["Help & Knowledge", "\u5728\u6BCF\u4E00\u6B65\u77E5\u9053\u8BE5\u8BB0\u5F55\u4EC0\u4E48", "\u5E2E\u52A9\u5185\u5BB9\u7531\u7ED3\u6784\u5316\u6570\u636E\u9A71\u52A8\u3002AI\u5BA2\u670D\u4E0E\u5B8C\u6574\u5E73\u53F0\u77E5\u8BC6\u754C\u9762\u5C1A\u672A\u4E0A\u7EBF\u3002", ["\u5EFA\u8BAE\u8BB0\u5F55\uFF1A\u5B98\u65B9\u5165\u53E3\u3001\u8D44\u6599\u4F4D\u7F6E\u3001\u8054\u7CFB\u4EBA\u3001\u505C\u6B62\u6761\u4EF6", "\u4E0D\u8981\u8BB0\u5F55\uFF1A\u79C1\u94A5\u3001\u52A9\u8BB0\u8BCD\u3001OTP\u3001\u5B8C\u6574\u5BC6\u7801", "\u9047\u5230\u8EAB\u4EFD\u51B2\u7A81\u6216\u7B2C\u4E09\u4EBA\u8BBF\u95EE\uFF1A\u4F7F\u7528\u5B98\u65B9\u6216\u4EBA\u5DE5\u5347\u7EA7"]]
  };
  const [en, title, lead, items] = pages[id];
  main.innerHTML = `<section class="page-head dark"><p class="kicker">${en}</p><h1>${title}</h1><p>${lead}</p></section><section class="section info-page"><div>${items.map((x, i) => `<article><span>0${i + 1}</span><h3>${x}</h3></article>`).join("")}</div><aside><h2>\u9700\u8981\u66F4\u591A\u5E2E\u52A9\uFF1F</h2><p>\u6253\u5F00\u586B\u5199\u6307\u5357\uFF0C\u67E5\u770B\u5EFA\u8BAE\u8BB0\u5F55\u4E0E\u7981\u6B62\u8BB0\u5F55\u7684\u5185\u5BB9\u3002</p><button class="button" data-help>\u6253\u5F00\u5E2E\u52A9\u9762\u677F</button>${id === "recovery" ? '<button class="button secondary" data-route="independent-recovery">\u8FDB\u5165\u72EC\u7ACB\u6062\u590D</button>' : ""}</aside></section>`;
}
function professionalsPage() {
  main.innerHTML = `<article class="editorial-guide professional-guide">
  <header class="professional-hero"><div><p class="kicker">FOR PROFESSIONALS</p><h1>\u4E3A\u60A8\u7684\u5BA2\u6237\uFF0C\u8865\u9F50\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8FD9\u4E00\u73AF\u3002</h1><p>LEGAVIK \u4E0E\u5F8B\u5E08\u3001\u4FE1\u6258\u673A\u6784\u3001\u8D22\u5BCC\u987E\u95EE\u3001Family Office\u3001\u4F1A\u8BA1\u5E08\u53CA\u5176\u4ED6\u4E13\u4E1A\u673A\u6784\u5408\u4F5C\uFF0C\u4E3A\u5BA2\u6237\u5EFA\u7ACB\u6E05\u6670\u3001\u53D7\u4FDD\u62A4\u4E14\u53EF\u6301\u7EED\u7EF4\u62A4\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u4F53\u7CFB\u3002</p><p class="professional-hero-note">\u60A8\u7EE7\u7EED\u7EF4\u62A4\u5BA2\u6237\u5173\u7CFB\u548C\u539F\u6709\u4E13\u4E1A\u670D\u52A1\uFF0CLEGAVIK \u63D0\u4F9B\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u6240\u9700\u7684\u4EA7\u54C1\u3001\u77E5\u8BC6\u4E0E\u4E13\u4E1A\u652F\u6301\u3002</p><button class="button" data-route="help">\u9884\u7EA6\u5408\u4F5C\u6C9F\u901A</button></div><figure class="professional-scene professional-scene-hero"><img src="../assets/professional-preview-wealth-management.jpg" alt="\u4E13\u4E1A\u987E\u95EE\u4E0E\u5BA2\u6237\u6C9F\u901A" loading="eager"></figure></header>
  <section class="professional-need"><header><p class="kicker">CLIENT NEED</p><h2>\u5BA2\u6237\u6B63\u5728\u51FA\u73B0\u65B0\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u7F3A\u53E3</h2></header><div>${[["\u5206\u6563\u4E0E\u590D\u6742", "\u6570\u5B57\u8D44\u4EA7\u8D8A\u6765\u8D8A\u5206\u6563\u5728\u4E0D\u540C\u5E73\u53F0\u3001\u94B1\u5305\u3001\u8BBE\u5907\u4E0E\u5730\u533A\u3002"], ["\u670D\u52A1\u7F3A\u53E3", "\u4F20\u7EDF\u4E13\u4E1A\u670D\u52A1\u901A\u5E38\u96BE\u4EE5\u8986\u76D6\u5177\u4F53\u3001\u53EF\u6267\u884C\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8DEF\u5F84\u3002"], ["\u6301\u7EED\u51C6\u5907", "\u5BA2\u6237\u771F\u6B63\u9700\u8981\u7684\u662F\u4E00\u5957\u6E05\u695A\u3001\u53EF\u6267\u884C\u3001\u53EF\u6301\u7EED\u7EF4\u62A4\u7684 Recovery Plan\u3002"]].map(([title, text3]) => `<article><h3>${title}</h3><p>${text3}</p></article>`).join("")}</div></section>
  <section class="professional-audience"><div><p class="kicker">WHO WE WORK WITH</p><h2>\u4E0E\u5BA2\u6237\u957F\u671F\u5173\u7CFB\u4E2D\u7684\u4E13\u4E1A\u4F19\u4F34\u534F\u4F5C</h2><div class="professional-audience-list">${[["Lawyers & Estate Planning", "\u5C06\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u51C6\u5907\u81EA\u7136\u7EB3\u5165 Estate Planning \u5BF9\u8BDD\u3002"], ["Trust & Fiduciary Services", "\u4E3A\u53D7\u6258\u5B89\u6392\u8865\u5145\u6E05\u6670\u7684\u6570\u5B57\u8D44\u4EA7\u5B9A\u4F4D\u4E0E\u6062\u590D\u8DEF\u5F84\u3002"], ["Wealth Advisers & Financial Planners", "\u5E2E\u52A9\u5BA2\u6237\u628A\u6570\u5B57\u8D44\u4EA7\u7EB3\u5165\u66F4\u5B8C\u6574\u7684\u957F\u671F\u51C6\u5907\u3002"], ["Family Offices", "\u4E3A\u8DE8\u5E73\u53F0\u3001\u8DE8\u5730\u533A\u548C\u591A\u65B9\u534F\u4F5C\u573A\u666F\u5EFA\u7ACB\u6062\u590D\u79E9\u5E8F\u3002"], ["Accountants & Professional Advisers", "\u8BC6\u522B\u5173\u952E\u6570\u5B57\u8D26\u6237\u3001\u670D\u52A1\u4F9D\u8D56\u4E0E\u8FDE\u7EED\u6027\u7F3A\u53E3\u3002"]].map(([title, text3]) => `<article><h3>${title}</h3><p>${text3}</p></article>`).join("")}</div></div><figure class="professional-scene professional-scene-team"><img src="../assets/professional-preview-estate-planning.jpg" alt="Estate Planning \u987E\u95EE\u4E0E\u5BA2\u6237\u6C9F\u901A" loading="lazy"></figure></section>
  <section class="professional-complement"><header><p class="kicker">HOW WE WORK TOGETHER</p><h2>\u6211\u4EEC\u4E0D\u66FF\u4EE3\u60A8\u7684\u4E13\u4E1A\u670D\u52A1\uFF0C\u800C\u662F\u8865\u9F50\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u5C42\u3002</h2></header><div class="professional-role-grid"><article><span>\u60A8\u8D1F\u8D23</span><h3>\u65E2\u6709\u4E13\u4E1A\u5173\u7CFB</h3><p>Legal / Estate Planning</p><p>Trust</p><p>Wealth Planning</p><p>Tax / Accounting</p><p>Client Relationship</p></article><article class="skrek-role"><span>LEGAVIK \u8D1F\u8D23</span><h3>\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u5C42</h3><p>Digital Asset Recovery Mapping</p><p>Recovery Readiness</p><p>Recovery Drill</p><p>Continuity</p><p>Specialist Recovery Guidance</p></article><article><span>\u5171\u540C\u5B8C\u6210</span><h3>\u957F\u671F\u6062\u590D\u51C6\u5907</h3><p>\u5BA2\u6237\u957F\u671F\u6062\u590D\u51C6\u5907</p><p>\u5BB6\u5EAD / \u6307\u5B9A\u6062\u590D\u4EBA\u7684\u6267\u884C\u8DEF\u5F84</p><p>\u4E0D\u540C\u4E13\u4E1A\u670D\u52A1\u4E4B\u95F4\u7684\u534F\u540C</p></article></div></section>
  <section class="professional-value"><header><p class="kicker">WHAT PARTNERS GET</p><h2>\u8BA9\u5408\u4F5C\u56DE\u5230\u5BA2\u6237\u4EF7\u503C\u672C\u8EAB</h2></header><div>${[["Client Solution", "\u4E3A\u5BA2\u6237\u63D0\u4F9B\u4E00\u5957\u6E05\u6670\u7684\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u51C6\u5907\u65B9\u6848\uFF0C\u8865\u8DB3\u65E2\u6709\u670D\u52A1\u8303\u56F4\u3002"], ["Training & Knowledge", "\u5E2E\u52A9\u4E13\u4E1A\u56E2\u961F\u7406\u89E3 Recovery Map\u3001\u5178\u578B\u5BA2\u6237\u9700\u6C42\u4E0E\u5B89\u5168\u8FB9\u754C\u3002"], ["Joint Client Support", "\u5728\u5404\u81EA\u4E13\u4E1A\u8FB9\u754C\u5185\u5171\u540C\u652F\u6301\u590D\u6742\u5BA2\u6237\uFF0C\u4FDD\u6301\u6C9F\u901A\u6E05\u695A\u3001\u8D23\u4EFB\u660E\u786E\u3002"], ["Partner Resources", "\u63D0\u4F9B\u5BA2\u6237\u6559\u80B2\u6750\u6599\u3001Knowledge Base\u3001\u57F9\u8BAD\u3001\u4E13\u4E1A\u652F\u6301\u5165\u53E3\u4E0E Future Partner Tools\u3002"]].map(([title, text3]) => `<article><h3>${title}</h3><p>${text3}</p></article>`).join("")}</div></section>
  <section class="professional-introduce"><div><p class="kicker">WHEN TO INTRODUCE LEGAVIK</p><h2>\u4EC0\u4E48\u65F6\u5019\u9002\u5408\u5411\u5BA2\u6237\u4ECB\u7ECD LEGAVIK\uFF1F</h2><p>\u5F53\u5BA2\u6237\u7684\u6570\u5B57\u8D44\u4EA7\u3001\u8BBE\u5907\u6216\u6062\u590D\u4F9D\u8D56\u5F00\u59CB\u8D85\u51FA\u4E2A\u4EBA\u8BB0\u5FC6\u65F6\uFF0C\u5C31\u503C\u5F97\u66F4\u65E9\u5EFA\u7ACB\u6E05\u6670\u8DEF\u5F84\u3002</p></div><ul>${["\u5BA2\u6237\u6301\u6709\u8F83\u591A Crypto \u6216\u591A\u4E2A\u94B1\u5305", "\u6CA1\u6709\u6E05\u695A\u7684 Recovery Plan", "\u5BB6\u4EBA\u4E0D\u77E5\u9053\u91CD\u8981\u6570\u5B57\u8D44\u4EA7\u5728\u54EA\u91CC", "\u6B63\u5728\u8FDB\u884C Estate Planning", "\u8D44\u4EA7\u8DE8\u591A\u4E2A\u5E73\u53F0\u6216\u56FD\u5BB6", "\u6709 Trust / Executor \u5B89\u6392", "\u5173\u952E\u6570\u5B57\u8D26\u6237\u9AD8\u5EA6\u4F9D\u8D56\u672C\u4EBA\u8BB0\u5FC6", "\u62C5\u5FC3\u5931\u80FD\u3001\u8BBE\u5907\u4E22\u5931\u6216\u6062\u590D\u6761\u4EF6\u53D8\u5316"].map((item) => `<li>${item}</li>`).join("")}</ul></section>
  <section class="professional-boundaries"><header><p class="kicker">PROFESSIONAL BOUNDARIES</p><h2>\u6E05\u6670\u7684\u4E13\u4E1A\u8FB9\u754C</h2><p>\u5408\u4F5C\u4E0D\u5E94\u6269\u5927\u4E13\u4E1A\u673A\u6784\u5BF9\u5BA2\u6237\u79D8\u5BC6\u3001\u8D44\u4EA7\u6216\u6280\u672F\u6062\u590D\u5DE5\u4F5C\u7684\u8D23\u4EFB\u3002</p></header><div>${["LEGAVIK \u4E0D\u8981\u6C42\u4E13\u4E1A\u5408\u4F5C\u4F19\u4F34\u63A5\u89E6\u5BA2\u6237 Seed Phrase / Private Key", "\u4E0D\u8981\u6C42\u5408\u4F5C\u4F19\u4F34\u6258\u7BA1\u5BA2\u6237 Crypto", "\u4E0D\u8981\u6C42\u5408\u4F5C\u4F19\u4F34\u6210\u4E3A\u6280\u672F\u6062\u590D\u4EBA\u5458", "\u4E0D\u66FF\u4EE3\u5F8B\u5E08\u63D0\u4F9B\u6CD5\u5F8B\u610F\u89C1", "\u4E0D\u66FF\u4EE3\u8D22\u5BCC\u987E\u95EE\u63D0\u4F9B\u6295\u8D44\u5EFA\u8BAE"].map((item) => `<p>${item}</p>`).join("")}</div></section>
  <section class="professional-models"><header><p class="kicker">PARTNERSHIP MODELS</p><h2>\u7075\u6D3B\u7684\u5408\u4F5C\u65B9\u5F0F</h2><p>\u5177\u4F53\u5408\u4F5C\u65B9\u5F0F\u6839\u636E\u673A\u6784\u7C7B\u578B\u3001\u5BA2\u6237\u573A\u666F\u548C\u4E13\u4E1A\u8FB9\u754C\u8FDB\u4E00\u6B65\u6C9F\u901A\u3002</p></header><div>${["Client Referral", "Joint Client Support", "Professional Advisory Collaboration", "Legacy / Private Collaboration", "Future Partner Tools"].map((item) => `<article>${item}</article>`).join("")}</div></section>
  <section class="professional-final"><div><p class="kicker">PROFESSIONAL PARTNERSHIP</p><h2>\u4E3A\u60A8\u7684\u5BA2\u6237\uFF0C\u8865\u9F50\u6570\u5B57\u8D44\u4EA7\u6062\u590D\u8FD9\u4E00\u73AF\u3002</h2><p>\u544A\u8BC9\u6211\u4EEC\u60A8\u7684\u673A\u6784\u7C7B\u578B\u548C\u5178\u578B\u5BA2\u6237\u573A\u666F\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4E00\u8D77\u8BBE\u8BA1\u9002\u5408\u7684\u5408\u4F5C\u65B9\u5F0F\u3002</p></div><button class="button" data-route="help">\u9884\u7EA6\u5408\u4F5C\u6C9F\u901A<br><small>Talk to Our Partnership Team</small></button></section>
  </article>`;
}
function aboutPage() {
  main.innerHTML = `<article class="contact-page">
  <header class="contact-intro"><p class="kicker">CONTACT LEGAVIK</p><h1>\u8054\u7CFB\u6211\u4EEC</h1><p>\u65E0\u8BBA\u662F\u4EA7\u54C1\u54A8\u8BE2\u3001\u5BA2\u6237\u652F\u6301\uFF0C\u8FD8\u662F\u4E13\u4E1A\u673A\u6784\u5408\u4F5C\uFF0C\u90FD\u53EF\u4EE5\u901A\u8FC7\u8FD9\u91CC\u8054\u7CFB\u6211\u4EEC\u3002</p></header>
  <section class="contact-layout"><form class="contact-form" aria-label="\u8054\u7CFB LEGAVIK"><div class="contact-field-grid"><label>\u59D3\u540D<input name="name" autocomplete="name" required></label><label>\u90AE\u7BB1<input name="email" type="email" autocomplete="email" required></label></div><label>\u7535\u8BDD\uFF08\u53EF\u9009\uFF09<input name="phone" type="tel" autocomplete="tel"></label><label>\u54A8\u8BE2\u7C7B\u578B<select name="enquiryType" required><option value="customer">\u5BA2\u6237\u54A8\u8BE2 / Customer Enquiries</option><option value="professional">\u4E13\u4E1A\u673A\u6784\u5408\u4F5C / Professional Partnerships</option></select></label><label>\u54A8\u8BE2\u5185\u5BB9<textarea name="message" rows="7" required></textarea></label><button class="button" type="button">\u63D0\u4EA4\u54A8\u8BE2</button><p class="contact-response-time">\u6211\u4EEC\u7684\u56E2\u961F\u5C06\u5728 1\u20132 \u4E2A\u5DE5\u4F5C\u65E5\u5185\u56DE\u590D\u3002</p></form><aside class="contact-details"><p class="kicker">DIRECT CONTACT</p><div><h2>General Customer Enquiries</h2><a href="mailto:hello@skrek.com">\u53D1\u9001\u5BA2\u6237\u54A8\u8BE2\u90AE\u4EF6</a></div><div><h2>Professional Partnerships</h2><a href="mailto:partners@skrek.com">\u53D1\u9001\u4E13\u4E1A\u5408\u4F5C\u90AE\u4EF6</a></div><p class="contact-location">Sydney, Australia</p></aside></section>
  </article>`;
}
function bindOverlay() {
  overlay.querySelectorAll("[data-close]").forEach((el) => el.onclick = (event) => {
    if (event.target === el || el.classList.contains("modal-close")) overlay.innerHTML = "";
  });
}
function videoModal() {
  overlay.innerHTML = `<div class="modal-backdrop" data-close><section class="modal" role="dialog" aria-modal="true" aria-labelledby="video-title"><button class="modal-close" data-close aria-label="\u5173\u95ED">\xD7</button><div class="video-poster"><div class="play">\u25B6</div></div><h2 id="video-title">60\u79D2\u4E86\u89E3${brand.brand_name}</h2><p>\u6B63\u5F0F\u4ECB\u7ECD\u89C6\u9891\u6B63\u5728\u5236\u4F5C\u3002\u672C\u5165\u53E3\u4E3A\u660E\u786E\u7684Placeholder\uFF0C\u4E0D\u4F1A\u64AD\u653E\u4F2A\u9020\u5185\u5BB9\u3002</p></section></div>`;
  bindOverlay();
  overlay.querySelector(".modal-close").focus();
}
function helpDrawer() {
  overlay.innerHTML = `<div class="drawer-backdrop" data-close><aside class="help-drawer" role="dialog" aria-modal="true" aria-labelledby="help-title"><button class="modal-close" data-close aria-label="\u5173\u95ED">\xD7</button><p class="kicker">CONTEXTUAL HELP</p><h2 id="help-title">\u5982\u4F55\u586B\u5199\u6062\u590D\u7EBF\u7D22</h2><h3>\u5EFA\u8BAE\u8BB0\u5F55</h3><p>\u5B98\u65B9\u6062\u590D\u5165\u53E3\u3001\u8D44\u6599\u4FDD\u7BA1\u4F4D\u7F6E\u3001\u6240\u9700\u8BBE\u5907\u3001\u53EF\u4FE1\u8054\u7CFB\u4EBA\u548C\u505C\u6B62\u6761\u4EF6\u3002</p><h3>\u4E0D\u8981\u8BB0\u5F55</h3><p>\u79C1\u94A5\u3001\u52A9\u8BB0\u8BCD\u3001OTP\u3001Authenticator Seed\u3001\u5B8C\u6574\u5BC6\u7801\u6216\u9A8C\u8BC1\u7801\u3002</p><h3>\u4E3A\u4EC0\u4E48</h3><p>Recovery Map\u5E2E\u52A9\u6062\u590D\u4EBA\u77E5\u9053\u4ECE\u54EA\u91CC\u5F00\u59CB\uFF0C\u4F46\u4E0D\u5E94\u6210\u4E3A\u79D8\u5BC6\u4ED3\u5E93\u3002</p><div class="video-mini"><span>60\u79D2\u6559\u7A0B</span><b>Coming soon</b></div></aside></div>`;
  bindOverlay();
  overlay.querySelector(".modal-close").focus();
}
async function localEncrypt() {
  let password = document.querySelector("#password").value, confirmation = document.querySelector("#password-confirm").value, button = document.querySelector("[data-local-encrypt]");
  try {
    button.disabled = true;
    button.textContent = "\u6B63\u5728\u672C\u5730\u52A0\u5BC6\u2026";
    const policy = await fetch("../../config/security/recovery-password-v1.json", { cache: "no-store" }).then((r) => r.json()), check = validateRecoveryPassword(password, confirmation, document.querySelector("#ack").checked, { policy, vaultName: "LEGAVIK Recovery Map" });
    if (!check.valid) throw new Error(check.issues[0].message);
    state.artifacts = await createCryptoProductArtifacts({ assets: state.assets, attachments: state.attachments, password });
    document.querySelector("#create-steps").children[0].className = "done";
    document.querySelector("#create-steps").children[1].className = "done";
    document.querySelector(".progress span").className = "progress-local-complete";
    document.querySelector("#create-status").textContent = "\u672C\u5730\u4FDD\u62A4\u5DF2\u5B8C\u6210\uFF1B\u6B63\u5F0F\u6C38\u4E45\u5B58\u50A8\u5C1A\u672A\u6267\u884C\u3002";
    document.querySelector("#password-card").classList.add("hidden");
    const card = document.querySelector("#materials-card");
    card.classList.remove("hidden");
    card.innerHTML = `<div class="success-state"><span>\u2713</span><h2>\u672C\u5730\u4F53\u9A8C\u7248\u672C\u5DF2\u521B\u5EFA</h2><p>\u8BF7\u4FDD\u5B58Recovery Kit\u3002\u672C\u8F6E\u4E0D\u4F1A\u6267\u884C\u4ED8\u6B3E\u6216Mainnet\u5E7F\u64AD\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u751F\u6210Mainnet Recovery Evidence\u3002</p><button class="button" data-save-kit>\u4FDD\u5B58Recovery Kit</button><button class="button secondary" data-save-backup>\u4FDD\u5B58\u672C\u5730\u52A0\u5BC6\u5907\u4EFD\uFF08\u53EF\u9009\uFF09</button><button class="text-link" data-route="independent-recovery">\u8FDB\u5165\u72EC\u7ACB\u6062\u590D\u5165\u53E3</button></div>`;
    bind();
    announce("\u672C\u5730\u52A0\u5BC6\u5B8C\u6210");
  } catch (error) {
    announce(error.message);
    button.disabled = false;
    button.textContent = "\u521B\u5EFA\u672C\u5730\u4F53\u9A8C\u7248\u672C";
  } finally {
    password = "";
    confirmation = "";
    const p = document.querySelector("#password"), c = document.querySelector("#password-confirm");
    if (p) p.value = "";
    if (c) c.value = "";
  }
}
async function addFiles(input) {
  try {
    const existing = state.attachments.map((item) => ({ file: { name: item.name, size: item.bytes.length } })), added = await validateIncomingFiles(input.files, existing);
    for (const item of added) state.attachments.push({ id: uid(), assetId: input.dataset.files, name: item.identity.filename, mimeType: item.identity.mimeType, bytes: item.bytes });
    if (totalBytes() > UNIFIED_LIMITS.max_total_original_bytes) throw new Error("\u7D2F\u8BA1\u9644\u4EF6\u5BB9\u91CF\u4E0D\u5F97\u8D85\u8FC750 MiB");
    render();
    announce(`\u5DF2\u6DFB\u52A0${added.length}\u4E2A\u6587\u4EF6`);
  } catch (error) {
    announce(error.message);
  }
}
function bind() {
  document.querySelectorAll("[data-route]").forEach((el) => el.onclick = () => {
    const target = el.dataset.route;
    if (target === "independent-recovery") location.href = canonicalRecoveryUrl("recovery-center");
    else if (["map", "preview"].includes(target)) location.href = canonicalCreateUrl();
    else navigate(target);
  });
  document.querySelectorAll("[data-category]").forEach((el) => el.onclick = () => {
    state.category = state.category === el.dataset.category ? null : el.dataset.category;
    persist();
    render();
    announce(state.category ? `${category(state.category).zh} \u5DF2\u9009\u62E9` : "\u5DF2\u53D6\u6D88\u9009\u62E9");
  });
  document.querySelectorAll("[data-brand]").forEach((el) => el.onclick = () => {
    const match = state.assets.find((a) => a.category === state.category && a.name === el.dataset.brand);
    if (match) state.assets = state.assets.filter((a) => a.id !== match.id);
    else state.assets.push({ id: uid(), category: state.category, name: el.dataset.brand, note: "" });
    persist();
    render();
    announce(match ? `${el.dataset.brand} \u5DF2\u53D6\u6D88` : `${el.dataset.brand} \u5DF2\u9009\u62E9`);
  });
  document.querySelector("[data-custom]")?.addEventListener("click", () => document.querySelector("#custom").classList.remove("hidden"));
  document.querySelector("[data-add-custom]")?.addEventListener("click", () => {
    const value = document.querySelector("#custom-name").value.trim();
    if (!value) return announce("\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0");
    state.assets.push({ id: uid(), category: state.category, name: value, note: "" });
    persist();
    render();
    announce(`${value} \u5DF2\u6DFB\u52A0`);
  });
  document.querySelectorAll("[data-note]").forEach((el) => el.oninput = () => {
    const asset = state.assets.find((a) => a.id === el.dataset.note);
    asset.note = el.value;
    persist();
  });
  document.querySelectorAll("[data-files]").forEach((el) => el.onchange = () => addFiles(el));
  document.querySelectorAll("[data-remove]").forEach((el) => el.onclick = () => {
    state.assets = state.assets.filter((a) => a.id !== el.dataset.remove);
    state.attachments = state.attachments.filter((f) => f.assetId !== el.dataset.remove);
    persist();
    render();
    announce("\u8D44\u4EA7\u9879\u76EE\u5DF2\u79FB\u9664");
  });
  document.querySelectorAll("[data-video]").forEach((el) => el.onclick = videoModal);
  document.querySelectorAll("[data-help]").forEach((el) => el.onclick = helpDrawer);
  document.querySelectorAll("[data-close]").forEach((el) => el.onclick = (e) => {
    if (e.target === el || el.classList.contains("modal-close")) overlay.innerHTML = "";
  });
  document.querySelector("[data-demo-payment]")?.addEventListener("click", () => {
    document.querySelector(".payment-card").classList.add("muted-card");
    document.querySelector("#password-card").classList.remove("hidden");
    document.querySelector("#password-card input").focus();
    announce("Payment Gate\u4F53\u9A8C\u901A\u8FC7\uFF0C\u672A\u4EA7\u751F\u4ED8\u6B3E");
  });
  document.querySelector("[data-local-encrypt]")?.addEventListener("click", localEncrypt);
  document.querySelector("[data-save-kit]")?.addEventListener("click", async () => {
    const r = await saveMaterial({ bytes: state.artifacts.kitBytes, filename: `Recovery-Kit-LEGAVIK-${state.artifacts.snapshotId}.cjas`, mimeType: "application/octet-stream" });
    state.kitSaved = r.saved;
    if (r.saved) announce("Recovery Kit\u5DF2\u4FDD\u5B58");
  });
  document.querySelector("[data-save-backup]")?.addEventListener("click", async () => {
    await saveMaterial({ bytes: state.artifacts.archiveBytes, filename: `Local-Encrypted-Backup-LEGAVIK-${state.artifacts.snapshotId}.cjasvault`, mimeType: "application/octet-stream" });
    announce("\u672C\u5730\u52A0\u5BC6\u5907\u4EFD\u5DF2\u4FDD\u5B58");
  });
  document.querySelector("#register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    state.account = { name: data.get("name"), email: data.get("email") };
    persist();
    announce("\u4F53\u9A8C\u8D26\u6237\u5DF2\u4FDD\u5B58");
    setTimeout(() => navigate("control"), 500);
  });
  document.querySelector("#menu")?.addEventListener("click", (e) => {
    const open = header.classList.toggle("menu-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });
}
function bindSaveFeedback() {
  const targets = [];
  const assetContinue = document.querySelector(".sticky-actions .button");
  if (assetContinue) targets.push(assetContinue);
  const mapContinue = document.querySelector(".map-layout .actions .button:not(.secondary)");
  if (mapContinue) targets.push(mapContinue);
  for (const button of targets) {
    const destination = state.route === "digital-assets" ? "map" : "preview";
    button.onclick = () => {
      if (button.disabled) return;
      button.disabled = true;
      button.textContent = "\u6B63\u5728\u4FDD\u5B58\u2026";
      persist();
      announce("\u5DF2\u4FDD\u5B58\uFF0C\u6B63\u5728\u8FDB\u5165\u4E0B\u4E00\u6B65");
      setTimeout(() => navigate(destination), 180);
    };
  }
}
function bindProductIntegration() {
  document.querySelectorAll("[data-recovery-map]").forEach((el) => el.onclick = () => {
    location.href = canonicalCreateUrl();
  });
  document.querySelectorAll("[data-independent-recovery]").forEach((el) => el.onclick = () => {
    location.href = canonicalRecoveryUrl("recovery-center");
  });
  document.querySelectorAll('[data-route="digital-assets"]').forEach((el) => el.onclick = () => navigate("digital-assets"));
}
function render() {
  state.route = route();
  document.documentElement.style.scrollBehavior = state.route === "knowledge" ? "auto" : "";
  persist();
  nav();
  foot();
  if (state.route === "home") home();
  else if (state.route === "digital-assets") digitalAssetsGuide();
  else if (state.route === "security") securityPrivacyGuide();
  else if (state.route === "pricing") pricingPage();
  else if (state.route === "knowledge") knowledgeBasePage();
  else if (state.route === "professionals") professionalsPage();
  else if (state.route === "about") aboutPage();
  else if (state.route === "control") control();
  else if (state.route === "register") register();
  else if (["recovery", "how-it-works", "help"].includes(state.route)) simplePage(state.route);
  else home();
  bind();
  bindProductIntegration();
  bindSaveFeedback();
  main.focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: "auto" });
}
addEventListener("hashchange", render);
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.innerHTML) overlay.innerHTML = "";
});
render();
addEventListener("pageshow", () => {
  if (!main.children.length) render();
});
