## Context

Os três campos de entrada (A, B, C) em `src/components/Inputs.tsx` usam atualmente:
```tsx
type="text"
inputMode="numeric"
onChange={(e) => setA(e.target.value.replace(/\D/g, ""))}
maxLength={18}
```

O `replace(/\D/g, "")` descarta qualquer caractere que não seja dígito (0-9), incluindo o ponto decimal. Isso impede:
- Entrada de valores como `1.5`, `0.25`, `3.14`
- Uso das setas ↑/↓ do teclado (funcionalidade nativa de `type="number"`)

O estado de cada campo é `number | string`, inicializado como `""`. O cálculo usa `Number(a)` que aceita strings decimais com ponto (`.`) como separador.

## Goals / Non-Goals

**Goals:**
- Permitir entrada de números decimais nos três campos de entrada
- Habilitar incremento/decremento por seta (↑/↓) com passo 1 por padrão
- Manter a estética atual (sem spinners visíveis do browser)
- Preservar o comportamento existente do cálculo, histórico e clipboard

**Non-Goals:**
- Suporte a vírgula (`,`) como separador decimal — o JavaScript `Number()` usa `.`, e introduzir normalização de separador adicionaria complexidade desnecessária
- Validação de intervalo (min/max) além do que já existe
- Alterar o campo de resultado D (apenas leitura)

## Decisions

**`type="number"` com `step="any"`**

`step="any"` permite que o campo aceite qualquer valor decimal sem disparar validação nativa de "step mismatch". As setas ↑/↓ usam step=1 por padrão quando `step="any"` está presente (comportamento dos browsers principais: Chrome, Firefox, Safari), que é o comportamento esperado para a maioria dos casos de uso da regra de 3.

Alternativa rejeitada — `type="text"` com regex aprimorado + handler manual de seta: requer interceptar `keydown` para ArrowUp/ArrowDown, calcular o novo valor manualmente, tratar o cursor, e lidar com NaN. Mais código, mais bugs, sem ganho funcional.

Alternativa rejeitada — `type="number"` sem `step`: `step` padrão é `1`, o que causaria "step mismatch" em valores decimais em alguns browsers e bloquearia o `form` submit (irrelevante aqui, pois não há `<form>`, mas cria estado inválido perceptível visualmente).

**Ocultar spinners via CSS**

A estética do projeto não usa os spinners nativos. Adicionar em `src/index.css`:
```css
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
}
```

Isso preserva a aparência atual dos campos enquanto mantém todas as funcionalidades de `type="number"`.

**Remover `inputMode="numeric"` e `maxLength={18}`**

`inputMode` é redundante com `type="number"` — o browser já escolhe o teclado numérico em mobile. `maxLength` não tem efeito em `type="number"`; substituir por `max={999999999999999999}` ou omitir (sem limit prático necessário para uma calculadora de regra de 3).

**Atualizar `onChange` handler**

Substituir `e.target.value.replace(/\D/g, "")` por `e.target.value` direto. O `type="number"` já restringe entrada a caracteres numéricos válidos no browser. O estado continua como `string` para o campo controlado, e o cálculo `Number(a)` processa corretamente.

Manter o tipo de estado como `number | string` — não há razão para mudar; `Number("")` retorna `0` e `Number("1.5")` retorna `1.5`, ambos funcionam corretamente no `useMemo` existente.

## Risks / Trade-offs

`step="any"` + seta: comportamento da seta com `step="any"` não é padronizado pela spec para o valor do passo — a maioria dos browsers usa 1, mas pode variar → Aceitável para o caso de uso; o usuário pode sempre digitar o valor diretamente.

Sem `maxLength`: campos `type="number"` não têm limite de caracteres visível → Os campos têm largura fixa (`w-32`), o que limita visualmente a entrada; sem impacto funcional para uma calculadora de regra de 3.

CSS de ocultar spinners: a pseudo-classe `::-webkit-inner-spin-button` é não-padrão → Amplamente suportada em Chromium e Safari; Firefox usa `-moz-appearance: textfield`. Edge/IE não são alvos do projeto.

## Migration Plan

1. Atualizar CSS em `src/index.css` — ocultar spinners
2. Atualizar os três campos em `src/components/Inputs.tsx` — type, step, remover inputMode/maxLength, atualizar onChange
3. Verificar cálculo decimal end-to-end no dev server
4. Build e deploy — sem breaking changes
