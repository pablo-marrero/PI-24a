// const router = require("express").Router()
// const { where } = require("sequelize/types")
// const { Country, Activities } = require("../db") 


const router = require('express').Router();
const { Sequelize } = require("sequelize");
const axios = require("axios")
const { Country, Activities } = require('../db');

// router.post("/", async (req,res)=>{
//     try {
//         // console.log("req")
//         const { name,dificultad,duracion,temporada } = req.body
//         let crearActividad = await Activities.create({ name,dificultad,duracion,temporada })
    
//         console.log(crearActividad)
//         res.status(200).json(crearActividad)
            
//     } catch (error) {
//         console.log(error)
//     }
// })

router.post('/', async (req, res, next) =>{ 
    // console.log(req.body, "Soy BODY")
    const { idPais,name,dificulty,duration,season } = req.body
    try {
      
        let [createActivity] = await Activities.findOrCreate({
            where:{
                name,dificulty,duration,season
            }
        })

        idPais.forEach(async e =>{
            const CountriesPush = await Country.findOne({
                where: { id: e }
            })
             createActivity.addCountry(CountriesPush)
        })


        res.json(createActivity)

    } catch (error) {
        next(error)
        // console.log(error)
        // res.status(404).send(error)
    }
})

router.get("/", async (req,res)=>{
    // console.log(Country + "SOY LA ACTIVIDAD")
    try {
        const actividades = await Activities.findAll()
        console.log(actividades)
        
        actividades.length
        ?res.send(actividades)
        : res.status(404).send("Country doesn't exist");

    }catch (error) {
        res.status(404).json(error)
    }
})

module.exports=router;