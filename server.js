const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    server: 'localhost',
    database: 'Printecs',
    user: 'sa',
    password: '1234',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        instanceName: 'MS'
    }
};

app.post('/api/contact', async (req, res) => {
    const { phone, email, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: 'Телефон и сообщение обязательны' });
    }

    try {
        const pool = await sql.connect(dbConfig);

        const userResult = await pool.request()
            .input('phone', sql.NVarChar(20), phone)
            .input('email', sql.NVarChar(150), email || '')
            .query(`
                IF NOT EXISTS (SELECT 1 FROM [User] WHERE Phone = @phone)
                BEGIN
                    INSERT INTO [User] (Phone, Email)
                    VALUES (@phone, @email)
                END
            `);

        const userIdResult = await pool.request()
            .input('phone', sql.NVarChar(20), phone)
            .query(`SELECT ID_User FROM [User] WHERE Phone = @phone`);

        const userId = userIdResult.recordset[0].ID_User;

        await pool.request()
            .input('userId', sql.Int, userId)
            .input('text', sql.NVarChar(sql.MAX), message)
            .query(`
                INSERT INTO [Message] (ID_User, Text)
                VALUES (@userId, @text)
            `);

        await pool.close();

        res.json({ success: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
