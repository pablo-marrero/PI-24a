//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// const fetch = require("node-fetch")
const { Country } = require('./src/db');
const { default: axios } = require('axios');
// const axios = require(axios)

// let completeBase = async ()=>{
//   try {
//     let baseTotal = await fetch("https://restcountries.com/v3/all")
//     let paises = await baseTotal.json() 
  
//     await paises.data.map(e=>{
//         let pais = {
//                 id : e.ccn3,
//                 name : e.name.common,
//                 imgFlags : e.flags,
//                 continent : e.continents[0],
//                 capital : e.capital,
//                 subregion: e.subregion,
//                 area : parseInt(e.area),
//                 population : parseInt(e.population)
//         }
//         Country.findOrCreate({where: pais})
//     })

//   } catch (error) {
//       console.log(error)
//   }
// }



//     let completeBase = async () => {
//       try {
//         let countries = await axios.get(`https://restcountries.com/v3/all`)
//         // console.log(countries)
//         let newArray=  await countries.data.map(e =>{
//           return pais = {  
//                 id : e.cca3,
//                 name: e.name.common,
//                 continent: e.continents || ["No hay continente"],
//                 imgFlags: e.flag || "No hay imagines",
//                 capital: e.capital || ["No hay capital"],
//                 region: e.region,
//                 subregion: e.subregion || "No hay region",
//                 area: parseInt(e.area),
//                 population: parseInt(e.population)  
//             }
//           })
//           await Country.bulkCreate(newArray)
          
//           // res.send(newArray)
//       } catch (error) {
//         console.log(error)
//       }
        
//     }

//  completeBase()


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
