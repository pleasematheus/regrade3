## Why

O botão "Adicionar ao histórico" não valida se os campos A, B e C estão preenchidos antes de inserir uma entrada. Ao clicar com campos vazios, o histórico recebe uma linha como " está para  assim como  está para 0.00", poluindo o registro de cálculos com dados sem sentido.

## What Changes

- A função `addToHistory` passa a exigir que `d` seja um número (não a string `""`) antes de adicionar ao histórico.
- Nenhum feedback visual extra é necessário — o botão simplesmente não faz nada quando o cálculo ainda não foi realizado.

## Capabilities

### New Capabilities
- `history-entry-validation`: Regras de validação que determinam quando uma entrada pode ser adicionada ao histórico de cálculos.

### Modified Capabilities

## Impact

- `src/components/Inputs.tsx`: ajuste na condição dentro de `addToHistory`.
