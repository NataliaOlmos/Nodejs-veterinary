const { json } = require('body-parser');
const express = require('express');
const router = express.Router();


const Mascota = require('../models/mascota')

router.get('/', async (req, res) => {

    try {
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
        })

    } catch (error) {
        console.log(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        res.redirect('/mascotas')
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {

        const mascotasDB = await Mascota.findOne({ _id: id })
        console.log(mascotasDB)
        res.render('detalle', {
            mascota: mascotasDB,
            error: false
        })

    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error: true,
            mensaje: 'No se encuentre el id seleccionado'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const mascotasDB = await Mascota.findByIdAndDelete({ _id: id })
        if (mascotasDB) {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'falló eliminación!'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const mascotaData = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
        console.log(mascotaData)
        res.json({
            estado: true,
            mensaje: 'Editado'
        })

    } catch (error) {
        console.log(error)

        res.json({
            estado: false,
            mensaje: 'Fallo'
        })

    }
})


module.exports = router;