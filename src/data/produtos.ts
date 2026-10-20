export type Tamanho = 'P' | 'M' | 'G' | 'GG' | 'XG' | 'G1' | 'G2';

export interface Estoque {
  P: number;
  M: number;
  G: number;
  GG: number;
  XG: number;
  G1: number;
  G2: number;
}

export interface Produto {
  id: string;
  codigo: string;
  nome: string;
  categoria: string;
  preco: number;
  precoAntigo: number;
  precoKit2: number;
  precoKit3: number;
  tags: string[];
  especificacaoTecnica: string;
  precoOriginal: number; 
  precoKit: number; 
  hex: string; 
  tag: string; 
  tamanhos: Tamanho[]; 
  cor: string;
  promocao: boolean;
  imagens: string[];
  estoque: Estoque;
  descricao: string;
  informacoesTecnicas: string;
  lavagem: string;
}

const estoqueZerado: Estoque = { P: 0, M: 0, G: 0, GG: 0, XG: 0, G1: 0, G2: 0 };
const tamanhosPadrao: Tamanho[] = ['P', 'M', 'G', 'GG', 'XG', 'G1', 'G2'];

const descBasica = 'A Camiseta Básica B.SKW é o item essencial para o dia a dia. Com modelagem reta e clássica, veste de forma equilibrada no corpo, nem tão justa, nem muito folgada.\n\nProduzida em malha premium 100% algodão, oferece toque macio, zero transparência e alta durabilidade. Passa por processo de pré-encolhimento garantindo caimento exato após as lavagens.';
const tecBasica = '• Gola canelada 2x1 com 2.5cm de altura\n• Reforço ombro a ombro\n• Etiqueta interna estampada (não incomoda)\n• Modelagem regular fit';

const descOversized = 'A Camiseta Oversized B.SKW traz a autêntica estética do streetwear contemporâneo. Com ombros deslocados (drop shoulder), mangas amplas e caimento estruturado.\n\nDesenvolvida em malha heavyweight de alta gramatura, proporciona peso ideal que arma no corpo sem marcar.';
const tecOversized = '• Gola canelada grossa de 3cm\n• Ombros deslocados (Drop Shoulder)\n• Malha pesada (Heavyweight)\n• Modelagem Oversized autêntica';

const descBoxy = 'A modelagem Boxy entrega uma silhueta quadrada moderna. Possui comprimento levemente encurtado na altura do cinto e largura ampliada no tórax, ideal para composições de alto nível.';
const tecBoxy = '• Comprimento boxy (altura do quadril)\n• Largura estruturada\n• Gola canelada de 2.8cm\n• Costuras reforçadas';

const descSuedine = 'Toque aveludado incomparável. A linha Suedine B.SKW une o visual minimalista de luxo ao conforto extremo, com caimento mais encorpado e maciez superior.';
const tecSuedine = '• Malha Suedine penteada (toque peletizado)\n• Gola estruturada em ribana\n• Acabamento premium anti-pilling\n• Modelagem confortável';

const descPoliamida = 'Desenvolvida para alta performance e rotina intensa. O tecido tecnológico oferece toque gelado, rápida evaporação de suor e não retém odores, perfeita para treinos ou dias quentes.';
const tecPoliamida = '• Tecnologia Ice Tech (toque frio)\n• Proteção solar UV50+\n• Secagem ultrarrápida e anti-odor\n• Não precisa passar';

const lavagemAlgodao = '• Lavar à máquina com água fria\n• Não utilizar alvejante\n• Secar à sombra em local arejado\n• Não utilizar secadora\n• Passar pelo avesso em temperatura média';
const lavagemSintetico = '• Lavar à mão ou no ciclo delicado com água fria\n• Não usar amaciante para preservar a respirabilidade\n• Não passar a ferro\n• Secar à sombra';

export const produtosIniciais: Produto[] = [
  // ================= LINHA BÁSICA =================
  {
    id: '1',
    codigo: 'BSKW-BAS-PRT-01',
    nome: 'Camiseta Básica B.SKW Preto',
    categoria: 'camiseta-basica',
    preco: 87.90, precoAntigo: 129.90, precoOriginal: 129.90, precoKit2: 75.90, precoKit3: 63.90, precoKit: 75.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '200 G/M² FIO 26.1 • 100% ALGODÃO',
    tags: ['20% OFF'], tag: '20% OFF', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descBasica, informacoesTecnicas: tecBasica, lavagem: lavagemAlgodao
  },
  {
    id: '2',
    codigo: 'BSKW-BAS-BCO-01',
    nome: 'Camiseta Básica B.SKW Branco',
    categoria: 'camiseta-basica',
    preco: 87.90, precoAntigo: 129.90, precoOriginal: 129.90, precoKit2: 75.90, precoKit3: 63.90, precoKit: 75.90,
    cor: 'Branco', hex: '#FFFFFF',
    especificacaoTecnica: '200 G/M² FIO 26.1 • 100% ALGODÃO',
    tags: ['20% OFF'], tag: '20% OFF', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descBasica, informacoesTecnicas: tecBasica, lavagem: lavagemAlgodao
  },
  {
    id: '3',
    codigo: 'BSKW-BAS-OFF-01',
    nome: 'Camiseta Básica B.SKW Off-White',
    categoria: 'camiseta-basica',
    preco: 87.90, precoAntigo: 129.90, precoOriginal: 129.90, precoKit2: 75.90, precoKit3: 63.90, precoKit: 75.90,
    cor: 'Off-White', hex: '#F5F5F0',
    especificacaoTecnica: '200 G/M² FIO 26.1 • 100% ALGODÃO',
    tags: ['ESSENCIAL'], tag: 'ESSENCIAL', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descBasica, informacoesTecnicas: tecBasica, lavagem: lavagemAlgodao
  },

  // ================= LINHA OVERSIZED =================
  {
    id: '4',
    codigo: 'BSKW-OVS-PRT-01',
    nome: 'Camiseta Oversized B.SKW Preto',
    categoria: 'camiseta-oversized',
    preco: 111.90, precoAntigo: 169.90, precoOriginal: 169.90, precoKit2: 95.90, precoKit3: 85.90, precoKit: 95.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '240 G/M² FIO 20.1 • 100% ALGODÃO HEAVYWEIGHT',
    tags: ['20% OFF'], tag: '20% OFF', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descOversized, informacoesTecnicas: tecOversized, lavagem: lavagemAlgodao
  },
  {
    id: '5',
    codigo: 'BSKW-OVS-OFF-01',
    nome: 'Camiseta Oversized B.SKW Off-White',
    categoria: 'camiseta-oversized',
    preco: 111.90, precoAntigo: 169.90, precoOriginal: 169.90, precoKit2: 95.90, precoKit3: 85.90, precoKit: 95.90,
    cor: 'Off-White', hex: '#F5F5F0',
    especificacaoTecnica: '240 G/M² FIO 20.1 • 100% ALGODÃO HEAVYWEIGHT',
    tags: ['20% OFF'], tag: '20% OFF', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descOversized, informacoesTecnicas: tecOversized, lavagem: lavagemAlgodao
  },
  {
    id: '6',
    codigo: 'BSKW-OVS-MRM-01',
    nome: 'Camiseta Oversized B.SKW Marrom',
    categoria: 'camiseta-oversized',
    preco: 111.90, precoAntigo: 169.90, precoOriginal: 169.90, precoKit2: 95.90, precoKit3: 85.90, precoKit: 95.90,
    cor: 'Marrom', hex: '#4A3728',
    especificacaoTecnica: '240 G/M² FIO 20.1 • 100% ALGODÃO HEAVYWEIGHT',
    tags: ['NOVO'], tag: 'NOVO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descOversized, informacoesTecnicas: tecOversized, lavagem: lavagemAlgodao
  },

  // ================= LINHA BOXY =================
  {
    id: '7',
    codigo: 'BSKW-BOX-ARE-01',
    nome: 'Camiseta Boxy B.SKW Areia',
    categoria: 'camiseta-boxy',
    preco: 105.90, precoAntigo: 0, precoOriginal: 0, precoKit2: 95.90, precoKit3: 85.90, precoKit: 95.90,
    cor: 'Areia', hex: '#E3DAC9',
    especificacaoTecnica: '220 G/M² FIO 24.1 • 100% ALGODÃO',
    tags: ['NOVO'], tag: 'NOVO', tamanhos: tamanhosPadrao, promocao: false,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descBoxy, informacoesTecnicas: tecBoxy, lavagem: lavagemAlgodao
  },
  {
    id: '8',
    codigo: 'BSKW-BOX-PRT-01',
    nome: 'Camiseta Boxy B.SKW Preto',
    categoria: 'camiseta-boxy',
    preco: 105.90, precoAntigo: 0, precoOriginal: 0, precoKit2: 95.90, precoKit3: 85.90, precoKit: 95.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '220 G/M² FIO 24.1 • 100% ALGODÃO',
    tags: ['NOVO'], tag: 'NOVO', tamanhos: tamanhosPadrao, promocao: false,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descBoxy, informacoesTecnicas: tecBoxy, lavagem: lavagemAlgodao
  },

  // ================= LINHA SUEDINE =================
  {
    id: '9',
    codigo: 'BSKW-SUE-PRT-01',
    nome: 'Camiseta Suedine B.SKW Preto',
    categoria: 'camiseta-suedine',
    preco: 119.90, precoAntigo: 149.90, precoOriginal: 149.90, precoKit2: 105.90, precoKit3: 95.90, precoKit: 105.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '230 G/M² SUEDINE PENTEADO • 100% ALGODÃO',
    tags: ['PREMIUM'], tag: 'PREMIUM', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descSuedine, informacoesTecnicas: tecSuedine, lavagem: lavagemAlgodao
  },
  {
    id: '10',
    codigo: 'BSKW-SUE-VML-01',
    nome: 'Camiseta Suedine B.SKW Verde Militar',
    categoria: 'camiseta-suedine',
    preco: 119.90, precoAntigo: 149.90, precoOriginal: 149.90, precoKit2: 105.90, precoKit3: 95.90, precoKit: 105.90,
    cor: 'Verde Militar', hex: '#4B5320',
    especificacaoTecnica: '230 G/M² SUEDINE PENTEADO • 100% ALGODÃO',
    tags: ['PREMIUM'], tag: 'PREMIUM', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descSuedine, informacoesTecnicas: tecSuedine, lavagem: lavagemAlgodao
  },

  // ================= LINHA POLIAMIDA =================
  {
    id: '11',
    codigo: 'BSKW-POL-BCO-01',
    nome: 'Camiseta Poliamida B.SKW Branco',
    categoria: 'camiseta-poliamida',
    preco: 79.90, precoAntigo: 99.90, precoOriginal: 99.90, precoKit2: 69.90, precoKit3: 59.90, precoKit: 69.90,
    cor: 'Branco', hex: '#FFFFFF',
    especificacaoTecnica: '90% POLIAMIDA • 10% ELASTANO • ICE TECH',
    tags: ['TREINO'], tag: 'TREINO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descPoliamida, informacoesTecnicas: tecPoliamida, lavagem: lavagemSintetico
  },
  {
    id: '12',
    codigo: 'BSKW-POL-PRT-01',
    nome: 'Camiseta Poliamida B.SKW Preto',
    categoria: 'camiseta-poliamida',
    preco: 79.90, precoAntigo: 99.90, precoOriginal: 99.90, precoKit2: 69.90, precoKit3: 59.90, precoKit: 69.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '90% POLIAMIDA • 10% ELASTANO • ICE TECH',
    tags: ['TREINO'], tag: 'TREINO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: descPoliamida, informacoesTecnicas: tecPoliamida, lavagem: lavagemSintetico
  },

  // ================= MANGA LONGA =================
  {
    id: '13',
    codigo: 'BSKW-MLG-PRT-01',
    nome: 'Camiseta Manga Longa B.SKW Preto',
    categoria: 'manga-longa',
    preco: 119.90, precoAntigo: 149.90, precoOriginal: 149.90, precoKit2: 104.90, precoKit3: 94.90, precoKit: 104.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '210 G/M² FIO 26.1 • 100% ALGODÃO PUNHO CANELADO',
    tags: ['INVERNO'], tag: 'INVERNO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'Proteção e estilo urbano. A Manga Longa B.SKW possui punhos canelados firmes e caimento estruturado para meia-estação ou sobreposições.',
    informacoesTecnicas: '• Punhos em ribana canelada\n• Gola reforçada de 2.5cm\n• Pré-encolhida',
    lavagem: lavagemAlgodao
  },

  // ================= MOLETOM =================
  {
    id: '14',
    codigo: 'BSKW-MOL-PRT-01',
    nome: 'Moletom Canguru Heavy B.SKW Preto',
    categoria: 'moletom',
    preco: 219.90, precoAntigo: 279.90, precoOriginal: 279.90, precoKit2: 199.90, precoKit3: 184.90, precoKit: 199.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '350 G/M² 3 CABOS PELUCIADO • 50% ALGODÃO 50% POLIÉSTER',
    tags: ['HEAVY'], tag: 'HEAVY', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'Construído em moletom 3 cabos de altíssima gramatura, peluciado internamente. Capuz duplo estruturado sem cordão aparente, seguindo a estética internacional.',
    informacoesTecnicas: '• Moletom 3 cabos 350g/m²\n• Capuz com forro duplo\n• Bolso canguru embutido\n• Punhos e barra em ribana firme',
    lavagem: lavagemAlgodao
  },

  // ================= REGATA OVERSIZED =================
  {
    id: '15',
    codigo: 'BSKW-REG-PRT-01',
    nome: 'Regata Oversized B.SKW Preto',
    categoria: 'regata-oversized',
    preco: 84.90, precoAntigo: 109.90, precoOriginal: 109.90, precoKit2: 74.90, precoKit3: 64.90, precoKit: 74.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '220 G/M² FIO 24.1 • 100% ALGODÃO',
    tags: ['TREINO'], tag: 'TREINO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'Corte amplo nos ombros e cava estrategicamente desenhada para valorizar o shape sem expor em excesso. Ideal para treinos pesados e lazer.',
    informacoesTecnicas: '• Ombros largos estilo Machão/Oversized\n• Gola canelada grossa\n• Costura reforçada nas cavas',
    lavagem: lavagemAlgodao
  },

  // ================= SHORTS =================
  {
    id: '16',
    codigo: 'BSKW-SHT-PRT-01',
    nome: 'Shorts Moletom B.SKW Preto',
    categoria: 'shorts',
    preco: 129.90, precoAntigo: 159.90, precoOriginal: 159.90, precoKit2: 114.90, precoKit3: 99.90, precoKit: 114.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '300 G/M² MOLETOM CARECA (SEM FELPA) • 100% ALGODÃO',
    tags: ['ESSENCIAL'], tag: 'ESSENCIAL', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'Modelagem acima do joelho com caimento encorpado. Bolsos laterais profundos e bolso traseiro funcional.',
    informacoesTecnicas: '• Cós elástico de alta resistência\n• Cordão interno com ponteira emborrachada\n• Comprimento acima do joelho',
    lavagem: lavagemAlgodao
  },

  // ================= FEMININO =================
  {
    id: '17',
    codigo: 'BSKW-FEM-PRT-01',
    nome: 'Baby Look Cropped B.SKW Preto',
    categoria: 'feminino',
    preco: 79.90, precoAntigo: 99.90, precoOriginal: 99.90, precoKit2: 69.90, precoKit3: 59.90, precoKit: 69.90,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '210 G/M² RIBANA CANELADA • 96% ALGODÃO 4% ELASTANO',
    tags: ['FEMININO'], tag: 'FEMININO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'Modelagem anatómica que se ajusta ao corpo com extremo conforto e zero transparência.',
    informacoesTecnicas: '• Malha canelada com elastano\n• Toque macio e ajustável\n• Gola redonda clássica',
    lavagem: lavagemAlgodao
  },

  // ================= KITS =================
  {
    id: '18',
    codigo: 'BSKW-KIT-BAS-03',
    nome: 'Kit 3 Camisetas Básicas B.SKW (Preto / Branco / Off-White)',
    categoria: 'kits',
    preco: 191.70, precoAntigo: 263.70, precoOriginal: 263.70, precoKit2: 191.70, precoKit3: 191.70, precoKit: 191.70,
    cor: 'Preto', hex: '#18181b',
    especificacaoTecnica: '200 G/M² FIO 26.1 • 100% ALGODÃO',
    tags: ['MAIS VENDIDO'], tag: 'MAIS VENDIDO', tamanhos: tamanhosPadrao, promocao: true,
    imagens: ['/files/banner-meio.jpg'], estoque: { ...estoqueZerado },
    descricao: 'O combo definitivo para renovar o seu guarda-roupa com as cores mais versáteis da marca. Leve 3 peças essenciais com desconto máximo.',
    informacoesTecnicas: tecBasica,
    lavagem: lavagemAlgodao
  }
];

export let produtos: Produto[] = [...produtosIniciais];

const STORAGE_KEY = 'bskw_catalogo_v2';

export const carregarProdutosStorage = (): Produto[] => {
  if (typeof window === 'undefined') return produtos;
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (salvo) {
    try {
      produtos = JSON.parse(salvo);
      return produtos;
    } catch (e) {
      console.error(e);
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtosIniciais));
  }
  return produtos;
};

export const atualizarProdutoStorage = (produtoEditado: Produto) => {
  const lista = carregarProdutosStorage();
  const idx = lista.findIndex(p => p.id === produtoEditado.id || p.codigo.replace(/-/g, '').toUpperCase() === produtoEditado.codigo.replace(/-/g, '').toUpperCase());
  
  const produtoSincronizado: Produto = {
    ...produtoEditado,
    precoOriginal: produtoEditado.precoAntigo,
    precoKit: produtoEditado.precoKit2,
    tag: produtoEditado.tags[0] || '',
    promocao: produtoEditado.precoAntigo > produtoEditado.preco
  };

  if (idx >= 0) {
    lista[idx] = produtoSincronizado;
  } else {
    lista.push(produtoSincronizado);
  }
  produtos = [...lista];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  }
};

export const excluirProdutoStorage = (id: string) => {
  const lista = carregarProdutosStorage().filter(p => p.id !== id);
  produtos = [...lista];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  }
  return produtos;
};

export const resetarCatalogoPadrao = () => {
  produtos = [...produtosIniciais];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtosIniciais));
  }
  return produtos;
};

export const getProdutoPorId = (id: string) => {
  const lista = carregarProdutosStorage();
  const limpo = id.replace(/-/g, '').toUpperCase();
  return lista.find(p => p.id === id || p.codigo.replace(/-/g, '').toUpperCase() === limpo);
};

export const getProdutosPorCategoria = (categoria: string) => {
  const lista = carregarProdutosStorage();
  return lista.filter(p => p.categoria === categoria);
};
