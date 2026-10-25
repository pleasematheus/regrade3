# Regra de 3

**Três valores. Uma resposta.**

Calcule proporções diretas e inversas no navegador. Informe os valores e veja o resultado enquanto digita.

[Abrir calculadora](https://regrade3.vercel.app) · [Como usar](#como-usar) · [Desenvolvimento](#desenvolvimento)

## Como usar

A calculadora organiza os valores nesta relação:

```text
A → B
C → X
```

1. Preencha os campos **A**, **B** e **C**.
2. Ative **Inverso** se as grandezas forem inversamente proporcionais.
3. Ajuste as casas decimais com os botões **−** e **+**.
4. Selecione **Copiar resultado** para copiar a resposta.

Use a vírgula para separar as casas decimais, como em `10,5`. Os campos também aceitam valores negativos e inserem os separadores de milhar.

### Exemplos

| Situação | A | B | C | Resultado |
| --- | --- | --- | --- | --- |
| Se 2 unidades custam R$ 10, quanto custam 5 unidades? | 2 | 10 | 5 | 25,00 |
| Se 2 pessoas concluem uma tarefa em 10 horas, quanto tempo levam 5 pessoas no mesmo ritmo? | 2 | 10 | 5 | 4,00, com **Inverso** ativo |

Na proporção direta, `X = (B × C) ÷ A`. Na proporção inversa, `X = (A × B) ÷ C`.

## Recursos

| Recurso | O que permite |
| --- | --- |
| Cálculo em tempo real | Ver o resultado ao alterar qualquer valor. |
| Precisão ajustável | Exibir de 0 a 10 casas decimais no resultado. |
| Histórico local | Salvar, reutilizar, atualizar, copiar e apagar cálculos neste navegador. |
| Temas | Usar o tema claro, escuro ou a preferência do sistema. |
| Instalação | Instalar o app pelo navegador, quando disponível. |
| Uso offline | Acessar a calculadora sem conexão após o primeiro carregamento completo. |
| Movimento reduzido | Respeitar a preferência de animação do dispositivo. |

Para guardar um cálculo, abra **Histórico** e selecione **Salvar atual**. Os registros ficam no armazenamento local do navegador. Limpar os dados do site pode apagar esse histórico.

### Teclado

| Tecla | Ação |
| --- | --- |
| `Tab` | Avançar entre os controles. |
| `Enter` em um campo | Avançar para o próximo campo de valor. |
| `↑` / `↓` em um campo | Aumentar ou diminuir o valor em 1. |

## Desenvolvimento

Instale o [Bun](https://bun.sh) antes de executar os comandos. O repositório inclui o arquivo `bun.lock`.

```sh
git clone https://github.com/pleasematheus/regrade3.git
cd regrade3
bun install --frozen-lockfile
bun run dev
```

Abra o endereço informado pelo Vite. A porta padrão é `5173`.

### Comandos

| Comando | Finalidade |
| --- | --- |
| `bun run dev` | Iniciar o servidor de desenvolvimento. |
| `bun run test` | Executar os testes com Vitest. |
| `bun run check` | Verificar a formatação e as regras de código com Biome. |
| `bun run build` | Verificar os tipos e gerar a versão de produção em `dist/`. |
| `bun run preview` | Servir a versão de produção para verificação local. |

### Tecnologias

- **React 19 e TypeScript** para os componentes e a lógica da aplicação.
- **Vite 8 e vite-plugin-pwa** para a compilação, a instalação e o cache offline.
- **Tailwind CSS 4** para os estilos e os temas.
- **Framer Motion e Torph** para as transições e os textos animados.
- **Cabinet Grotesk** para a tipografia.
- **Vitest e Biome** para os testes e a verificação de código.

## Acessos

- [Aplicação atual](https://regrade3.vercel.app)
- [Versão anterior](https://legacy-regrade3.vercel.app)

## Licença

Distribuído sob a licença [Apache 2.0](LICENSE).
