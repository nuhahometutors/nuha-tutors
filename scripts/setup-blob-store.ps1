# Nuha Tutors - create and connect a Vercel Blob store
# Run: npx vercel login && npm run setup:blob

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

function Invoke-Vercel {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
  $output = & npx --yes vercel@latest @Args 2>&1
  $code = $LASTEXITCODE
  $text = ($output | Out-String).Trim()
  if ($text) { Write-Host $text }
  if ($code -ne 0) { exit $code }
  return $text
}

$StoreName = "nuha-tutors-submissions"
$BlobPath = "nuha-submissions.json"
$Region = "sin1"

Write-Host ""
Write-Host "Nuha Tutors - Vercel Blob setup" -ForegroundColor Cyan
Write-Host "Store: $StoreName | access: private | region: $Region" -ForegroundColor Gray
Write-Host ""

if (-not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js / npx is required." -ForegroundColor Red
  exit 1
}

Write-Host "Step 1/4 - Checking Vercel login..." -ForegroundColor Yellow
$whoami = Invoke-Vercel whoami
Write-Host ("Logged in as " + $whoami.Split("`n")[-1].Trim()) -ForegroundColor Green

Write-Host ""
Write-Host "Step 2/4 - Linking this folder to your Vercel project..." -ForegroundColor Yellow
Invoke-Vercel link --yes --project nuha-tutors --scope hadis-projects-e99a451d | Out-Null

Write-Host ""
Write-Host "Step 3/4 - Creating Blob store..." -ForegroundColor Yellow
Invoke-Vercel blob create-store $StoreName --access private --region $Region --yes | Out-Null

Write-Host ""
Write-Host "Step 4/4 - Pulling env vars..." -ForegroundColor Yellow
Invoke-Vercel env pull .env.local --yes | Out-Null

Write-Host ""
Write-Host "Verifying connected stores..." -ForegroundColor Yellow
Invoke-Vercel blob list-stores | Out-Null

Write-Host ""
Write-Host "Done. Redeploy your site on Vercel." -ForegroundColor Green
Write-Host ""
