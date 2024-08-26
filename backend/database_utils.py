import sqlite3
import requests
import json
import numpy as np
import pandas as pd


def get_dummy_text():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('SELECT content FROM dummy_text')
    content = c.fetchone()[0]
    conn.close()
    return content

def query(query_str):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute(query_str)
    content = c.fetchall()
    conn.close()
    return content


def chart_6mo(symbol):
    url = f"https://yfapi.net/v8/finance/chart/{symbol}"
    querystring = {
        "interval":"1d",
        "range":"6mo"
    }

    headers = {
        'x-api-key': "WCalhn6WE71vnk9J7sGCJ3ABJ0YmCKGr1TJmpG3C"
    }

    response = requests.request("GET",url,headers=headers,params=querystring)
    result = json.loads(response.text)['chart']['result'][0]
    selected_data = {key: result[key] for key in ['timestamp','indicators']}
    timestamp = selected_data['timestamp']
    high = selected_data['indicators']['quote'][0]['high']
    volume = selected_data['indicators']['quote'][0]['volume']
    open = selected_data['indicators']['quote'][0]['open']
    low = selected_data['indicators']['quote'][0]['low']
    close = selected_data['indicators']['quote'][0]['close']

    datetime_arr = np.array(timestamp, dtype='datetime64[s]')

    df = pd.DataFrame({
        'timestamp':datetime_arr,
        'open':open,
        'high':high,
        'low':low,
        'close':close,
        'volume':volume
    })

    return df
