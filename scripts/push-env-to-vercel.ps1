# Push .env.local keys to Vercel (production, preview, development).
# Usage: .\scripts\push-env-to-vercel.ps1

$ErrorActionPreference = "Continue"
$envFile = (Join-Path (Join-Path $PSScriptRoot "..") ".env.local" | Resolve-Path).Path

$sensitiveKeys = @(
  "OPENAI_API_KEY",
  "GEMINI_API_KEY",
  "PERPLEXITY_API_KEY",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"
)

$skipKeys = @("VERCEL_OIDC_TOKEN")

function Parse-EnvFile([string]$path) {
  $vars = @{}
  foreach ($line in Get-Content $path) {
    $trimmed = $line.Trim()
    if (-not $trimmed -or $trimmed.StartsWith("#")) { continue }
    $eq = $trimmed.IndexOf("=")
    if ($eq -lt 1) { continue }
    $name = $trimmed.Substring(0, $eq).Trim()
    $value = $trimmed.Substring($eq + 1).Trim()
    if ($value.StartsWith('"') -and $value.EndsWith('"')) {
      $value = $value.Substring(1, $value.Length - 2)
    }
    $vars[$name] = $value
  }
  return $vars
}

if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found"
}

$vars = Parse-EnvFile $envFile
$environments = @("production", "preview", "development")
$pushed = 0
$failed = @()

foreach ($name in ($vars.Keys | Sort-Object)) {
  if ($skipKeys -contains $name) { continue }
  $value = $vars[$name]
  if ([string]::IsNullOrWhiteSpace($value)) {
    Write-Host "[skip] $name (empty)"
    continue
  }

  $sensitiveFlag = if ($sensitiveKeys -contains $name) { "--sensitive" } else { "--no-sensitive" }

  foreach ($env in $environments) {
    Write-Host "[add] $name -> $env"
    $value | npx vercel env add $name $env --yes --force $sensitiveFlag *> $null
    if ($LASTEXITCODE -ne 0) {
      $failed += "$name ($env)"
      Write-Host "[fail] $name ($env)"
    } else {
      $pushed++
    }
  }
}

Write-Host ""
Write-Host "Done. Successful adds: $pushed"
if ($failed.Count -gt 0) {
  Write-Host "Failed: $($failed -join ', ')"
  exit 1
}
