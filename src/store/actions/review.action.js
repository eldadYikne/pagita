import { reviewService } from "../../services/review.service"

export function getActionRemoveReview(reviewId) {
  return { type: 'REMOVE_REVIEW', reviewId }
}
export function getActionAddReview(review) {
  return { type: 'ADD_REVIEW', review }
}
export function getActionSetWatchedUser(user) {
  return { type: 'SET_WATCHED_USER', user }
}

export function loadReviews(filterBy) {
  console.log('load');
  return async (dispatch) => {
    try {
      console.log('log1');
      const reviews = await reviewService.query(filterBy)
      console.log(reviews);
      dispatch({ type: 'SET_REVIEWS', reviews })
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
  }
}

export function addReview(review) {
  return async (dispatch) => {
    try {
      const addedReview = await reviewService.add(review)
      console.log('addedReview', addedReview)
      dispatch({ type: 'ADD_REVIEW', review: addedReview })
    } catch (err) {
      console.log('cannot addReview ');
      throw err
    }
  }
}

