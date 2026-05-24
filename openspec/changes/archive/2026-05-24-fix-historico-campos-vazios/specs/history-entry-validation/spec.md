## ADDED Requirements

### Requirement: Histórico só recebe entradas com cálculo válido
O botão "Adicionar ao histórico" SHALL inserir uma entrada apenas quando os três campos de entrada (A, B e C) estão preenchidos e o resultado D é um número calculado. Quando qualquer campo está vazio ou o cálculo não foi realizado, a ação SHALL ser ignorada silenciosamente.

#### Scenario: Campos vazios — nenhuma entrada adicionada
- **WHEN** os campos A, B e C estão todos vazios e o usuário clica em "Adicionar ao histórico"
- **THEN** nenhuma entrada é inserida no histórico

#### Scenario: Campo parcialmente preenchido — nenhuma entrada adicionada
- **WHEN** apenas os campos A e B estão preenchidos (C está vazio) e o usuário clica em "Adicionar ao histórico"
- **THEN** nenhuma entrada é inserida no histórico

#### Scenario: Campos preenchidos — entrada adicionada normalmente
- **WHEN** os campos A=`2`, B=`3` e C=`4` estão preenchidos e o usuário clica em "Adicionar ao histórico"
- **THEN** uma entrada no formato "2 está para 3 assim como 4 está para 6.00" é adicionada ao histórico
