import { RESET_PAIS, SEARCH_BY_NAME, TRAER_PAIS, TRAER_PAISES, SEARCH_ERROR, POST_CREATED } from "../action/actionTypes";


const initialState = {
    countries: [],
    country: null,
    errores:"",
    create: ""
};


function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case TRAER_PAISES: {
            return {
                ...state,
                countries: payload,
                country:null,
                errores:"",
                creado:""
            }
        }

        case TRAER_PAIS:{
            return {
                ...state,
                country: payload,
                errores:"",
                creado:""
            }
        }   
        case RESET_PAIS:{
            return{
                ...state,
                country: payload
            }
        }
        // case SEND_ACTIVITY:{
        //     return{
        //         ...state,
        //         country: payload
        //     }
        // }
        case SEARCH_BY_NAME:{
            return{
                ...state,
                country: payload.country,
                errores: payload.errores
                // filter: true
            }
        }

        case SEARCH_ERROR:{
            return{
                ...state,
                errores: payload
            }
        }

        case POST_CREATED:{
            return{
                ...state,
                create: payload
            }
        }

        default:
            return {
                ...state,
                countries: payload,
            };
    }
}

export default reducer;