"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Truck, Home, ShieldCheck, CreditCard, Package, Star } from 'lucide-react';
import { getProdutoPorId, produtos, Tamanho } from '@/data/produtos';
import { useCart } from '@/contexts/CartContext';
import { useSession } from 'next-auth/react';
import QuickBuyCard from '@/components/QuickBuyCard';

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const produto = getProdutoPorId(id);
  const { addToCart, setIsCartOpen } = useCart();
  const { data: session } = useSession();

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<Tamanho | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [abaAtiva, setAbaAtiva] = useState<'descricao' | 'tecnica' | 'lavagem'>('descricao');
  const [showTabelaMedidas, setShowTabelaMedidas] = useState(false);
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);

  useEffect(() => { setQuantidade(1); setTamanhoSelecionado(null); }, [id]);

  if (!produto) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zinc-50">
        <h1 className="font-anton text-4xl mb-4 uppercase">Produto não encontrado</h1>
        <button onClick={() => router.push('/')} className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#F59E0B] hover:text-black transition-colors">Voltar à Loja</button>
      </div>
    );
  }

  const grupoDeCores = produtos.filter(p => p.categoria === produto.categoria && p.precoOriginal === produto.precoOriginal && p.nome.includes(produto.nome.split(' ')[0]));
  const relacionadas = produtos.filter(p => p.categoria === produto.categoria && p.id !== produto.id).slice(0, 4);

  const p1 = produto.preco;
  const p3 = produto.precoKit || produto.preco;
  const p2 = Math.floor(p1 - ((p1 - p3) / 2)) + 0.90; 
  
  const precoAtual = quantidade >= 3 ? p3 : quantidade === 2 ? p2 : p1;
  const valorTotal = precoAtual * quantidade;
  
  const maxDisponivel = tamanhoSelecionado ? produto.estoque[tamanhoSelecionado] : Math.max(...Object.values(produto.estoque));
  const isProntoParaComprar = tamanhoSelecionado !== null;
  const isProdutoEsgotado = Object.values(produto.estoque).every(qtd => qtd === 0);

  const isPoliamida = produto.categoria === 'camiseta-poliamida';
  const isBabyLook = produto.nome.includes('Baby Look');
  const isCroppedSuedine = produto.nome.includes('Cropped');
  const isMoletomOversized = produto.nome.includes('Moletom Oversized');
  const isMoletomCanguruOuCalca = produto.nome.includes('Canguru') || produto.nome.includes('Calça');
  const isRegata = produto.categoria === 'regata-oversized';
  const isShorts = produto.categoria === 'shorts';
  
  let composicaoTexto = '100% Algodão';
  if (isPoliamida) composicaoTexto = '100% Poliamida';
  if (isBabyLook) composicaoTexto = '96% Algodão, 4% Elastano';
  if (isMoletomOversized) composicaoTexto = '75% Algodão, 25% Poliéster';
  if (isMoletomCanguruOuCalca) composicaoTexto = '50% Algodão, 50% Poliéster';
  if (isShorts) composicaoTexto = '83% Poliamida, 17% Elastano';

  let descricaoTexto = null;

  if (produto.categoria === 'camiseta-boxy') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> traz a modelagem mais desejada do streetwear atual. O corte "Boxy" (quadrado) tem a largura ampla e os ombros caídos de uma peça oversized, mas com o comprimento mais curto, terminando na linha da cintura.</p>
        <p>Esse design alonga a silhueta e valoriza o caimento das calças e bermudas. Uma peça moderna, com caimento estruturado e pensada para criar proporções incríveis no seu visual.</p>
        <p>Nossas peças passam por um rigoroso processo de pré-encolhimento (Zero Encolhimento), garantindo que o tamanho se mantenha exato após as lavagens.</p>
      </>
    );
  } else if (produto.categoria === 'camiseta-oversized') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> entrega o clássico conforto do streetwear. Sua modelagem é intencionalmente mais ampla, com ombros caídos e mangas alongadas, proporcionando um visual despojado e muito confortável.</p>
        <p>Feita com malha 100% algodão de alta gramatura, a peça tem um caimento mais pesado, firme e que não marca o corpo.</p>
        <p>Nossas peças passam por um processo de pré-encolhimento (Zero Encolhimento), o que garante que a modelagem permaneça intacta lavagem após lavagem.</p>
      </>
    );
  } else if (produto.categoria === 'camiseta-suedine') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> representa o nível máximo de qualidade em peças lisas. O tecido Suedine possui uma trama mais fechada e um acabamento especial que proporciona um toque extremamente macio e luxuoso.</p>
        <p>Com gramatura super alta (250g/m²), ela oferece um caimento impecável, mais denso e totalmente livre de transparência. É a escolha certa para quem exige um produto de categoria premium.</p>
        <p>Passa por lavagem e pré-encolhimento (Zero Encolhimento), garantindo estabilidade e durabilidade excepcionais.</p>
      </>
    );
  } else if (produto.categoria === 'camiseta-poliamida') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> foi desenvolvida para alta performance e praticidade. Diferente do algodão, o tecido 100% poliamida é extremamente leve e possui um toque frio na pele.</p>
        <p>Ela absorve o suor rapidamente, ajuda no controle de odores e seca em minutos. Além disso, é uma peça "easy care": não amassa no corpo e dispensa completamente o uso de ferro de passar.</p>
        <p>Perfeita para garantir conforto durante treinos intensos ou leveza na correria do dia a dia.</p>
      </>
    );
  } else if (produto.categoria === 'manga-longa') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> é a peça ideal para a meia-estação e dias mais frios. Mantendo a modelagem confortável que é assinatura da marca, ela traz mangas ajustadas na medida certa e um visual diferenciado com acabamento vintage/estonado.</p>
        <p>Uma peça versátil que funciona perfeitamente sozinha ou como base para sobreposições com jaquetas e coletes, garantindo um visual limpo e bem construído.</p>
        <p>Conta com o processo de pré-encolhimento (Zero Encolhimento) para manter as medidas exatas após a lavagem.</p>
      </>
    );
  } else if (produto.categoria === 'regata-oversized') {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> é a escolha certa para os dias quentes. Com cavas amplas e modelagem oversized (mais larga e comprida), ela garante máxima ventilação e liberdade total de movimentos.</p>
        <p>Produzida em malha premium 100% algodão, mantém a estrutura da peça sem perder a leveza e o frescor essenciais para o verão ou para treinos.</p>
        <p>Passa por um rigoroso processo de pré-encolhimento (Zero Encolhimento).</p>
      </>
    );
  } else if (produto.categoria === 'shorts') {
    descricaoTexto = (
      <>
        <p>O <strong>{produto.nome}</strong> foi criado para oferecer versatilidade e conforto excepcional em qualquer ocasião.</p>
        <p>O tecido leve e flexível de poliamida com elastano acompanha os seus movimentos perfeitamente, seja para uso casual ou para atividades físicas.</p>
        <p>Conta com cós elástico, forro interno para maior segurança, dois bolsos frontais práticos e um bolso traseiro com zíper invisível, mantendo os seus pertences protegidos.</p>
      </>
    );
  } else if (produto.categoria === 'feminino') {
    if (isBabyLook) {
      descricaoTexto = (
        <>
          <p>A <strong>{produto.nome}</strong> foi desenhada para entregar o caimento perfeito e ajustado ao corpo feminino.</p>
          <p>A presença de 4% de elastano na composição garante flexibilidade, permitindo que a peça se molde às curvas com extremo conforto e sem restringir os movimentos.</p>
          <p>Produzida com algodão macio e espesso o suficiente para garantir total conforto e zero transparência no uso diário.</p>
        </>
      );
    } else {
      descricaoTexto = (
        <>
          <p>O <strong>{produto.nome}</strong> une o conforto streetwear com um design moderno.</p>
          <p>A modelagem cropped (mais curta) combinada com a largura oversized oferece um visual despojado e estiloso. O tecido Suedine de altíssima gramatura garante um caimento firme, pesado e toque aveludado.</p>
          <p>Peça com pré-encolhimento (Zero Encolhimento) para preservar o formato original e não subir mais na cintura após a lavagem.</p>
        </>
      );
    }
  } else if (produto.categoria === 'moletom') {
    if (isMoletomOversized) {
      descricaoTexto = (
        <>
          <p>O <strong>{produto.nome}</strong> é a peça coringa de meia-estação. Construído em moletom careca (sem felpa interna), ele oferece a estrutura e o peso de um moletom clássico sem esquentar excessivamente.</p>
          <p>Com modelagem oversized e ombros caídos, é perfeito para o conforto urbano e excelente para criar camadas (sobreposições) com jaquetas ou camisetas por baixo.</p>
        </>
      );
    } else {
      descricaoTexto = (
        <>
          <p>A linha <strong>{produto.nome}</strong> foi feita para garantir máximo aquecimento e conforto nos dias mais frios.</p>
          <p>Produzida com tecido de altíssima gramatura (320g/m²) e interior flanelado (com felpa macia), ela retém o calor do corpo com muita eficiência e entrega um toque extremamente confortável na pele.</p>
          <p>A modelagem é ampla, garantindo total liberdade de movimentos, e conta com acabamentos reforçados para garantir alta durabilidade.</p>
        </>
      );
    }
  } else {
    descricaoTexto = (
      <>
        <p>A <strong>{produto.nome}</strong> é o item essencial que não pode faltar no seu guarda-roupa. Com uma modelagem reta e clássica, ela veste de forma equilibrada no corpo — nem tão justa, nem muito folgada.</p>
        <p>Produzida em malha premium 100% algodão, oferece toque macio, zero transparência e alta durabilidade para o uso intenso do dia a dia.</p>
        <p>Nossas peças passam por um processo de pré-encolhimento (Zero Encolhimento), garantindo que o tamanho se mantenha exato e não perca o caimento após as lavagens.</p>
      </>
    );
  }

  const handleSetQuantidade = (novaQtd: number) => {
    if (novaQtd < 1) return;
    if (tamanhoSelecionado && novaQtd > maxDisponivel) {
       alert(`Temos apenas ${maxDisponivel} unidades do tamanho ${tamanhoSelecionado} em estoque no momento!`);
       setQuantidade(maxDisponivel);
    } else {
       setQuantidade(novaQtd);
    }
  };

  const handleSelectTamanho = (tam: Tamanho) => {
    setTamanhoSelecionado(tam);
    if (quantidade > produto.estoque[tam]) {
       setQuantidade(Math.max(1, produto.estoque[tam]));
    }
  };

  const handleComprar = () => {
    if (!session) { alert('Faça login para adicionar à sua armadura.'); router.push('/login'); return; }
    if (isProntoParaComprar) {
      addToCart({ titulo: produto.nome, preco: p1, cor: produto.cor, tamanho: tamanhoSelecionado, quantidade });
      setIsCartOpen(true);
    }
  };

  const calcularFrete = () => {
    if (cep.replace(/\D/g, '').length !== 8) { alert('CEP inválido'); return; }
    setFrete(15.90);
  };

  return (
    <main className="min-h-screen bg-white text-black pb-24">
      {showTabelaMedidas && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up" onClick={() => setShowTabelaMedidas(false)}>
          <div className="bg-white max-w-2xl w-full rounded-md p-2 relative shadow-2xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowTabelaMedidas(false)} className="absolute top-2 right-4 text-zinc-500 hover:text-black font-bold text-3xl z-10">&times;</button>
            <div className="w-full aspect-[4/3] bg-zinc-100 flex items-center justify-center rounded-sm">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-center px-4">Imagem da Tabela de Medidas<br/>(Aguardando Foto)</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 md:pt-8 mt-4 md:mt-8">
        
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-zinc-500 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
          <Link href="/" className="hover:text-[#F59E0B] transition-colors"><Home className="w-3 h-3" /></Link>
          <span>/</span>
          <Link href={`/categoria/${produto.categoria}`} className="hover:text-[#F59E0B] transition-colors capitalize">{produto.categoria.replace('-', ' ')}</Link>
          <span>/</span>
          <span className="text-black font-medium">{produto.nome}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="w-full aspect-[4/5] bg-zinc-100 rounded-md flex items-center justify-center relative border border-zinc-200">
               <span className="text-zinc-400 font-medium text-center px-4">Imagem {produto.nome} <br/>(Aguardando Foto)</span>
               <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col items-end gap-1.5 z-10">
                 {isProdutoEsgotado && <span className="bg-zinc-900 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-sm uppercase tracking-widest shadow-md">Esgotado</span>}
                 {produto.promocao ? (
                   <span className="bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-sm uppercase tracking-widest shadow-md flex items-center gap-1">🔥 20% OFF</span>
                 ) : produto.tag && !isProdutoEsgotado && (
                   <span className="bg-[#F59E0B] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-sm uppercase tracking-widest shadow-md">{produto.tag}</span>
                 )}
               </div>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square bg-zinc-100 rounded-md flex items-center justify-center border border-zinc-200 cursor-pointer hover:border-black transition-colors">
                   <span className="text-zinc-400 text-[10px] md:text-xs">Foto {i}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="flex flex-col pt-2">
            <h1 className="text-xl md:text-3xl font-outfit font-medium text-zinc-900 mb-2 md:mb-3 leading-tight">{produto.nome}</h1>
            
            <a href="#avaliacoes" className="flex items-center gap-2 mb-4 md:mb-6 group cursor-pointer">
               <div className="flex text-zinc-300 group-hover:text-[#F59E0B] transition-colors">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}</div>
               <span className="text-xs md:text-sm text-zinc-500 group-hover:text-black transition-colors underline">(0) Avaliações</span>
            </a>

            <div className="mb-4">
               <div className="flex items-center gap-3">
                 {produto.promocao && <span className="text-base md:text-lg text-zinc-400 line-through">R$ {produto.precoOriginal.toFixed(2).replace('.', ',')}</span>}
                 <span className="text-2xl md:text-3xl font-bold text-black block">R$ {precoAtual.toFixed(2).replace('.', ',')}</span>
               </div>
               <span className="text-xs md:text-sm text-zinc-500 mt-1 block">em até <strong className="text-black">3x de R$ {(precoAtual / 3).toFixed(2).replace('.', ',')}</strong> sem juros</span>
            </div>

            <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-600 mb-4 pb-4">
               <span>🚚</span>
               <span>Compre e receba <strong className="text-[#F59E0B]">FRETE GRÁTIS</strong> em compras acima de R$ 299</span>
            </div>

            <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-600 mb-6 md:mb-8 border-b border-zinc-100 pb-6 md:pb-8 flex-wrap">
              <span>{produto.tag}</span><span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-400"></span><span>{composicaoTexto}</span>
            </div>

            <div className="mb-6 md:mb-8">
              <span className="text-sm md:text-base text-zinc-800 mb-3 block">Quantidade</span>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <button onClick={() => handleSetQuantidade(1)} className={`flex flex-col items-center justify-center py-2 md:py-3 px-1 md:px-2 rounded-md border-2 transition-all ${quantidade === 1 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-xs md:text-sm">1 un</span><span className={`text-[10px] md:text-xs mt-0.5 md:mt-1 ${quantidade === 1 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p1.toFixed(2).replace('.', ',')}/un</span>
                </button>
                <button onClick={() => handleSetQuantidade(2)} className={`flex flex-col items-center justify-center py-2 md:py-3 px-1 md:px-2 rounded-md border-2 transition-all ${quantidade === 2 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-xs md:text-sm">Kit c/ 2</span><span className={`text-[10px] md:text-xs mt-0.5 md:mt-1 ${quantidade === 2 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p2.toFixed(2).replace('.', ',')}/un</span>
                </button>
                <button onClick={() => handleSetQuantidade(3)} className={`flex flex-col items-center justify-center py-2 md:py-3 px-1 md:px-2 rounded-md border-2 transition-all ${quantidade >= 3 ? 'border-black bg-black text-white' : 'border-zinc-200 bg-white hover:border-black'}`}>
                   <span className="font-bold text-xs md:text-sm">Kit c/ {quantidade >= 3 ? quantidade : '3'}</span><span className={`text-[10px] md:text-xs mt-0.5 md:mt-1 ${quantidade >= 3 ? 'opacity-90' : 'text-zinc-500'}`}>R$ {p3.toFixed(2).replace('.', ',')}/un</span>
                </button>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <span className="text-sm md:text-base text-zinc-800 mb-3 block">Cor: <strong className="font-bold">{produto.cor}</strong></span>
              <div className="flex gap-2.5 md:gap-3 flex-wrap">
                {grupoDeCores.map(p => (
                   <Link key={p.id} href={`/produto/${p.id}`} className={`w-10 h-10 md:w-12 md:h-12 rounded-md border-2 transition-all flex items-center justify-center ${produto.id === p.id ? 'border-black p-0.5' : 'border-transparent hover:border-zinc-300'}`} title={p.cor}>
                      <div className="w-full h-full rounded-sm border border-zinc-200 shadow-sm" style={{ backgroundColor: p.hex }}></div>
                   </Link>
                ))}
              </div>
            </div>

            <div className="mb-8 md:mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm md:text-base text-zinc-800">Tamanho: <span className="font-bold">{tamanhoSelecionado || ''}</span></span>
                <button onClick={() => setShowTabelaMedidas(true)} className="text-[10px] md:text-xs text-zinc-500 underline hover:text-black transition-colors">Tabela de Medidas</button>
              </div>
              <div className="flex gap-1.5 md:gap-2">
                {produto.tamanhos.map((tam) => {
                  const emEstoque = produto.estoque[tam] > 0;
                  return (
                    <button key={tam} onClick={() => emEstoque && handleSelectTamanho(tam)} disabled={!emEstoque} className={`h-10 md:h-12 flex-1 max-w-[60px] flex items-center justify-center text-xs md:text-sm font-bold border rounded-sm transition-all ${!emEstoque ? 'bg-zinc-100 text-zinc-300 border-zinc-200 cursor-not-allowed line-through' : tamanhoSelecionado === tam ? 'bg-black text-white border-black shadow-md' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'}`}>
                      {tam}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
              <div className="flex items-center border border-zinc-300 rounded-sm h-12 md:h-14 bg-white w-full sm:w-32 shrink-0">
                <button onClick={() => handleSetQuantidade(quantidade - 1)} disabled={quantidade <= 1} className="flex-1 sm:px-4 h-full text-zinc-500 hover:text-black transition-colors">-</button>
                <span className="w-10 text-center font-bold text-base md:text-lg">{quantidade}</span>
                <button onClick={() => handleSetQuantidade(quantidade + 1)} className="flex-1 sm:px-4 h-full text-zinc-500 hover:text-black transition-colors">+</button>
              </div>
              <button onClick={handleComprar} disabled={(!isProntoParaComprar || isProdutoEsgotado) && !!session} className={`w-full h-12 md:h-14 flex items-center justify-center gap-2 text-xs md:text-base font-bold uppercase tracking-widest rounded-sm transition-all duration-300 shadow-sm ${!session ? 'bg-zinc-900 text-white hover:bg-black' : isProdutoEsgotado ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' : isProntoParaComprar ? 'bg-[#F59E0B] text-black hover:bg-amber-400' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {!session ? 'Faça Login' : isProdutoEsgotado ? 'Esgotado' : isProntoParaComprar ? `Adicionar - R$ ${valorTotal.toFixed(2).replace('.', ',')}` : 'Selecione o Tamanho'}
              </button>
            </div>

            <div className="bg-zinc-50 p-3 md:p-4 rounded-md border border-zinc-200 mb-8">
              <span className="text-xs md:text-sm font-bold uppercase block mb-2 md:mb-3 text-zinc-700">Calcule o Frete</span>
              <div className="flex gap-2">
                <input type="text" placeholder="Seu CEP" value={cep} onChange={(e) => setCep(e.target.value)} maxLength={9} className="flex-1 border border-zinc-300 px-3 md:px-4 h-10 md:h-12 rounded-sm text-xs md:text-sm outline-none focus:border-black" />
                <button onClick={calcularFrete} className="bg-black text-white px-4 md:px-6 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-zinc-800 transition-colors">Consultar</button>
              </div>
              {frete !== null && <p className="text-green-600 text-xs md:text-sm font-bold mt-2 md:mt-3">Frete Fixo: R$ {frete.toFixed(2).replace('.', ',')}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 bg-zinc-50 p-3 md:p-4 rounded-md border border-zinc-100">
               <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase text-zinc-600"><Package className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" /> Envio Imediato</div>
               <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase text-zinc-600"><CreditCard className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" /> Até 3x Sem Juros</div>
               <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase text-zinc-600"><Truck className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" /> Envio Nacional</div>
               <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold uppercase text-zinc-600"><ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-[#F59E0B]" /> Qualidade Top</div>
            </div>
          </div>
        </div>

        <div className="mb-16 md:mb-20">
          <div className="flex gap-4 md:gap-8 border-b border-zinc-200 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
            <button onClick={() => setAbaAtiva('descricao')} className={`pb-3 md:pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'descricao' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Descrição{abaAtiva === 'descricao' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
            <button onClick={() => setAbaAtiva('tecnica')} className={`pb-3 md:pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'tecnica' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Informações Técnicas{abaAtiva === 'tecnica' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
            <button onClick={() => setAbaAtiva('lavagem')} className={`pb-3 md:pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors relative ${abaAtiva === 'lavagem' ? 'text-black' : 'text-zinc-400 hover:text-black'}`}>Lavagem{abaAtiva === 'lavagem' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}</button>
          </div>
          <div className="text-zinc-600 text-xs md:text-sm leading-relaxed max-w-3xl">
             {abaAtiva === 'descricao' && <div className="space-y-3 md:space-y-4">{descricaoTexto}</div>}
             {abaAtiva === 'tecnica' && (
               <ul className="list-disc pl-4 md:pl-5 space-y-1.5 md:space-y-2">
                 {isShorts ? (
                   <>
                     <li>Fabricado com 83% Poliamida e 17% Elastano.</li>
                     <li>Cós elástico super confortável com modelagem anatômica e forro interno.</li>
                     <li>Dois bolsos frontais e um bolso traseiro com zíper invisível de segurança.</li>
                     <li>Secagem rápida e excelente respirabilidade.</li>
                   </>
                 ) : isPoliamida ? (
                   <>
                     <li>Malha tecnológica 100% Poliamida de alta performance.</li>
                     <li>Gramatura ultra leve de {produto.tag.split(' ')[0]}.</li>
                     <li>Proteção UV e tecnologia Anti-Odor.</li>
                     <li>Secagem rápida e não amassa (Easy Care).</li>
                   </>
                 ) : isBabyLook ? (
                   <>
                     <li>Malha premium 96% Algodão BCI e 4% Elastano.</li>
                     <li>Gramatura encorpada de {produto.tag.split(' ')[0]}g/m².</li>
                     <li>Modelagem justa e extremamente confortável (Fit perfeito).</li>
                   </>
                 ) : isCroppedSuedine ? (
                   <>
                     <li>Malha Suedine luxuosa 100% Algodão com toque aveludado.</li>
                     <li>Fio de altíssima qualidade 40.1 penteado.</li>
                     <li>Gramatura pesada e estruturada ({produto.tag.split(' ')[0]}g/m²).</li>
                   </>
                 ) : isMoletomCanguruOuCalca ? (
                   <>
                     <li>Moletom Premium 50% Algodão e 50% Poliéster.</li>
                     <li>Gramatura Extra Pesada: {produto.tag.split(' ')[0]}g/m².</li>
                     <li>Interior forrado com felpa macia para alto isolamento térmico.</li>
                     {produto.nome.includes('Canguru') && <li>Bolso canguru frontal e capuz forrado com cadarço ajustável.</li>}
                   </>
                 ) : isMoletomOversized ? (
                   <>
                     <li>Moletom Estruturado 75% Algodão e 25% Poliéster.</li>
                     <li>Gramatura Pesada de {produto.tag.split(' ')[0]}g/m².</li>
                     <li>Modelagem sem felpa interna (ideal para meia-estação e sobreposições).</li>
                   </>
                 ) : isRegata ? (
                   <>
                     <li>Malha 100% algodão super macio.</li>
                     <li>Modelagem oversized cavada, ideal para conforto em dias quentes.</li>
                     <li>Tecnologia Zero Encolhimento (Peças pré-encolhidas).</li>
                   </>
                 ) : (
                   <>
                     <li>Malha 100% algodão super macio.</li>
                     <li>Gramatura de {produto.tag.split(' ')[0]}g/m².</li>
                     <li>Tecnologia Zero Encolhimento (Peças lavadas e pré-encolhidas).</li>
                   </>
                 )}
               </ul>
             )}
             {abaAtiva === 'lavagem' && (
               <ul className="list-disc pl-4 md:pl-5 space-y-1.5 md:space-y-2">
                 <li>Lavar à máquina em ciclo delicado com cores semelhantes.</li>
                 <li>Secar à sombra na vertical para preservar a tonalidade original do tecido.</li>
                 {(isPoliamida || isShorts) && <li>Não precisa passar a ferro. Caso sinta necessidade, utilizar temperatura baixíssima.</li>}
                 {(isMoletomOversized || isMoletomCanguruOuCalca) && <li>Para os moletons, recomendamos lavar do avesso e evitar secadora térmica para não danificar as fibras da felpa.</li>}
                 {(!isPoliamida && !isShorts && !isMoletomOversized && !isMoletomCanguruOuCalca) && <li>Passar a ferro em temperatura média (máximo 150°C).</li>}
               </ul>
             )}
          </div>
        </div>

        <section id="avaliacoes" className="border-t border-zinc-200 pt-12 md:pt-16 mt-12 md:mt-16 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-6 md:mb-8 gap-3 md:gap-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase tracking-wide text-zinc-900">Avaliações da Galera</h2>
            <button className="text-[10px] md:text-sm font-bold uppercase tracking-widest underline hover:text-[#F59E0B] transition-colors">Escrever uma avaliação</button>
          </div>
          <div className="bg-zinc-50 border border-zinc-200 rounded-md p-8 md:p-12 text-center flex flex-col items-center justify-center">
            <div className="flex text-zinc-300 mb-3 md:mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 md:w-8 md:h-8 fill-current" />)}
            </div>
            <p className="text-zinc-500 font-medium text-base md:text-lg">Nenhuma avaliação ainda.</p>
            <p className="text-zinc-400 text-xs md:text-sm mt-1">Seja o primeiro a avaliar esta peça!</p>
          </div>
        </section>

        {relacionadas.length > 0 && (
          <section className="border-t border-zinc-200 pt-12 md:pt-16">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-center mb-8 md:mb-12 tracking-wide text-zinc-900">Você também pode gostar...</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relacionadas.map(prod => (
                <QuickBuyCard key={prod.id} tituloGrupo={prod.nome} produtosDoGrupo={[prod]} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
