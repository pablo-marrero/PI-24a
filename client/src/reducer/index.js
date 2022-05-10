import { RESET_PAIS, SEARCH_BY_NAME, TRAER_PAIS, TRAER_PAISES, SEARCH_ERROR, POST_CREATED, GET_ACTIVITIES } from "../action/actionTypes";


const initialState = {
    countries: [],
    country: null,
    errores:"",
    create: "",
    activities: []
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
                country: payload.countries,
                errores: payload.errores,
                create:payload.create
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
                create: payload.mess,
            }
        }

        case GET_ACTIVITIES:{
            return{
                ...state,
                activities: payload
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