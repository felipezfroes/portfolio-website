# Configuração e pendências

Guia das integrações que dependem de contas externas e dos conteúdos que ainda precisam ser confirmados.
Nada aqui é obrigatório para o site funcionar: sem essas configurações, tudo continua operando com
alternativas seguras (o formulário abre o e-mail do visitante, nenhum script de rastreamento é carregado).

---

## 1. Formulário de contato (Formspree)

**Estado atual:** conectado ao formulário `xnppdwep`. O mesmo formulário atende as duas versões do site:
o valor de `data-formspree-id` precisa ser **idêntico** em `index.html` e `en/index.html`. Cada mensagem
traz o campo `language` (`Português (pt-BR)` ou `English (en)`), e o assunto do e-mail começa com
`[Portfólio]` ou `[Portfolio · EN]`, para você saber de qual versão veio o contato.

**Para trocar ou reconfigurar o formulário:**

1. Crie uma conta em <https://formspree.io> e um novo formulário apontando para `felipefroes.dev@gmail.com`.
2. Copie o ID do formulário. Ele aparece no endpoint: `https://formspree.io/f/SEU_ID` → o ID é `SEU_ID`.
3. Em `index.html` **e** em `en/index.html`, no elemento `<form id="contact-form">`, preencha o atributo
   (aceita só o ID ou a URL completa do endpoint):

   ```html
   data-formspree-id="SEU_ID"
   ```

   Se o valor for inválido, o site continua usando o envio por e-mail e avisa no console do navegador.

4. Publique e envie uma mensagem de teste pelo site. A mensagem de sucesso só aparece quando o
   Formspree responde com sucesso. Confirme também o e-mail de verificação que o Formspree envia
   para a sua conta, se ainda não tiver confirmado.
5. Visitantes com JavaScript desativado continuam usando o envio por e-mail (`mailto:`), mesmo com o ID configurado.

**Proteção contra spam já incluída:**

- Campo invisível `_gotcha` (honeypot). Envios com ele preenchido são ignorados pelo site e descartados pelo Formspree.
- Validação de campos no navegador e bloqueio de envios duplicados.

**No painel do Formspree, recomendado:**

- Manter a filtragem de spam ativada.
- Se o painel exigir reCAPTCHA, desative-o para este formulário ou configure uma chave própria —
  envios feitos via JavaScript (AJAX), como os deste site, não exibem o desafio padrão.
- Opcional: restringir o formulário ao domínio `felipezfroes.com`.

**Privacidade:** o aviso abaixo do formulário muda automaticamente quando o ID é configurado e
passa a citar o Formspree com link para a política de privacidade do serviço.

**Assuntos e campos de orçamento (desde 05/11/2026):**

| Chave (`data-key`) | Português | Inglês | Campos extras |
| --- | --- | --- | --- |
| `estagio` | Oportunidade de estágio | Internship opportunity | — |
| `orcamento` | Solicitar orçamento de site | Website quote request | sim |
| `automacao` | Projeto de automação | Automation project | sim |
| `parceria` | Parceria ou colaboração | Partnership or collaboration | — |
| `outro` | Outro assunto | Something else | — |

- O e-mail do Formspree recebe o texto do assunto no idioma da página (campo `subject`).
- Assuntos com `data-extra` mostram dois campos **opcionais**: `reference` (site atual ou referência) e
  `deadline` (prazo desejado). Quando ocultos, ficam desativados e não são enviados.
- Para pré-selecionar um assunto: em um link da home, use `data-contact-subject="orcamento"`; de outra
  página, use o endereço `/?assunto=orcamento#contato` (ou `/en/?topic=orcamento#contact`).
- Para testar sem enviar mensagens reais, intercepte as requisições para `formspree.io` (foi assim que o
  formulário foi validado, com Playwright).

---

## 2. Currículo (PDF)

- O arquivo em uso é `assets/Felipe_Zotareli_Froes_CV_Frontend.pdf` (existe localmente e em produção).
- Todos os botões "Baixar CV" apontam para ele com o atributo `download`.
- **Pendente:** o conteúdo do PDF está desatualizado (cita 17 anos, apenas Engenharia de Software,
  "Demo prevista para 2025" e não menciona Jogos Digitais, Papotech Editor, a Alpha do Ecos do Olimpo,
  o C.H.I.P.R.E. nem o 2º lugar no Hackathon UniCesumar × Elotech — o site agora fala em 4 pódios).
  Para atualizar, basta substituir o arquivo **mantendo o mesmo nome**. Se mudar o nome, atualize os
  links em `index.html` e nas páginas de `projetos/*/index.html` (busque por `CV_Frontend.pdf`).

**Versão em inglês do site:** como ainda não existe um currículo em inglês, as páginas de `en/` apontam
para o PDF em português, identificado como "CV (PT)" / "CV (Portuguese)" e com `hreflang="pt-BR"`.

**Quando tiver o currículo em inglês:**

1. Salve o PDF como `assets/Felipe_Zotareli_Froes_CV_EN.pdf`.
2. Em `en/index.html` e em `en/projects/*/index.html`, troque `Felipe_Zotareli_Froes_CV_Frontend.pdf`
   por `Felipe_Zotareli_Froes_CV_EN.pdf` (busca e substituição só dentro da pasta `en/`).
3. Nessas mesmas páginas, troque `hreflang="pt-BR"` por `hreflang="en"` nos links do CV e ajuste os rótulos:
   `CV <small>PT</small>` → `CV`, `CV (PT)` → `CV`, `CV (Portuguese)` → `CV` e
   `Download CV in Portuguese (PDF)` → `Download CV (PDF)`.

---

## 3. Google Search Console

1. Acesse <https://search.google.com/search-console> e adicione a propriedade.
   - Recomendado: **Domínio** (`felipezfroes.com`), com verificação por registro TXT no DNS da Hostinger.
   - Alternativa: **Prefixo de URL** (`https://felipezfroes.com/`), com a meta tag de verificação. Cole a
     tag no `<head>` de `index.html`, no comentário "Google Search Console".
2. Envie o sitemap: `https://felipezfroes.com/sitemap.xml`. Ele já lista as versões em português e em
   inglês de cada página, com as alternativas de idioma (`hreflang`).
3. Ao adicionar um projeto novo, inclua as duas URLs (PT e EN) em `sitemap.xml` e atualize o `<lastmod>`.

---

## 4. Analytics

Nenhum script de analytics é carregado hoje. O arquivo `js/main.js` já dispara estes eventos para
qualquer ferramenta compatível que for adicionada depois:

| Evento                | Quando acontece                                       |
| --------------------- | ----------------------------------------------------- |
| `project_click`       | Clique em links dentro de um card ou estudo de caso   |
| `github_click`        | Clique em qualquer link para o GitHub                 |
| `cv_download`         | Clique em qualquer link para o PDF do currículo       |
| `contact_form_submit` | Envio confirmado pelo Formspree (só com o ID ativo)   |
| `language_switch`     | Troca de idioma pelo seletor PT \| EN                 |

Todos os eventos incluem o idioma da página (`lang`), útil para comparar o interesse por versão.

**Recomendação para um portfólio pessoal:** uma ferramenta sem cookies, que dispensa banner de
consentimento na maioria dos casos (LGPD) e tem script leve:

- **Umami Cloud** (plano gratuito) ou **Plausible** (pago). O `main.js` já reconhece os dois.
- **Cloudflare Web Analytics** é gratuito e sem cookies, mas não registra eventos personalizados.

**Evite o Google Analytics 4** sem um banner de consentimento: ele usa cookies e coleta dados pessoais.
Se mesmo assim optar por ele, o `main.js` também envia os eventos via `gtag`.

**Como ativar (exemplo com Umami):** crie o site no painel e cole o script fornecido no `<head>` de
`index.html`, de cada `projetos/*/index.html`, de `en/index.html` e de cada `en/projects/*/index.html`,
antes de `styles.css`. Nenhuma outra alteração é necessária.

---

## 5. Publicação (Hostinger)

- **Antes de tudo, confira como o site é publicado hoje.** Se o hPanel tiver a implantação via Git
  (Avançado → Git) ligada a este repositório, fazer merge/push na branch configurada já publica o site.
- O site é estático: basta enviar os arquivos para a pasta pública (`public_html`), mantendo a estrutura.
- Não é preciso enviar: `.git/`, `.claude/`, `.playwright-mcp/`, `docs/`, `README.md`, `preview.png`,
  `preview2.png` e os PNGs originais em `projetos/img/ecos-olimpo/` e `projetos/img/maniprotein/`
  (as páginas usam as versões `.webp`). Enviá-los não quebra nada, só ocupa espaço.
- Verifique se não sobrou um `index.php` ou `default.php` da Hostinger em `public_html`: ele pode ter
  prioridade sobre o `index.html`.
- **Cache:** os links para CSS e JS têm `?v=20261104`. Ao alterar `styles.css`, `case-study.css`,
  `main.js` ou `gallery.js` no futuro, troque esse número em todas as páginas para que os visitantes
  recebam a versão nova. Depois de publicar, limpe o cache do CDN no hPanel (Website → CDN → Limpar cache), se ele estiver ativo.
- **Novos arquivos desta atualização (05/11/2026):** `projetos/chipre/`, `en/projects/chipre/`,
  `projetos/img/chipre/`, `projetos/img/ecos-olimpo/demeter-*.webp`, `img/og/og-chipre.jpg`,
  `docs/MIDIAS_PENDENTES.md`, além das páginas e imagens já existentes que foram alteradas.

### Publicação pelo GitHub (integração futura) — o que verificar antes

Ainda **não configurado**. A Hostinger oferece implantação via Git em alguns planos de hospedagem
(hPanel → Avançado → Git), mas isso depende do plano contratado: confira no seu hPanel se a opção
existe antes de planejar o fluxo.

Se a opção existir, o caminho típico é:

1. Ligar o repositório `felipezfroes/portfolio-website` à pasta `public_html` (vazia, ou depois de um backup).
   Repositório privado exige adicionar a chave SSH de implantação mostrada pelo hPanel no GitHub.
2. Escolher a branch publicada (recomendado: `main`) e manter o trabalho em outras branches até aprovar.
3. Opcional: ativar a implantação automática (webhook do GitHub). Sem ela, cada publicação é um clique
   em "Implantar" no hPanel.
4. Lembrar que tudo o que estiver na branch vai para o servidor (inclusive `docs/` e `README.md`); se
   quiser evitar, mova esses arquivos ou use uma branch só de produção.
5. Conferir depois da primeira implantação os itens da lista acima (PDF, redirecionamentos, 404, `/en/`).

Não há pipelines, credenciais ou GitHub Actions configurados neste repositório.
- Envie também os arquivos ocultos `.htaccess` (redirecionamentos e página 404).
- Pastas novas que precisam subir: `en/` (versão em inglês, com `en/projects/`), `js/`, `img/og/`,
  `docs/` (opcional), `projetos/ecos-do-olimpo/`, `projetos/maniprotein/`, `projetos/papotech-editor/`,
  `projetos/relogio-das-consequencias/` e as novas imagens em `projetos/img/`.
- Depois de publicar, confira:
  - `https://felipezfroes.com/assets/Felipe_Zotareli_Froes_CV_Frontend.pdf` abre o PDF;
  - `https://felipezfroes.com/projetos/ecos.html` redireciona para `/projetos/ecos-do-olimpo/`;
  - `https://felipezfroes.com/en/` abre a versão em inglês e o seletor PT | EN leva à página equivalente;
  - uma URL inexistente mostra a página 404 personalizada (em inglês se começar com `/en/`);
  - a prévia de compartilhamento no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- Opcional: o `.htaccess` traz, comentado, o redirecionamento de `www.felipezfroes.com` para `felipezfroes.com`.

---

## 6. Conteúdos para confirmar ou complementar

Os estudos de caso usam apenas informações publicadas (READMEs, páginas do itch.io e sites dos
projetos). Os pontos abaixo estão marcados com comentários `<!-- PENDENTE: ... -->` no HTML:

- **Ecos do Olimpo:** confirmar se toda a arte é autoral; adicionar números de playtest, se houver;
  revisar aprendizados. Quando a Atualização de Deméter sair, trocar os avisos "em desenvolvimento".
  O site oficial do jogo (`ecos-do-olimpo.felipezfroes.com`) ainda diz "Alpha em desenvolvimento" e
  "preparando os primeiros playtests" — está desatualizado em relação à Alpha 0.1.2 publicada.
- **Papotech Editor:** adicionar o tempo de edição economizado por episódio, se for medido; revisar aprendizados.
- **ManiProtein:** revisar aprendizados; corrigir o overflow do site publicado no celular (ver `MIDIAS_PENDENTES.md`).
- **C.H.I.P.R.E.:** sua função específica na equipe, a stack confirmada do protótipo e o consentimento da
  equipe para publicar as telas do vídeo.
- **O Relógio das Consequências:** adicionar colocação ou avaliações da NoNeJam 13, se divulgadas.
- **Hackathon Expo Paranavaí 2026 e InovaAgro Expoingá:** nome do projeto desenvolvido, ano (InovaAgro) e
  sua função na equipe, para enriquecer os cards de conquistas.
- **Habilidades "Em aprendizado":** só React e C aparecem, porque têm evidência pública (repositórios
  `frontend-studies`, `Linguagem-tecnicas-programacao` e `integra-pse`). SQL e Node.js saíram; volte a
  incluí-los quando houver um repositório ou projeto que mostre o estudo.
- **Links antigos fora deste repositório:** a descrição do repositório `NoneJam-13` aponta para
  `fzf-productions.itch.io` (redireciona para `fzf-dev.itch.io`, mas convém atualizar), e as descrições de
  `felipezfroes` e `player-tutorial` ainda citam "FZF Productions".
- **Monster Tamer do Zero:** o repositório ainda não tem README; quando tiver, pode entrar na lista
  "Também publico" da home.
- **Esporte Favorito:** o domínio ainda mostra a página padrão da Hostinger; o projeto não entrou no
  portfólio como caso entregue. Detalhes em `MIDIAS_PENDENTES.md`.
- **Mídia:** inventário completo e arquivos esperados em [`MIDIAS_PENDENTES.md`](./MIDIAS_PENDENTES.md).

---

## 7. Idiomas (português e inglês)

O site tem duas versões independentes e indexáveis, cada uma com suas próprias páginas HTML:

| Página                | Português                              | Inglês                                    |
| --------------------- | -------------------------------------- | ----------------------------------------- |
| Home                  | `/` → `index.html`                     | `/en/` → `en/index.html`                  |
| Estudo de caso        | `/projetos/<slug>/`                    | `/en/projects/<slug>/`                    |
| Página 404            | `404.html` (única, troca o idioma quando o endereço começa com `/en/`) |  |

- **Compartilhado entre os idiomas:** `styles.css`, `projetos/css/case-study.css`, `js/main.js`,
  `projetos/js/gallery.js` e todas as imagens. Não há CSS ou JS duplicado.
- **Textos do JavaScript** (validação e mensagens do formulário, rótulos da galeria) ficam no objeto
  `I18N` de `js/main.js` e são escolhidos pelo `lang` da página (`pt-BR` ou `en`).
- **Seletor PT | EN:** cada página aponta para a sua equivalente no outro idioma. Na home, o seletor
  leva também à mesma seção (ex.: `/#contato` ↔ `/en/#contact`), pelo mapa `SECTION_MAP` em `js/main.js`.
  Não há redirecionamento automático por idioma do navegador ou país.
- **SEO:** cada página tem `canonical` próprio e `hreflang` recíproco (`pt-BR`, `en` e `x-default`
  apontando para o português). Ao criar ou renomear uma página, atualize esses links nas duas versões.
- **Ao editar um texto:** altere as duas versões. Não use tradução automática sem revisar: a versão em
  inglês foi escrita para recrutadores internacionais, não traduzida palavra por palavra.

---

## 8. Como adicionar um novo projeto

1. Converta as imagens para WebP (ex.: `ffmpeg -i captura.png -c:v libwebp -quality 82 captura.webp`)
   e salve em `projetos/img/<slug>/`.
2. Na home em português (`index.html`) e em inglês (`en/index.html`), copie um
   `<article class="project-card">` da seção "Outros projetos" / "More projects" e ajuste textos,
   imagem (com `width`, `height` e `alt`), tags e links. Projetos em destaque usam
   `project-card featured` (ou `featured reverse`, com a imagem à direita) dentro de `.featured-list`.
3. Para um estudo de caso, copie a pasta de um projeto existente em `projetos/` e em `en/projects/`,
   renomeie para o novo slug e atualize título, descrição, `canonical`, `hreflang`, Open Graph, JSON-LD,
   seletor PT | EN, conteúdo e a navegação "Anterior / Próximo" das páginas vizinhas. A ordem atual é
   Papotech Editor → ManiProtein → Ecos do Olimpo → C.H.I.P.R.E. → O Relógio das Consequências → (volta).
   Estrutura padrão das seções: visão geral, problema e objetivo, participação, tecnologias,
   funcionalidades, decisões técnicas, desafios, resultados, aprendizados, galeria e links.
4. Gere a imagem de compartilhamento 1200×630 em `img/og/og-<slug>.jpg`.
5. Adicione as duas URLs ao `sitemap.xml`, com os `xhtml:link` de idioma.
