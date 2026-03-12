require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- SIMULACIÓN DE BASE DE DATOS ---
const mockUser = {
    id: 1,
    email: "david_34@hotmail.es",
    password: "password123",
    role: "pasajero"
};

// ==========================================
// ACTIVIDAD A: Endpoint de Autenticación
// ==========================================
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (email === mockUser.email && password === mockUser.password) {
        const token = jwt.sign(
            { userId: mockUser.id, role: mockUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            mensaje: "Login exitoso",
            token: token
        });
    } else {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }
});

// ==========================================
// ACTIVIDAD B y C: Validación y Protección
// ==========================================
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ mensaje: "¡Alto ahí! Se requiere un token" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: "Token inválido o expirado" });
        }
        req.usuario = decoded;
        next();
    });
};

app.get('/api/perfil', verificarToken, (req, res) => {
    res.json({
        mensaje: "¡Bienvenido a la zona protegida de Travel Compartido!",
        datosDelPase: req.usuario
    });
});

// ==========================================
// LEVANTAR EL SERVIDOR (Esta era la parte que faltaba)
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Backend corriendo en http://localhost:${PORT}`);
});