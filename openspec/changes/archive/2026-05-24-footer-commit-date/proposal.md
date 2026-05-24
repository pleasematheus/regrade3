## Why

O footer exibe o hash do último commit (`e4c90f9`) mas não indica quando ele foi gerado, deixando ambíguo se a versão instalada é recente. Exibir a data ao lado do hash (`24/05/2026`) torna a versão autoexplicativa sem adicionar elementos extras de UI.

## What Changes

- `vite.config.ts`: adicionar extração de `git log -1 --format=%cd --date=format:'%d/%m/%Y'` e injetá-la como constante global `__COMMIT_DATE__`.
- `src/vite-env.d.ts`: declarar `__COMMIT_DATE__: string` para o TypeScript reconhecer a constante.
- `src/components/Footer.tsx`: estender a linha de versão de `v{__APP_VERSION__} · {__COMMIT_HASH__}` para `v{__APP_VERSION__} · {__COMMIT_HASH__} · {__COMMIT_DATE__}`.

## Capabilities

### New Capabilities
- `footer-version-info`: O que o footer exibe na linha de informações de versão/build — hash, versão semântica e data do commit.

### Modified Capabilities

## Impact

- `vite.config.ts`: adição de um `execSync` extra (mesmo padrão já existente para o hash).
- `src/vite-env.d.ts`: declaração de tipo.
- `src/components/Footer.tsx`: alteração de texto na linha de versão.
- Nenhuma dependência nova; sem impacto em testes ou CI.
