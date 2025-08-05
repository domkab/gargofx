while IFS='=' read -r key value; do
  # Skip comments and empty lines
  if [[ ! -z "$key" && ! "$key" =~ ^# ]]; then
    echo "Setting secret: $key"
    gh secret set "$key" --body "$value"
  fi
done < .env.production