export interface Estoque {
  P: number;
  M: number;
  G: number;
  GG: number;
  XG: number;
}

export interface Produto {
  id: string;
  codigo: string; // SKU para não ter de reescrever o produto todo
  nome: string;
  categoria: string;
  preco: number;
  precoAntigo?: number;
  precoKit2?: number; // Valor unitário se levar 2
  precoKit3?: number; // Valor unitário se levar 3
  cor: string;
  especificacaoTecnica: string; // Ex: 200 G/M² FIO 26.1 • 100% ALGODÃO
  tags: string[];
  promocao: boolean;
  imagens: string[];
  estoque: Estoque;
  descricao: string;
  informacoesTecnicas: string;
  lavagem: string;
}

export const produtos: Produto[] = [
  {
    id: '1',
    codigo: 'BSKW-BAS-PRT-01',
    nome: 'Camiseta Básica B.SKW Preto',
    categoria: 'camiseta-basica',
    preco: 87.90,
    precoAntigo: 129.90,
    precoKit2: 75.90,
    precoKit3: 63.90,
    cor: 'Preto',
    especificacaoTecnica: '200 G/M² FIO 26.1 • 100% ALGODÃO',
    tags: ['20% OFF'],
    promocao: true,
    imagens: ['/files/banner-meio.jpg'], 
    estoque: { P: 10, M: 15, G: 20, GG: 10, XG: 5 },
    descricao: 'A Camiseta Básica B.SKW Preto é o item essencial que não pode faltar no seu guarda-roupa. Com uma modelagem reta e clássica, ela veste de forma equilibrada no corpo — nem tão justa, nem muito folgada.\n\nProduzida em malha premium 100% algodão, oferece toque macio, zero transparência e alta durabilidade para o uso intenso do dia a dia.\n\nNossas peças passam por um processo de pré-encolhimento (Zero Encolhimento), garantindo que o tamanho se mantenha exato e não perca o caimento após as lavagens.',
    informacoesTecnicas: '- Gola canelada 2x1 com 3cm de altura\n- Reforço ombro a ombro\n- Etiqueta interna estampada (não arranha)\n- Modelagem regular fit',
    lavagem: '- Lavar à máquina com água fria\n- Não usar alvejante\n- Secar à sombra\n- Passar a ferro em temperatura média (não passar sobre a estampa)'
  },
  {
    id: '2',
    codigo: 'BSKW-OVS-PRT-01',
    nome: 'Camiseta Oversized B.SKW Preto',
    categoria: 'camiseta-oversized',
    preco: 111.90,
    precoAntigo: 169.90,
    precoKit2: 95.90,
    precoKit3: 85.90,
    cor: 'Preto',
    especificacaoTecnica: '240 G/M² FIO 20.1 • 100% ALGODÃO HEAVYWEIGHT',
    tags: ['20% OFF'],
    promocao: true,
    imagens: ['/files/banner-meio.jpg'], 
    estoque: { P: 5, M: 8, G: 12, GG: 15, XG: 8 },
    descricao: 'A Camiseta Oversized B.SKW traz a verdadeira estética do streetwear premium. Com ombros caídos (drop shoulder), mangas mais amplas e comprimento ideal, ela proporciona um visual estruturado e moderno.\n\nFeita com malha heavyweight, tem um caimento pesado que não marca o corpo.',
    informacoesTecnicas: '- Gola canelada grossa de 3cm\n- Ombros deslocados (Drop Shoulder)\n- Malha pesada (Heavyweight) de alta gramatura\n- Modelagem Oversized autêntica',
    lavagem: '- Lavar à máquina com água fria\n- Secar à sombra para manter o peso da malha\n- Não usar secadora\n- Passar pelo avesso'
  },
  {
    id: '3',
    codigo: 'BSKW-BOX-ARE-01',
    nome: 'Camiseta Boxy B.SKW Areia',
    categoria: 'camiseta-boxy',
    preco: 105.90,
    precoAntigo: 0,
    precoKit2: 95.90,
    precoKit3: 85.90,
    cor: 'Areia',
    especificacaoTecnica: '220 G/M² FIO 24.1 • 100% ALGODÃO',
    tags: ['NOVO'],
    promocao: false,
    imagens: ['/files/banner-meio.jpg'], 
    estoque: { P: 10, M: 10, G: 10, GG: 10, XG: 0 },
    descricao: 'A modelagem Boxy é a tendência definitiva. Ela é mais curta no comprimento (ficando na linha do cinto) e mais larga nas laterais, criando uma silhueta quadrada ("box") perfeita para compor com calças cargo ou calças mais parrudas.\n\nEleva qualquer look básico a um visual de moda internacional.',
    informacoesTecnicas: '- Comprimento encurtado (Cropped/Boxy)\n- Largura ampliada\n- Gola de 2.5cm\n- Caimento estruturado',
    lavagem: '- Lavar com cores semelhantes\n- Não usar alvejante\n- Secar em varal\n- Passar a ferro em temperatura média'
  },
  {
    id: '4',
    codigo: 'BSKW-POL-BCO-01',
    nome: 'Camiseta Poliamida B.SKW Branco',
    categoria: 'camiseta-poliamida',
    preco: 79.90,
    precoAntigo: 99.90,
    precoKit2: 69.90,
    precoKit3: 59.90,
    cor: 'Branco',
    especificacaoTecnica: '90% POLIAMIDA • 10% ELASTANO • ICE TECH',
    tags: ['TREINO'],
    promocao: true,
    imagens: ['/files/banner-meio.jpg'], 
    estoque: { P: 20, M: 25, G: 20, GG: 10, XG: 5 },
    descricao: 'Para quem não para. A Camiseta Poliamida B.SKW foi desenvolvida para alta performance. O tecido Ice Tech gela no corpo, evapora o suor instantaneamente e não retém odores.\n\nPerfeita para treinos pesados, corridas ou para os dias de extremo calor na cidade.',
    informacoesTecnicas: '- Tecnologia Ice Tech (toque gelado)\n- Proteção UV50+\n- Anti-odor e secagem ultra rápida\n- Modelagem sport fit (levemente ajustada)',
    lavagem: '- Lavar à mão ou ciclo delicado\n- Não usar amaciante (bloqueia os poros do tecido)\n- Não passar a ferro\n- Secagem ultrarrápida à sombra'
  }
];
