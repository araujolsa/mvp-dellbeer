import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CarrinhoButton.css';

function CarrinhoButton() {
  const [quantidadeTotal, setQuantidadeTotal] = useState(0);

  const carregarPedidos = () => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => {
        const total = data.reduce((sum, pedido) => sum + pedido.quantidade, 0);
        setQuantidadeTotal(total);
      });
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 2000); // Atualiza a cada 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/checkout" className="btn-carrinho">
      🛒 {quantidadeTotal}
    </Link>
  );
}

export default CarrinhoButton;
