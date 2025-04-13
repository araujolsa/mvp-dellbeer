import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  const carregarPedidos = () => {
    fetch('http://localhost:5000/orders')
      .then(res => res.json())
      .then(data => setPedidos(data));
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const cancelarPedido = async (id) => {
    await fetch(`http://localhost:5000/orders/${id}`, { method: 'DELETE' });
    carregarPedidos();
  };

  const finalizarCompra = async () => {
    for (const pedido of pedidos) {
      await fetch(`http://localhost:5000/orders/${pedido.id}`, { method: 'DELETE' });
    }

    alert('✅ Compra finalizada com sucesso!');
    navigate('/');
  };

  const calcularTotal = () => {
    const precos = {
      'Cerveja IPA': 12.9,
      'Cerveja Pilsen': 9.9,
      'Cerveja Weiss': 14.5,
      'Cerveja Red Ale': 13.8,
    };

    return pedidos.reduce((total, pedido) => {
      const preco = precos[pedido.produto] || 0;
      return total + (preco * pedido.quantidade);
    }, 0).toFixed(2);
  };

  return (
    <div className="checkout-container">
      <h2>🛒 Finalizar Pedido</h2>

      {pedidos.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="lista-pedidos">
            {pedidos.map(p => (
              <li key={p.id}>
                <span>{p.quantidade}x {p.produto}</span>
                <button className="btn-cancelar" onClick={() => cancelarPedido(p.id)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <p className="total">Total: R$ {calcularTotal()}</p>
          <button className="btn finalizar" onClick={finalizarCompra}>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
