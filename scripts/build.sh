#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
CATALYST_DIR="$ROOT_DIR/apps/catalyst"
B2B_DIR="$ROOT_DIR/apps/b2b-buyer-portal"
SRC_DIST="$B2B_DIR/apps/storefront/dist"
DEST_DIR="$CATALYST_DIR/public/b2b-buyer-portal-dist"

fail() { echo "[ERROR] $*" >&2; exit 1; }
info() { echo "[INFO] $*" >&2; }
ok()   { echo "[OK] $*" >&2; }

info "Checking required directories…"
[[ -d "$CATALYST_DIR" ]] || fail "Missing directory: apps/catalyst (expected at $CATALYST_DIR)"
[[ -d "$B2B_DIR" ]]      || fail "Missing directory: apps/b2b-buyer-portal (expected at $B2B_DIR)"

# Check for pnpm & yarn
command -v pnpm >/dev/null 2>&1 || fail "pnpm not found on PATH (run corepack enable pnpm)"
command -v yarn >/dev/null 2>&1 || fail "yarn not found on PATH (run corepack enable yarn)"

info "Running root build: pnpm build"
( cd "$ROOT_DIR" && pnpm build )
ok "Root build complete"

info "Running b2b-buyer-portal build: yarn build"
( cd "$B2B_DIR" && yarn build )
ok "b2b-buyer-portal build complete"

[[ -d "$SRC_DIST" ]] || fail "Build output not found at: $SRC_DIST"

info "Preparing destination: $DEST_DIR"
mkdir -p "$DEST_DIR"

info "Cleaning previous artifacts in $DEST_DIR"
if [ -n "$(ls -A "$DEST_DIR" 2>/dev/null || true)" ]; then
  rm -rf "$DEST_DIR"/*
  rm -rf "$DEST_DIR"/.[!.]* "$DEST_DIR"/..?* 2>/dev/null || true  # clean dotfiles if any
fi

info "Copying new artifacts from $SRC_DIST to $DEST_DIR"
cp -a "$SRC_DIST"/. "$DEST_DIR"/

ok "Artifacts updated in $DEST_DIR"

echo "[SUCCESS] Done"
