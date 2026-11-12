# jaque-bday-2026

Uma página estática de aniversário, feita para celular e publicável no GitHub Pages. A experiência começa em uma tela de celular simulada e segue para um feed vertical de fotos e comentários.

## Recursos

- Feed vertical com rolagem, encaixe por foto e retorno contínuo ao início.
- Zoom suave na foto atual e indicador de progresso do feed.
- Curtidas por toque ou clique duplo, comentários por foto e buscas das músicas sugeridas no Spotify.
- Prévia simulada da Central de Notificações, aberta ao puxar para baixo a partir do topo.
- Layout que mantém a largura de um celular e centraliza a experiência em telas grandes, suporte a áreas seguras e respeito à preferência por movimento reduzido.

## Prévia de notificações

Puxe para baixo começando pela barra de status simulada para abrir o painel com as mensagens de WhatsApp e Shopee. Os horários são preenchidos com a hora local no instante em que o painel abre. O painel é uma simulação dentro da página; ele não acessa nem altera a Central de Notificações real do celular.

## Personalizar

### Fotos, textos e comentários

Edite [`memorias.js`](./memorias.js). Cada objeto em `items` representa uma foto e contém:

- `src`: caminho relativo da imagem, dentro de `images/`.
- `alt`: descrição da imagem para leitores de tela.
- `caption`: legenda.
- `likes`: quantidade inicial de curtidas.
- `music`: artista, faixa e contexto exibidos como sugestão com um link de busca no Spotify.
- `comments`: lista de comentários com `name`, `avatar` e `text`. Um comentário pode ter também `avatarImage`, como o perfil de `@preedroos`.

As fotos aparecem na ordem do array. Para adicionar uma, coloque a imagem em `images/` e acrescente o objeto correspondente ao array `items`. O feed acrescenta uma cópia da primeira foto para permitir a volta ao início.

### Imagens de perfil

- `profileName` e `profileImage` em `memorias.js` personalizam o perfil exibido no feed.
- `avatarImage` personaliza a imagem de um comentário.
- `images/perfil-wallpaper.png` é o papel de parede da tela inicial. O desfoque e o enquadramento são definidos em `styles.css`.

### Organização dos arquivos

- `index.html`: estrutura da página e carregamento dos recursos.
- `styles.css`: layout, aparência, transições e animações.
- `app.js`: feed, comentários, curtidas, relógio e interações.
- `memorias.js`: conteúdo editável das fotos e comentários.
- `images/`: imagens usadas pela página.

## Efeitos e acessibilidade

O zoom discreto da foto ativa e a transição do sombreado dão movimento sem adicionar vídeo pesado. O indicador acompanha a foto visível por `IntersectionObserver`; as animações usam transformações e opacidade, e são desativadas quando o dispositivo solicita movimento reduzido.

Referências consultadas:

- [Animações orientadas à rolagem — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Preferência por movimento reduzido — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)

Como o suporte a animações CSS orientadas à rolagem varia entre navegadores, o progresso e a seleção da foto usam `IntersectionObserver`, com as transições visuais mantidas em CSS. A preferência por movimento reduzido é aplicada no CSS e no comportamento da interface.

## Testar localmente

Não há etapa de build. Abra `index.html` em um navegador ou inicie um servidor estático na raiz do projeto:

```sh
python3 -m http.server 8000
```

Então acesse `http://localhost:8000`. Tailwind CSS, Font Awesome e as fontes são carregados de CDNs, portanto a conexão com a internet é necessária para esses recursos externos.

## Publicar no GitHub Pages

No GitHub, abra **Settings → Pages**, selecione a branch principal e a pasta raiz (`/`). Salve para publicar os arquivos estáticos do projeto.
