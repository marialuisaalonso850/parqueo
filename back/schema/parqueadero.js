
const mongoose = require("mongoose");


const Token = require("../schema/token")
const ParqueaderoSchema = new mongoose.Schema({
    id: { type: Object },
    nombre: { type: String, required: true, unique: true },
    altura: { type: String, required: true },
    longitud: { type: String, required: true },
});





ParqueaderoSchema.statics.ParqueaderoExist = async function (nombre) {
    const result = await this.find({ nombre });
    return result.length > 0;
};

const Parqueadero = mongoose.model("Parqueadero", ParqueaderoSchema);

module.exports = Parqueadero;