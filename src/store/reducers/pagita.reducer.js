

const INITIAL_STATE = {
    pags: null,
    filterBy: '',
    pag:null
}

export function pagitaReducer(state = INITIAL_STATE, action) {
    var pags
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, pags: action.toys }
        case 'SET_PAG':
            return { ...state, pag: action.pag }
        case 'REMOVE_TOY':
            pags = state.pags.filter(toy => toy._id !== action.toyId)
            return { ...state, pags: pags }
        case 'SET_FILTER_BY':
            return { ...state, filterBy: action.filterBy }
        case 'ADD_PAG':
            return { ...state,pags:[...state.pags,action.pag] }

        default:
            return state;
    }
}