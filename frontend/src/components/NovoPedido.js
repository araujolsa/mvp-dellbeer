import React, { useState } from 'react';
import './Pedidos.css';

function NovoPedido({ onPedidoCriado }) {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoPedido = {
      produto,
      quantidade: parseInt(quantidade)
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPedido)
      });

      if (response.ok) {
        const pedidoCriado = await response.json();
        setMensagem('Pedido criado com sucesso!');
        setProduto('');
        setQuantidade(1);
        onPedidoCriado(pedidoCriado);
      } else {
        setMensagem('Erro ao criar pedido.');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="formulario">
      <h2>Adicionar Novo Pedido</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          min={1}
        />
        <button type="submit">Criar Pedido</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default NovoPedido;
