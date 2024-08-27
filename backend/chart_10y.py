import pandas as pd
import sqlite3
import requests
import json
import numpy as np
import pandas_market_calendars as mcal 

##ASSUME start_date and end_date are YYYY-MM-DD format strings

def create_table_for_stock(conn,symbol):
    create_table_query = f'''
    CREATE TABLE IF NOT EXISTS {symbol}_daily (
        timestamp DATETIME PRIMARY KEY,
        open REAL,
        high REAL,
        low REAL,
        close REAL,
        volume INTEGER
    );
    '''
    cursor = conn.cursor()
    cursor.execute(create_table_query)
    conn.commit()

def get_trading_days(start_date, end_date):
    nyse = mcal.get_calendar('NYSE')
    schedule = nyse.schedule(start_date=start_date,end_date=end_date)
    return len(schedule)

def data_exists(conn,symbol,start_date,end_date):
    trading_days = get_trading_days(start_date,end_date)

    query = f'''
    SELECT COUNT(*)
    FROM {symbol}_daily
    WHERE timestamp >= ? AND timestamp <= ?;
    '''

    cursor = conn.cursor()
    cursor.execute(query, (start_date, end_date))
    count = cursor.fetchone()[0]

    if (count == trading_days):
        print('Data exists in data.db')
    return count == trading_days

def add_data(conn, symbol):
    print('call made')
    #Fetch data using yfinance api 
    url = f"https://yfapi.net/v8/finance/chart/{symbol}"
    querystring = { "interval":"1d", "range":"10y" }
    headers = { 'x-api-key': "WCalhn6WE71vnk9J7sGCJ3ABJ0YmCKGr1TJmpG3C"}
    response = requests.request("GET",url,headers=headers,params=querystring)

    dictionary = json.loads(response.text)
    result = dictionary['chart']['result'][0]
    selected_data = {key: result[key] for key in ['timestamp','indicators']}
    timestamp = selected_data['timestamp']
    high = selected_data['indicators']['quote'][0]['high']
    volume = selected_data['indicators']['quote'][0]['volume']
    open = selected_data['indicators']['quote'][0]['open']
    low = selected_data['indicators']['quote'][0]['low']
    close = selected_data['indicators']['quote'][0]['close']
    datetime_arr = np.array(timestamp, dtype='datetime64[s]').astype('datetime64[D]').astype(str)

    df = pd.DataFrame({
        'timestamp':datetime_arr,
        'open':open,
        'high':high,
        'low':low,
        'close':close,
        'volume':volume
    })
    
    df = df.ffill()
    
    data_to_insert = df.to_records(index=False).tolist()

    insert_query = f'''
        INSERT OR REPLACE INTO {symbol}_daily (timestamp, open, high ,low ,close, volume)
        VALUES (?,?,?,?,?,?);
    '''
    
    cursor = conn.cursor()
    cursor.executemany(insert_query,data_to_insert)
    conn.commit()
    
    
def fetch_data(conn, symbol, start_date, end_date):
    query = f'''
        SELECT * FROM {symbol}_daily
        WHERE timestamp >= ? AND timestamp <= ?
        ORDER BY timestamp;
    '''
    
    cursor = conn.cursor()
    cursor.execute(query, (start_date, end_date))
    return cursor.fetchall()

def fetch_daily_chart(symbol, start_date, end_date):
    conn = sqlite3.connect('data.db')
    create_table_for_stock(conn,symbol)
    if not data_exists(conn,symbol,start_date,end_date):
        add_data(conn,symbol)
    result = fetch_data(conn,symbol,start_date,end_date)
    dict = {}
    for day in result:
        timestamp, open, high, low, close, volume = day
        dict[timestamp] = {
            'open': open,
            'high': high,
            'low': low,
            'close': close,
            'volume': volume
        }
    return dict
