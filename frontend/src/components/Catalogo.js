import React, { useEffect, useState } from 'react';
import './Catalogo.css';

import imgIPA from '../assets/cerveja-ipa.png';
import imgPilsen from '../assets/cerveja-pilsen.png';
import imgWeiss from '../assets/cerveja-weiss.png';
import imgRedAle from '../assets/cerveja-red-ale.png';

const produtosBase = [
  {
    id: 1,
    nome: 'Cerveja IPA',
    preco: 12.90,
    imagem: imgIPA,
  },
  {
    id: 2,
    nome: 'Cerveja Pilsen',
    preco: 9.90,
    imagem: imgPilsen,
  },
  {
    id: 3,
    nome: 'Cerveja Weiss',
    preco: 14.50,
    imagem: imgWeiss,
  },
  {
    id: 4,
    nome: 'Cerveja Red Ale',
    preco: 13.80,
    imagem: imgRedAle,
  }
];

function Catalogo({ onComprar }) {
  const [quantidades, setQuantidades] = useState(
    produtosBase.reduce((acc, prod) => ({ ...acc, [prod.nome]: 1 }), {})
  );
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = () => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => setPedidos(data));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const alterarQuantidade = (nome, valor) => {
    setQuantidades({
      ...quantidades,
      [nome]: Math.max(1, parseInt(valor) || 1)
    });
  };

  const cancelarPedido = async (produtoNome) => {
    const pedido = pedidos.find(p => p.produto === produtoNome);
    if (!pedido) return;

    await fetch(`http://localhost:5000/orders/${pedido.id}`, {
      method: 'DELETE',
    });

    carregarPedidos();
  };

  return (
    <div className="catalogo-container">
      <h1 className="titulo-loja"><span>Dell</span><strong>Beer</strong> 🍺</h1>
      <h2>Catálogo de Produtos</h2>
      <div className="grid">
        {produtosBase.map(produto => {
          const pedidoExiste = pedidos.some(p => p.produto === produto.nome);
          return (
            <div className="card-produto" key={produto.id}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p className="preco">R$ {produto.preco.toFixed(2)}</p>

              <input
                type="number"
                min="1"
                value={quantidades[produto.nome]}
                onChange={(e) => alterarQuantidade(produto.nome, e.target.value)}
                className="campo-quantidade"
              />

              <button
                onClick={() => {
                  onComprar({ ...produto, quantidade: quantidades[produto.nome] });
                  setTimeout(carregarPedidos, 500); // recarrega pedidos após adicionar
                }}
                className="btn verde"
              >
                Comprar
              </button>

              {pedidoExiste && (
                <button
                  className="btn vermelho"
                  onClick={() => cancelarPedido(produto.nome)}
                >
                  ❌ Cancelar Pedido
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Catalogo;
