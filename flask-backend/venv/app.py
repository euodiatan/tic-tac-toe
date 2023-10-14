from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres@localhost:5500/postgres'
db = SQLAlchemy(app)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    board = db.Column(db.String(9), default="{---------}")
    player1_name = db.Column(db.String(50))
    player2_name = db.Column(db.String(50), default=None)
    status = db.Column(db.String(20), default="In progress")
    current_turn = db.Column(db.String(10), default="Player 1")
    winner = db.Column(db.String(10), default=None)

@app.route('/game', methods=['POST'])
def create_game():
    data = request.get_json()
    player1_name = data.get('player1_name')
    
    if not player1_name:
        return jsonify({"error": "Player1 name is required!"}), 400

    new_game = Game(player1_name=player1_name)
    db.session.add(new_game)
    db.session.commit()

    return jsonify({"message": "Game created!", "game_id": new_game.id}), 201

@app.route('/games/active', methods=['GET'])
def list_active_games():
    active_games = Game.query.filter_by(status="In progress").all()
    games_data = [{"id": game.id, "player1": game.player1_name} for game in active_games]
    return jsonify(games_data)

@app.route('/game/<int:game_id>/join', methods=['POST'])
def join_game(game_id):
    data = request.get_json()
    player2_name = data.get('player2_name')

    game = Game.query.get(game_id)
    if not game or game.player2_name:
        return jsonify({"error": "Game not found or already has two players!"}), 400

    game.player2_name = player2_name
    db.session.commit()
    return jsonify({"message": "Successfully joined the game!"})

@app.route('/game/<int:game_id>/move', methods=['POST'])
def make_move(game_id):
    data = request.get_json()
    position = data.get('position')
    player_name = data.get('player_name')

    game = Game.query.get(game_id)
    if not game:
        return jsonify({"error": "Game not found!"}), 400
    
    # Implement the logic to update the board and check for game status
    # Update game.board, game.status, game.current_turn, game.winner as necessary

    db.session.commit()
    return jsonify({"message": "Move made successfully!"})

@app.route('/game/<int:game_id>/status', methods=['GET'])
def game_status(game_id):
    game = Game.query.get(game_id)
    if not game:
        return jsonify({"error": "Game not found!"}), 400
    
    return jsonify({
        "board": game.board,
        "current_turn": game.current_turn,
        "winner": game.winner
    })

@app.route('/games/past', methods=['GET'])
def list_past_games():
    past_games = Game.query.filter(Game.status != "In progress").all()
    games_data = [{"id": game.id, "player1": game.player1_name, "player2": game.player2_name, "winner": game.winner} for game in past_games]
    return jsonify(games_data)

if __name__ == '__main__':
    app.run(debug=True)
