import { RESET_PAIS, SEARCH_BY_NAME, TRAER_PAIS, TRAER_PAISES } from "../action/actionTypes";


const initialState = {
    countries: [],
    country: null,
    continent:""
};


function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case TRAER_PAISES: {
            return {
                ...state,
                countries: payload,
            }
        }

        case TRAER_PAIS:{
            return {
                ...state,
                country: payload
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
                country: payload,
                // filter: true
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