## 1. Corrigir guarda em addToHistory

- [x] 1.1 Em `src/components/Inputs.tsx`, na função `addToHistory`, alterar a condição de `d !== undefined && !isNaN(Number(d))` para `typeof d === "number" && !isNaN(d)`

## 2. Verificação

- [x] 2.1 Confirmar que clicar em "Adicionar ao histórico" com campos vazios não adiciona nenhuma entrada
- [x] 2.2 Confirmar que clicar com apenas alguns campos preenchidos também não adiciona entrada
- [x] 2.3 Confirmar que com A, B e C preenchidos a entrada é adicionada normalmente com o formato correto
- [x] 2.4 Build sem erros: `tsc -b && vite build`
