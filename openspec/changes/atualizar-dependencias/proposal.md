## Why

As dependências do projeto estão desatualizadas, acumulando patches de segurança, correções de bugs e melhorias de desempenho que ficaram sem aplicação. Manter dependências atualizadas reduz a superfície de ataque e garante acesso às últimas correções dos frameworks utilizados.

## What Changes

- Atualizar todas as dependências de produção (`react`, `react-dom`, `framer-motion`, `clsx`, `motion-number`, `tailwind-merge`, `tailwind-variants`) para suas versões estáveis mais recentes
- Atualizar todas as dependências de desenvolvimento (`vite`, `typescript`, `tailwindcss`, `daisyui`, `react-router-dom`, `eslint` e plugins, `@vitejs/plugin-react`, `@types/*`, `postcss`, `autoprefixer`) para suas versões estáveis mais recentes
- Verificar e corrigir quaisquer breaking changes introduzidos pelas atualizações
- Validar que o build e lint continuam passando após as atualizações

## Capabilities

### New Capabilities
<!-- Nenhuma nova capacidade é introduzida — trata-se de manutenção de dependências -->

### Modified Capabilities
<!-- Nenhuma especificação de requisito muda; apenas as versões das bibliotecas externas são atualizadas -->

## Impact

- `package.json`: versões de todas as dependências atualizadas
- `package-lock.json` / lockfile: regenerado com as novas resoluções
- Código-fonte: possíveis ajustes pontuais para compatibilidade com breaking changes (ex.: APIs renomeadas, tipos alterados)
- Pipeline de build (`vite`, `tsc`): deve continuar funcional após a atualização
