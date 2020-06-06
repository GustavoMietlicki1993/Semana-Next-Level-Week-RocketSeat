const express = require("express")
const server = express()

//Configurar pasta publica~
server.use(express.static("public"))

//Configurar caminhos da minha aplicação
//Pagina Inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res ) => { return res.sendFile("index.html") })

server.get("/create-point", (req, res ) => { return res.sendFile("create-point.html") })

// utilizando template engime
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Ligar o servidor
server.listen(3000)
