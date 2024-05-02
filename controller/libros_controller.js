const asyncHandler = require("express-async-handler")
const Libro = require("../models/libro_modelo")
const { transferableAbortController } = require("util")

const getLibros = asyncHandler(async(req, res) => {
    const libros = await Libro.find()
    res.status(200).json(libros)
})

const crearLibro = asyncHandler(async(req, res) => {
    if(!req.body.nombre || !req.body.autor || !req.body.isbn){
        res.status(400)
        throw new Error("Por favor, ingrese todos los datos")
    }
    const libroExiste = await Libro.findOne({isbn: req.body.isbn})
    if(libroExiste){
        res.status(302)
        throw new Error("El libro ya existe")
    }
    const libro = await Libro.create({
        nombre: req.body.nombre,
        autor: req.body.autor,
        isbn: req.body.isbn
    })
    res.status(200).json(libro)
})

const editarLibro = asyncHandler(async(req, res) =>{
    const libro = await Libro.findById(req.params.id)
    if(!libro){
        res.status(400)
        throw new Error("El libro no existe")
    }
    const uptadedLibro = await Libro.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    res.status(200).json(uptadedLibro)
})

const eliminarLibro = asyncHandler(async(req, res) =>{
    const libro = await Libro.findById(req.params.id)
    if(!libro){
        res.status(400)
        throw new Error("El libro no existe")
    }
    await Libro.deleteOne(libro)
    res.status(200).json({id: req.params.id})
})

const buscarLibro = asyncHandler(async(req, res)=>{
    const libro = await Libro.findOne({isbn: req.params.isbn})
    if(!libro){
        res.status(400)
        throw new Error("El libro no existe")
    }
    res.status(200).json(libro)
})

module.exports = {
    getLibros,
    crearLibro,
    editarLibro,
    eliminarLibro,
    buscarLibro
}