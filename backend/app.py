from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)

# Explicitly allow requests from http://localhost:3000
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})

def get_dummy_text():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('SELECT content FROM dummy_text')
    content = c.fetchone()[0]
    conn.close()
    return content

@app.route('/api/text', methods=['GET'])
def get_text():
    content = get_dummy_text()
    return jsonify({'text': content})

if __name__ == '__main__':
    app.run(debug=True)