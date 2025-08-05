#!/bin/bash
# Default: .env.production

ENV_FILE="${1:-.env.production}"

# Resolve absolute path
ENV_PATH="$(cd "$(dirname "$ENV_FILE")" && pwd)/$(basename "$ENV_FILE")"

# Check file exists
if [ ! -f "$ENV_PATH" ]; then
  echo "❌ Error: File '$ENV_PATH' not found."
  exit 1
fi

echo "🔑 Uploading secrets from $ENV_PATH to GitHub..."

# Read each line safely (handles spaces and =)
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^# || -z "$line" ]] && continue

  # Extract key and value
  key="${line%%=*}"
  value="${line#*=}"

  # Trim possible whitespace
  key="$(echo -e "${key}" | tr -d '[:space:]')"
  value="$(echo -e "${value}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"

  # Set secret using GitHub CLI
  echo "Setting secret: $key"
  gh secret set "$key" --body "$value"
done < "$ENV_PATH"

echo "✅ All secrets from $ENV_PATH uploaded successfully!"