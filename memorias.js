// Edite este arquivo para mudar fotos, legendas, mensagens e comentários.
// Para adicionar uma memória, copie um item e coloque-o na posição desejada.
const commentProfiles = [
  '@annaluiza', '@bia.santos', '@carol_mendes', '@dudaferreira', '@lais.oliveira',
  '@rafaela_martins', '@giihrocha', '@nathy_alves', '@juliana.costa', '@bruna.ribeiro',
  '@camila.andrade', '@mafe.souza', '@luana.melo', '@leticia.freitas', '@isabela.lima',
  '@amanda.teixeira', '@thais.cardoso', '@sarah.gomes', '@yasmin_barros', '@clara.monteiro',
  '@pedrohenrique', '@vitor.silva', '@gui.moreira', '@leoferraz', '@matheusrocha',
  '@rafael.dias', '@andre.castro', '@caio_nunes', '@brunooliveira', '@felipealmeida',
  '@jessica.azevedo', '@alinecarvalho', '@paty.nogueira', '@mari.silveira', '@tati.ramos',
  '@renata.souza', '@cris.martins', '@luiza.barros', '@nanda_costa', '@gabi.monteiro',
  '@rodrigo.alves', '@danielmoraes', '@lucas.pereira', '@thiago.cunha', '@vinicius.lima',
  '@marcosfreitas', '@isa.barbosa', '@livia.machado', '@heloisa_reis', '@sofia.dantas'
];

const pedroComment = {
  name: '@preedroos',
  avatar: 'P',
  avatarImage: 'images/preedroos-profile.png',
  text: '❤️'
};

function buildComments(texts, profileOffset, pedroText) {
  const generatedComments = texts.map((text, index) => {
    const name = commentProfiles[(profileOffset + index) % commentProfiles.length];
    return { name, avatar: name[1].toUpperCase(), text };
  });

  return [...generatedComments, { ...pedroComment, text: pedroText }];
}

window.memoriesData = {
  profileName: '@priv.jaquelinejandre',
  profileImage: 'images/perfil-wallpaper.png',
  items: [
    {
      type: 'photo',
      src: 'images/jan.jpeg',
      alt: 'O Pedro tirando foto escondido da Jaque no meio do expediante.',
      caption: 'Moleque atoa 😒',
      music: { artist: 'Xande de Pilares', track: 'Tá Escrito', context: 'pra começar o expediente com energia' },
      likes: 124,
      comments: buildComments([
        'Flagrada no expediente 😂', 'O fotógrafo não perde uma 👀', 'Jaque plena até distraída 😍',
        'Pedro, foi visto! 😂', 'Esse flagrante ficou ótimo 📸', 'Ela nem percebeu 😂',
        'A cara dela entregou tudo 😅', 'Moleque, deixa ela trabalhar 😂', 'Que cena espontânea 😍',
        'Bastidor de milhões 😂', 'Jaque roubou a cena de novo ✨', 'Foto inesperada, perfeita 😄',
        'O expediente rendeu conteúdo 😂', 'Olha esse flagrante 👀', 'Ela tentando focar no trabalho 😅',
        'Pedro sempre aprontando 😂', 'A espontaneidade dela é tudo 🥰', 'Essa merece ir pros stories 📲',
        'Jaque nem viu a câmera 😂', 'Sorriso que salva qualquer expediente 💖'
      ], 0, 'Realmente uma bela moça, que nunca passa despercebida por onde vai.')
    },
    {
      type: 'photo',
      src: 'images/fev.jpeg',
      alt: 'Jaqueline sorrindo à mesa na cozinha durante uma pausa para comer, com o Pedro, João, Denis.',
      caption: 'Almoçando com a melhor companhia, esquece.',
      music: { artist: 'João Gomes', track: 'Meu Pedaço de Pecado', context: 'pra acompanhar a pausa pro rango' },
      likes: 198,
      comments: buildComments([
        'Almoço com a melhor companhia 😍', 'Essa mesa tá bem acompanhada 💖', 'Sorriso lindo até no rango 😋',
        'A pausa ficou melhor com vocês 🥰', 'Jaque já escolheu o prato? 😂', 'Que turma boa! ✨',
        'Almoço e resenha, combinação perfeita 🍽️', 'Essa companhia vale qualquer fila 😄', 'Jaque iluminando a cozinha 🌟',
        'Todo mundo junto no almoço 🫶', 'Foto com gosto de amizade 💕', 'A melhor parte é a companhia 😍',
        'João e Denis no registro também 📸', 'Esse almoço rendeu boas lembranças 😊', 'A mesa mais animada 🍴',
        'Jaque sempre deixa tudo mais leve 💖', 'Que sorriso gostoso de ver 🥰', 'Almoço em ótima companhia 😋',
        'A conversa deve estar boa 😂', 'Registro simples e cheio de carinho ✨'
      ], 5, 'E não somente hoje, mas todos os dias você está de parabéns pelo que é.')
    },
    {
      type: 'photo',
      src: 'images/mar.jpeg',
      alt: 'Selfie no espelho do coletor de produtos que o Pedro tirou do celular dele, capturando a Jaqueline e o João no reflexo.',
      caption: 'Morcegando com os fiscais. 🦇',
      music: { artist: 'Wesley Safadão', track: 'Camarote', context: 'porque essa foto está pegando fogo' },
      likes: 256,
      comments: buildComments([
        'Selfie no coletor 😂', 'Jaque e João no reflexo 📸', 'Os fiscais chegaram 👀',
        'Morcegando no expediente 🦇', 'Esse espelho é diferenciado 😂', 'Reflexo de milhões 😍',
        'João também foi registrado 😄', 'A selfie mais tecnológica 🤳', 'Fiscalização aprovada ✅',
        'Coletor virou câmera agora? 😂', 'Jaque sempre inventando foto ✨', 'Bastidores do trabalho 📸',
        'Esse reflexo ficou perfeito 😅', 'Os fiscais tão de olho 👀', 'Até o coletor entrou na brincadeira 😂',
        'Foto inesperada e icônica 🦇', 'Jaque e João no modo selfie 😎', 'Registro clandestino 😂',
        'Essa câmera tem história 📱', 'Morcegos em horário comercial 🦇'
      ], 10, 'Parabéns pela beleza, por estar sempre cheirosa e com essa energia que chama atenção.')
    },
    {
      type: 'photo',
      src: 'images/abr.jpeg',
      alt: 'o Pedro tirando foto do momento de selfie com Tatiane, Aline e Jaqueline.',
      caption: 'Raro, mas acontece. ✨',
      music: { artist: 'Jorge & Mateus', track: 'Amo Noite e Dia', context: 'pra guardar o passeio com as amigas' },
      likes: 310,
      comments: buildComments([
        'Aline, Tatiane e Jaque reunidas 💖', 'Pedro registrando o momento 😂', 'Raro, mas perfeito ✨',
        'As meninas e um fotógrafo oficial 📸', 'Que selfie boa! 😍', 'Essa amizade rende fotos lindas 🥰',
        'Jaque tá maravilhosa 💕', 'Aline e Tatiane, que turma! 🫶', 'Um clique pra guardar 💫',
        'Pedro não perde uma foto 😂', 'Sorrisos que fazem bem ☀️', 'Encontro das lindas 😍',
        'A energia desse trio! ✨', 'Essa foto transmite alegria 💖', 'Jaque brilhou no registro 🌟',
        'Amizade em um clique 🤳', 'Quero uma selfie assim também 🥰', 'Que momento gostoso 😊',
        'Raro e valeu a espera 😂', 'Foto espontânea, memória eterna 💕'
      ], 15, 'Por estar sempre sorrindo, e até mesmo quando não está num bom dia, continuar linda com a cara fechada.')
    },
    {
      type: 'photo',
      src: 'images/mai.jpeg',
      alt: 'Pausa para um milk-shake com Denis, João, Pedro e Luiz no Comper.',
      caption: 'Depois dele ficar incomodando um monte, fomos tomar um sorvete. 🥤',
      music: { artist: 'Felipe Amorim', track: 'No Ouvidinho', context: 'pra deixar a pausa mais animada' },
      likes: 412,
      comments: buildComments([
        'Milk-shake com a equipe 🥤', 'Pedro finalmente sossegou 😂', 'Pausa merecida com a turma 😋',
        'Denis, João e Luiz no rolê 📸', 'Jaque ficou com o melhor sabor 😍', 'Esse sorvete valeu a insistência 😂',
        'A equipe reunida é tudo 💖', 'Comper nunca mais será o mesmo 🍦', 'Olha essa pausa gostosa 🥰',
        'Jaque e milk-shake: combinação perfeita 🥤', 'O pedido foi aprovado? ✅', 'Rendeu uma foto linda ✨',
        'Depois da insistência veio o sorvete 😂', 'A melhor companhia pra pausa 🫶', 'Que turma animada 😄',
        'Jaque deixando o intervalo mais divertido 💕', 'Denis, João, Pedro e Luiz reunidos 👏', 'Do trabalho direto pro sorvete 😋',
        'Esse sorriso merece sobremesa 🍨', 'Pausa doce e boa companhia 💖'
      ], 20, 'Parabéns por ser a líder que você é no dia a dia, sempre ajudando os outros.')
    },
    {
      type: 'photo',
      src: 'images/jun.jpeg',
      alt: 'Selfie com Aline, João, Jaqueline e Pedro no sol indo pegar um aparmediana para almoçar.',
      caption: 'Sou linda até nesse sol do carai! ☀️',
      music: { artist: 'Gustavo Mioto', track: 'Impressionando os Anjos', context: 'pra celebrar essa equipe querida' },
      likes: 520,
      comments: buildComments([
        'Sol forte e beleza intacta ☀️', 'A Jaque venceu o sol 😂', 'Selfie antes do almoço 📸',
        'Aline e João no registro 😎', 'Pedro também saiu na foto 😂', 'Esse brilho não é só do sol ✨',
        'Aparmediana que espere, essa foto primeiro 😅', 'A equipe mais bonita ☀️', 'Jaque tá radiante 😍',
        'Sol do carai e sorriso lindo 😂', 'Almoço com essa turma? Sim! 🍽️', 'Foto de equipe nota 10 💖',
        'Nem o sol tira o charme dela 🌟', 'Aline, João, Jaque e Pedro reunidos 🫶', 'Essa selfie ficou ótima 🤳',
        'Sol na cara, alegria no coração 💕', 'Jaque roubando a luz do dia ☀️', 'Registro pré-almoço 😋',
        'Sorriso que dispensa filtro 😍', 'Essa equipe alegra qualquer dia 😊'
      ], 25, 'Por assumir as responsabilidades — às vezes até demais — e realmente vestir a camisa da empresa.')
    },
    {
      type: 'photo',
      src: 'images/jul.jpeg',
      alt: 'Pedro e Jaqueline tirando selfie com uma pizza.',
      caption: 'Encontro com ele! 🫣',
      music: { artist: 'Jorge & Mateus', track: 'Propaganda', context: 'pra acompanhar a pizza e a comemoração' },
      likes: 890,
      comments: buildComments([
        'Encontro com ele 👀', 'Pizza e selfie: perfeito 🍕', 'Pedro e Jaque no registro 💕',
        'Esse encontro rendeu foto 😍', 'Jaque tá linda demais ✨', 'Quem escolheu o sabor? 😂',
        'Pizza aprovada, casal também 🥰', 'Um clique especial 🤳', 'A companhia parece ótima 💖',
        'Olha esse sorriso 😍', 'Noite de pizza com ele 🍕', 'Essa foto tem história 🫶',
        'Pedro conseguiu uma selfie 😂', 'Jaque roubou a cena de novo 🌟', 'Que dupla bonita 💕',
        'A pizza ficou até em segundo plano 😅', 'Esse encontro parece bom demais 🥰', 'Foto pra guardar 📸',
        'Muito charme num clique só ✨', 'Pizza, risada e boas lembranças 💖'
      ], 30, 'Parabéns por ser essa pessoa incrível, que motiva, inspira e dá brilho às pessoas ao redor.')
    },
    {
      type: 'photo',
      src: 'images/001.jpeg',
      alt: 'Pedro tirando selfie da Jaqueline conversando com a Renata e o Dirceu olhando no fundo.',
      caption: 'Tomei a chamada 😬',
      music: { artist: 'Xande de Pilares', track: 'Tá Escrito', context: 'trilha oficial de quem cumpre as ordens da diretoria' },
      likes: 934,
      comments: buildComments([
        'Jaque levou uma chamada 😬', 'Renata falando sério 👀', 'Dirceu acompanhando tudo 😂',
        'Pedro registrou o momento 📸', 'Essa conversa parece importante 😅', 'A cara dela entregou 😂',
        'Reunião surpresa no corredor 😄', 'Renata e Dirceu de olho 👀', 'Chamaram a Jaque 😬',
        'Flagra no meio da conversa 😂', 'Ela escutando atentamente 👏', 'Pedro não perde um bastidor 📷',
        'Essa cena parece novela 😅', 'Jaque tentando se explicar 😂', 'Olha o Dirceu no fundo 👀',
        'Renata convocou, Jaque ouviu 😄', 'Foto espontânea demais 📸', 'Chamou a atenção dela 😬',
        'O fundo da foto é ótimo 😂', 'Esse registro ficou icônico ✨'
      ], 35, 'Parabéns também por estar na minha vida e fazer tanta diferença nela.')
    },
    {
      type: 'photo',
      src: 'images/002.jpeg',
      alt: 'Selfie sorridente com João, Renata Bracali, Renata Toledo e Anderson em um show do Gustavo Lima',
      caption: 'Bebi todas ✨',
      position: 'left',
      music: { artist: 'Wesley Safadão', track: 'Camarote', context: 'pra manter a energia da festa' },
      likes: 1028,
      comments: buildComments([
        'Show do Gusttavo Lima! 🎤', 'Jaque curtiu o show mesmo 😂', 'Selfie com a turma toda 📸',
        'João, Renata e Anderson também 🎶', 'Esse sorriso no meio do show 😍', 'Noite boa demais ✨',
        'Bebi todas e ainda saí linda 😂', 'A energia tá lá em cima 🎉', 'Essa turma sabe aproveitar 💃',
        'Jaque roubou a selfie 🤳', 'Que lembrança boa do show 🥰', 'Renata Bracali e Toledo no registro 💖',
        'Anderson e João completando a foto 🙌', 'Show bom e companhia melhor ainda 🎵', 'Essa noite rendeu 😂',
        'Sorriso mais alto que o som 😍', 'Jaque no camarote da alegria 🎤', 'Foto oficial da galera 📷',
        'Quero replay dessa noite 🥳', 'Memória boa demais ✨'
      ], 40, 'Você é minha motivação para muitas das decisões boas que tomo, e o motivo para eu desistir de outras que não valem a pena.')
    },
    {
      type: 'photo',
      src: 'images/003.jpeg',
      alt: 'Foto da equipe reunida para comemorar o aniversário da Renata Toledo',
      caption: 'Comemorei com a equipe o aniversário da diretoria: bolo e boas risadas 🎂',
      music: { artist: 'João Gomes', track: 'Meu Pedaço de Pecado', context: 'pra animar a comemoração da equipe' },
      likes: 1176,
      comments: buildComments([
        'Parabéns, Renata! 🎂', 'A equipe toda reunida 🥳', 'Bolo e boas risadas 🎉',
        'Jaque celebrando com o time 💖', 'Feliz aniversário, Renata Toledo! 🎈', 'Que festa gostosa ✨',
        'Todo mundo comemorando junto 🫶', 'A aniversariante merece! 🎂', 'Jaque no clima da festa 🥰',
        'Equipe nota mil 👏', 'Mais um aniversário especial 🎉', 'Bolo compartilhado, alegria dobrada 🍰',
        'Renata cercada de carinho 💕', 'Essa comemoração ficou linda 😍', 'Sorriso de festa 🥳',
        'Um brinde à Renata! 🥂', 'Que venham muitos outros 🎂', 'Dia de celebrar a diretoria 🎈',
        'A turma fez bonito 👏', 'Memória de aniversário pra guardar 📸'
      ], 45, 'Saiba que, independente do momento, eu sempre estarei na torcida por você.')
    },
    {
      type: 'photo',
      src: 'images/004.jpeg',
      alt: 'Enquanto os fiscais foram almoçar, o Pedro tirou foto da Jaqueline passando pano enquanto a Cris olhava.',
      caption: 'Ensinando a Cris 💪',
      music: { artist: 'Felipe Amorim', track: 'No Ouvidinho', context: 'pra dar ritmo ao mutirão' },
      likes: 864,
      comments: buildComments([
        'Jaque ensinando a Cris 🧹', 'Passando pano com estilo 😂', 'Cris tá aprendendo com a melhor 💪',
        'Mutirão depois do almoço 👏', 'Pedro registrando o serviço 😂', 'Jaque não foge da missão ✨',
        'Trabalho em equipe é isso 🫶', 'Cris observando a aula 😄', 'A faxina virou conteúdo 📸',
        'Líder que põe a mão na massa 👏', 'Essa dupla dá conta de tudo 💪', 'Ensinamento prático 😂',
        'Pano na mão e sorriso no rosto 😊', 'Jaque mostrando como faz 🧹', 'Cris, pode anotar! ✍️',
        'Nem o expediente para essa equipe 😅', 'Parceria até na limpeza 💖', 'O brilho vai ficar! ✨',
        'Passando pano e espalhando alegria 😄', 'Mutirão com boas companheiras 🥰'
      ], 0, 'Por fim, parabéns pelo seu dia! Mais um ano de vida, ainda muito jovem, com muita energia e muito mundo para se aventurar. Espero que permaneça comigo nessa e que tenhamos muitas outras fotos para as próximas ocasiões.')
    },
  ]
};
