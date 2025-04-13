from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite chamadas da interface React (localhost:3000 ou 3001)

# Simulação de banco de dados (em memória)
pedidos = [
    {'id': 1, 'produto': 'Cerveja IPA', 'quantidade': 2},
    {'id': 2, 'produto': 'Cerveja Pilsen', 'quantidade': 1}
]

# Rota raiz com mensagem de boas-vindas
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'mensagem': 'Bem-vindo à API da DellBeer!',
        'endpoints_disponiveis': [
            {'GET': '/orders'},
            {'POST': '/orders'},
            {'PUT': '/orders/<id>'},
            {'DELETE': '/orders/<id>'}
        ]
    })

# GET – Listar pedidos
@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(pedidos)

# POST – Criar novo pedido
@app.route('/orders', methods=['POST'])
def create_order():
    novo_pedido = request.get_json()
    novo_pedido['id'] = len(pedidos) + 1
    pedidos.append(novo_pedido)
    return jsonify(novo_pedido), 201

# PUT – Atualizar pedido existente
@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    for pedido in pedidos:
        if pedido['id'] == order_id:
            dados = request.get_json()
            pedido['produto'] = dados.get('produto', pedido['produto'])
            pedido['quantidade'] = dados.get('quantidade', pedido['quantidade'])
            return jsonify(pedido)
    return jsonify({'erro': 'Pedido não encontrado'}), 404

# DELETE – Remover pedido
@app.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    for pedido in pedidos:
        if pedido['id'] == order_id:
            pedidos.remove(pedido)
            return jsonify({'mensagem': f'Pedido {order_id} removido com sucesso'})
    return jsonify({'erro': 'Pedido não encontrado'}), 404

# Iniciar servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)