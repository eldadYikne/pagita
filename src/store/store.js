import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { reviewReducer } from './reducers/review.reducer'
import { pagitaReducer } from './reducers/pagita.reducer'
import { userReducer } from './reducers/user.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    pagitaModule: pagitaReducer,
    userReducer: userReducer,
    reviewModule: reviewReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.gStore = store
