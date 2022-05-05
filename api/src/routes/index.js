const { Router } = require('express');
const CountriesRoute = require("./Country")
const ActivitiesRoute = require("./Activities")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use("/", CountriesRoute)
router.use("/api/activity", ActivitiesRoute)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




module.exports = router;
