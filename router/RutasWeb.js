const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { titulo: 'Clínica veterinaria' })
})

router.get('/servicios', (req, res) => {
    res.render('servicios', { tituloServicios: "Ofrecemos los siguientes servicios:" })
})



module.exports = router;