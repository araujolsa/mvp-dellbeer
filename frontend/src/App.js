import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Catalogo from './components/Catalogo';
import Checkout from './pages/Checkout';
import CarrinhoButton from './components/CarrinhoButton';

import bannerBg from './assets/banner-dellbeer.png';
import './App.css';

function App() {
  const comprarProduto = async (produto) => {
    const pedido = {
      produto: produto.nome,
      quantidade: parseInt(produto.quantidade)
    };

    await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    alert(`✅ Pedido de "${pedido.produto}" (x${pedido.quantidade}) enviado com sucesso!`);
  };

  return (
    <Router>
      <div className="App">
        {/* Banner da loja */}
        <header className="top-banner">
          <img src={bannerBg} alt="Banner DellBeer" />
        </header>

        {/* Botão do carrinho fixo abaixo do banner */}
        <div className="barra-superior">
          <CarrinhoButton />
        </div>

        {/* Área principal de rotas */}
        <main className="conteudo">
          <Routes>
            <Route
              path="/"
              element={
                <Catalogo onComprar={comprarProduto} />
              }
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
