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

router.post('/', async (req, res) =>{
    // console.log("asdfasd")   
    console.log(req.body, "Soy BODY")
    const { idPais,name,dificultad,duracion,temporada } = req.body
    console.log(idPais + "SOY EL IDPAIS")
    // console.log(name,dificultad,duracion,temporada)
    try {
        let createActivity = await Activities.create(
            { name,dificultad,duracion,temporada }
        )
            idPais.forEach(async e =>{
            const CountriesPush = await Country.findOne({
                where: { id: e }
            })
            
            // console.log(CountriesPush)
            // for(let i =0; i < req.body[0].id.length; i++){
            // let CountriesPush = await Country.findByPk(req.body[0].id[i])   
            //     // console.log(req.body[0].id[i])
            //     createActivity.addCountry(CountriesPush)
            // }

            // console.log(e)
             createActivity.addCountry(CountriesPush)
        })
        console.log(createActivity)
        res.json(createActivity)
    } catch (error) {
        // console.log(error)
        res.status(404).send(error)
    }
})

module.exports=router;