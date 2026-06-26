# Deploy API + Blob to the main nuhatutors.vercel.app project
$ErrorActionPreference = "Continue"

Write-Host "Linking to nuha_tutors (nuhatutors.vercel.app)..." -ForegroundColor Cyan
npx --yes vercel@latest link --yes --project nuha_tutors --scope hadis-projects-e99a451d
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$envList = npx --yes vercel@latest env ls 2>$null | Out-String
$hasBlob = $envList -match 'BLOB_READ_WRITE_TOKEN'

if (-not $hasBlob -and (Test-Path ".env.local")) {
  Write-Host "Copying BLOB_READ_WRITE_TOKEN to nuha_tutors..." -ForegroundColor Yellow
  $token = $null
  foreach ($line in Get-Content ".env.local") {
    if ($line -like "BLOB_READ_WRITE_TOKEN=*") {
      $token = $line.Substring(22).Trim() -replace '^"|"$', ''
      break
    }
  }
  if ($token) {
    $token | npx --yes vercel@latest env add BLOB_READ_WRITE_TOKEN production --force
    $token | npx --yes vercel@latest env add BLOB_READ_WRITE_TOKEN preview --force
    $token | npx --yes vercel@latest env add BLOB_READ_WRITE_TOKEN development --force
  }
}

Write-Host "Deploying to production..." -ForegroundColor Cyan
npx --yes vercel@latest deploy --prod --yes
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Done. Open https://nuhatutors.vercel.app" -ForegroundColor Green
