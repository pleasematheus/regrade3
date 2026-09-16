## Context

O projeto é uma aplicação React + TypeScript + Vite. As dependências de produção e desenvolvimento foram instaladas com ranges `^` (compatibilidade semântica), portanto patches e minor versions podem ser atualizados com baixo risco. O foco é atualizar para as versões estáveis mais recentes disponíveis e garantir que nenhuma regressão seja introduzida.

## Goals / Non-Goals

**Goals:**
- Atualizar todas as dependências para suas versões estáveis mais recentes
- Validar que `tsc`, `vite build` e `eslint` continuam passando
- Corrigir quaisquer breaking changes necessários para compatibilidade

**Non-Goals:**
- Trocar de biblioteca (ex.: substituir framer-motion por outra)
- Alterar a arquitetura da aplicação
- Atualizar dependências para versões beta ou release candidate

## Decisions

**Estratégia de atualização incremental por categoria**
Atualizar por grupo (ex.: React core → tooling → UI libs) em vez de tudo de uma vez, para isolar problemas caso alguma versão introduza breaking change.
- Alternativa descartada: `npm update --latest` em uma única rodada — dificulta identificar qual pacote causou falha.

**Verificação manual de breaking changes**
Consultar o CHANGELOG de cada pacote com salto de major/minor antes de atualizar, especialmente `daisyui`, `react-router-dom` e `framer-motion`.

**Manter lockfile atualizado**
Após as atualizações, regenerar o lockfile (`package-lock.json`) para garantir reprodutibilidade.

## Risks / Trade-offs

- [daisyui v5→v6 possível] Pode ter mudanças de classes CSS → Mitigation: verificar CHANGELOG e testar visualmente os componentes
- [react-router-dom v7] API de rotas pode ter mudanças → Mitigation: verificar breaking changes no CHANGELOG antes de atualizar
- [framer-motion] API de animações pode mudar entre minors → Mitigation: rodar build + inspeção visual após atualização
- [Vite major] Configuração do vite.config pode precisar de ajustes → Mitigation: comparar vite.config com o migration guide da versão alvo
