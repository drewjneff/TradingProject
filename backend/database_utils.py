import sqlite3

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