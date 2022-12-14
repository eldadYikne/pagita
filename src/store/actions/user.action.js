
import { useNavigate } from "react-router-dom"
import { userService } from "../../services/user.service"




export function logIn(ev) {
    return (dispatch) => {
       const {username,password}=ev


        if (!username || !password) {
            dispatch({ type: 'MSG', msg: ' פרטי ההתחברות שגויים ' })
            Promise.reject('invalid user')
        } 
        userService.login({ username, password })
            .then(user => {
                dispatch({ type: 'MSG', msg: null })
                dispatch({ type: 'USER_LOGIN', user: user })
                console.log('userrrrr', user)

            })
            .catch(err => {
                dispatch({ type: 'MSG', msg: ' פרטי ההתחברות שגויים ' })
                console.log('not user')

            })
    }
}




export function logOut() {
    return (dispatch) => {
        userService.logout().then(res => {
            dispatch({ type: 'USER_LOGOUT', user: null })

        })
    }

}

export function signup(ev) {
    return (dispatch) => {
        ev.preventDefault()
        const username = ev.target[0].value
        const fullname = ev.target[1].value
        const password = ev.target[2].value

        // const user = userService.creatUser({ username, password, fullname })
        const user = { username, password, fullname }
        userService.signup(user)
            .then((user) => {
                dispatch({ type: 'USER_SIGNUP', user: user, msg: 'You sign-up secsessfuly!' })
                userService.login({ username, password })
                    .then(user => {
                        dispatch({ type: 'USER_LOGIN', user: user })
                    })
            })
            .catch(err => dispatch({ type: 'MSG', msg: 'Cnnot sign-up!' }))
    }
}