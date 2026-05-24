## Context

O footer já exibe hash e versão via constantes globais injetadas em build time pelo Vite. O mecanismo usa `execSync` do Node para chamar comandos Git antes de `defineConfig` retornar. Adicionar a data segue exatamente o mesmo padrão — sem nova infraestrutura.

Estado atual:
```
vite.config.ts  →  git rev-parse --short HEAD  →  __COMMIT_HASH__
                   npm_package_version          →  __APP_VERSION__
```

Estado desejado:
```
vite.config.ts  →  git rev-parse --short HEAD                         →  __COMMIT_HASH__
                   git log -1 --format=%cd --date=format:'%d/%m/%Y'   →  __COMMIT_DATE__
                   npm_package_version                                 →  __APP_VERSION__
```

## Goals / Non-Goals

**Goals:**
- Exibir a data do commit no formato `DD/MM/AAAA` ao lado do hash no footer.
- Manter fallback `"unknown"` se o Git não estiver disponível no contexto de build.

**Non-Goals:**
- Data relativa ("há 2 dias") — requer lógica runtime, fora de escopo.
- Tooltip ou interatividade — o usuário escolheu exibição inline.
- Internacionalização do formato de data.

## Decisions

**Formato `%d/%m/%Y` via `--date=format:`**

Compacto, familiar para o público brasileiro, sem necessidade de locale do sistema. Alternativa ISO (`%Y-%m-%d`) rejeitada por ser mais técnica do que o necessário para um footer de produto.

**Mesmo bloco `try/catch` do hash**

A data usa o mesmo try/catch já existente — qualquer falha Git retorna `"unknown"` para ambos. Não duplicar a lógica de fallback em um bloco separado.

**Declaração em `vite-env.d.ts`**

As constantes `__APP_VERSION__` e `__COMMIT_HASH__` já são usadas sem declaração de tipo (TypeScript tolera porque o projeto usa `allowJs` / `noImplicitAny` frouxo), mas `__COMMIT_DATE__` deve ser declarada para manter consistência e evitar erros futuros caso o `strict` aumente.

## Risks / Trade-offs

[Git indisponível no CI] → Já mitigado pelo try/catch existente; `commitDate` cai para `"unknown"` assim como o hash.

[Formato de data hardcoded] → Aceitável: o público-alvo é BR e o footer é informativo, não contratual.
