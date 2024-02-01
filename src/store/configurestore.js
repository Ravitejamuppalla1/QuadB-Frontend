import { createStore, combineReducers } from 'redux'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/usersReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
     
        users :userReducers,
        
    }), applyMiddleware(thunk))
    return store
}

export default configureStore