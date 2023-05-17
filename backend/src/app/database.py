import psycopg2


conn = psycopg2.connect(
    database="leasing_shop",
    host="db",
    user="postgres",
    password="postgres",
    port="5432",
)
database = "database"
