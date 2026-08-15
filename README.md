# Conecta Vida

**Desconecte da tela, conecte-se com a vida.**

Landing page + protótipo de vendas do Conecta Vida — uma plataforma que transforma tempo de tela em desafios reais, metas conscientes e recompensas de verdade, para escolas, famílias e adolescentes em busca de equilíbrio digital.

Projeto do Squad Conecta Vida.

---

## Sobre o projeto

Este repositório contém o site institucional/comercial do Conecta Vida: a história do problema (vício em telas entre adolescentes), a solução proposta, provas de resultado de um piloto, comparação com concorrentes, planos e um formulário de contato que redireciona para o WhatsApp.

É **100% front-end** — HTML, CSS e JavaScript puro, sem framework, sem build, sem backend e sem banco de dados. Feito para rodar direto no **GitHub Pages**.

## Stack

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (custom properties, Grid, Flexbox) — sem pré-processador |
| Comportamento | JavaScript puro (vanilla), sem dependências |
| Fontes | Google Fonts — Sora, Manrope, Space Mono |
| Hospedagem | GitHub Pages (ou qualquer host estático) |

Não há `package.json`, não há passo de build. É abrir e usar.

## Estrutura de arquivos

```
conecta-vida/
├── index.html    → estrutura da página (todas as seções)
├── style.css     → identidade visual, layout e responsividade
├── data.js       → todo o conteúdo do site + configurações (o "mini backend")
├── main.js       → renderização dinâmica e interatividade
├── 404.html      → página de erro personalizada (GitHub Pages usa automaticamente)
├── robots.txt    → indica aos buscadores que o site pode ser indexado
├── sitemap.xml   → mapa do site pra buscadores
├── .nojekyll     → avisa o GitHub Pages pra não processar o site com Jekyll
└── README.md
```

### Por que separar `data.js` de `main.js`?

`data.js` funciona como uma camada de dados: todos os textos, números, planos e depoimentos ficam ali, num objeto `SITE_DATA`. `main.js` lê esse objeto e monta o HTML das seções dinamicamente.

Na prática, isso significa que **pra atualizar qualquer conteúdo do site — número, preço, depoimento, texto — você só edita `data.js`**, sem tocar em HTML ou JS de comportamento.

## Como rodar localmente

Não precisa de servidor nem de instalação. Duas opções:

1. **Abrir direto**: dê duplo clique em `index.html`.
2. **Servidor local** (recomendado, evita bloqueios de CORS/módulos do navegador):
   ```bash
   # Python
   python3 -m http.server 8000

   # Node (com o pacote serve instalado)
   npx serve .
   ```
   Depois acesse `http://localhost:8000`.

## Como publicar no GitHub Pages

1. Suba os 4 arquivos (`index.html`, `style.css`, `data.js`, `main.js`) pra raiz do repositório (ou pra uma pasta, tipo `/docs`).
2. No repositório: **Settings → Pages → Source**, selecione a branch e a pasta onde estão os arquivos.
3. Aguarde alguns minutos — o GitHub publica em `https://<seu-usuario>.github.io/<repositorio>/`.

## Configuração obrigatória antes de publicar

Abra `data.js` e troque o número de WhatsApp de exemplo pelo número real:

```js
const SITE_CONFIG = {
  whatsappNumber: '5511999999999' // TODO: número real (código do país + DDD + número, só dígitos)
};
```

Se esquecer, o site avisa sozinho no console do navegador (F12 → Console) que o número ainda é o de exemplo.

Também troque `SEU-DOMINIO-AQUI` em `robots.txt` e `sitemap.xml` pelo endereço real do site assim que ele estiver publicado.

## Personalizando conteúdo

Todo o conteúdo do site vem de `SITE_DATA` em `data.js`:

- `trustBar` — os 4 números de destaque logo abaixo do hero
- `problemStats` — estatísticas da seção "O problema"
- `pillars` — os pilares da seção "Solução" (numerados automaticamente por CSS)
- `features` — os 4 blocos da seção "Funcionalidades" (ícones em `ICONS`, no topo de `main.js`)
- `resultStats` — estatísticas da seção "Resultados"
- `testimonials` — depoimentos do carrossel
- `comparison` — as duas listas da seção "Diferencial"
- `plans` — os planos (nome, preço, período, descrição, features, texto do botão)

Editar qualquer um desses arrays já reflete no site — não precisa mexer em `index.html` nem em `main.js`.

## Personalizando cores e fontes

Tudo fica centralizado em `:root` no topo de `style.css`:

```css
:root{
  --bg-deep:   #060d1a;  /* fundo principal */
  --bg-raised: #0e1d38;  /* fundo dos cards */
  --cyan:      #22d3ee;  /* cor de destaque */
  --white:     #f3f7fc;  /* texto principal */
  --fog:       #b7c8e0;  /* texto secundário */
  --font-display: 'Sora', sans-serif;
  --font-body:    'Manrope', sans-serif;
  --font-mono:    'Space Mono', monospace;
}
```

Trocar esses valores atualiza o site inteiro.

## Funcionalidades

- **Renderização dinâmica** — todo o conteúdo vem de `data.js`, não está fixo no HTML
- **Contadores animados** — os números sobem quando entram na tela (`IntersectionObserver`)
- **Carrossel de depoimentos** — avança sozinho, com navegação manual e pausa ao passar o mouse/dar foco
- **Formulário → WhatsApp** — coleta nome, plano de interesse e mensagem, e abre o WhatsApp com tudo pronto pra enviar
- **Barra de progresso de leitura** e **botão voltar ao topo**
- **Brilho que segue o cursor** nas seções escuras (desktop, respeita `prefers-reduced-motion`)
- **Totalmente responsivo**, com grades que se reorganizam em tablet e celular
- **Sem dependências externas** além das fontes do Google
- **Validação defensiva dos dados** — se um item em `data.js` estiver sem campo obrigatório, ele é ignorado (em vez de mostrar "undefined" na tela) e um aviso aparece no console
- **JS encapsulado** — `main.js` roda dentro de um IIFE, sem poluir o escopo global do navegador
- **Página 404 personalizada**, **robots.txt** e **sitemap.xml** já configurados para SEO básico

## Segurança (site 100% front-end, sem backend)

- Nenhum dado digitado pelo usuário é inserido via `innerHTML` — só `textContent`/valores de formulário, evitando XSS
- `Content-Security-Policy` via `<meta>` no `index.html`, restringindo de onde o site carrega script/estilo/fonte
- Links que abrem em nova aba usam `rel="noopener noreferrer"`
- Não existe nenhuma chave ou segredo no código — não há nada sensível pra expor, já que não há backend
- **Limitação conhecida**: proteções que dependem de cabeçalho HTTP real (`X-Frame-Options`, `Strict-Transport-Security`) não são configuráveis no GitHub Pages puro. Hosts como Netlify ou Cloudflare Pages permitem isso, continuando 100% estático.

## Limitações conhecidas

- O formulário de contato **não envia e-mail** — ele monta uma mensagem e abre o WhatsApp. Não há coleta de leads em banco de dados.
- O "progresso salvo" em `localStorage` é só uma demonstração local, por navegador — não é um histórico real nem sincroniza entre dispositivos.
- Seções com conteúdo dinâmico (estatísticas, pilares, planos etc.) ficam **vazias se o JavaScript falhar ao carregar** — nesse caso, o banner de aviso (`<noscript>`) só cobre o caso de JS desabilitado, não o de erro de carregamento do arquivo. É a troca feita por manter o conteúdo centralizado em `data.js` em vez de duplicado no HTML.
- Sem etapa de build: `style.css` e `main.js` não são minificados. Pra produção em maior escala, vale considerar um passo simples de minificação.

## Próximos passos sugeridos

- Demo interativa do app (dashboard, desafios clicáveis, pontos, perfil) — ainda não implementada, pensada como a próxima fase
- Trocar o `og:image` genérico por uma imagem real (1200×630) para preview em redes sociais
- Se quiser e-mail de verdade (além do WhatsApp), integrar um serviço de formulário estático como Formspree ou EmailJS

## Créditos

Projeto Squad Conecta Vida — conteúdo original (problema, solução, resultados de piloto) baseado na apresentação do projeto.
