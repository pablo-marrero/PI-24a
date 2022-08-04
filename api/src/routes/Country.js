const router = require("express").Router()
const axios = require("axios")
// const { where } = require("sequelize/types")
const { Country, Activities } = require("../db")
const { Sequelize, Op } = require("sequelize");
const op = Sequelize.Op;
// let generateFilter = async (dataUno, dataDos)=>{
//     let orderAscName = await Country.findAll({
//         order:[
//             [dataUno, dataDos]
//         ],
//         includes:{model: Activities}
//     })
//     orderAscName?res.json(orderAscName):res.status(404).json("No se pudo realizar el filtro")
// }



router.get("/countries", async (req,res)=>{
    let { name, filter, act } = req.query
    try {
        const counto = await Country.count()
        if(!counto){

            // let completeBase = async () => {
                let countries = await axios.get(`https://restcountries.com/v3/all`)
                // console.log(countries)
                let newArray=  await countries.data.map(e =>{
                    // await Promise.all(countries.data.map(e =>{
                        if(typeof(e.cca3) !== "string" && e.cca3.length > 3 && e.cca3 < 3) throw new Error("El id debe ser de tipo string")
                        if(typeof(e.name.common) !== "string" ) throw new Error("El nombre debe ser de tipo String")
                        if(typeof(e.region) !== "string" ) throw new Error("El Continente debe ser de tipo String")
                        if(typeof(e.flags[1]) !== "string" ) throw new Error("El Continente debe ser de tipo String")
                        
                return pais = {  
                    id : e.cca3,
                    name: e.name.common.toLowerCase(),
                    continent: e.region? e.region : ["No hay continente"],
                    imgFlags: e.flags[1] || "No hay imagines",
                    capital: e.capital || ["No hay capital"],
                    region: e.region,
                    subregion: e.subregion || "No hay region",
                    area: parseInt(e.area),
                    population: parseInt(e.population),
                    location: e.latlng || ["No hay Data"]
                }
                // Country.findOrCreate({where: pais})
              })
              // )
              await Country.bulkCreate(newArray)
              res.send(newArray)

        }

        try {
            if(name){
                const countryName = await Country.findAll({
                    where: {
                        name: 
                        //         [op.like] : 
                        //     }
                        {
                            [op.like]: `%${name}%`
                        }
                    },
                    include: {
                        model: Activities,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                })
                countryName.length
                ?  res.send(countryName)
                : res.status(404).send("Country doesn't exist");
            }
        }catch (error) {
            next(error);
        }


        try {
            if(act){
                let actividades = await Country.findAll({
                    include: {
                        model: Activities,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        },
                        where:{
                            name: act
                        }
                    }
                })
                res.json(actividades)
            }
        } catch (error) {
            res.status(404).json("No se encontraron actividades")
        }


        if(filter){
            switch (filter) {
                case "asce-name":
                        let orderAscName = await Country.findAll({
                            order:[
                                ["name", "ASC"]
                            ],
                            includes:{model: Activities,
                                // Attributes:["name"],
                                // trough: {Attributes:[]}
                            }
                        })
                        orderAscName?res.json(orderAscName):res.status(404).json("No se pudo realizar el filtro")
                        // generateFilter("name", "ASC")
                    break;

                case "desc-name":
                        let orterDescName = await Country.findAll({
                            order:[
                                ["name", "DESC"]
                            ],
                            includes:{model: Activities,
                                // Attributes:["name"],
                                // trough: {Attributes:[]}
                            }
                        })
                        orterDescName?res.json(orterDescName):res.status(404).json("No se pudo realizar el filtro")
                    break;
            

                case "asce-pob":
                    let orterAscPob = await Country.findAll({
                        order:[
                            ["population", "ASC"]
                        ],
                        includes:{model: Activities}
                    })
                    orterAscPob?res.json(orterAscPob):res.status(404).json("No se pudo realizar el filtro")
                break;
                
                case "desc-pob":
                    let orterDescPob = await Country.findAll({
                        order:[
                            ["population", "DESC"]
                        ],
                        includes:{model: Activities}
                    })
                    orterDescPob?res.json(orterDescPob):res.status(404).json("No se pudo realizar el filtro")
                break;


                case "all":
                    let allCountries = await Country.findAll({
                        includes:{model: Activities}
                    })
                    allCountries?res.json(allCountries):res.status(404).json("No se pudo realizar el filtro")
                break;

                case "continent":
                    let continent = await Country.findAll({
                        order:[
                            ["continent", "ASC"]
                        ],
                        // group:"continent",
                        includes:{model: Activities}
                    })
                    continent?res.json(continent):res.status(404).json("No se pudo realizar el filtro")
                break;

                default:
                    res.status(404).json("Filtro no contemplado")
                break;
            }
        }
        if(counto && !(filter && name)){let allCountries = await Country.findAll({
            includes:{model: Activities}
            })
             allCountries?res.json(allCountries):res.status(404).json("No se pudo realizar el filtro")
            }

    } catch (error) {
        console.log(error)
    }
})


router.get("/countries/:idPais", async (req, res)=>{
    let {idPais} = req.params;
    try {
        let newArray = []
            let country = await Country.findByPk(
                idPais.toUpperCase(),
                
                {include: {
                    model: Activities,
                    attributes: ["name","dificulty","duration","season"],
                        through: {
                            attributes: []
                        }
                    }
                }
            )
                newArray.push(country)
            newArray.length?res.status(200).send(newArray)
            :res.status(404).json("No se encontro el pais")
        } 
    catch (error) {
        
    }
})


// router.get("/countries/act/:name", async (req, res)=>{

//     const { name } = req.params
//     // console.log(act + "SOY LA ACTIVIDAD")
//     try {
//         if(name){
//             let actividades = await Country.findAll({
//                 include: {
//                     model: Activities,
//                     attributes: ['name'],
//                     through: {
//                         attributes: []
//                     },
//                     where:{
//                         name: name
//                     }
//                 }
//             })
//             res.json(actividades)
//         }
//     } catch (error) {
//         res.status(404).json("No se encontraron actividades")
//     }
// })

router.post("/countries/addact", async (req, res)=>{

    const { name } = req.body
 
    try {
        if(name){
            let actividades = await Country.findAll({
                include: {
                    model: Activities,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    },
                    // where:{
                    //     name: !(name)
                    // }
                    where:{
                        name: {
                            [op.is] : null
                        }
                    }
                }
            })
            res.json(actividades)
        }
    } catch (error) {
        res.status(404).json("No se encontraron actividades")
    }
})



module.exports=router;