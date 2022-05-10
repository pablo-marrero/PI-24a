import { RESET_PAIS, SEND_ACTIVITY, TRAER_PAIS, TRAER_PAISES, SEARCH_BY_NAME, SEARCH_ERROR, POST_CREATED, GET_ACTIVITIES} from "./actionTypes";
import axios from "axios";

export function getCountries(){
    return (dispatch) =>{
        axios.get("http://localhost:3001/countries")
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
            mess:"La actividad ha sido creada!!",
            acti:name
        }}))
        .catch(console.log(idPais,name,dificulty,duration,season))
    }
}
 
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

export function getCountryActSelec(act){
    return(dispatch)=>{  
        axios.get(`http://localhost:3001/countries/?act=${act}`)
        .then(response => dispatch({type:GET_ACTIVITIES, payload:response.data}))
    }
}