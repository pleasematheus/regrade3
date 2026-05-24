## 1. CSS — ocultar spinners nativos

- [x] 1.1 Adicionar regra em `src/index.css` para ocultar `::-webkit-inner-spin-button` e `::-webkit-outer-spin-button` em `input[type=number]`
- [x] 1.2 Adicionar `-moz-appearance: textfield` em `input[type=number]` para Firefox

## 2. Campos de entrada — atualizar atributos

- [x] 2.1 No campo A: alterar `type="text"` → `type="number"`, adicionar `step="any"`, remover `inputMode="numeric"`, remover `maxLength={18}`
- [x] 2.2 No campo B: alterar `type="text"` → `type="number"`, adicionar `step="any"`, remover `inputMode="numeric"`, remover `maxLength={18}`
- [x] 2.3 No campo C: alterar `type="text"` → `type="number"`, adicionar `step="any"`, remover `inputMode="numeric"`, remover `maxLength={18}`

## 3. Handlers onChange — aceitar decimais

- [x] 3.1 No campo A: substituir `e.target.value.replace(/\D/g, "")` por `e.target.value`
- [x] 3.2 No campo B: substituir `e.target.value.replace(/\D/g, "")` por `e.target.value`
- [x] 3.3 No campo C: substituir `e.target.value.replace(/\D/g, "")` por `e.target.value`

## 4. Verificação

- [x] 4.1 Verificar no dev server que decimais são aceitos nos três campos e o cálculo está correto
- [x] 4.2 Verificar que setas ↑/↓ incrementam/decrementam corretamente
- [x] 4.3 Verificar que spinners não são visíveis nos campos
- [x] 4.4 Verificar que Enter ainda faz foco avançar entre campos (A→B→C→A)
- [x] 4.5 Build sem erros: `tsc -b && vite build`
