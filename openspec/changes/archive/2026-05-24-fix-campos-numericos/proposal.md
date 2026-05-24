## Why

Os campos A, B e C em `Inputs.tsx` usam `type="text"` com `onChange` que descarta qualquer caractere não-dígito (`replace(/\D/g, "")`), impedindo entrada de decimais (ex.: `1.5`, `3.14`) e desabilitando a navegação por seta (↑/↓) que é nativa de `type="number"`. Como a regra de três é frequentemente aplicada a grandezas decimais, essa limitação impede casos de uso comuns.

## What Changes

- Alterar os três campos de entrada (A, B, C) de `type="text"` para `type="number"` com `step="any"`, habilitando nativamente entrada decimal e incremento/decremento por seta
- Remover o `inputMode="numeric"` (redundante com `type="number"`)
- Remover o `maxLength={18}` (inválido em `type="number"`) e substituir por `max` se necessário
- Atualizar os handlers `onChange` para aceitar e preservar valores decimais (ponto como separador)
- Atualizar a validação no `useMemo` de `d` para continuar ignorando entradas inválidas ou vazias
- Ocultar os spinners nativos do browser via CSS (`appearance: none` / `-webkit-appearance: none`) para manter a estética atual

## Capabilities

### New Capabilities
- `numeric-input`: Os campos de entrada devem aceitar números decimais e suportar incremento/decremento por seta.

### Modified Capabilities
<!-- Nenhuma spec existente muda de requisito -->

## Impact

- `src/components/Inputs.tsx` — campos A, B, C: type, inputMode, maxLength, onChange handlers
- `src/index.css` — nova regra CSS para ocultar spinners de `input[type=number]`
- Sem mudanças em dependências, APIs ou roteamento
