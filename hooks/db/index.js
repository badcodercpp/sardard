import mysql from 'mysql'
export const getDb = () => {
    const p = new Promise((resolve, reject) => {
        const db = mysql.createConnection ({
            host: 'localhost',
            user: 'root',
            password: 'root@1234',
            database: 'test'
        });
        db.connect((err) => {
            if (err) {
                throw err;
            }
            console.log('Connected to database');
        });
        resolve(db);
    });
    return p;
}