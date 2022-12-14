import { httpService } from './httpService'
import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
// import { storageService } from './async-storage.service'
import { getActionRemoveReview, getActionAddReview } from '../store/actions/review.action'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'

  // const reviewChannel = new BroadcastChannel('reviewChannel')

  ; (() => {
    // reviewChannel.addEventListener('message', (ev) => {
    //   store.dispatch(ev.data)
    // })
    socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
      console.log('GOT from socket', review)
      store.dispatch(getActionAddReview(review))
    })
    socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
      showSuccessMsg(`New review about me ${review.txt}`)
    })
  })()



export const reviewService = {
  add,
  query,
  remove
}


function query(filterBy) {
  return httpService.get(`review/`, { params: filterBy })
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
  // reviewChannel.postMessage(getActionRemoveReview(reviewId))


}
async function add(review) {
  console.log(review);
  const addedReview = await httpService.post(`review`, review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = await storageService.post('review', review)

  // reviewChannel.postMessage(getActionAddReview(addedReview))

  return addedReview
}
