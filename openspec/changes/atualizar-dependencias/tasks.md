## 1. Auditoria e planejamento

- [x] 1.1 Executar `npm outdated` para listar todas as dependências desatualizadas e identificar saltos de major version
- [x] 1.2 Consultar CHANGELOGs de `daisyui`, `react-router-dom` e `framer-motion` para breaking changes relevantes
- [x] 1.3 Consultar CHANGELOG do `vite` caso haja salto de major version

## 2. Atualização das dependências de produção

- [x] 2.1 Atualizar `react` e `react-dom` para a versão estável mais recente
- [x] 2.2 Atualizar `framer-motion` e `motion-number` para as versões estáveis mais recentes
- [x] 2.3 Atualizar `clsx`, `tailwind-merge` e `tailwind-variants` para as versões estáveis mais recentes

## 3. Atualização das dependências de desenvolvimento

- [x] 3.1 Atualizar `vite` e `@vitejs/plugin-react` para as versões estáveis mais recentes
- [x] 3.2 Atualizar `typescript` e os pacotes `@types/*` para as versões estáveis mais recentes
- [x] 3.3 Atualizar `tailwindcss`, `daisyui`, `postcss` e `autoprefixer` para as versões estáveis mais recentes
- [x] 3.4 Atualizar `react-router-dom` para a versão estável mais recente
- [x] 3.5 Atualizar `eslint`, `typescript-eslint` e os plugins ESLint para as versões estáveis mais recentes

## 4. Validação e correção de compatibilidade

- [x] 4.1 Executar `tsc -b` e corrigir quaisquer erros de tipo introduzidos pelas atualizações
- [x] 4.2 Executar `eslint .` e corrigir violations causadas por regras novas ou alteradas
- [x] 4.3 Executar `vite build` e verificar que o bundle é gerado sem erros
- [x] 4.4 Iniciar `vite` (dev server) e verificar visualmente que a aplicação funciona sem erros de runtime
- [x] 4.5 Corrigir quaisquer breaking changes de API identificados (CSS classes, imports, configurações)

## 5. Finalização

- [x] 5.1 Confirmar que o lockfile está atualizado e commitá-lo junto com `package.json`
- [ ] 5.2 Documentar no commit message as principais versões atualizadas e quaisquer ajustes realizados
