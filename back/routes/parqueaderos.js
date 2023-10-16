const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const Parqueadero = require("../schema/parqueadero");

router.post("/", async (req, res) => {
    const { nombre, longitud, altura } = req.body;

    if (!nombre || !longitud || !altura) {
        return res.status(400).json(jsonResponse(400, {
            error: "Nombre, longitud y altura son requeridos."
        }));
    }

    try {
        const exists = await Parqueadero.ParqueaderoExist(nombre);

        if (exists) {
            return res.status(400).json(jsonResponse(400, {
                error: "El Parqueadero ya existe."
            }));
        }

        const newParqueadero = new Parqueadero({ nombre, longitud, altura });

        await newParqueadero.save();

        // Llama a la función para enviar el correo de confirmación. Asegúrate de implementarla correctamente.
        sendConfirmationEmail(nombre);

        res.status(200).json(jsonResponse(200, {
            message: "Parqueadero creado."
        }));
    } catch (error) {
        console.error(error); // Registra el error en la consola para fines de depuración.
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear un Parqueadero."
        }));
    }
});

module.exports = router;
