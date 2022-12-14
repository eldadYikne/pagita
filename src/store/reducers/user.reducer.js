import { userService } from "../../services/user.service"

const initialState = {
    user: userService.getLoggedinUser(),
    msg: null
}




export function userReducer(state = initialState, action) {
    var user
    switch (action.type) {

        // case 'ADD_ACTIVTIE':
        //     var activities = [...state.user.activities, action.activities]
        //     var user = { ...state.user, activities: activities }
        //     return { ...state, user }
        // case 'EDIT_COLOR_PROFILE':
        //     var user = { ...state.user, prefs: action.edit, fullname: action.name }
        //     return { ...state, user }
        case 'MSG':
            return { ...state, msg:action.msg }
        case 'USER_LOGIN':
            user = { ...action.user }
            return { ...state, user }
        case 'USER_LOGOUT':
            return { ...state, user: null, msg: null }
        case 'USER_SIGNUP':
            user = action.user
            return { ...state, user, msg: action.msg }
        // case 'OPEN_SIGNUP':
        //     return { ...state, isShown: action.isShown }
        default:
            return state;
    }

}

