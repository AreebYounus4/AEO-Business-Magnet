#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
PASS=0
FAIL=0

pass() { echo "✓ $1"; PASS=$((PASS + 1)); }
fail() { echo "✗ $1"; FAIL=$((FAIL + 1)); }

echo "Smoke testing $BASE_URL"
echo "========================"

# Homepage
CODE=$(curl -s -o /tmp/home.html -w "%{http_code}" "$BASE_URL/")
if [ "$CODE" = "200" ] && grep -q "Calibrate Commerce" /tmp/home.html; then
  pass "Homepage loads (200)"
else
  fail "Homepage failed ($CODE)"
fi

# Static assets
LOGO_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/logos/platforms/chatgpt.svg")
if [ "$LOGO_CODE" = "200" ]; then
  pass "Platform logo asset loads (200)"
else
  fail "Platform logo asset failed ($LOGO_CODE)"
fi

CLIENT_LOGO_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/logos/clients/virgin-mobile.svg")
if [ "$CLIENT_LOGO_CODE" = "200" ]; then
  pass "Client logo asset loads (200)"
else
  fail "Client logo asset failed ($CLIENT_LOGO_CODE)"
fi

# Config API
CONFIG=$(curl -s "$BASE_URL/api/config")
if echo "$CONFIG" | grep -q "enabledEngines"; then
  pass "Config API returns enabledEngines"
else
  fail "Config API invalid: $CONFIG"
fi

# Audit API validation
AUDIT_BAD=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/audit" \
  -H "Content-Type: application/json" \
  -d '{}')
AUDIT_BAD_CODE=$(echo "$AUDIT_BAD" | tail -n1)
if [ "$AUDIT_BAD_CODE" = "400" ]; then
  pass "Audit API rejects empty payload (400)"
else
  fail "Audit API empty payload expected 400, got $AUDIT_BAD_CODE"
fi

# Audit API success
AUDIT_OK=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/audit" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "company": "Test Co",
    "email": "test@example.com",
    "website": "https://example.com",
    "revenue": "Under $100K/month",
    "market": "UAE",
    "challenge": "We need better AI visibility in ChatGPT."
  }')
AUDIT_OK_CODE=$(echo "$AUDIT_OK" | tail -n1)
AUDIT_OK_BODY=$(echo "$AUDIT_OK" | sed '$d')
if [ "$AUDIT_OK_CODE" = "200" ] && echo "$AUDIT_OK_BODY" | grep -q '"success":true'; then
  pass "Audit API accepts valid booking (200)"
else
  fail "Audit API booking failed ($AUDIT_OK_CODE): $AUDIT_OK_BODY"
fi

# Scan API validation
SCAN_BAD=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/scan" \
  -H "Content-Type: application/json" \
  -d '{}')
SCAN_BAD_CODE=$(echo "$SCAN_BAD" | tail -n1)
if [ "$SCAN_BAD_CODE" = "400" ]; then
  pass "Scan API rejects empty payload (400)"
else
  fail "Scan API empty payload expected 400, got $SCAN_BAD_CODE"
fi

# Scan API submission (may 503 without API keys, 200 with keys, 500 on crawl failure)
SCAN_OK=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/scan" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "workEmail": "test@example.com",
    "phoneNumber": "+971500000000",
    "websiteUrl": "https://example.com",
    "consentAccepted": true
  }')
SCAN_OK_CODE=$(echo "$SCAN_OK" | tail -n1)
SCAN_OK_BODY=$(echo "$SCAN_OK" | sed '$d')

if [ "$SCAN_OK_CODE" = "200" ] && echo "$SCAN_OK_BODY" | grep -q 'reportUrl'; then
  pass "Scan API completes and returns reportUrl (200)"
  REPORT_URL=$(echo "$SCAN_OK_BODY" | grep -oE '/report/[^"]+' | head -1 || true)
  if [ -n "$REPORT_URL" ]; then
    REPORT_CODE=$(curl -s -o /tmp/report.html -w "%{http_code}" "$BASE_URL$REPORT_URL")
    if [ "$REPORT_CODE" = "200" ] && grep -q "Platform Scores" /tmp/report.html; then
      pass "Report page loads after scan (200)"
    else
      fail "Report page failed ($REPORT_CODE)"
    fi
  fi
elif [ "$SCAN_OK_CODE" = "503" ]; then
  pass "Scan API reachable but no AI engines configured (503, expected without API keys)"
else
  fail "Scan API unexpected response ($SCAN_OK_CODE): $SCAN_OK_BODY"
fi

echo "========================"
echo "Passed: $PASS | Failed: $FAIL"
if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
