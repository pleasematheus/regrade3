## ADDED Requirements

### Requirement: Footer exibe data do último commit
O footer SHALL exibir a data do commit mais recente no formato `DD/MM/AAAA`, inline na mesma linha que a versão semântica e o hash do commit, separada por `·`.

#### Scenario: Build com Git disponível
- **WHEN** o app é construído em um repositório Git com pelo menos um commit
- **THEN** o footer exibe uma linha no formato `v{versão} · {hash} · {DD/MM/AAAA}` onde a data corresponde ao commit apontado pelo hash

#### Scenario: Build sem Git disponível
- **WHEN** o Git não está acessível durante o build (ex.: ambiente de CI sem histórico)
- **THEN** o footer exibe `v{versão} · unknown · unknown` sem causar erro de build

#### Scenario: Data reflete o commit, não o build
- **WHEN** um commit foi feito em uma data anterior e o app é construído hoje
- **THEN** a data exibida no footer é a data do commit, não a data atual do sistema
