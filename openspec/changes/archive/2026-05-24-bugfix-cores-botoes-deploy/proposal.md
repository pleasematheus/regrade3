## Why

Commit `5ea4feb` introduced `text-current` on all buttons in `Inputs.tsx` and added DaisyUI theme support without explicit `--color-*-content` values. DaisyUI v5 auto-generates content colors via OKLch luminance — for the project's bright brand colors, this produces near-black text rather than the intended baby-powder (`#FDFFFC`). The result: buttons display with wrong text color in light mode in production, while dark mode appears unaffected. The reported dev vs. prod discrepancy is most likely explained by the developer testing mainly in dark mode during dev.

## What Changes

- Remove `text-current` class from all six buttons in `src/components/Inputs.tsx`
- Explicitly declare `--color-primary-content`, `--color-secondary-content`, `--color-accent-content`, and `--color-neutral-content` in both the `light` and `dark` DaisyUI theme blocks in `src/index.css`
- Add a spec documenting button theme-consistency requirements to prevent regression

## Capabilities

### New Capabilities
- `button-theme-consistency`: Button background and text colors must be correct and consistent across light and dark themes using explicit DaisyUI content variables.

### Modified Capabilities
<!-- No existing spec-level requirements change -->

## Impact

- `src/components/Inputs.tsx` — all six `<button>` elements: remove `text-current`
- `src/index.css` — both `@plugin "daisyui/theme"` blocks: add four `--color-*-content` declarations
- No API, routing, or dependency changes
