## 1. Correção do CSS — variáveis de conteúdo explícitas

- [x] 1.1 Adicionar `--color-primary-content: #FDFFFC` nos blocos `light` e `dark` em `src/index.css`
- [x] 1.2 Adicionar `--color-secondary-content: #FDFFFC` nos blocos `light` e `dark` em `src/index.css`
- [x] 1.3 Adicionar `--color-accent-content: #141414` nos blocos `light` e `dark` em `src/index.css`
- [x] 1.4 Adicionar `--color-neutral-content: #FDFFFC` nos blocos `light` e `dark` em `src/index.css`

## 2. Correção dos botões — remover `text-current`

- [x] 2.1 Remover `text-current` do botão "Limpar campos" em `src/components/Inputs.tsx`
- [x] 2.2 Remover `text-current` do botão "Aumentar casas decimais" em `src/components/Inputs.tsx`
- [x] 2.3 Remover `text-current` do botão "Reduzir casas decimais" em `src/components/Inputs.tsx`
- [x] 2.4 Remover `text-current` do botão "Adicionar ao Histórico" em `src/components/Inputs.tsx`
- [x] 2.5 Remover `text-current` do botão "Limpar Histórico" em `src/components/Inputs.tsx`
- [x] 2.6 Remover `text-current` do botão "Copiar resultado" em `src/components/Inputs.tsx`

## 3. Correção do conflito de especificidade CSS (causa raiz em produção)

- [x] 3.1 Alterar `themes: light, dark` para `themes: false` em `@plugin "daisyui"` em `src/index.css`
- [x] 3.2 Verificar build local: confirmar que apenas 1 bloco `[data-theme=light]` existe no CSS compilado
- [x] 3.3 Verificar visualmente no preview local que botões exibem cores corretas em ambos os temas

## 4. Deploy e verificação em produção

- [x] 4.1 Confirmar que o Vercel tem o commit `41a8733` deployado (screenshots confirmam v1.15.1 · 41a8733)
- [x] 4.2 Commit e push da correção `themes: false` para `main`
- [x] 4.3 Verificar visualmente no site https://regrade3.vercel.app/ que os botões exibem cores corretas em ambos os temas após o deploy
