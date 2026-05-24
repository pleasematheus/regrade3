## 1. Corrigir cores de fundo e content dos botões em index.css

- [x] 1.1 Verificar que o tema `light` já define `--color-primary: #2EC4B6`, `--color-secondary: #E71D36`, `--color-accent: #FF9F1C`, `--color-neutral: #898A88`; se não, adicionar
- [x] 1.2 Adicionar `--color-primary-content: #FDFFFC` nos blocos de tema `light` e `dark`
- [x] 1.3 Adicionar `--color-secondary-content: #FDFFFC` nos blocos de tema `light` e `dark`
- [x] 1.4 Adicionar `--color-accent-content: #141414` nos blocos de tema `light` e `dark` (laranja claro exige texto escuro para contraste WCAG adequado)
- [x] 1.5 Adicionar `--color-neutral-content: #FDFFFC` nos blocos de tema `light` e `dark`

## 2. Remover text-current dos botões em Inputs.tsx

- [x] 2.1 Remover `text-current` do botão `btn-secondary` "Limpar campos" (linha ~205)
- [x] 2.2 Remover `text-current` dos dois botões `btn-accent` de casas decimais (linhas ~215 e ~224)
- [x] 2.3 Remover `text-current` do botão `btn-neutral` "Adicionar ao Histórico" (linha ~235)
- [x] 2.4 Remover `text-current` do botão `btn-secondary` "Limpar Histórico" (linha ~245)
- [x] 2.5 Remover `text-current` do botão `btn-primary` "Copiar resultado" (linha ~255)

## 3. Validação

- [x] 3.1 Executar `tsc -b` e confirmar que não há erros de tipo
- [x] 3.2 Executar `eslint .` e confirmar que não há violations
- [x] 3.3 Executar `vite build` e confirmar que o bundle é gerado sem erros
- [x] 3.4 Verificar visualmente os botões no modo claro: fundos devem ser teal/vermelho/laranja/cinza e texto deve ser claro (baby powder)
- [x] 3.5 Verificar visualmente os botões no modo escuro: aparência deve permanecer idêntica ao estado atual (fundos e texto inalterados)
