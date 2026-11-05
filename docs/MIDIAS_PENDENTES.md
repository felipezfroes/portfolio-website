# Mídias dos projetos — inventário e pendências

Atualizado em 05/11/2026. Lista o que cada projeto já usa, de onde veio cada imagem e o que ainda falta.
Para trocar uma imagem **sem mexer no código**, salve o arquivo novo **com o mesmo nome e as mesmas
dimensões** no caminho indicado. Se mudar nome ou proporção, atualize `src`, `width`, `height` e `alt`
nas páginas PT e EN.

## Padrões

| Item | Padrão |
| --- | --- |
| Pasta | `projetos/img/<projeto>/` (a mesma em PT e EN; as páginas EN usam `../../../projetos/img/...`) |
| Formato | WebP, qualidade 82–88. Capturas de jogo: manter a resolução nativa (1920×1080) ou 1280×720, sem filtros |
| Proporção | 16:9 para capturas e capas. Open Graph: 1200×630 JPEG em `img/og/` |
| Pixel art | Não aplicar nitidez, desfoque nem upscale. Reduzir só com Lanczos para 1280 px ou manter o tamanho original |
| Originais | Não versionar PNGs grandes. Os originais ficam nas pastas do projeto (vídeos e capturas) e podem ser reextraídos |
| Texto alternativo | Descrever o que aparece na imagem, nas duas línguas; avisar quando a interface estiver em português |

Conversão usada: `ffmpeg -ss <tempo> -i video.mp4 -frames:v 1 quadro.png` e depois WebP com Pillow
(`quality=86, method=6`).

---

## Ecos do Olimpo

**Versão pública:** Alpha 0.1.2 (itch.io). **Em desenvolvimento:** Atualização de Deméter (build "Alpha 0.2").

| Arquivo | Onde aparece | Origem | Situação |
| --- | --- | --- | --- |
| `ecos-olimpo/demeter-campo.webp` (1920×1080) e `demeter-campo-1280.webp` | Card em destaque da home (PT/EN) e galeria "em desenvolvimento" | Quadro de `DEVLOGS/devlog 02/material/loop-agricultura.mp4` em 3:15,5 | **Build de testes com inventário liberado.** Legendado como em desenvolvimento. Cursor do mouse visível |
| `ecos-olimpo/demeter-estatuas.webp` e `-1280.webp` | Capa do estudo de caso e Open Graph | `gameplay-completa-0.2.mp4` em 7:52,4 (cutscene Zeus + Deméter) | Legenda informa que não foi publicada |
| `ecos-olimpo/demeter-estatua.webp` | Galeria "em desenvolvimento" | `gameplay-completa-0.2.mp4` em 6:01,8 | Texto do jogo em português |
| `ecos-olimpo/demeter-aspersores.webp` | Galeria | `loop-agricultura.mp4` em 0:23,9 | Build de testes |
| `ecos-olimpo/demeter-fabricadores.webp` | Galeria | `loop-agricultura.mp4` em 1:52,0 | Build de testes |
| `ecos-olimpo/demeter-mesa-aspersor.webp` | Galeria | `gameplay-completa-0.2.mp4` em 4:24,5 | Interface em português |
| `ecos-olimpo/demeter-colheita.webp` | Galeria | `gameplay-completa-0.2.mp4` em 5:25,5 | — |
| `ecos-olimpo/alpha-*.webp`, `ecos-4.webp` | Galeria "Alpha 0.1.2 — versão pública" | Capturas da Alpha 0.1.2 já usadas antes (as mesmas da página do itch.io) | Mantidas: mostram o que está publicado |
| `img/og/og-ecos-do-olimpo.jpg` | Compartilhamento (PT/EN) | Mesmo quadro da capa (7:52,4), recortado para 1200×630 | A versão anterior está no backup |

Direitos: capturas do próprio jogo, de autoria de Felipe. Os vídeos de origem estão em
`02 - PROJETOS/01 - Jogos/ECOS DO OLIMPO/DEVLOGS/devlog 02/material/`.

**Pendências**
- [ ] Quando a Atualização de Deméter for publicada: trocar "em desenvolvimento" por "publicada" nos cards, legendas e na seção "Em desenvolvimento" (PT e EN) e atualizar `case-facts`.
- [ ] Capturas do campo **sem cursor do mouse** e com progressão normal (sem inventário de teste), de preferência em inglês para a versão EN. Arquivo esperado: `demeter-campo.webp`, 1920×1080.
- [ ] Um GIF ou vídeo curto (até 10 s, WebM/MP4) de aspersores e esteiras funcionando. Exibição sugerida: galeria do estudo de caso.
- [ ] Confirmar se toda a arte é autoral (comentário `PENDENTE` em "Minha participação").

---

## Papotech Editor

| Arquivo | Onde aparece | Situação |
| --- | --- | --- |
| — (visual de terminal feito em CSS) | Card em destaque | Reproduz mensagens reais do programa; não é uma captura |
| `img/og/og-papotech-editor.jpg` / `-en.jpg` | Compartilhamento | Captura da própria página do estudo de caso (regerada em 05/11/2026) |

**Pendências**
- [ ] Captura real do terminal durante uma execução completa. Arquivo esperado: `projetos/img/papotech-editor/terminal.webp`, 16:9, 1280×720.
- [ ] Captura de `07_marcacoes.csv` aberto (planilha) e da pasta `saida/`. Arquivos: `marcacoes.webp`, `saida.webp`, 16:9.
- [ ] Se possível, medir o tempo de edição de um episódio antes e depois da ferramenta (hoje o site trata a economia de tempo apenas como objetivo, sem número).
- Onde exibir: seção "O que o programa entrega" do estudo de caso (há um comentário `PENDENTE` no HTML).

---

## ManiProtein

| Arquivo | Onde aparece | Origem | Situação |
| --- | --- | --- | --- |
| `maniprotein/maniprotein-1.webp` (1280×662) | Card em destaque, capa do estudo de caso | Captura do site publicado (desktop) | Ok |
| `maniprotein/maniprotein-2…5.webp` | Galeria | Capturas do site publicado | Ok |
| `img/og/og-maniprotein.jpg` | Compartilhamento | — | Ok |

Materiais locais não usados: `02 - Hackathons/MANIPROTEIN/Post ManiProtein/1–6.png` (posts com arte do
produto e fotos dos integrantes) e `Visual/` (logo e embalagens). Não são capturas do site; as fotos dos
integrantes exigem autorização de cada pessoa.

**Pendências**
- [ ] **Corrigir o site publicado no celular:** em 375–390 px o menu (com o novo item "Parceiros") e o título passam da largura da tela (`scrollWidth` 605 px para 375 px). Depois de corrigir, adicionar uma captura mobile (`maniprotein-mobile.webp`, 9:16 ou 390×844) e voltar a destacar responsividade no estudo de caso.
- [ ] O menu tem o link "Parceiros", mas a página não tem uma seção com esse id.
- [ ] Foto real da premiação do Inovathon FIMAN 2025 (com autorização), para a seção de conquistas.

---

## C.H.I.P.R.E. (Hackathon UniCesumar × Elotech)

| Arquivo | Onde aparece | Origem | Situação |
| --- | --- | --- | --- |
| `chipre/chipre-capa.webp` (1600×900) e `chipre-capa-960.webp` | Card na home e capa do estudo de caso | Quadro de `Downloads/CHIPRE_Apresentacao_30s.mp4` em 27,8 s | Telas do protótipo com dados fictícios |
| `chipre/chipre-sinais.webp`, `chipre-escuta.webp`, `chipre-plano.webp` | Galeria | Mesmo vídeo, em 3,5 s, 14,5 s e 23,5 s | Idem |
| `img/og/og-chipre.jpg` | Compartilhamento | Quadro de 27,8 s | Idem |

Direitos: material da equipe Legião do Chipre. **Confirme com a equipe** se todos concordam com a
publicação antes de publicar o site.

**Pendências**
- [ ] Sua função específica na equipe (há um comentário `PENDENTE` em "Trabalho em equipe", PT e EN).
- [ ] Foto do pódio ou da equipe com o certificado/premiação (autorização de quem aparece). Arquivo: `chipre/podio.webp`, 16:9 ou 4:3. Exibição: card de destaque em "Conquistas".
- [ ] Captura real do protótipo funcionando (navegador), se ainda existir o app publicado: `chipre/prototipo.webp`, 16:9.
- [ ] Link do repositório ou da demonstração, se a equipe publicar.
- [ ] Confirmar a stack usada no protótipo final (o site não lista tecnologias para não afirmar o que não foi confirmado).

---

## O Relógio das Consequências

| Arquivo | Onde aparece | Situação |
| --- | --- | --- |
| `relogio/relogio-4.webp` | Card e capa | Tela inicial |
| `relogio/relogio-1,2,3,5.webp` | Galeria | Ok |

**Pendências:** colocação ou avaliações da NoNeJam 13, se divulgadas.

---

## FZF Combat Starter Kit e asset packs

| Arquivo | Onde aparece | Situação |
| --- | --- | --- |
| `combat-kit/combat-kit-1.webp` | Card | Ok (`combat-kit-2…4.webp` disponíveis, não usados) |
| `asset-packs/*.webp` | Não usados na home atual | Os asset packs agora aparecem como item de lista, sem imagem |

---

## Portfólio pessoal

| Arquivo | Onde aparece | Situação |
| --- | --- | --- |
| `portfolio/portfolio-1.webp` / `-en.webp` | Card "Portfólio pessoal" | Regerados em 05/11/2026 a partir da home atual |
| `img/og/og-home.jpg` / `og-home-en.jpg` | Compartilhamento da home | Regerados em 05/11/2026 (agora com "4× Pódios") |

---

## Conquistas (hackathons)

Nenhum card de conquista tem foto hoje. Para cada um, se houver foto **sua ou com autorização**:

| Conquista | Arquivo esperado | Formato |
| --- | --- | --- |
| Hackathon UniCesumar × Elotech — 2º lugar | `img/conquistas/elotech-2026.webp` | 4:3 ou 16:9, 1200 px |
| Inovathon FIMAN 2025 — 1º lugar | `img/conquistas/fiman-2025.webp` | idem |
| Hackathon Expo Paranavaí 2026 — 1º lugar | `img/conquistas/paranavai-2026.webp` | idem |
| Hackathon InovaAgro (Expoingá) — 3º lugar | `img/conquistas/inovaagro.webp` | idem |

Não usar fotos da organização do evento sem verificar a permissão de uso e o crédito exigido.
Também faltam, para enriquecer os cards: nome do projeto e sua função nos hackathons de Paranavaí e
InovaAgro (e o ano do InovaAgro).

---

## Esporte Favorito (não publicado no portfólio)

Verificado em 05/11/2026:
- `esportefavorito.com.br` mostra a página padrão da Hostinger: **o site ainda não está publicado**.
- O projeto local (`07 - automacoes/02.1 - Esporte Favorito Site`) é uma aplicação PHP/MySQL (V1.1)
  com álbuns `[DEMO]`, imagens conceituais e mockups de produtos, sem deploy.
- As imagens disponíveis (`Mockup do site Esporte Favorito no desktop.png`, imagens geradas por IA) são
  mockups, não capturas de um site em funcionamento.

Por isso o projeto **não foi incluído** como caso entregue. Para incluí-lo depois:
- [ ] Publicar o site com conteúdo real (álbuns e produtos verdadeiros).
- [ ] Capturas reais: `projetos/img/esporte-favorito/home.webp` (desktop, 16:9) e `mobile.webp` (390×844).
- [ ] Definir o que foi desenvolvido por você e quais integrações estão ativas (Banlek, WhatsApp).

## Outras fontes consultadas

- **LinkedIn:** o perfil exige login para visualização automatizada; nenhuma publicação foi acessada ou
  usada. Se quiser usar imagens das suas publicações, baixe os originais e coloque-os nas pastas acima.
- **Monster Tamer do Zero:** o repositório `monster-tamer-tutorial` existe, mas não tem README nem vídeo
  confirmado; ficou fora da lista "Também publico" até haver material público.
