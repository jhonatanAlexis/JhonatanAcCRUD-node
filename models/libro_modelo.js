const mongoose = require("mongoose")

const librosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Escribe un nombre"]
    },
    autor: {
        type: String,
        required: [true, "Escribe un autor"]
    },
    isbn: {
        type: String,
        required: [true, "Escribe un isbn"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Libro", librosSchema)