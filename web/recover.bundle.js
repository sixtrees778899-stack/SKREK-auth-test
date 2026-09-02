// src/domain/constants.js
var KNOWLEDGE_SCHEMA_VERSION = 1;
var SNAPSHOT_SCHEMA_VERSION = 1;
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

// src/snapshot/snapshot-builder.js
var ROOT_FIELDS2 = /* @__PURE__ */ new Set(["snapshot_id", "vault_id", "snapshot_schema_version", "wizard_config_version", "created_at", "knowledge_graph", "attachment_payloads", "integrity"]);
var attachmentLength = (item, knowledgeVersion) => knowledgeVersion === 2 ? item.byte_length : item.size;
async function validateSnapshot(snapshot) {
  const errors = [];
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) return { valid: false, errors: [{ code: "TYPE", path: "$", message: "Snapshot must be an object" }] };
  for (const key of Object.keys(snapshot)) if (!ROOT_FIELDS2.has(key)) errors.push({ code: "UNKNOWN_FIELD", path: `$.${key}`, message: "Unknown snapshot field" });
  if (snapshot.snapshot_schema_version !== SNAPSHOT_SCHEMA_VERSION) errors.push({ code: "UNSUPPORTED_VERSION", path: "$.snapshot_schema_version", message: "Unsupported snapshot version" });
  const knowledgeResult = (() => {
    try {
      assertValidKnowledgeMapByVersion(snapshot.knowledge_graph);
      return null;
    } catch (error) {
      return error.details;
    }
  })();
  if (knowledgeResult) errors.push(...knowledgeResult);
  if (!snapshot.integrity || snapshot.integrity.algorithm !== "SHA-256") errors.push({ code: "INVALID_INTEGRITY", path: "$.integrity", message: "Integrity block is invalid" });
  if (errors.length) return { valid: false, errors };
  try {
    const manifest = new Map(snapshot.knowledge_graph.attachments.map((item) => [item.id, item]));
    for (const [id, encoded] of Object.entries(snapshot.attachment_payloads ?? {})) {
      const item = manifest.get(id);
      if (!item) throw new Error(`Undeclared attachment ${id}`);
      const bytes = base64UrlToBytes(encoded);
      if (bytes.length !== attachmentLength(item, snapshot.knowledge_graph.schema_version) || await cryptoEngine.hashHex(bytes) !== item.sha256) throw new Error(`Attachment mismatch ${id}`);
      manifest.delete(id);
    }
    if (manifest.size) throw new Error(`Missing attachment ${manifest.keys().next().value}`);
    const core = { snapshot_id: snapshot.snapshot_id, vault_id: snapshot.vault_id, snapshot_schema_version: snapshot.snapshot_schema_version, wizard_config_version: snapshot.wizard_config_version, created_at: snapshot.created_at, knowledge_graph: snapshot.knowledge_graph, attachment_payloads: snapshot.attachment_payloads };
    const expected = { algorithm: "SHA-256", knowledge_sha256: await cryptoEngine.hashHex(canonicalBytes(snapshot.knowledge_graph)), attachment_manifest_sha256: await cryptoEngine.hashHex(canonicalBytes(snapshot.knowledge_graph.attachments)), snapshot_payload_sha256: await cryptoEngine.hashHex(canonicalBytes(core)) };
    for (const key of Object.keys(expected)) if (snapshot.integrity[key] !== expected[key]) throw new Error(`Integrity mismatch: ${key}`);
  } catch (error) {
    errors.push({ code: "INTEGRITY_FAILED", path: "$.integrity", message: error.message });
  }
  return { valid: errors.length === 0, errors };
}
async function parseSnapshot(serialized) {
  let parsed;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new ValidationError("INVALID_SNAPSHOT_JSON", "Snapshot is not valid JSON");
  }
  const result = await validateSnapshot(parsed);
  if (!result.valid) throw new ValidationError("INVALID_SNAPSHOT", "Snapshot validation failed", result.errors);
  return parsed;
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

// src/recovery/recovery-service.js
var RecoveryService = class {
  constructor({ kitBuilder: kitBuilder2, storageAdapter, kdfProvider: kdfProvider2 }) {
    this.kitBuilder = kitBuilder2;
    this.storageAdapter = storageAdapter;
    this.kdfProvider = kdfProvider2;
  }
  async recover({ kitBytes, password, expectedSnapshotId, expectedCiphertextSha256, envelopeDecoder }) {
    const dataKey = await this.kitBuilder.unwrapKit({ kitBytes, password, kdfProvider: this.kdfProvider, expectedSnapshotId, expectedCiphertextSha256 });
    try {
      const payload = this.kitBuilder.parseKit(kitBytes);
      const ciphertext = await this.storageAdapter.getCiphertext({ locators: payload.storage_locators });
      if (await cryptoEngine.hashHex(ciphertext) !== expectedCiphertextSha256) throw new CryptoError("CIPHERTEXT_HASH_MISMATCH", "Encrypted Vault integrity check failed");
      const envelope = envelopeDecoder(ciphertext);
      const plaintext = await cryptoEngine.decryptSnapshot(envelope, { dataKey });
      return await parseSnapshot(utf8.decode(plaintext));
    } finally {
      cryptoEngine.wipeSensitiveReference(dataKey);
    }
  }
};

// src/ui/artifact-codec.js
function decodeEncryptedArchive(bytes) {
  let value;
  try {
    value = JSON.parse(utf8.decode(bytes));
  } catch {
    throw new ValidationError("INVALID_ARCHIVE", "\u52A0\u5BC6\u6863\u6848\u65E0\u6CD5\u8BC6\u522B");
  }
  const allowed = /* @__PURE__ */ new Set(["archive_format_version", "algorithm", "nonce", "aad", "ciphertext"]);
  for (const key of Object.keys(value ?? {})) if (!allowed.has(key)) throw new ValidationError("INVALID_ARCHIVE", "\u52A0\u5BC6\u6863\u6848\u5305\u542B\u672A\u77E5\u5B57\u6BB5");
  if (value?.archive_format_version !== 1 || value.algorithm !== "AES-256-GCM") throw new ValidationError("UNSUPPORTED_ARCHIVE", "\u4E0D\u652F\u6301\u6B64\u52A0\u5BC6\u6863\u6848\u7248\u672C");
  return { algorithm: value.algorithm, nonce: base64UrlToBytes(value.nonce, { maxBytes: 32 }), aad: base64UrlToBytes(value.aad, { maxBytes: 1024 }), ciphertext: base64UrlToBytes(value.ciphertext, { maxBytes: 1024 ** 3 }) };
}

// src/ui/vault-pipeline.js
var EXPERIENCE_KDF_PARAMETERS = Object.freeze({ iterations: 3e5, hash: "SHA-256" });
var kdfProvider = new Pbkdf2Provider();
var kitBuilder = new RecoveryKitBuilder();
var ImportedArchiveAdapter = class {
  constructor(bytes) {
    this.bytes = bytes;
  }
  async getCiphertext() {
    return new Uint8Array(this.bytes);
  }
};
async function recoverVaultArtifacts({ kitBytes, archiveBytes, password }) {
  const kit = kitBuilder.parseKit(kitBytes);
  const service = new RecoveryService({ kitBuilder, storageAdapter: new ImportedArchiveAdapter(archiveBytes), kdfProvider });
  const snapshot = await service.recover({ kitBytes, password, expectedSnapshotId: kit.snapshot_id, expectedCiphertextSha256: kit.ciphertext_sha256, envelopeDecoder: decodeEncryptedArchive });
  return { snapshot, kit };
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

// tools/ar-generic-file-mainnet-pilot/gateway-verifier.js
async function verifyGatewaysParallel({ gateways, txid, expectedSize, expectedHash, hashBytes, fetchImpl = fetch, timeoutMs = 12e3, now = () => (/* @__PURE__ */ new Date()).toISOString(), clock = () => performance.now() }) {
  const controllers = gateways.map(() => new AbortController()), attempts = [];
  const result = await new Promise((resolve) => {
    let remaining = gateways.length, settled = false;
    gateways.forEach(async (gateway, index) => {
      const started = clock(), attempt = { gateway, request_started_at: now(), timeout: false, http_status: null, response_ms: null, download_ms: null, size_match: false, sha_match: false };
      const timer = setTimeout(() => controllers[index].abort(), timeoutMs);
      try {
        const response = await fetchImpl(`${gateway}/${txid}?cjas_verify=${Date.now()}`, { cache: "no-store", signal: controllers[index].signal });
        attempt.response_ms = Number((clock() - started).toFixed(1));
        attempt.http_status = response.status;
        if (response.ok) {
          const downloadStarted = clock(), bytes = new Uint8Array(await response.arrayBuffer());
          attempt.download_ms = Number((clock() - downloadStarted).toFixed(1));
          attempt.size = bytes.length;
          attempt.size_match = bytes.length === expectedSize;
          if (attempt.size_match) {
            const hashStarted = clock();
            attempt.sha256 = await hashBytes(bytes);
            attempt.sha_ms = Number((clock() - hashStarted).toFixed(1));
            attempt.sha_match = attempt.sha256 === expectedHash;
          }
          if (attempt.sha_match && !settled) {
            settled = true;
            attempt.result = "PASS";
            attempts.push(attempt);
            controllers.forEach((controller, i) => {
              if (i !== index) controller.abort();
            });
            resolve({ verified: true, bytes, gateway, httpStatus: response.status, attempts });
            return;
          }
        }
        attempt.result = response.ok ? "INTEGRITY_PENDING" : `HTTP_${response.status}`;
      } catch (error) {
        attempt.timeout = error?.name === "AbortError";
        attempt.result = attempt.timeout ? "TIMEOUT" : "NETWORK_ERROR";
      } finally {
        clearTimeout(timer);
        if (!attempts.includes(attempt)) attempts.push(attempt);
        remaining -= 1;
        if (!remaining && !settled) {
          settled = true;
          resolve({ verified: false, attempts });
        }
      }
    });
  });
  return result;
}

// src/ui/resume-checkpoint-crypto.js
var DOMAIN = "SKREK-LOCAL-RESUME-CHECKPOINT-V1";
var PARAMETERS = Object.freeze({ name: "PBKDF2", hash: "SHA-256", iterations: 3e5 });
var CIPHER = Object.freeze({ name: "AES-GCM", tagLength: 128 });
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var RESUME_CHECKPOINT_CRYPTO = Object.freeze({ format: "SKREK_ENCRYPTED_RESUME_V1", domain: DOMAIN, parameters: PARAMETERS });

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
function assertKitEvidencePair({ kit, evidence }) {
  if (!kit?.snapshot_id || kit.snapshot_id !== evidence?.recovery_kit_identifier) throw new Error("\u8FD9\u4E24\u4EFD\u6062\u590D\u6750\u6599\u4E0D\u5C5E\u4E8E\u540C\u4E00\u6B21\u521B\u5EFA\uFF0C\u8BF7\u9009\u62E9\u5BF9\u5E94\u7684\u4E00\u7EC4\u6587\u4EF6\u3002");
  return true;
}
function validateMainnetEvidence(value) {
  if (!value || value.network !== MAINNET_NETWORK || typeof value.txid !== "string" || !/^[-_A-Za-z0-9]{43}$/.test(value.txid) || !Number.isSafeInteger(value.archive_size) || value.archive_size <= 0 || !/^[a-f0-9]{64}$/.test(value.archive_sha256) || typeof value.recovery_kit_identifier !== "string" || !value.recovery_kit_identifier) throw new Error("Mainnet Recovery Evidence\u6587\u4EF6\u4E0D\u5B8C\u6574\u6216\u65E0\u6CD5\u8BC6\u522B\u3002");
  return value;
}
async function verifyMainnetArchive({ evidence, gateways = MAINNET_GATEWAYS, timeoutMs = 12e3 }) {
  return verifyGatewaysParallel({ gateways, txid: evidence.txid, expectedSize: evidence.archive_size, expectedHash: evidence.archive_sha256, hashBytes: (bytes) => cryptoEngine.hashHex(bytes), timeoutMs });
}

// src/shared/sanitize-filename.js
function sanitizeFilename(value, fallback = "recovered-file") {
  const basename = String(value ?? "").normalize("NFC").split(/[\\/]/).filter(Boolean).at(-1) ?? "";
  const safe = basename.replace(/[:*?"<>|\u0000-\u001f\u007f]/g, "_").replace(/^\.+/, "").trim().slice(0, 180);
  return safe || fallback;
}

// src/recovery/attachment-recovery.js
var hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
async function recoverAttachmentForDownload(snapshot, attachmentId) {
  const validation = await validateSnapshot(snapshot);
  if (!validation.valid) throw new ValidationError("INVALID_SNAPSHOT", "Attachment recovery validation failed", validation.errors);
  if (typeof attachmentId !== "string" || !attachmentId) throw new ValidationError("INVALID_ATTACHMENT_REFERENCE", "Attachment reference is invalid");
  const matches = snapshot.knowledge_graph.attachments.filter((item) => item.id === attachmentId);
  if (matches.length !== 1) throw new ValidationError("INVALID_ATTACHMENT_REFERENCE", "Attachment reference is missing or ambiguous");
  if (!hasOwn(snapshot.attachment_payloads, attachmentId)) throw new ValidationError("ATTACHMENT_MISSING", "Attachment payload is missing");
  const metadata = matches[0];
  const mimeType = normalizeMimeType(metadata.media_type);
  const bytes = base64UrlToBytes(snapshot.attachment_payloads[attachmentId], { maxBytes: 1024 ** 3 });
  const expectedLength = snapshot.knowledge_graph.schema_version === 2 ? metadata.byte_length : metadata.size;
  if (bytes.byteLength !== expectedLength) throw new ValidationError("ATTACHMENT_LENGTH_MISMATCH", "Attachment length does not match its manifest");
  if (await cryptoEngine.hashHex(bytes) !== metadata.sha256) throw new ValidationError("ATTACHMENT_HASH_MISMATCH", "Attachment SHA-256 does not match its manifest");
  return { bytes: bytes.slice(), filename: sanitizeFilename(metadata.display_name), mimeType, sha256: metadata.sha256 };
}

// src/ui/file-save.js
var extensionFor = (name) => {
  const match = /(?:^|\.)([A-Za-z0-9]{1,16})$/.exec(name);
  return match ? `.${match[1].toLowerCase()}` : void 0;
};
async function saveBytesLocally({ bytes, suggestedName, mimeType, picker = globalThis.showSaveFilePicker, documentRef = globalThis.document, urlApi = globalThis.URL, BlobCtor = globalThis.Blob, schedule = globalThis.setTimeout }) {
  if (!(bytes instanceof Uint8Array)) throw new ValidationError("INVALID_SAVE_BYTES", "File bytes are invalid");
  const filename = sanitizeFilename(suggestedName), type = normalizeMimeType(mimeType), blob = new BlobCtor([bytes.slice()], { type });
  if (typeof picker === "function") {
    try {
      const extension2 = extensionFor(filename), options = { suggestedName: filename };
      if (extension2) options.types = [{ description: "CJAS local file", accept: { [type]: [extension2] } }];
      const handle = await picker(options), writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return { status: "saved", method: "file-picker", filename };
    } catch (error) {
      if (error?.name === "AbortError") return { status: "cancelled", method: "file-picker", filename };
      if (!["NotAllowedError", "NotSupportedError", "SecurityError", "TypeError"].includes(error?.name)) throw error;
    }
  }
  if (!documentRef?.createElement || !urlApi?.createObjectURL || !urlApi?.revokeObjectURL) throw new ValidationError("DOWNLOAD_UNAVAILABLE", "Browser download is unavailable");
  const url = urlApi.createObjectURL(blob), link = documentRef.createElement("a");
  try {
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    documentRef.body?.append(link);
    link.click();
  } finally {
    link.remove();
    schedule(() => urlApi.revokeObjectURL(url), 3e4);
  }
  return { status: "download-started", method: "browser-download", filename };
}

// src/product-v2/model.js
var MODULE_IDS = Object.freeze(["accounts", "conditions", "locations", "instructions", "assistants", "message"]);
var FIELD_STATES = Object.freeze(["EMPTY", "UNKNOWN", "LATER", "VALID", "INVALID"]);
var VERSION_STATES = Object.freeze(["DRAFT", "REVIEW_READY", "GENERATED", "SUPERSEDED", "ARCHIVED"]);
var ASSISTANCE_STATES = Object.freeze(["NOT_SET", "NEED", "NOT_NEEDED", "UNKNOWN"]);

// src/product-v2/snapshot-mapper.js
var ATTACHMENT_MODULE_REFS = Object.freeze({ accounts: "assets-accounts", conditions: "recovery-conditions", locations: "locations-finding", instructions: "recovery-order-exceptions", assistants: "contacts-assistance", message: "evidence-messages" });

// src/product-v2/projections.js
var REPORT_LABELS = Object.freeze({
  conditions: { email: "\u6CE8\u518C\u90AE\u7BB1", phone: "\u6CE8\u518C\u624B\u673A\u53F7", password: "\u767B\u5F55\u5BC6\u7801", authenticator: "Authenticator", passkey: "Passkey", security_key: "Security Key", identity: "\u8EAB\u4EFD\u9A8C\u8BC1\u6750\u6599", new_device: "\u65B0\u8BBE\u5907\u786E\u8BA4", withdrawal_whitelist: "\u63D0\u5E01\u5730\u5740\u767D\u540D\u5355", fund_password: "\u8D44\u91D1\u6216\u4EA4\u6613\u5BC6\u7801", other: "\u5176\u4ED6\u6062\u590D\u6761\u4EF6" },
  coverage_modes: { SUMMARY: "\u6C47\u603B\u4F4D\u7F6E", ITEMIZED: "\u9010\u9879\u4F4D\u7F6E" },
  modules: { accounts: "\u8D44\u4EA7\u4E0E\u8D26\u6237\u8D44\u6599", conditions: "\u6062\u590D\u6240\u9700\u6750\u6599\u548C\u6761\u4EF6", locations: "\u4F4D\u7F6E\u4E0E\u67E5\u627E\u8BF4\u660E", instructions: "\u6062\u590D\u4E0E\u8F6C\u79FB\u6B65\u9AA4", assistants: "\u534F\u52A9\u4EBA\u8D44\u6599", message: "\u7ED9\u672A\u6765\u6062\u590D\u4EBA\u7684\u5631\u6258" },
  account_types: { Personal: "\u4E2A\u4EBA\u8D26\u6237", Institutional: "\u673A\u6784\u8D26\u6237" },
  assistance: { NOT_SET: "\u5C1A\u672A\u8BBE\u7F6E", NEED: "\u9700\u8981\u534F\u52A9", NOT_NEEDED: "\u4E0D\u9700\u8981\u534F\u52A9", UNKNOWN: "\u6682\u4E0D\u786E\u5B9A" }
});
var PREFLIGHT_MODULES = Object.freeze({ "assets-accounts": "accounts", "recovery-conditions": "conditions", "locations-finding": "locations", "recovery-order-exceptions": "instructions", "contacts-assistance": "assistants", "evidence-messages": "message" });

// src/product-v2/recovered-report.js
var moduleIds = { "assets-accounts": "accounts", "recovery-conditions": "conditions", "locations-finding": "locations", "recovery-order-exceptions": "instructions", "contacts-assistance": "assistants", "evidence-messages": "message" };
var conditionName = (id) => REPORT_LABELS.conditions[id] ?? id;
var metadataValue = (map, id) => (map.custom_fields ?? []).find((item) => item.id === id)?.value;
var scopeFor = (map, file) => {
  const marker = (file.owner_entity_refs ?? []).map((id) => metadataValue(map, id)).find((value) => value === "MODULE_SUMMARY" || value === "SYSTEM_GENERATED" || String(value).startsWith("ACCOUNT:"));
  if (marker) return marker;
  const owners = (map.assets ?? []).filter((asset) => (asset.attachment_refs ?? []).includes(file.id));
  return owners.length === 1 ? `ACCOUNT:${owners[0].id}` : "MODULE_SUMMARY";
};
var publicFile = (file, map) => {
  const scope = scopeFor(map, file), accountId = scope.startsWith("ACCOUNT:") ? scope.slice(8) : null, asset = (map.assets ?? []).find((item) => item.id === accountId), relatedAccountIds = (map.assets ?? []).filter((item) => (file.owner_entity_refs ?? []).includes(item.id)).map((item) => item.id), locationRefs = (map.locations ?? []).filter((item) => (item.attachment_refs ?? []).includes(file.id)).map((item) => item.id), covered = (map.recovery_conditions ?? []).filter((item) => (!accountId || (item.asset_refs ?? []).includes(accountId)) && (item.location_refs ?? []).some((id) => locationRefs.includes(id)));
  return { attachment_id: file.id, file_name: file.display_name, mime_type: file.media_type, byte_length: file.byte_length, account_id: accountId, account_label: asset?.label ?? null, related_account_ids: relatedAccountIds, attachment_scope: scope, module_id: moduleIds[file.module_refs?.[0]] ?? "accounts", module_label: REPORT_LABELS.modules[moduleIds[file.module_refs?.[0]]] ?? "\u76F8\u5173\u8D44\u6599", purpose: file.purpose, covered_labels: covered.map((item) => conditionName(item.type)) };
};
function projectRecoveredReport(snapshot) {
  const map = snapshot.knowledge_graph;
  if (map.schema_version !== 2) return null;
  const files = (map.attachments ?? []).map((file) => publicFile(file, map)), metadata = (asset, suffix) => metadataValue(map, `metadata-${asset.id}-${suffix}`), contacts = map.contacts ?? [];
  const accounts = (map.assets ?? []).map((asset) => {
    const conditions = (asset.condition_refs ?? []).map((ref) => {
      const item = (map.recovery_conditions ?? []).find((value) => value.id === ref), type = item?.type ?? "other", label = (item?.custom_field_refs ?? []).map((id) => metadataValue(map, id)).find(Boolean) ?? conditionName(type), coverages = (item?.location_refs ?? []).map((locationRef) => {
        const location = (map.locations ?? []).find((value) => value.id === locationRef);
        return { location_id: locationRef, label: location?.label ?? "\u4F4D\u7F6E\u8BF4\u660E", description: location?.finding_instructions ?? "", mode: (location?.label ?? "").includes("SUMMARY") ? "\u6C47\u603B\u4F4D\u7F6E" : "\u4F4D\u7F6E\u8BF4\u660E" };
      });
      return { condition_id: type, label, coverage: coverages };
    });
    const step = (map.recovery_steps ?? []).find((item) => (item.asset_refs ?? []).includes(asset.id)), accountFiles = files.filter((file) => file.attachment_scope.startsWith("ACCOUNT:") && file.account_id === asset.id);
    return { account_id: asset.id, label: asset.label, platform: asset.label, region: metadata(asset, "region") || "\u672A\u8BB0\u5F55", account_type: REPORT_LABELS.account_types[metadata(asset, "account-type")] ?? metadata(asset, "account-type") ?? "\u672A\u8BB0\u5F55", conditions, instruction: { instruction_text: step?.action ?? "" }, risk_notes: step?.stop_condition ?? "", assistants: contacts.filter((item) => (asset.contact_refs ?? []).includes(item.id)), personal_message: map.personal_message, attachment_sections: Object.values(REPORT_LABELS.modules).map((label) => ({ label, attachments: accountFiles.filter((file) => file.module_label === label) })).filter((section) => section.attachments.length), attachments: accountFiles };
  });
  return { title: map.vault_title, version_number: snapshot.version ?? snapshot.snapshot_version ?? 1, updated_at: map.reviewed_at, account_count: accounts.length, platform_count: new Set(accounts.map((item) => item.platform)).size, condition_count: accounts.reduce((sum, item) => sum + item.conditions.length, 0), attachment_count: files.length, assistant_count: contacts.length, accounts, assistance: { needed: map.assistance?.needed, assistants: contacts }, personal_message: map.personal_message, module_attachments: files.filter((file) => file.attachment_scope === "MODULE_SUMMARY"), system_files: files.filter((file) => file.attachment_scope === "SYSTEM_GENERATED"), attachment_directory: files };
}

// src/ui/attachment-display.js
var ATTACHMENT_FRIENDLY_TYPES = Object.freeze(["\u6587\u6863", "\u56FE\u7247", "\u8BED\u97F3", "\u89C6\u9891", "\u5176\u4ED6"]);
var extension = (name) => String(name ?? "").split(".").pop().toLowerCase();
function attachmentFriendlyType(file = {}) {
  const mime = String(file.mime_type ?? file.media_type ?? file.mimeType ?? file.type ?? "").toLowerCase();
  const ext = extension(file.file_name ?? file.display_name ?? file.filename ?? file.name);
  if (mime.startsWith("image/") || ["jpg", "jpeg", "png", "heic", "heif", "gif", "webp"].includes(ext)) return "\u56FE\u7247";
  if (mime.startsWith("audio/") || ["mp3", "m4a", "wav", "aac", "flac", "ogg"].includes(ext)) return "\u8BED\u97F3";
  if (mime.startsWith("video/") || ["mp4", "mov", "m4v", "webm"].includes(ext)) return "\u89C6\u9891";
  if (mime.startsWith("text/") || mime.includes("pdf") || mime.includes("document") || mime.includes("word") || mime.includes("sheet") || mime.includes("excel") || mime.includes("json") || ["pdf", "doc", "docx", "txt", "json", "rtf", "csv", "xls", "xlsx"].includes(ext)) return "\u6587\u6863";
  return "\u5176\u4ED6";
}

// src/ui/format-byte-size.js
function formatByteSize(value, { approximate = false } = {}) {
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes < 0) return "\u2014";
  const prefix = approximate ? "\u7EA6 " : "";
  if (bytes < 1048576) return `${prefix}${Math.max(bytes ? 0.1 : 0, bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
  if (bytes < 1073741824) return `${prefix}${(bytes / 1048576).toFixed(1)} MB`;
  return `${prefix}${(bytes / 1073741824).toFixed(1)} GB`;
}

// web/map-view.js
var RECOVERY_GUIDE_URL = "./assets/SKREK-Recovery-Guide-V2.pdf";
var escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
var domId = (value) => String(value ?? "account").replace(/[^a-zA-Z0-9_-]/g, "-");
var groupsFor = (map) => map.schema_version === 2 ? [] : [["\u8D44\u4EA7\u7EBF\u7D22", map.assets, "label"], ["\u5B58\u653E\u4F4D\u7F6E", map.locations, "description"], ["\u8BBE\u5907", map.devices, "identifying_features"], ["\u8054\u7CFB\u4EBA", map.contacts, "role"], ["\u6062\u590D\u987A\u5E8F", map.orders, "action"], ["\u98CE\u9669\u8B66\u544A", map.warnings, "instruction"]];
var isSharedRecoverySummary = (file) => file.attachment_scope === "MODULE_SUMMARY" && ["locations", "instructions"].includes(file.module_id);
var fileTypeCounts = (files) => ["\u6587\u6863", "\u56FE\u7247", "\u8BED\u97F3", "\u89C6\u9891", "\u5176\u4ED6"].map((type) => [type, files.filter((file) => attachmentFriendlyType(file) === type).length]).filter(([, count]) => count);
var fileTypeSummary = (files) => fileTypeCounts(files).map(([type, count]) => `${type} ${count}`).join(" \xB7 ") || "\u6682\u65E0\u9644\u4EF6";
var status = (value) => value ? "\u5DF2\u8BB0\u5F55" : "\u672A\u8BB0\u5F55";
var isGeneratedRecoveryAdvice = (text3) => /^按(?: .+ )?官方(?:恢复路径|流程).*[。.]?$/.test(String(text3 || "").trim());
var attachmentScopeLabel = (file) => file.attachment_scope === "MODULE_SUMMARY" ? "\u6C47\u603B\u8D44\u6599" : file.attachment_scope.startsWith("ACCOUNT:") ? "\u672C\u8D26\u6237\u8D44\u6599" : "";
var attachmentHtml = (file, { accountLabel: accountLabel2 } = {}) => `<article class="map-attachment${isSharedRecoverySummary(file) ? " is-shared-summary" : ""}"><div class="map-attachment-main"><strong>${escape(file.file_name)}</strong><p>${attachmentFriendlyType(file)} \xB7 ${formatByteSize(file.byte_length)} \xB7 ${escape(file.module_label)}${attachmentScopeLabel(file) ? ` \xB7 ${attachmentScopeLabel(file)}` : ""}</p>${file.account_id ? `<p>\u6240\u5C5E\u8D26\u6237\uFF1A${escape(file.account_label)}</p>` : ""}</div><div class="map-attachment-actions"><button class="quiet-file-action" data-attachment-id="${file.attachment_id}" data-attachment-action="download">\u4E0B\u8F7D</button></div>${isSharedRecoverySummary(file) ? `<p class="shared-summary-note">\u8FD9\u662F\u4E00\u4EFD\u6A21\u5757\u6C47\u603B\u9644\u4EF6\uFF0C\u586B\u5199\u4EBA\u5728\u672C\u6A21\u5757\u4E2D\u7528\u4E8E\u96C6\u4E2D\u8BB0\u5F55\u591A\u4E2A\u8D26\u6237\u76F8\u5173\u4FE1\u606F\u3002\u8BF7\u6253\u5F00\u540E\u67E5\u627E\u201C${escape(accountLabel2 || "\u5F53\u524D\u5E73\u53F0\u6216\u94B1\u5305\u540D\u79F0")}\u201D\u5BF9\u5E94\u90E8\u5206\u3002\u5982\u5DF2\u4E0B\u8F7D\u540C\u4E00\u4EFD\u6C47\u603B\u8D44\u6599\uFF0C\u65E0\u9700\u91CD\u590D\u4E0B\u8F7D\u3002</p>` : ""}</article>`;
var workspaceSection = (number, title, body, className = "", summaryNote = "") => `<details class="card workspace-section ${className}" data-workspace-section="${number}"><summary><span class="section-number">${number}</span><strong>${title}</strong>${summaryNote ? `<span class="section-summary-note">${summaryNote}</span>` : ""}<span class="section-toggle"><span class="when-closed">\u25B6 \u5C55\u5F00</span><span class="when-open">\u25BC \u6536\u8D77</span></span></summary><div class="workspace-section-body">${body}</div></details>`;
var modulePanel = (number, title, body) => `<details class="map-module card"><summary><span>${number}</span><strong>${title}</strong><span class="section-toggle"><span class="when-closed">\u25B6 \u5C55\u5F00</span><span class="when-open">\u25BC \u6536\u8D77</span></span></summary><div class="map-module-body">${body}</div></details>`;
var guideItem = (number, title, body) => `<details class="recovery-guide-item"><summary><span>\u25B6</span><strong>${number}\uFF5C${title}</strong></summary><div>${body}</div></details>`;
var guideHtml = () => `<details class="card workspace-section recovery-guide" data-workspace-section="01"><summary><span class="section-number">01</span><strong>\u5982\u4F55\u7406\u89E3\u548C\u4F7F\u7528\u8FD9\u4EFD Recovery Map</strong><span class="recovery-guide-actions"><a href="${RECOVERY_GUIDE_URL}" target="_blank" rel="noopener" data-recovery-guide-action>\u5728\u7EBF\u67E5\u770B\u4F7F\u7528\u624B\u518C</a><a href="${RECOVERY_GUIDE_URL}" download="SKREK-Recovery-Guide-V2.pdf" data-recovery-guide-action>\u4E0B\u8F7D\u4F7F\u7528\u624B\u518C</a></span><span class="section-toggle"><span class="when-closed">\u25B6 \u5C55\u5F00</span><span class="when-open">\u25BC \u6536\u8D77</span></span></summary><div class="workspace-section-body recovery-guide-body">${guideItem("01", "\u7B2C\u4E00\u6B21\u4F7F\u7528\uFF0C\u8BF7\u6309\u8FD9\u4E2A\u987A\u5E8F", '<ol class="recovery-guide-steps"><li><strong>STEP 1\uFF5C\u5148\u770B\u8D26\u6237\u4E0E\u94B1\u5305\u603B\u89C8</strong><span>\u5148\u4E86\u89E3\u5305\u542B\u54EA\u4E9B\u8D26\u6237\u548C\u94B1\u5305\uFF0C\u4E0D\u8981\u7ACB\u5373\u79FB\u52A8\u8D44\u4EA7\u3002</span></li><li><strong>STEP 2\uFF5C\u5148\u770B\u586B\u5199\u4EBA\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u5631\u6258</strong><span>\u786E\u8BA4\u4F18\u5148\u987A\u5E8F\u3001\u6682\u4E0D\u64CD\u4F5C\u7684\u8D26\u6237\u3001\u5E94\u5148\u8054\u7CFB\u7684\u4EBA\u548C\u7279\u6B8A\u5B89\u6392\u3002\u7279\u522B\u8BF4\u660E\u53EF\u80FD\u6539\u53D8\u6B63\u5E38\u6062\u590D\u987A\u5E8F\u3002</span></li><li><strong>STEP 3\uFF5C\u4E00\u6B21\u53EA\u5904\u7406\u4E00\u4E2A\u8D26\u6237</strong><span>\u5B8C\u6210\u6216\u786E\u8BA4\u4E00\u4E2A\u8D26\u6237\u540E\uFF0C\u518D\u5904\u7406\u4E0B\u4E00\u4E2A\u3002</span></li><li><strong>STEP 4\uFF5C\u6309\u7167\u4E09\u4E2A\u95EE\u9898\u5904\u7406\u5F53\u524D\u8D26\u6237</strong><span>\u9700\u8981\u4EC0\u4E48 \u2192 \u5728\u54EA\u91CC \u2192 \u600E\u4E48\u6062\u590D\u3002\u5148\u786E\u8BA4\u6761\u4EF6\uFF0C\u518D\u627E\u5230\u6750\u6599\uFF0C\u6700\u540E\u6267\u884C\u6B65\u9AA4\u3002</span></li><li><strong>STEP 5\uFF5C\u4E0D\u786E\u5B9A\u65F6\u5148\u505C\u6B62</strong><span>\u4E0D\u8981\u731C\u6D4B\u6216\u8FDB\u884C\u4E0D\u53EF\u9006\u64CD\u4F5C\uFF1B\u91CD\u65B0\u67E5\u770B\u5631\u6258\u3001\u76F8\u5173\u9644\u4EF6\u548C\u534F\u52A9\u4EBA\u4FE1\u606F\uFF0C\u5FC5\u8981\u65F6\u5BFB\u6C42\u5E2E\u52A9\u3002</span></li><li><strong>STEP 6\uFF5C\u5B8C\u6210\u5F53\u524D\u8D26\u6237\uFF0C\u518D\u8FDB\u5165\u4E0B\u4E00\u4E2A</strong><span>\u8FD4\u56DE\u8D26\u6237\u4E0E\u94B1\u5305\u603B\u89C8\uFF0C\u7EE7\u7EED\u9010\u4E00\u5904\u7406\u3002</span></li></ol>')}${guideItem("02", "Recovery Map \u7684\u516D\u4E2A\u90E8\u5206", '<p class="guide-lead"><strong>\u516D\u4E2A\u6A21\u5757\u662F\u586B\u5199\u4EBA\u6574\u7406\u8D44\u6599\u7684\u65B9\u5F0F\uFF0C\u4E0D\u662F\u516D\u5957\u4E0D\u540C\u7684\u6062\u590D\u6D41\u7A0B\u3002</strong></p><div class="recovery-module-explainer"><p><b>01\uFF5C\u8D44\u4EA7\u4E0E\u8D26\u6237</b><span>\u586B\u5199\u4EBA\u8BB0\u5F55\u4E86\u54EA\u4E9B\u5E73\u53F0\u3001\u8D26\u6237\u6216\u94B1\u5305\u3002</span></p><p><b>02\uFF5C\u6062\u590D\u6240\u9700\u6761\u4EF6\u4E0E\u8D44\u6599</b><span>\u6062\u590D\u6BCF\u4E2A\u8D26\u6237\u5B9E\u9645\u9700\u8981\u54EA\u4E9B\u6761\u4EF6\u548C\u6750\u6599\u3002</span></p><p><b>03\uFF5C\u4F4D\u7F6E\u4E0E\u67E5\u627E</b><span>\u8FD9\u4E9B\u6750\u6599\u3001\u8BBE\u5907\u6216\u4FE1\u606F\u5728\u54EA\u91CC\uFF0C\u4EE5\u53CA\u5982\u4F55\u627E\u5230\u3002</span></p><p><b>04\uFF5C\u6062\u590D\u4E0E\u8F6C\u79FB\u6B65\u9AA4</b><span>\u627E\u5230\u6750\u6599\u4EE5\u540E\uFF0C\u5E94\u6309\u4EC0\u4E48\u6B65\u9AA4\u6062\u590D\u6216\u5904\u7406\u3002</span></p><p><b>05\uFF5C\u534F\u52A9\u4EBA</b><span>\u586B\u5199\u4EBA\u6307\u5B9A\u4E86\u8C01\u3001\u4EC0\u4E48\u65F6\u5019\u8054\u7CFB\u3001\u53EF\u4EE5\u534F\u52A9\u4EC0\u4E48\u3002</span></p><p><b>06\uFF5C\u7ED9\u672A\u6765\u6062\u590D\u4EBA\u7684\u5631\u6258</b><span>\u586B\u5199\u4EBA\u7559\u4E0B\u7684\u7279\u522B\u63D0\u9192\u3001\u4E2A\u4EBA\u5B89\u6392\u6216\u60F3\u8BF4\u7684\u8BDD\u3002</span></p></div><p class="recovery-path-line">\u6709\u4EC0\u4E48 \u2192 \u9700\u8981\u4EC0\u4E48 \u2192 \u5728\u54EA\u91CC \u2192 \u600E\u4E48\u6062\u590D \u2192 \u8C01\u53EF\u4EE5\u5E2E\u52A9 \u2192 \u8FD8\u6709\u4EC0\u4E48\u7279\u522B\u60F3\u544A\u8BC9\u4F60</p>')}${guideItem("03", "\u5982\u4F55\u7406\u89E3\u4E0D\u540C\u8D44\u6599\u548C\u9644\u4EF6", '<div class="recovery-material-explainer"><p><b>\u5728\u7EBF\u586B\u5199\u4FE1\u606F</b><span>\u586B\u5199\u4EBA\u5728 SKREK \u9875\u9762\u76F4\u63A5\u586B\u5199\u7684\u91CD\u8981\u6062\u590D\u4FE1\u606F\u3002</span></p><p><b>\u672C\u8D26\u6237\u76F8\u5173\u9644\u4EF6</b><span>\u586B\u5199\u4EBA\u5728\u5F53\u524D\u8D26\u6237\u4E0B\u4E0A\u4F20\u7684\u76F8\u5173\u8D44\u6599\u3002SKREK \u6309\u586B\u5199\u65F6\u5DF2\u6709\u7684\u8D26\u6237\u548C\u6A21\u5757\u5F52\u5C5E\u4E3A\u4F60\u5C55\u793A\u3002</span></p><p><b>\u6A21\u5757\u6C47\u603B\u9644\u4EF6</b><span>\u586B\u5199\u4EBA\u5728\u540C\u4E00\u6A21\u5757\u4E2D\u7528\u4E8E\u96C6\u4E2D\u8BB0\u5F55\u591A\u4E2A\u8D26\u6237\u76F8\u5173\u4FE1\u606F\u7684\u8D44\u6599\u3002\u6253\u5F00\u540E\u8BF7\u67E5\u627E\u5F53\u524D\u8D26\u6237\u6216\u5E73\u53F0\u540D\u79F0\u5BF9\u5E94\u90E8\u5206\uFF1B\u5982\u5DF2\u4E0B\u8F7D\u540C\u4E00\u4EFD\u6C47\u603B\u8D44\u6599\uFF0C\u65E0\u9700\u91CD\u590D\u4E0B\u8F7D\u3002</span></p></div><p class="system-navigation-boundary">SKREK\u4F9D\u636E\u586B\u5199\u65F6\u5DF2\u6709\u7684\u6A21\u5757\u548C\u8D26\u6237\u5173\u8054\u5E2E\u52A9\u4F60\u67E5\u627E\u8D44\u6599\uFF0C\u4E0D\u8BFB\u53D6\u3001\u5206\u6790\u6216\u91CD\u65B0\u89E3\u91CA\u586B\u5199\u4EBA\u4E0A\u4F20\u7684\u9644\u4EF6\u5185\u5BB9\u3002</p><p>\u586B\u5199\u4EBA\u5F53\u65F6\u7559\u4E0B\u7684\u5B8C\u6574\u539F\u59CB\u4FE1\u606F\u548C\u9644\u4EF6\uFF0C\u5747\u4FDD\u7559\u5728\u201C\u586B\u5199\u4EBA\u539F\u59CB\u6863\u6848\u201D\u4E2D\u3002\u5982\u9700\u6838\u5BF9\u5B8C\u6574\u5E95\u6863\uFF0C\u53EF\u968F\u65F6\u8FD4\u56DE\u67E5\u770B\u3002</p>')}${guideItem("04", "\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u505C\u6B62\u5E76\u5BFB\u6C42\u5E2E\u52A9", '<p class="guide-lead"><strong>\u4E0D\u786E\u5B9A\u65F6\uFF0C\u5B81\u53EF\u6682\u505C\uFF0C\u4E5F\u4E0D\u8981\u731C\u6D4B\u3002</strong></p><ul class="recovery-stop-list"><li>\u4FE1\u606F\u4E0E\u5F53\u524D\u5B9E\u9645\u60C5\u51B5\u4E0D\u4E00\u81F4\uFF1B</li><li>\u4E0D\u786E\u5B9A\u662F\u5426\u5E94\u8BE5\u91CD\u7F6E\u8BBE\u5907\u6216\u91CD\u65B0\u7ED1\u5B9A 2FA\uFF1B</li><li>\u65E0\u6CD5\u786E\u8BA4\u5730\u5740\u3001\u7F51\u7EDC\u6216\u8D26\u6237\u8EAB\u4EFD\uFF1B</li><li>\u5E73\u53F0\u754C\u9762\u4E0E\u586B\u5199\u4EBA\u8BF4\u660E\u660E\u663E\u4E0D\u540C\uFF1B</li><li>\u65E0\u6CD5\u786E\u8BA4 Seed Phrase / \u52A9\u8BB0\u8BCD\u6216 Private Key / \u79C1\u94A5\u7684\u4F7F\u7528\u662F\u5426\u5B89\u5168\uFF1B</li><li>\u4E0D\u786E\u5B9A\u5E94\u8BE5\u4FE1\u4EFB\u54EA\u4E00\u9879\u4FE1\u606F\u3002</li></ul><p>\u5EFA\u8BAE\u4F9D\u6B21\u67E5\u770B\uFF1A\u586B\u5199\u4EBA\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u5631\u6258 \u2192 \u5F53\u524D\u8D26\u6237\u76F8\u5173\u9644\u4EF6 \u2192 \u586B\u5199\u4EBA\u7559\u4E0B\u7684\u534F\u52A9\u4EBA \u2192 \u9002\u7528\u65F6\u54A8\u8BE2 Spark / SKREK\u3002</p>')}</div></details>`;
var uniqueBy = (items, key) => [...new Map(items.map((item) => [item[key], item])).values()];
var materialSources = ({ onlineHtml = "", files = [], sharedFiles = [], accountLabel: accountLabel2, emptyText }) => {
  const accountFiles = uniqueBy(files, "attachment_id"), summaries = uniqueBy(sharedFiles, "attachment_id");
  return `<div class="material-source-list">${onlineHtml ? `<section class="material-source-block"><h5>\u5728\u7EBF\u586B\u5199\u4FE1\u606F</h5>${onlineHtml}</section>` : ""}${accountFiles.length ? `<section class="material-source-block"><h5>\u672C\u8D26\u6237\u76F8\u5173\u9644\u4EF6</h5><p>\u4EE5\u4E0B\u8D44\u6599\u7531\u586B\u5199\u4EBA\u5728\u5F53\u524D\u8D26\u6237\u4E0B\u4E0A\u4F20\u3002</p>${accountFiles.map((file) => attachmentHtml(file, { accountLabel: accountLabel2 })).join("")}</section>` : ""}${summaries.length ? `<section class="material-source-block"><h5>\u6A21\u5757\u6C47\u603B\u9644\u4EF6</h5><p>\u8FD9\u7C7B\u8D44\u6599\u7531\u586B\u5199\u4EBA\u5728\u672C\u6A21\u5757\u4E2D\u7528\u4E8E\u96C6\u4E2D\u8BB0\u5F55\u591A\u4E2A\u8D26\u6237\u76F8\u5173\u4FE1\u606F\u3002</p>${summaries.map((file) => attachmentHtml(file, { accountLabel: accountLabel2 })).join("")}</section>` : ""}${!onlineHtml && !accountFiles.length && !summaries.length ? `<p class="muted">${emptyText}</p>` : ""}</div>`;
};
var accountPanel = (account, index, { sharedLocationFiles = [], sharedInstructionFiles = [] } = {}) => {
  const locationFiles = account.attachments.filter((file) => file.module_id === "locations"), instructionFiles = account.attachments.filter((file) => file.module_id === "instructions"), otherFiles = account.attachments.filter((file) => !["locations", "instructions"].includes(file.module_id));
  const locations = uniqueBy(account.conditions.flatMap((item) => item.coverage), "location_id"), locationHtml = locations.length ? `<ul class="structured-location-list">${locations.map((value) => `<li><strong>${escape(value.label)}</strong>${value.description ? `\uFF1A${escape(value.description)}` : ""}</li>`).join("")}</ul>` : "";
  const instructionText = isGeneratedRecoveryAdvice(account.instruction.instruction_text) ? "" : account.instruction.instruction_text;
  return `<details class="map-account" id="recovery-account-${domId(account.account_id)}" data-account-id="${escape(account.account_id)}"><summary><span>${String(index + 1).padStart(2, "0")}</span><strong>${escape(account.label)}</strong><span class="section-toggle"><span class="when-closed">\u25B6 \u5C55\u5F00\u8D26\u6237</span><span class="when-open">\u25BC \u6536\u8D77\u8D26\u6237</span></span></summary><div class="map-account-body"><section class="account-recovery-part"><h4><span class="content-step">1.</span>\u8D26\u6237\u4FE1\u606F</h4><dl class="account-facts"><div><dt>\u5E73\u53F0</dt><dd>${escape(account.platform)}</dd></div><div><dt>\u7C7B\u578B</dt><dd>${escape(account.account_type)}</dd></div><div><dt>\u5730\u533A</dt><dd>${escape(account.region)}</dd></div></dl></section><section class="account-recovery-part"><h4><span class="content-step">2.</span>\u6062\u590D\u9700\u8981\u4EC0\u4E48</h4><ol class="condition-list">${account.conditions.map((item, conditionIndex) => `<li><span>${String(conditionIndex + 1).padStart(2, "0")}</span>${escape(item.label)}</li>`).join("") || "<li>\u672A\u8BB0\u5F55\u6062\u590D\u6761\u4EF6\u3002</li>"}</ol></section><section class="account-recovery-part"><h4><span class="content-step">3.</span>\u8FD9\u4E9B\u6750\u6599\u5728\u54EA\u91CC</h4>${materialSources({ onlineHtml: locationHtml, files: locationFiles, sharedFiles: sharedLocationFiles, accountLabel: account.label, emptyText: "\u672A\u8BB0\u5F55\u76F8\u5173\u4F4D\u7F6E\u8D44\u6599\u3002" })}</section><section class="account-recovery-part"><h4><span class="content-step">4.</span>\u600E\u4E48\u6062\u590D</h4>${materialSources({ onlineHtml: instructionText ? `<p class="instruction-summary">${escape(instructionText)}</p>` : "", files: instructionFiles, sharedFiles: sharedInstructionFiles, accountLabel: account.label, emptyText: "\u672A\u8BB0\u5F55\u76F8\u5173\u6062\u590D\u6B65\u9AA4\u8D44\u6599\u3002" })}</section><section class="account-recovery-part"><h4><span class="content-step">5.</span>\u5176\u4ED6\u76F8\u5173\u9644\u4EF6</h4>${uniqueBy(otherFiles, "attachment_id").map((file) => attachmentHtml(file, { accountLabel: account.label })).join("") || '<p class="muted">\u65E0\u5176\u4ED6\u76F8\u5173\u9644\u4EF6\u3002</p>'}</section></div></details>`;
};
function buildRecoveryWorkspaceHtml(snapshot) {
  const report = projectRecoveredReport(snapshot), files = report.attachment_directory, byModule = (id) => files.filter((file) => file.module_id === id), message = report.personal_message?.text || "", moduleFiles = (id) => byModule(id).filter((file) => !file.attachment_scope.startsWith("ACCOUNT:"));
  const sharedLocationFiles = files.filter((file) => isSharedRecoverySummary(file) && file.module_id === "locations"), sharedInstructionFiles = files.filter((file) => isSharedRecoverySummary(file) && file.module_id === "instructions"), sharedFor = (collection, accountId) => collection.filter((file) => !file.related_account_ids?.length || file.related_account_ids.includes(accountId));
  const moduleAccounts = (id, body) => `${moduleFiles(id).map((file) => attachmentHtml(file)).join("")}${report.accounts.map((account) => `<section class="map-module-account"><h4>${escape(account.label)}</h4>${body(account)}${account.attachments.filter((file) => file.module_id === id).map((file) => attachmentHtml(file, { accountLabel: account.label })).join("")}</section>`).join("")}`;
  const overview = report.accounts.map((account, index) => {
    const locationAccountFiles = account.attachments.filter((file) => file.module_id === "locations"), instructionAccountFiles = account.attachments.filter((file) => file.module_id === "instructions"), accountSharedLocations = sharedFor(sharedLocationFiles, account.account_id), accountSharedInstructions = sharedFor(sharedInstructionFiles, account.account_id), hasLocation = account.conditions.some((item) => item.coverage.length), hasInstruction = Boolean(account.instruction.instruction_text), hasAnyFiles = Boolean(account.attachments.length || accountSharedLocations.length || accountSharedInstructions.length);
    return `<tr><td>${String(index + 1).padStart(2, "0")}</td><td><a href="#recovery-account-${domId(account.account_id)}" data-account-target="${escape(account.account_id)}">${escape(account.label)}</a></td><td>${escape(account.account_type)}</td><td>${status(account.conditions.length)}</td><td>${hasLocation ? "\u5DF2\u8BB0\u5F55" : locationAccountFiles.length || accountSharedLocations.length ? "\u76F8\u5173\u4FE1\u606F\u5728\u9644\u4EF6\u4E2D" : "\u672A\u8BB0\u5F55"}</td><td>${hasInstruction ? "\u5DF2\u8BB0\u5F55" : instructionAccountFiles.length || accountSharedInstructions.length ? "\u76F8\u5173\u4FE1\u606F\u5728\u9644\u4EF6\u4E2D" : "\u672A\u8BB0\u5F55"}</td><td>${hasAnyFiles ? "\u6709\u76F8\u5173\u8D44\u6599" : "\u65E0\u76F8\u5173\u9644\u4EF6"}</td></tr>`;
  }).join("");
  const messageFiles = byModule("message"), messageBody = message ? `<p class="recovery-message-intro">\u5F00\u59CB\u6062\u590D\u4EFB\u4F55\u8D26\u6237\u524D\uFF0C\u5EFA\u8BAE\u5148\u67E5\u770B\u586B\u5199\u4EBA\u7559\u4E0B\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u76F8\u5173\u9644\u4EF6\u3002</p><p class="recovery-message-text">${escape(message)}</p>` : messageFiles.length ? `<p class="recovery-message-intro">\u5F00\u59CB\u6062\u590D\u4EFB\u4F55\u8D26\u6237\u524D\uFF0C\u5EFA\u8BAE\u5148\u67E5\u770B\u586B\u5199\u4EBA\u7559\u4E0B\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u76F8\u5173\u9644\u4EF6\u3002</p><p>\u586B\u5199\u4EBA\u6CA1\u6709\u7559\u4E0B\u5728\u7EBF\u6587\u5B57\u8BF4\u660E\uFF0C\u4F46\u7559\u4E0B\u4E86 ${messageFiles.length} \u4E2A\u76F8\u5173\u9644\u4EF6\uFF0C\u8BF7\u4F18\u5148\u67E5\u770B\u3002</p><p class="recovery-file-summary">${fileTypeSummary(messageFiles)}</p>` : "<p>\u672A\u7559\u4E0B\u7279\u522B\u8BF4\u660E\u4E0E\u5631\u6258\u3002</p>";
  const overviewSection = workspaceSection("02", "\u8D26\u6237\u4E0E\u94B1\u5305\u603B\u89C8", `<div class="recovery-table-wrap"><table><thead><tr><th>#</th><th>\u5E73\u53F0 / \u94B1\u5305</th><th>\u7C7B\u578B</th><th>\u6062\u590D\u6761\u4EF6</th><th>\u4F4D\u7F6E\u4FE1\u606F</th><th>\u6062\u590D\u6B65\u9AA4</th><th>\u9644\u4EF6</th></tr></thead><tbody>${overview || '<tr><td colspan="7">\u672A\u8BB0\u5F55\u8D26\u6237\u6216\u94B1\u5305\u3002</td></tr>'}</tbody></table></div>`, "recovery-overview");
  const messageSection = workspaceSection("03", "\u586B\u5199\u4EBA\u7ED9\u4F60\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u5631\u6258", `${messageBody}${messageFiles.map((file) => attachmentHtml(file)).join("")}`, "recovery-message");
  const accountsSection = workspaceSection("04", "\u6309\u8D26\u6237\u9010\u4E00\u6062\u590D", `<p class="section-intro">\u4ECE\u4E00\u4E2A\u8D26\u6237\u5F00\u59CB\uFF0C\u4F9D\u6B21\u6838\u5BF9\u6062\u590D\u6761\u4EF6\u3001\u4FDD\u5B58\u4F4D\u7F6E\u3001\u6062\u590D\u6B65\u9AA4\u548C\u76F8\u5173\u9644\u4EF6\u3002</p><div class="recovery-account-list">${report.accounts.map((account, index) => accountPanel(account, index, { sharedLocationFiles: sharedFor(sharedLocationFiles, account.account_id), sharedInstructionFiles: sharedFor(sharedInstructionFiles, account.account_id) })).join("") || "<p>\u672A\u8BB0\u5F55\u8D26\u6237\u3002</p>"}</div>${report.assistance.assistants.length ? '<p><button type="button" class="assistant-section-link" data-assistant-target>\u9700\u8981\u534F\u52A9\uFF1F\u67E5\u770B\u586B\u5199\u4EBA\u7559\u4E0B\u7684\u534F\u52A9\u4EBA\u4FE1\u606F \u2192</button></p>' : ""}`, "recovery-account-view");
  const archiveBody = `<p class="section-intro">\u8FD9\u91CC\u5B8C\u6574\u4FDD\u7559\u586B\u5199\u4EBA\u5F53\u65F6\u7559\u4E0B\u7684\u516D\u4E2A\u6A21\u5757\u548C\u539F\u59CB\u9644\u4EF6\u3002\u4E0A\u9762\u7684\u8D26\u6237\u6062\u590D\u89C6\u56FE\u7528\u4E8E\u5E2E\u52A9\u4F60\u66F4\u5FEB\u67E5\u627E\u548C\u5904\u7406\uFF1B\u5982\u9700\u6838\u5BF9\u5B8C\u6574\u539F\u59CB\u4FE1\u606F\uFF0C\u53EF\u4EE5\u968F\u65F6\u56DE\u5230\u8FD9\u91CC\u67E5\u770B\u3002</p>${modulePanel("01", "\u8D44\u4EA7\u4E0E\u8D26\u6237", moduleAccounts("accounts", (account) => `<p>${escape(account.platform)} \xB7 ${escape(account.region)} \xB7 ${escape(account.account_type)}</p>`))}${modulePanel("02", "\u6062\u590D\u6240\u9700\u6761\u4EF6\u4E0E\u8D44\u6599", moduleAccounts("conditions", (account) => `<ol>${account.conditions.map((item) => `<li>${escape(item.label)}</li>`).join("") || "<li>\u672A\u586B\u5199</li>"}</ol>`))}${modulePanel("03", "\u4F4D\u7F6E\u4E0E\u67E5\u627E", moduleAccounts("locations", (account) => `<ul>${account.conditions.map((item) => `<li><strong>${escape(item.label)}</strong>\uFF1A${item.coverage.map((value) => escape(value.description || value.label)).join("\uFF1B") || "\u672A\u586B\u5199"}</li>`).join("")}</ul>`))}${modulePanel("04", "\u6062\u590D\u4E0E\u8F6C\u79FB\u6B65\u9AA4", moduleAccounts("instructions", (account) => `<p>${escape(account.instruction.instruction_text || "\u672A\u586B\u5199")}</p>`))}${modulePanel("05", "\u534F\u52A9\u4EBA", `${report.assistance.assistants.map((item) => `<p><strong>${escape(item.label || item.role)}</strong><br>${escape(item.when_to_contact || "")}<br>${escape(item.assistance_boundary || "")}</p>`).join("") || "<p>\u672A\u8BBE\u7F6E\u534F\u52A9\u4EBA</p>"}${byModule("assistants").map((file) => attachmentHtml(file)).join("")}`)}${modulePanel("06", "\u7ED9\u672A\u6765\u6062\u590D\u4EBA\u7684\u5631\u6258", `<p>${escape(message || "\u672A\u586B\u5199")}</p>${moduleFiles("message").map((file) => attachmentHtml(file)).join("")}`)}`;
  const assistantFiles = byModule("assistants"), hasAssistant = Boolean(report.assistance.assistants.length || assistantFiles.length), assistantBody = hasAssistant ? `<p class="section-intro">\u4EE5\u4E0B\u4E3A\u586B\u5199\u4EBA\u5728\u201C\u534F\u52A9\u4EBA\u201D\u6A21\u5757\u4E2D\u7559\u4E0B\u7684\u4FE1\u606F\u3002\u5982\u9700\u8981\u5E2E\u52A9\uFF0C\u8BF7\u6839\u636E\u586B\u5199\u4EBA\u7684\u8BF4\u660E\u5224\u65AD\u662F\u5426\u4EE5\u53CA\u4F55\u65F6\u8054\u7CFB\u3002</p>${report.assistance.assistants.map((item) => `<article class="account-helper"><strong>${escape(item.label || item.role)}</strong><dl><div><dt>\u8EAB\u4EFD / \u89D2\u8272</dt><dd>${escape(item.role || "\u672A\u8BB0\u5F55")}</dd></div><div><dt>\u4EC0\u4E48\u65F6\u5019\u8054\u7CFB</dt><dd>${escape(item.when_to_contact || "\u672A\u8BB0\u5F55")}</dd></div><div><dt>\u53EF\u4EE5\u534F\u52A9\u4EC0\u4E48 / \u6743\u9650\u8FB9\u754C</dt><dd>${escape(item.assistance_boundary || "\u672A\u8BB0\u5F55")}</dd></div></dl></article>`).join("")}${assistantFiles.map((file) => attachmentHtml(file)).join("")}` : "<p>\u586B\u5199\u4EBA\u672A\u7559\u4E0B\u534F\u52A9\u4EBA\u4FE1\u606F\u3002</p><p>\u5982\u9700\u8FDB\u4E00\u6B65\u5E2E\u52A9\uFF0C\u8BF7\u7EE7\u7EED\u67E5\u9605\u586B\u5199\u4EBA\u7559\u4E0B\u7684\u7279\u522B\u8BF4\u660E\u3001\u76F8\u5173\u9644\u4EF6\u6216\u5176\u4ED6\u6062\u590D\u8D44\u6599\u3002</p>";
  const assistantSection = workspaceSection("05", "\u534F\u52A9\u4EBA", assistantBody, "recovery-assistance-section");
  const archiveSection = workspaceSection("06", "\u586B\u5199\u4EBA\u539F\u59CB\u6863\u6848", archiveBody, "recovery-module-view");
  const helpSection = workspaceSection("07", "\u9700\u8981\u5E2E\u52A9\uFF1F", `<div class="recovery-help-order"><p>\u5982\u679C\u9047\u5230\u65E0\u6CD5\u786E\u8BA4\u7684\u4FE1\u606F\uFF0C\u8BF7\u5148\u505C\u6B62\u64CD\u4F5C\uFF0C\u5E76\u4F9D\u6B21\u67E5\u770B\uFF1A</p><ol><li>\u586B\u5199\u4EBA\u7684\u7279\u522B\u8BF4\u660E\u4E0E\u5631\u6258</li><li>\u5F53\u524D\u8D26\u6237\u76F8\u5173\u8D44\u6599</li><li>\u534F\u52A9\u4EBA\u4FE1\u606F\uFF08\u5982\u6709\uFF09</li></ol><p><strong>\u4E0D\u786E\u5B9A\u65F6\uFF0C\u5B81\u53EF\u6682\u505C\uFF0C\u4E5F\u4E0D\u8981\u731C\u6D4B\u3002</strong></p></div><div class="spark-help"><h3>\u4ECD\u6709\u7591\u95EE\uFF1F\u53EF\u4EE5\u54A8\u8BE2 Spark</h3><p>\u5982\u679C\u67E5\u770B\u4E86\u586B\u5199\u4EBA\u7684\u7279\u522B\u8BF4\u660E\u3001\u76F8\u5173\u9644\u4EF6\u548C\u534F\u52A9\u4EBA\u4FE1\u606F\u540E\uFF0C\u4ECD\u7136\u65E0\u6CD5\u786E\u8BA4\u4E0B\u4E00\u6B65\uFF0C\u4E5F\u53EF\u4EE5\u54A8\u8BE2 Spark\uFF0C\u4E86\u89E3\u8FD9\u4EFD Recovery Map \u7684\u4F7F\u7528\u65B9\u5F0F\uFF0C\u6216\u5E2E\u52A9\u5224\u65AD\u4E0B\u4E00\u6B65\u5E94\u8BE5\u67E5\u770B\u54EA\u4E9B\u8D44\u6599\u3002</p><button type="button" class="secondary" disabled title="Spark Recovery Map \u5E2E\u52A9\u5165\u53E3\u5C1A\u672A\u6B63\u5F0F\u5F00\u653E">\u54A8\u8BE2 Spark \xB7 Coming soon</button></div>`, "recovery-help");
  return `<section class="card recovery-workspace-hero"><h2>\u4F60\u7684 Recovery Map \u5DF2\u6210\u529F\u6062\u590D</h2><p>\u4F60\u6B63\u5728\u67E5\u770B\u7ECF\u5B8C\u6574\u6027\u9A8C\u8BC1\u5E76\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u89E3\u5BC6\u7684\u6062\u590D\u8D44\u6599\u3002</p><dl class="recovery-stats"><div><dt>\u8D26\u6237 / \u94B1\u5305</dt><dd>${report.account_count}</dd></div><div><dt>\u6062\u590D\u6761\u4EF6</dt><dd>${report.condition_count}</dd></div><div class="attachment-stat"><dt>\u9644\u4EF6</dt><dd>${report.attachment_count}<small>\uFF5C ${escape(fileTypeSummary(files))}</small></dd></div><div><dt>\u6700\u540E\u66F4\u65B0</dt><dd>${escape(report.updated_at ? new Date(report.updated_at).toLocaleDateString("zh-CN") : "\u672A\u8BB0\u5F55")}</dd></div></dl>${report.assistant_count ? `<p class="recovery-helper-note">\u5DF2\u8BB0\u5F55 ${report.assistant_count} \u4F4D\u534F\u52A9\u4EBA / \u673A\u6784</p>` : ""}</section>${guideHtml()}${overviewSection}${messageSection}${accountsSection}${assistantSection}${archiveSection}${helpSection}<div data-attachment-status></div>`;
}
function renderRecoveryMap(container, snapshot, { allowAttachmentDownloads = false } = {}) {
  const map = snapshot.knowledge_graph;
  if (map.schema_version === 2) container.innerHTML = buildRecoveryWorkspaceHtml(snapshot);
  else {
    const groups = groupsFor(map);
    container.innerHTML = `<section class="card"><h2>${escape(map.vault_title)}</h2><div class="map-grid">${groups.map(([title, items, field]) => `<div class="map-card"><h3>${title}</h3>${items.length ? items.map((i) => `<p><strong>${escape(i.label || i.type || `\u6B65\u9AA4 ${i.sequence}`)}</strong><br>${escape(i[field])}</p>`).join("") : '<p class="muted">\u672A\u586B\u5199</p>'}</div>`).join("")}</div></section>`;
  }
  container.querySelectorAll("[data-recovery-guide-action]").forEach((link) => link.addEventListener("click", (event) => event.stopPropagation()));
  container.querySelectorAll("[data-account-target]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    const account = container.querySelector(`#recovery-account-${domId(link.dataset.accountTarget)}`), section = container.querySelector('[data-workspace-section="04"]');
    if (!account || !section) return;
    section.open = true;
    container.querySelectorAll(".map-account").forEach((candidate) => {
      candidate.open = candidate === account;
    });
    account.setAttribute("tabindex", "-1");
    account.scrollIntoView({ behavior: "smooth", block: "start" });
    account.focus({ preventScroll: true });
  }));
  container.querySelectorAll("[data-assistant-target]").forEach((link) => link.addEventListener("click", () => {
    const section = container.querySelector('[data-workspace-section="05"]');
    if (!section) return;
    section.open = true;
    section.setAttribute("tabindex", "-1");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.focus({ preventScroll: true });
  }));
  if (allowAttachmentDownloads) container.querySelectorAll("[data-attachment-id]").forEach((button) => button.onclick = async () => {
    const status2 = container.querySelector("[data-attachment-status]");
    button.disabled = true;
    status2.className = "muted";
    status2.textContent = "\u6B63\u5728\u9A8C\u8BC1\u9644\u4EF6\u2026";
    try {
      const attachment = await recoverAttachmentForDownload(snapshot, button.dataset.attachmentId), saved = await saveBytesLocally({ bytes: attachment.bytes, suggestedName: attachment.filename, mimeType: attachment.mimeType });
      status2.className = saved.status === "cancelled" ? "muted" : "success";
      status2.textContent = saved.status === "cancelled" ? "\u5DF2\u53D6\u6D88\u4FDD\u5B58\uFF0C\u672A\u751F\u6210\u4E0B\u8F7D\u6587\u4EF6\u3002" : saved.status === "saved" ? "\u9644\u4EF6\u5DF2\u4FDD\u5B58\u3002" : "\u6D4F\u89C8\u5668\u4E0B\u8F7D\u5DF2\u5F00\u59CB\uFF0C\u8BF7\u5728\u4E0B\u8F7D\u5217\u8868\u4E2D\u786E\u8BA4\u6587\u4EF6\u3002";
    } catch {
      status2.className = "error";
      status2.textContent = "\u9644\u4EF6\u9A8C\u8BC1\u5931\u8D25\uFF0C\u5DF2\u963B\u6B62\u64CD\u4F5C\u3002";
    } finally {
      button.disabled = false;
    }
  });
}

// web/recover.js
var app = document.querySelector("#app");
var recoveryStages = ["\u6B63\u5728\u8BFB\u53D6\u6062\u590D\u6750\u6599", "\u6B63\u5728\u83B7\u53D6\u52A0\u5BC6\u8D44\u6599", "\u6B63\u5728\u9A8C\u8BC1\u8D44\u6599\u5B8C\u6574\u6027", "\u6B63\u5728\u89E3\u5BC6 Recovery Map", "\u6B63\u5728\u6062\u590D\u9644\u4EF6", "\u6062\u590D\u5B8C\u6210"];
var recoveryInFlight = false;
app.innerHTML = `<h1>Mainnet \u72EC\u7ACB\u6062\u590D</h1><p>\u53EA\u4F7F\u7528\u540C\u4E00\u6B21\u521B\u5EFA\u7684 Mainnet Recovery Evidence\u3001Recovery Kit \u548C Recovery Password\uFF0C\u4ECE\u957F\u671F\u5B58\u50A8\u7F51\u7EDC\u6062\u590D Recovery Map \u4E0E\u5168\u90E8\u9644\u4EF6\u3002</p><section class="card recovery-entry"><div class="field"><label for="evidence">Mainnet Recovery Evidence</label><input id="evidence" type="file" accept=".json,application/json"></div><div class="field"><label for="kit">Recovery Kit</label><input id="kit" type="file" accept=".cjas,application/octet-stream"></div><div class="field"><label for="password">Recovery Password</label><input id="password" type="password" autocomplete="off"></div><button id="recover">\u5F00\u59CB\u72EC\u7ACB\u6062\u590D</button><div id="message" role="status" aria-live="polite"></div></section><section class="card recovery-progress-card" hidden><h2>\u6062\u590D\u8FDB\u5EA6</h2><p class="recovery-wait-note">\u8D44\u6599\u6B63\u5728\u6062\u590D\u4E2D\uFF0C\u8BF7\u4FDD\u6301\u9875\u9762\u5F00\u542F\u3002</p><ol id="recovery-stages"></ol></section><div id="result"></div>`;
var recoverButton = document.querySelector("#recover");
var progressCard = document.querySelector(".recovery-progress-card");
function stage(active) {
  progressCard.hidden = active < 0;
  document.querySelector("#recovery-stages").innerHTML = recoveryStages.map((label, index) => `<li class="${index < active ? "done" : index === active ? "active" : ""}"${index === active ? ' aria-current="step"' : ""}><span>${String(index + 1).padStart(2, "0")}</span><strong>${label}</strong></li>`).join("");
  if (active === recoveryStages.length - 1) progressCard.querySelector(".recovery-wait-note").textContent = "\u8D44\u6599\u5DF2\u5B8C\u6210\u9A8C\u8BC1\u3001\u89E3\u5BC6\u548C\u9644\u4EF6\u6062\u590D\u3002";
}
function setRecovering(value) {
  recoveryInFlight = value;
  recoverButton.disabled = value;
  recoverButton.classList.toggle("is-processing", value);
  recoverButton.setAttribute("aria-busy", String(value));
  recoverButton.textContent = value ? "\u6B63\u5728\u6062\u590D\u2026" : "\u5F00\u59CB\u72EC\u7ACB\u6062\u590D";
}
function renderRecovered(snapshot) {
  const result = document.querySelector("#result");
  document.querySelector(".recovery-entry").hidden = true;
  result.innerHTML = `<section class="card recovery-complete"><p class="eyebrow">RECOVERY COMPLETE</p><h2>Recovery Map \u5DF2\u6210\u529F\u6062\u590D</h2><p>\u8D44\u6599\u5DF2\u5B8C\u6210\u9A8C\u8BC1\u3001\u89E3\u5BC6\u548C\u9644\u4EF6\u6062\u590D\u3002</p><button id="enter-recovery-map">\u8FDB\u5165 Recovery Map</button></section><div id="recovered-map" hidden></div>`;
  document.querySelector("#enter-recovery-map").onclick = () => {
    const map = result.querySelector("#recovered-map");
    map.hidden = false;
    renderRecoveryMap(map, snapshot, { allowAttachmentDownloads: true });
    result.querySelector(".recovery-complete").hidden = true;
    progressCard.hidden = true;
    app.classList.add("recovery-workspace-active");
    document.body.classList.add("recovery-workspace-active");
    map.scrollIntoView({ behavior: "auto", block: "start" });
  };
}
recoverButton.onclick = async () => {
  if (recoveryInFlight) return;
  const message = document.querySelector("#message"), result = document.querySelector("#result"), evidenceFile = document.querySelector("#evidence").files[0], kitFile = document.querySelector("#kit").files[0];
  let password = document.querySelector("#password").value;
  message.textContent = "";
  result.textContent = "";
  if (!evidenceFile || !kitFile || !password) {
    message.className = "error";
    message.textContent = "\u8BF7\u9009\u62E9 Mainnet Recovery Evidence\u3001Recovery Kit \u5E76\u8F93\u5165 Recovery Password\u3002";
    return;
  }
  setRecovering(true);
  try {
    stage(0);
    const evidence = validateMainnetEvidence(JSON.parse(await evidenceFile.text())), kitBytes = new Uint8Array(await kitFile.arrayBuffer()), kit = recoveryKitBuilder.parseKit(kitBytes);
    assertKitEvidencePair({ kit, evidence });
    stage(1);
    const downloaded = await verifyMainnetArchive({ evidence });
    if (!downloaded.verified) throw new Error("Mainnet \u4E2D\u7684\u52A0\u5BC6\u6062\u590D\u7248\u672C\u5C1A\u672A\u5B8C\u6574\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
    stage(2);
    const archiveBytes = downloaded.bytes;
    if (archiveBytes.length !== evidence.archive_size) throw new Error("Mainnet Archive \u5927\u5C0F\u6821\u9A8C\u5931\u8D25\u3002");
    stage(3);
    const recovered = await recoverVaultArtifacts({ kitBytes, archiveBytes, password });
    stage(4);
    renderRecovered(recovered.snapshot);
    stage(5);
    message.className = "success";
    message.textContent = "\u6062\u590D\u6210\u529F\u3002Recovery Map \u4E0E\u5168\u90E8\u9644\u4EF6\u5B8C\u6574\u6027\u9A8C\u8BC1\u901A\u8FC7\u3002";
  } catch (error) {
    stage(-1);
    message.className = "error";
    message.textContent = error.message;
    setRecovering(false);
  } finally {
    password = "";
    document.querySelector("#password").value = "";
  }
};
stage(-1);
