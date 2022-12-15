import { httpService } from "./httpService"
import { storageLoaclService } from "./storage.service"

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    updateBalance,
    updetUser,
    creatUser,

}

window.us = userService
const users = [
    { username: '0526587480', password: '123456', name: 'אלדד יקנה' ,isAdmin:true},
    { username: '052123456', password: '654321', name: 'קוהבי גה' },
    { username: '050123456', password: '123789', name: 'טיטי שרלוק' },
]

function login(credentials) {
    console.log('credentials', credentials)
    const user = users.find(user => {
        if (user.username === credentials.username && user.password === credentials.password) {
            return user
        }
    })
    storageLoaclService.saveToStorage(STORAGE_KEY_LOGGEDIN,user)
    console.log('user', user)
    if (user) {
        return Promise.resolve(user)
    } else {
        return Promise.reject('cant enter')

    }
    // return httpService.post('auth/login', credentials)
    //     .then(user => {
    //         if (user) {
    //             console.log('useruser',user);
    //             sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    //             return user
    //         } else {
    //             console.log('useruser  return Promise.reject');
    //             return Promise.reject('cant enter')
    //         }


    //     })
}

function updetUser(userUpdet) {
    return httpService.post(STORAGE_KEY, userUpdet)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}

function signup(userInfo) {
    console.log(userInfo);
    return httpService.post('auth/signup', userInfo)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}

function logout() {
    httpService.post('auth/logout', null)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(null))
    return Promise.resolve()
}

function getLoggedinUser() {
return storageLoaclService.loadFromStorage(STORAGE_KEY_LOGGEDIN)
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) || null
}

function updateBalance(diff) {
    const user = userService.getLoggedinUser()
    user.balance += diff
    return httpService.put(STORAGE_KEY, user)
        .then((user) => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user.balance
        })
}

// const user = { username: 'eldad', password: 'eldad1', fullname: 'eldad yikne', balance: 10000, activities: [], prefs: { color: '', bgColor: '' } }

function creatUser({ username, password, fullname }) {
    return {
        username: username,
        password: password,
        fullname: fullname,
        balance: 10000,
        activities: [],
        prefs: { color: '', bgColor: '' }
    }
}

// userService.signup({ username: 'eldad', password: 'eldad1', fullname: 'eldad yikne', balance: 10000, activities: [], prefs: { color: '', bgColor: '' } })
// userService.login({ username: 'eldad', password: 'eldad1' })
