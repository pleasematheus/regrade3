## 1. vite.config.ts — extrair data do commit

- [x] 1.1 Adicionar variável `commitDate` com `execSync("git log -1 --format=%cd --date=format:'%d/%m/%Y'")` dentro do bloco `try` existente (e `commitDate = "unknown"` no `catch`)
- [x] 1.2 Adicionar `__COMMIT_DATE__: JSON.stringify(commitDate)` ao objeto `define`

## 2. vite-env.d.ts — declarar tipo

- [x] 2.1 Adicionar `declare const __COMMIT_DATE__: string` em `src/vite-env.d.ts`

## 3. Footer.tsx — exibir data

- [x] 3.1 Estender a linha de versão de `{__COMMIT_HASH__}` para `{__COMMIT_HASH__} · {__COMMIT_DATE__}`

## 4. Verificação

- [x] 4.1 Verificar no dev server que a data do commit aparece no footer no formato DD/MM/AAAA
- [x] 4.2 Build sem erros: `tsc -b && vite build`
