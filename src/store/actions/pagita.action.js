import { pagitaService } from "../../services/pagita.service"

export function loadPags() {
    return (dispatch, getState) => {

        const { filterBy } = getState().pagitaModule

        pagitaService.query(filterBy)
            .then(toys => {
                dispatch({ type: 'SET_TOYS', toys: toys })
            })
            .catch(() => console.log('error action toy'))
    }
}


export function removePag(toyId) {
    return (dispatch, getState) => {
        pagitaService.remove(toyId)
            .then(() => dispatch({ type: 'REMOVE_TOY', toyId }))
    }
}
export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }

}

export function getPagByUsername() {
    return async (dispatch, getState) => {
        try {
            const user = getState().userReducer.user
            if (!user) return
            const currPag = await pagitaService.getByUsername(user.username)
            console.log('currPag', currPag);
            dispatch({ type: 'SET_PAG', pag: currPag })
        } catch (err) {
            console.log('Error', err)
        }
    }

}

export function removePagFromState() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_PAG', pag: null })
        } catch (err) {
            console.log('cant exit ');
        }
    }
}

export function savePag(pag) {
    return async (dispatch) => {
        try {
            console.log('pag', pag)
            const newPag = await pagitaService.save(pag)
            if (!pag._id) {
                dispatch({ type: 'ADD_PAG', pag: newPag })
            } else {
                dispatch({ type: 'UPDATE_PAG', pag: newPag })
            }
        } catch (err) {
            console.log("Can't save baby ")
        }
    }
}


