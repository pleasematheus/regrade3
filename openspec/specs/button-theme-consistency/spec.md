### Requirement: Botões exibem cores corretas no tema claro
O sistema SHALL exibir todos os botões da interface com a cor de fundo (`btn-primary`, `btn-secondary`, `btn-accent`, `btn-neutral`) e a cor de texto correspondente (`--color-*-content`) definidas explicitamente no tema `light`, sem depender de herança CSS ou valores auto-calculados pelo DaisyUI.

#### Scenario: Cor de texto no tema claro
- **WHEN** o usuário acessa a aplicação com `data-theme="light"`
- **THEN** os botões primários exibem texto na cor `#FDFFFC` (baby powder) sobre fundo teal `#2EC4B6`

#### Scenario: Cor de texto no tema escuro
- **WHEN** o usuário acessa a aplicação com `data-theme="dark"`
- **THEN** os botões primários exibem texto na cor `#FDFFFC` (baby powder) sobre fundo teal `#2EC4B6`

#### Scenario: Consistência entre temas
- **WHEN** o usuário alterna entre os temas claro e escuro
- **THEN** as cores de fundo dos botões permanecem iguais entre os dois temas e os textos permanecem legíveis em ambos

### Requirement: Variáveis de conteúdo explícitas nos temas DaisyUI
O sistema SHALL declarar `--color-primary-content`, `--color-secondary-content`, `--color-accent-content` e `--color-neutral-content` explicitamente nos blocos `@plugin "daisyui/theme"` de ambos os temas (`light` e `dark`), impedindo que o DaisyUI compute esses valores automaticamente via OKLch.

#### Scenario: Declaração no tema claro
- **WHEN** o arquivo `src/index.css` é inspecionado
- **THEN** o bloco `name: "light"` contém as quatro variáveis `--color-*-content` com valores hexadecimais explícitos

#### Scenario: Declaração no tema escuro
- **WHEN** o arquivo `src/index.css` é inspecionado
- **THEN** o bloco `name: "dark"` contém as quatro variáveis `--color-*-content` com valores hexadecimais explícitos

### Requirement: Botões não usam herança de cor via `text-current`
O sistema SHALL NOT aplicar a classe `text-current` em nenhum elemento `<button>` ou `<a>` estilizado com classes `btn-*`, pois isso substitui `--color-*-content` pela cor herdada do contexto pai.

#### Scenario: Ausência de text-current nos botões
- **WHEN** o arquivo `src/components/Inputs.tsx` é inspecionado
- **THEN** nenhum elemento `<button>` contém a classe `text-current` em seu atributo `className`
