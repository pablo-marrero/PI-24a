// const router = require("express").Router()
// const { where } = require("sequelize/types")
// const { Country, Activities } = require("../db") 


const router = require('express').Router();
const { Sequelize } = require("sequelize");
const axios = require("axios")
const { Country, Activities } = require('../db');
const op = Sequelize.Op;

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

router.post("/act", async(req, res)=>{
    const {name,dificulty,duration,season } = req.body
    try {
        let [createActivity, create] = await Activities.findOrCreate({
            where:{
                name,dificulty,duration,season
            }
        })
        if(create) res.json("La actividad fue creada con éxito")
        else res.json("La actividad ya se encuentra creada")
    } catch (error) {
        next(error)
    }
})

router.delete("/act/:name", async(req,res)=>{
    const { name } = req.params
    console.log(req.body)
    try {
        await Activities.destroy({
            where: {
                name: name
            }
        })
        res.json("The activity was deleted")
    } catch (error) {
        res.status(400).json({msg: "no existe la actividad"})
    }
})


router.get("/", async (req,res)=>{
    try {
        const actividades = await Activities.findAll()
        // console.log(actividades)
        
        actividades.length
        ?res.send(actividades)
        : res.json([]);

    }catch (error) {
        res.status(404).json(error)
    }
})



//Traer paises que no tengan cierta actividad
router.get("/country", async (req, res)=>{

    const { name } = req.query
    console.log(name)
    // console.log(act + "SOY LA ACTIVIDAD")
    try {
            let actividades = await Activities.findAll({
                include:{
                    model: Country,
                    attributes: ["name"],
                    through:{
                        attributes: []
                    },
                    where:{
                        name: {
                            [op.ne] : name
                        }
                    }
                }
            })
            // let actividades = await Country.findAll({
            //     include: {
            //         model: Activities,
            //         attributes: ['name'],
            //         through: {
            //             attributes: []
            //         },
            //         // where:{
            //         //     name: !(name)
            //         // }
            //         where: {
            //             name: {
            //               [op.ne]: name
            //             }
            //           }
            //     }
            // })
            res.json(actividades)
        
    } catch (error) {
        res.status(404).json("No se encontraron actividades")
    }
})

module.exports=router;