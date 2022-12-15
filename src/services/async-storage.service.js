import { storageLoaclService } from "./storage.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    getByUsername
}


function query(entityType, filterBy, delay = 0) {
    var entities = storageLoaclService.loadFromStorage(entityType)
 console.log('entities',entities)
 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function getByUsername(entityType, username) {
    return query(entityType)
        .then(entities => entities.find(entity => entity.tel === username))
}


function postMany(entityType, entities) {
    _save(entityType, entities)
    return Promise.resolve(entities)
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            console.log('entities',entities)
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            console.log(idx);
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}