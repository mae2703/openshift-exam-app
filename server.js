const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;

// Variables desde ConfigMap y Secret
const mensaje = process.env.MENSAJE || "Mensaje no configurado";
const apiKey = process.env.API_KEY || "API_KEY no configurada";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

let nombre = null;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Examen OpenShift</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container py-5">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white">
            <h2 class="mb-0">Examen OpenShift</h2>
          </div>
          <div class="card-body">
            ${
              nombre
                ? `<h4 class="mb-4">👤 Examen realizado por: <span class="text-info">${nombre}</span></h4>`
                : `
                <form method="POST" action="/set-name" class="mb-4">
                  <label for="nombre" class="form-label">Ingrese su nombre:</label>
                  <input type="text" id="nombre" name="nombre" class="form-control" required>
                  <button type="submit" class="btn btn-success mt-3">Guardar</button>
                </form>
                `
            }
            <p class="fs-5"><strong>Mensaje (ConfigMap):</strong> <span class="text-success">${mensaje}</span></p>
            <p class="fs-5"><strong>API_KEY (Secret):</strong> <span class="text-danger">${apiKey}</span></p>
          </div>
          <div class="card-footer text-muted text-center">
            Desplegado en OpenShift 🚀
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.post("/set-name", (req, res) => {
  nombre = req.body.nombre;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
