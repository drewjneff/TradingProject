from flask import Flask, jsonify, request
from flask_cors import CORS
from database_utils import get_dummy_text, query, chart_6mo
from chart_10y import fetch_daily_chart
import sqlite3

api = Flask(__name__)

CORS(api, resources={r"/api/*": {"origins": "http://localhost:8080"}})

@api.route('/api/health', methods=['GET'])
def health_check():
    return {'status':'running'}, 200

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
    

@api.route('/api/chart', methods=['GET'])
def fetch_daily_chart_api():
    symbol = request.args.get('symbol')  # Get symbol from request parameters
    start_date = request.args.get('start_date') 
    end_date = request.args.get('end_date')
    if not symbol:
        return jsonify({'error': 'No symbol provided'}), 400
    elif not start_date:
        return jsonify({'error': 'No start date provided'}), 400
    elif not end_date:
        return jsonify({'error': 'No end date provided'}), 400
    try:
        content = fetch_daily_chart(symbol,start_date,end_date)
        return jsonify({'result': content})
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    api.run(debug=True,port=5001)