#!/usr/bin/env python3
import os
import sys
import glob
import re

def run_linter(project_dir):
    print("=== RUNNING ADVANCED LINTER & STATIC ANALYSIS ===")
    ts_files = glob.glob(f"{project_dir}/**/*.ts*", recursive=True)
    errors = []
    warnings = []

    prohibited_patterns = [
        (r'\bmath\.(pow|sin|cos|tan|sqrt|floor|ceil|abs|min|max)\b', "Lowercase 'math.*' detected. Must use capitalized 'Math.*'."),
        (r'^\s*var\s+[a-zA-Z0-9_$]+', "Legacy JavaScript 'var' declaration detected. Must use 'const' or 'let'."),
        (r'debugger;', "Active 'debugger' statement found.")
    ]

    for file_path in ts_files:
        if "node_modules" in file_path or ".next" in file_path:
            continue

        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
            content = "".join(lines)

        rel_path = os.path.relpath(file_path, project_dir)

        for b_open, b_close in [('{', '}'), ('(', ')'), ('[', ']')]:
            if content.count(b_open) != content.count(b_close):
                errors.append(f"[{rel_path}] Bracket balance error: '{b_open}' ({content.count(b_open)}) vs '{b_close}' ({content.count(b_close)})")

        for line_num, line in enumerate(lines, 1):
            for pattern, msg in prohibited_patterns:
                if re.search(pattern, line):
                    errors.append(f"[{rel_path}:{line_num}] Error: {msg}")

        if any(keyword in content for keyword in ['useState', 'useEffect', 'useRef', 'window.', 'document.']):
            if not content.strip().startswith("'use client'") and not content.strip().startswith('"use client"'):
                warnings.append(f"[{rel_path}] Missing 'use client' directive on component utilizing client-side hooks/browser APIs.")

    print(f"Scanned {len(ts_files)} TypeScript/React files.")
    if warnings:
        for w in warnings:
            print(f"  ⚠️  {w}")
    if errors:
        print("\n❌ LINTING FAILED with errors:")
        for e in errors:
            print(f"  ❌ {e}")
        return False
    else:
        print(f"\n✅ LINTING PASSED: 0 errors detected across {len(ts_files)} TypeScript/React files.")
        return True

if __name__ == "__main__":
    proj_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    success = run_linter(proj_dir)
    sys.exit(0 if success else 1)
