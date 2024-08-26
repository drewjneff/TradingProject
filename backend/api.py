from flask import Flask, jsonify, request
from flask_cors import CORS
from database_utils import get_dummy_text, query
import sqlite3

api = Flask(__name__)

CORS(api, resources={r"/api/*": {"origins": "http://localhost:8080"}})


@api.route('/api/text', methods=['GET'])
def get_text():
    content = get_dummy_text()
    return jsonify({'result': content})

@api.route('/api/query', methods=['GET'])
def get_query():
    query_str = request.args.get('query')  # Get query string from request parameters
    if not query_str:
        return jsonify({'error': 'No query string provided'}), 400

    try:
        content = query(query_str)
        return jsonify({'result': content})
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    api.run(debug=True)