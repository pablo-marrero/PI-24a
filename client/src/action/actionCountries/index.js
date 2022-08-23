import { RESET_PAIS, TRAER_PAIS, TRAER_PAISES, SEARCH_BY_NAME, SEARCH_ERROR, POST_CREATED, GET_ACTIVITIES, COUNTRIES_WITHOUT_ACTIVITY} from "../actionCountries/actionTypes";
import axios from "axios";

export function getCountries(){
    return async (dispatch) =>{
        await axios.get("http://localhost:3001/countries")
        .then(response => dispatch({type: TRAER_PAISES, payload: response.data}))
        .catch(console.log("NO SE PUDO CARGAR LA BASE. PRENDE EL SERVER MAN"))
    }
}

export function getCountry(id){
    return(dispatch)=>{
        axios.get(`http://localhost:3001/countries/${id}`)
        .then(response => dispatch({type: TRAER_PAIS, payload: response.data}))
    }
}

export function resetPais(){
    return({
        type:RESET_PAIS, payload:{
            country: null,
            errores:"",
            create:""
        }})
}

//ASIGNA ACTIVIDAD CREADA AL PAIS
export function updateActivity({idPais,name, dificulty,duration,season}){
    // console.log(id, name,dificulty,duration,season)
    return async (dispatch)=>{
        // return console.log(idPais,name, dificulty,duration,season)
        await axios.post(`http://localhost:3001/api/activity`,
            {
              idPais,
              name,
              dificulty,
              duration,
              season
            }
        )
        .then(response => dispatch({type:POST_CREATED, payload:{
            mess:"The activity has been created successfully!!",
            acti:name
        }}))
        .catch(console.log(idPais,name,dificulty,duration,season))
    }
}

//CREA LA ACTIVIDAD
export function createActivity({name, dificulty,duration,season}){
    // console.log(name,dificulty,duration,season)
    return async (dispatch)=>{
        // return console.log(idPais,name, dificulty,duration,season)
        await axios.post(`http://localhost:3001/api/activity/act`,
            {
              name,
              dificulty,
              duration,
              season
            }
        )
        .then(response => dispatch({type:POST_CREATED, payload:{
            mess:response.data,
            acti:name
        }}))
        .catch(console.log(name,dificulty,duration,season))
    }
}

//ELIMINAR ACTIVIDAD
export function deleteActivity(name){
    return async (dispatch)=>{
        await axios.delete(`http://localhost:3001/api/activity/act/${name}`)
    .then(response => dispatch({type: POST_CREATED, payload: response.data}))
    .catch(error => console.log(error))
    }
}


 //BUSQUEDA POR NOMBRE
export function searchByName(name){
    return(dispatch)=>{   
        axios.get(`http://localhost:3001/countries/?name=${name}`)
        .then(response => dispatch({type:SEARCH_BY_NAME, payload:{
            country : response.data,
            errores : ""
        }}))
        .catch(error => dispatch({type:SEARCH_ERROR, payload:{
            country : null,
            errores: `No se encontro el pais ${name}`
            }
          }
        ))
    }
}

export function ortherBy(filter){
    return(dispatch)=>{   
        axios.get(`http://localhost:3001/countries/?filter=${filter}`)
        .then(response => dispatch({type:TRAER_PAISES, payload:response.data}))
    }
}//Envio el filtro por parametro, como de actualizará el state
// de todos los paises, actualizo el general, para no crear un caso por opcion


export function updateFilter(continente){
    return async (dispatch)=>{
        let response = await axios.get("http://localhost:3001/countries")
        // let res = response.data.filter(e => e.continent == "{" + continente + "}") //Funciona
        let res = response.data.filter(e => e.continent.includes(continente)) //Tambien funciona
        // console.log(res.data)
        // response.data = response.data.filter(e => e.continent.toUpperCase() == continente.toUpperCase())
        dispatch({ type: TRAER_PAISES, payload: res })
    }
}

export function getACtivities(){
    return async(dispatch)=>{
        axios.get(`http://localhost:3001/api/activity`)
        .then(response => dispatch ({type: GET_ACTIVITIES, payload: response.data}))
    }
}

export function getCountryAct(act){
    return(dispatch)=>{  
        axios.get(`http://localhost:3001/countries/?act=${act}`)
        .then(response => dispatch({type:TRAER_PAISES, payload:response.data}))
    }
}

// export function getCountryActSelec(act){
//     return(dispatch)=>{  
//         axios.get(`http://localhost:3001/countries/?act=${act}`)
//         .then(response => dispatch({type:GET_ACTIVITIES, payload:response.data}))
//     }
// }

export function getCountryWithoutActivity(name){
    return (dispatch)=>{
        axios.post("http://localhost:3001/countries/addact", {
            name
        })
        // .then(response=> console.log(response))
        .then(response => dispatch({type:COUNTRIES_WITHOUT_ACTIVITY, payload: response.data}))
    }
}