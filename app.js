//DATOS INTERCAMBIABLES ENTRE DISTINTAS REDES, WEBSOCKETS, ITERCAMBIO DE DATOS AL MISMO TIEMPO
//CONFIGURACIÓN DEL SERVER 

const express = require('express') //Importación de librerías
const app = express() //USAMOS LA CLASE DE EXPRESS Y SE LA ASIGNAMOS A UNA CONST

const http = require('http')  //creación del server 
const server = http.createServer(app)//le pasamos app

const {Server} = require('socket.io') //requerimos a socket.io
const io = new Server(server)   //creamos una instancia, Server de io y server de http

io.on('connection', (socket)=>{ //escuchamos el evento connection, hay varios metodos 
    // console.log('un usuario se ha conectado')

    //     socket.on('disconnect', ()=>{
    //         console.log('un usuario se desconectó')  
    //     })
        // socket.on('chat',(msg)=>{
        //     console.log('mensaje:' + msg) 
        // })

        socket.on('chat', (msg)=>{ //usamos chat mensaje, al chat le pasamos ese mensaje 
            io.emit('chat', msg) 
        })
}) 

app.get('/', (req,res)=> { //renderizando mi index.html, donde esta el cuerpo del chat, ruta raíz
    //res.send('<h1>CHAT ON</h1>')
    res.sendFile(`${__dirname}/cliente/index.html`) //para pasar un archivo de otra carpeta 
})

server.listen(3000, ()=> { //server eschuchando 
    console.log("servidor corriendo en 3000")
}) 