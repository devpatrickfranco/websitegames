import os
import json
from flask import Blueprint, render_template, request, send_from_directory, current_app

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/category/<category_name>')
def category(category_name):
    # Diretório base onde os jogos estão armazenados
    games_dir = os.path.join(current_app.root_path, 'static', 'games', category_name)
    
    # Listar os jogos (subdiretórios) na categoria
    if os.path.exists(games_dir):
        games = [d for d in os.listdir(games_dir) if os.path.isdir(os.path.join(games_dir, d))]
    else:
        games = []

    return render_template('category.html', category_name=category_name, games=games)

@main.route('/game/<category_name>/<game_name>')
def game(category_name, game_name):
    # Diretório base do jogo
    game_dir = os.path.join(current_app.root_path, 'static', 'games', category_name, game_name)
    
    # Carregar a descrição do jogo
    description_file = os.path.join(game_dir, 'description.json')
    if os.path.exists(description_file):
        with open(description_file, 'r', encoding='utf-8') as f:
            game_info = json.load(f)
    else:
        game_info = {
            "description_game": "Descrição não disponível", 
            "description_SEO": "", 
            "keywords": "", 
            "title": "", 
            "url": "", 
            "cover": ""
        }

    return render_template('game.html', category_name=category_name, game_name=game_name, game_info=game_info)

@main.route('/static/games/<category_name>/<game_name>/<path:filename>')
def game_files(category_name, game_name, filename):
    return send_from_directory(f'static/games/{category_name}/{game_name}', filename)

@main.route('/search')
def search():
    query = request.args.get('q', '').lower()
    results = []
    
    games_base_dir = os.path.join(current_app.root_path, 'static', 'games')
    
    if os.path.exists(games_base_dir):
        categories = [d for d in os.listdir(games_base_dir) if os.path.isdir(os.path.join(games_base_dir, d))]
        for category in categories:
            if query in category.lower():
                results.append(category)
    
    return render_template('search_results.html', results=results)
