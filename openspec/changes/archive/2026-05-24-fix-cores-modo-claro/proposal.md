## Why

O commit `5ea4feb` estabeleceu as cores de botão do projeto (teal, vermelho, laranja, cinza) e adicionou `text-current` como workaround para texto visível. No modo escuro, `text-current` herda o `base-content` claro → texto branco nos botões — aparência correta. No modo claro, `base-content` é escuro → texto preto nos botões — aparência errada e inconsistente com o design original. Além disso, é necessário garantir explicitamente que as cores de fundo dos botões no modo claro são idênticas às do modo escuro.

## What Changes

- Garantir que o tema `light` em `src/index.css` define as mesmas cores de botão do tema `dark`: `--color-primary: #2EC4B6`, `--color-secondary: #E71D36`, `--color-accent: #FF9F1C`, `--color-neutral: #898A88`
- Adicionar `--color-primary-content`, `--color-secondary-content`, `--color-accent-content` e `--color-neutral-content` explicitamente em ambos os temas, garantindo texto claro (baby powder `#FDFFFC`) sobre fundos coloridos em qualquer modo
- Remover `text-current` de todos os botões em `src/components/Inputs.tsx`

## Capabilities

### New Capabilities

### Modified Capabilities
- `dependency-compatibility`: Build e lint devem continuar passando após a correção

## Impact

- `src/index.css`: verificação/adição de `--color-primary/secondary/accent/neutral` no tema `light`; adição de `--color-*-content` em ambos os temas
- `src/components/Inputs.tsx`: remoção de `text-current` em 6 botões
