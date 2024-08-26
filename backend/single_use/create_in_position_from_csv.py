import pandas as pd
import sqlite3

csv_file_path = 'symbols.csv'
arr = list(pd.read_csv(csv_file_path)['Symbol'])

conn = sqlite3.connect('data.db')
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS in_position (
        id INTEGER PRIMARY KEY,
        symbol TEXT NOT NULL
    )
''')

for symbol in arr:
    c.execute('''
        INSERT INTO in_position (symbol)
        VALUES (?)
    ''', (symbol,))

conn.commit()
conn.close()

