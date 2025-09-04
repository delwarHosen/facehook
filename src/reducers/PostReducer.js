import { actions } from "../actions";

const initialState = {
    posts: [],
    loading: false,
    error: null
}

const postReducer = (state, action) => {

    switch (action.type) {
        case actions.post.DATA_FETCHING: {
            return {
                ...state,
                loading: true
            }
        }

        case actions.post.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                posts: action.data
            }
        }

        case actions.post.DATA_FETCHED_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }

        case actions.post.POST_CREATED: {
            return {
                ...state,
                loading: false,
                posts: [ action.data,...state.posts,]
            }
        }


        default: {
            return state
        }
    }
}

export { postReducer, initialState }