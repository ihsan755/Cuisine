from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import hashlib
import uuid
from datetime import datetime

app = Flask(__name__, static_folder='.')
CORS(app)

DATA_DIR = 'data'
os.makedirs(DATA_DIR, exist_ok=True)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def load_data(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, 'r') as f:
            return json.load(f)
    return []

def save_data(filename, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    users = load_data('users.json')
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    if any(u['email'].lower() == email.lower() for u in users):
        return jsonify({'success': False, 'message': 'Email already exists'}), 400
    
    user = {
        'id': str(uuid.uuid4()),
        'email': email,
        'password': hash_password(password),
        'created_at': datetime.now().isoformat()
    }
    users.append(user)
    save_data('users.json', users)
    return jsonify({'success': True, 'message': 'Registered successfully', 'user': {k: v for k, v in user.items() if k != 'password'}})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    users = load_data('users.json')
    email = data.get('email', '').strip()
    password = data.get('password', '').strip()
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400
    
    user = next((u for u in users if u['email'].lower() == email.lower() and u['password'] == hash_password(password)), None)
    if user:
        return jsonify({'success': True, 'message': 'Logged in successfully', 'user': {k: v for k, v in user.items() if k != 'password'}})
    return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    recipes = load_data('recipes.json')
    return jsonify({'recipes': recipes})

@app.route('/api/recipes', methods=['POST'])
def upload_recipe():
    data = request.json
    recipes = load_data('recipes.json')
    recipe = {
        'id': str(uuid.uuid4()),
        'title': data['title'],
        'description': data['description'],
        'cuisine': data['cuisine'],
        'ingredients': data['ingredients'],
        'prepTime': data['prepTime'],
        'cookTime': data['cookTime'],
        'servings': data['servings'],
        'tags': data['tags'],
        'steps': data['steps'],
        'author': data['author'],
        'date': datetime.now().isoformat(),
        'rating': 0,
        'likes': 0,
        'comments': []
    }
    recipes.append(recipe)
    save_data('recipes.json', recipes)
    return jsonify({'success': True, 'message': 'Recipe uploaded successfully', 'recipe': recipe})

@app.route('/api/recipes/<recipe_id>/rate', methods=['POST'])
def rate_recipe(recipe_id):
    data = request.json
    recipes = load_data('recipes.json')
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    if not recipe:
        return jsonify({'success': False, 'message': 'Recipe not found'}), 404
    recipe['rating'] = data['rating']
    save_data('recipes.json', recipes)
    return jsonify({'success': True, 'message': 'Rating submitted'})

@app.route('/api/recipes/<recipe_id>/like', methods=['POST'])
def like_recipe(recipe_id):
    recipes = load_data('recipes.json')
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    if not recipe:
        return jsonify({'success': False, 'message': 'Recipe not found'}), 404
    recipe['likes'] = (recipe.get('likes', 0) + 1)
    save_data('recipes.json', recipes)
    return jsonify({'success': True, 'message': 'Liked'})

@app.route('/api/recipes/<recipe_id>/comment', methods=['POST'])
def comment_recipe(recipe_id):
    data = request.json
    recipes = load_data('recipes.json')
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    if not recipe:
        return jsonify({'success': False, 'message': 'Recipe not found'}), 404
    comment = {
        'id': str(uuid.uuid4()),
        'text': data['text'],
        'author': data['author'],
        'date': datetime.now().isoformat()
    }
    recipe['comments'].append(comment)
    save_data('recipes.json', recipes)
    return jsonify({'success': True, 'message': 'Comment added', 'comment': comment})

if __name__ == '__main__':
    app.run(debug=True, port=5000)