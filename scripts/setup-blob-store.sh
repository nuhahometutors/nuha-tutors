#!/usr/bin/env bash
# Nuha Tutors — create and connect a Vercel Blob store
# Run: npx vercel login && npm run setup:blob

set -e

STORE_NAME="nuha-tutors-submissions"
BLOB_PATH="nuha-submissions.json"
REGION="sin1"

echo ""
echo "Nuha Tutors — Vercel Blob setup"
echo "Store: $STORE_NAME | access: private | region: $REGION"
echo ""

echo "Step 1/4 — Checking Vercel login..."
if ! npx --yes vercel@latest whoami; then
  echo "Not logged in. Run: npx vercel login"
  exit 1
fi

echo ""
echo "Step 2/4 — Linking this folder to your Vercel project..."
npx --yes vercel@latest link

echo ""
echo "Step 3/4 — Creating Blob store..."
npx --yes vercel@latest blob create-store "$STORE_NAME" --access private --region "$REGION" --yes

echo ""
echo "Step 4/4 — Pulling env vars and seeding empty submissions file..."
npx --yes vercel@latest env pull .env.local --yes 2>/dev/null || true

SEED_FILE="$(mktemp)"
printf '[]' > "$SEED_FILE"

RW_TOKEN=""
if [ -f .env.local ]; then
  RW_TOKEN=$(grep '^BLOB_READ_WRITE_TOKEN=' .env.local | cut -d= -f2- | tr -d '"')
fi

if [ -n "$RW_TOKEN" ]; then
  npx --yes vercel@latest blob put "$SEED_FILE" \
    --pathname "$BLOB_PATH" \
    --access private \
    --content-type application/json \
    --allow-overwrite \
    --cache-control-max-age 60 \
    --rw-token "$RW_TOKEN"
else
  npx --yes vercel@latest blob put "$SEED_FILE" \
    --pathname "$BLOB_PATH" \
    --access private \
    --content-type application/json \
    --allow-overwrite \
    --cache-control-max-age 60
fi

rm -f "$SEED_FILE"

echo ""
echo "Verifying connected stores..."
npx --yes vercel@latest blob list-stores

echo ""
echo "Done. Redeploy your site on Vercel."
echo ""
