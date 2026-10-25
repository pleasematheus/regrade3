# Regra de 3

Calculadora de regra de três em tempo real — rápida, precisa e sem fricção.

## Funcionalidades

- Cálculo em tempo real (resultado atualiza enquanto digita)
- Proporção direta e inversamente proporcional
- Casas decimais ajustáveis (0–10)
- Copiar resultado para área de transferência
- Histórico de cálculos com persistência local
- Tema claro e escuro
- Animações com respeito a `prefers-reduced-motion`

## Correções da versão 2.9.2

- Mantém o cursor após a vírgula nos campos A, B e C. Ao digitar `10,1`, o valor permanece `10,1`.
- Preserva a posição do cursor ao editar valores negativos e números com separadores de milhar.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (OKLCH design tokens)
- Framer Motion (spring arrows)
- Cabinet Grotesk (tipografia)

## Como usar

```sh
git clone https://github.com/pleasematheus/regrade3.git
cd regrade3
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Versões

| Versão | URL |
|--------|-----|
| Atual (redesign) | [regrade3.vercel.app](https://regrade3.vercel.app) |
| Legacy | [legacy-regrade3.vercel.app](https://legacy-regrade3.vercel.app) |

## Licença

Apache 2.0 — veja [LICENSE](LICENSE).
