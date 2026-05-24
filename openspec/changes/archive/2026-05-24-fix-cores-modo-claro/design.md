## Context

O projeto usa DaisyUI v5 com temas `light` e `dark` definidos em `src/index.css`. As cores de botão (`--color-primary: #2EC4B6`, `--color-secondary: #E71D36`, `--color-accent: #FF9F1C`, `--color-neutral: #898A88`) são compartilhadas entre ambos os temas. O DaisyUI gera automaticamente `--color-*-content` como contraste, mas para as cores deste projeto ele computa valores escuros (~14% lightness em OKLch), produzindo texto quase preto nos botões em ambos os modos — comportamento indesejado. O commit `5ea4feb` tentou contornar isso adicionando `text-current` nos botões, o que funciona no modo escuro (base-content claro → texto claro) mas quebra o modo claro (base-content escuro → texto escuro).

## Goals / Non-Goals

**Goals:**
- Alterar as cores de fundo dos botões do modo claro para as mesmas do modo escuro, assim como estão no commit de hash `5ea4feb` (primary, secondary, neutral: `#2EC4B6`, `#E71D36`, `#898A88`; accent: `#FF9F1C`)
- Botões com texto claro (baby powder `#FDFFFC`) em ambos os temas
- Sem `text-current` nos botões — o comportamento deve vir das variáveis de tema
- Build e lint continuam passando

**Non-Goals:**
- Mudar cores de outros elementos (inputs, labels, toggles)
- Redesenhar o layout dos botões

## Decisions

**Manter cores de fundo de botão idênticas entre temas**
Os blocos `@plugin "daisyui/theme"` de `light` e `dark` em `src/index.css` devem definir explicitamente os mesmos valores de cor de botão, conforme estabelecido no commit `5ea4feb`:
```
--color-primary: #2EC4B6;
--color-secondary: #E71D36;
--color-accent: #FF9F1C;
--color-neutral: #898A88;
```
Esses valores já constam em ambos os temas; a tarefa é verificar e garantir que não foram sobrescritos. Ao defini-los explicitamente em ambos os blocos, a cor de fundo dos botões é idêntica independentemente do tema ativo.
- Alternativa descartada: deixar o DaisyUI herdar os defaults do sistema — os defaults do DaisyUI v5 diferem das cores do projeto.

**Definir `--color-*-content` explicitamente no tema**
Em vez de depender do `text-current` ou do auto-cálculo do DaisyUI, definem-se os content colors diretamente nos blocos `@plugin "daisyui/theme"` em `index.css`:
```
--color-primary-content: #FDFFFC;
--color-secondary-content: #FDFFFC;
--color-accent-content: #141414;   /* laranja é claro, texto escuro contrasta melhor */
--color-neutral-content: #FDFFFC;
```
Os valores são os mesmos nos dois temas porque as cores de botão são as mesmas nos dois temas.
- Alternativa descartada: usar `text-white` ou `text-base-100` nos botões — cria acoplamento entre componente e tema, difícil de manter.
- Alternativa descartada: manter `text-current` e sobrescrever `base-content` — afetaria todos os elementos do tema, não só botões.

**Accent-content escuro**
O laranja `#FF9F1C` tem luminosidade alta (~78% em OKLch), então `#FDFFFC` (quase branco) teria contraste insuficiente. Baby powder sobre laranja fica ilegível; `#141414` (night) oferece contraste adequado.

## Risks / Trade-offs

- [Dependência do DaisyUI] Se o DaisyUI v6+ mudar como resolve `--color-*-content`, essas definições explícitas podem precisar de ajuste → Mitigation: valores definidos em CSS puro, sem risco de quebra silenciosa
- [Accent-content] Definir `accent-content` como `#141414` diverge dos demais botões → Mitigation: é a escolha correta de contraste WCAG para laranja claro
