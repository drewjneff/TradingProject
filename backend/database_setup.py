import sqlite3

conn = sqlite3.connect('data.db')
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS dummy_text (
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL
    )
''')

c.execute('''
    INSERT INTO dummy_text (content)
    VALUES ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
''')

conn.commit()
conn.close()
