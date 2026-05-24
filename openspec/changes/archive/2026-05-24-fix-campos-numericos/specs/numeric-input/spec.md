## ADDED Requirements

### Requirement: Campos aceitam números decimais
Os campos de entrada A, B e C SHALL aceitar valores com casas decimais usando ponto (`.`) como separador, permitindo grandezas como `1.5`, `0.25` e `3.14`.

#### Scenario: Entrada de valor decimal
- **WHEN** o usuário digita `1.5` no campo A
- **THEN** o campo exibe `1.5` e o cálculo usa esse valor corretamente

#### Scenario: Cálculo com decimais
- **WHEN** os campos A=`2`, B=`3.5` e C=`4` estão preenchidos
- **THEN** o resultado D exibe `7.00` (com 2 casas decimais padrão)

#### Scenario: Campo vazio não bloqueia entrada decimal
- **WHEN** o usuário apaga o conteúdo de um campo e digita `0.5`
- **THEN** o campo aceita a entrada sem descartar o ponto decimal

### Requirement: Seta para cima e para baixo incrementa e decrementa valores
Os campos de entrada A, B e C SHALL suportar navegação por seta (↑/↓ do teclado) para incrementar e decrementar o valor numérico em passos inteiros.

#### Scenario: Seta para cima incrementa
- **WHEN** o campo A contém `5` e o usuário pressiona ↑
- **THEN** o campo A passa a exibir `6`

#### Scenario: Seta para baixo decrementa
- **WHEN** o campo A contém `5` e o usuário pressiona ↓
- **THEN** o campo A passa a exibir `4`

#### Scenario: Seta em campo vazio
- **WHEN** o campo A está vazio e o usuário pressiona ↑
- **THEN** o campo A passa a exibir `1` (ou `0`, comportamento nativo do browser)

### Requirement: Spinners nativos do browser são ocultados
Os campos de entrada `type="number"` SHALL NOT exibir os controles de spinner nativos do browser (setas internas ao campo), para manter a estética visual do projeto.

#### Scenario: Ausência de spinners
- **WHEN** o usuário inspeciona visualmente os campos de entrada
- **THEN** nenhum controle de spinner é visível dentro do campo

### Requirement: Campos não aceitam entrada não-numérica
Os campos de entrada SHALL rejeitar caracteres que não compõem um número válido (letras, símbolos), mantendo a integridade do cálculo.

#### Scenario: Tentativa de entrada de letras
- **WHEN** o usuário tenta digitar `abc` em um campo
- **THEN** o campo ignora a entrada e permanece sem alteração
