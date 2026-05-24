## Context

Em `src/components/Inputs.tsx`, o estado `d` é um `useMemo` que retorna `""` (string vazia) quando algum campo está vazio ou o divisor é zero, e um `number` quando o cálculo é válido. A função `addToHistory` usa a guarda:

```ts
if (d !== undefined && !isNaN(Number(d))) {
```

Como `Number("") === 0` e `isNaN(0) === false`, a condição é satisfeita mesmo quando `d` é `""`, permitindo que entradas vazias sejam adicionadas ao histórico.

## Goals / Non-Goals

**Goals:**
- Garantir que `addToHistory` só execute quando o cálculo produziu um resultado numérico válido.

**Non-Goals:**
- Feedback visual no botão (desabilitar, tooltip de erro) — escopo futuro.
- Validação de limites numéricos (divisão por zero já é tratada pelo `useMemo`).

## Decisions

**Usar `typeof d === "number"` como guarda principal**

A discriminação de tipo é suficiente: `d` é `number` apenas quando o `useMemo` computou um resultado real; é `""` em todos os outros casos. Isso elimina a necessidade de `Number(d)` e torna a intenção explícita.

Alternativa considerada: adicionar verificação de `a && b && c` na função — rejeitada por duplicar lógica já presente no `useMemo`.

## Risks / Trade-offs

[Sem riscos significativos] → A mudança é local a um único `if`; nenhuma migração ou rollback necessário.
