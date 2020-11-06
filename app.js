const express = require('express');
const app = express();

require ('dotenv').config()
const port = process.env.PORT || 3000;

//conexión a base de datos
// getting-started.js
const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.xfjs7.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Base de datos conectada"))
    .catch(e => console.log(e))
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + "/public"))

app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));


app.use((req,res,next) => {
    res.status(404).render("404", {
        titulo:"404",
        description:"Titulo del sitio web"
    })
})

app.listen(port, ()=>{
    console.log('servidor corriendo en el puerto', port)
})