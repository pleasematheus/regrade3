## Context

`src/index.css` configures DaisyUI v5 themes via two mechanisms:
1. `@plugin "daisyui" { themes: light, dark }` — loads built-in DaisyUI theme CSS variable definitions
2. `@plugin "daisyui/theme" { name: "light"; ... }` — defines a custom theme override

These two mechanisms conflict. Commit `5ea4feb` also added `text-current` to buttons without declaring explicit `--color-*-content` variables, compounding the issue.

### Specificity conflict (root cause of prod vs. dev color discrepancy)

When `themes: light, dark` is set in the DaisyUI plugin, it generates a built-in light theme block:
```css
/* Built-in (index 6565 in bundle): */
:is(:root:has(input.theme-controller[value=light]:checked),[data-theme=light]) {
  --color-primary: oklch(45% .24 277.023); /* DaisyUI default — blue/purple */
  ...
}
```

DaisyUI v5 generates a different selector for custom themes with `default: true`:
```css
/* Custom (index 10268 in bundle): */
:where(:root),[data-theme=light] {
  --color-primary: #2ec4b6; /* our brand teal */
  ...
}
```

`:is()` inherits the specificity of its most specific argument. `:root:has(input.theme-controller[value=light]:checked)` has specificity `[0,2,1]`. Our custom theme uses `:where()` which always has zero specificity, so `[data-theme=light]` in our custom selector has effective specificity `[0,1,0]`.

**Result**: The built-in theme wins the cascade despite appearing earlier in the CSS, because `[0,2,1] > [0,1,0]`. Light mode always renders with DaisyUI's default colors (blue/purple primary, hot pink secondary) instead of our brand colors.

**Why dark mode was unaffected**: Our custom dark theme does NOT have `default: true`, so DaisyUI generates it with the same `:is(:root:has(...))` selector as the built-in dark theme. Equal specificity → source order wins → custom (appearing later) wins.

**Why dev looked correct**: In `vite dev`, the CSS is served via HMR and the module resolution may differ. Additionally, the user likely noticed the wrong colors primarily in production where they tested both themes more systematically.

### `text-current` secondary issue

Commit `5ea4feb` added `text-current` to all buttons. Even after fixing the specificity issue, `text-current` would still inherit `base-content` color rather than the appropriate `--color-*-content` variable. Both fixes are required.

## Goals / Non-Goals

**Goals:**
- Fix the CSS specificity conflict so our custom light theme variables take effect in production
- Restore correct text colors on all themed buttons in both light and dark modes
- Explicitly declare all four `--color-*-content` variables in both theme blocks

**Non-Goals:**
- Changing button background colors from the brand palette
- Refactoring `output.css` or the `tailb`/`tailw` scripts (not used in production pipeline)
- Changing the theme's base/neutral palette

## Decisions

**Change `themes: light, dark` to `themes: false`**
This prevents DaisyUI from generating built-in theme CSS variable blocks that conflict with our `@plugin "daisyui/theme"` custom definitions. With `themes: false`, only our custom theme blocks generate the `[data-theme]` CSS. DaisyUI component styles (`.btn`, `.btn-primary`, etc.) continue to work — they depend on CSS variables, not on which built-in theme is loaded.

Alternative considered: rename our theme (e.g., `my-light`/`my-dark`) — rejected because it would require changes to `index.html` and all `data-theme` references.

Alternative considered: remove `default: true` from light theme — this would make DaisyUI generate the higher-specificity `:is()` selector for our custom light theme, matching the built-in's specificity. The custom (appearing later) would then win. Rejected as more fragile: depends on source ordering in the bundle, which DaisyUI controls.

**Remove `text-current` from all buttons**
`text-current` inherits `color: currentColor` from the nearest ancestor. Inside DaisyUI's themed container, that ancestor is the `base-content` element — not the button's own `*-content` role. The correct approach is to let DaisyUI's `.btn-*` classes apply `--color-*-content` directly.

**Explicit `--color-*-content` values in both theme blocks**
Prevents DaisyUI from auto-computing content colors via OKLch — auto-computed values for bright brand colors produce near-dark text.

**Chosen values:**
| Variable | Light | Dark |
|---|---|---|
| `--color-primary-content` | `#FDFFFC` | `#FDFFFC` |
| `--color-secondary-content` | `#FDFFFC` | `#FDFFFC` |
| `--color-accent-content` | `#141414` | `#141414` |
| `--color-neutral-content` | `#FDFFFC` | `#FDFFFC` |

## Risks / Trade-offs

`themes: false` disables all DaisyUI built-in themes — if a future developer adds a component that relies on a built-in theme name not covered by our custom themes, it will fall back to unstyled → Mitigated by the `button-theme-consistency` spec and by keeping our custom themes named `light`/`dark` (conventional names).

Explicit content values lock in specific contrast ratios rather than letting DaisyUI adaptively optimize → Acceptable; values were chosen as part of the brand palette.

## Migration Plan

1. Change `themes: light, dark` → `themes: false` in `src/index.css`
2. Add explicit `--color-*-content` values to both theme blocks in `src/index.css`
3. Remove `text-current` from all buttons in `src/components/Inputs.tsx`
4. Commit and push to `main` → Vercel auto-deploys
5. Verify production site shows correct brand colors in both themes
6. No rollback needed — CSS-only change, purely additive/corrective
