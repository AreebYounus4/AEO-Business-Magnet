export function normalizePrivateKey(key: string): string {
  const normalized = key.replace(/\\n/g, "\n").trim();

  if (normalized.includes("BEGIN PRIVATE KEY") || normalized.includes("BEGIN RSA PRIVATE KEY")) {
    return normalized;
  }

  const body = normalized.replace(/\s+/g, "");
  const chunks = body.match(/.{1,64}/g) ?? [body];
  return `-----BEGIN PRIVATE KEY-----\n${chunks.join("\n")}\n-----END PRIVATE KEY-----`;
}
