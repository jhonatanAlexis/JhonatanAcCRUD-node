const express = require("express")
const router = express.Router()
const {getLibros, crearLibro, editarLibro, eliminarLibro, buscarLibro} = require("../controller/libros_controller")

router.route("/").get(getLibros).post(crearLibro)
router.route("/:id").put(editarLibro).delete(eliminarLibro)
router.route("/:isbn").get(buscarLibro)

module.exports = router