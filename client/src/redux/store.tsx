import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialLoginState = { auth: false }
const initialListState = {
    number: 0,
    bclasses: [
        {
            name: "Example List",
            data: [{
                course_validation: true,
                is_offered: true,
                courseid: 1,
                course_title: "Example Class",
                course_subtitle: "Introduction to Example",
                currently_enrolled: "100",
                max_enrolled: "150",
                currently_waitlisted: "0",
                max_waitlisted: " 50",
                total_class_grade: "3.6",
                recent_section_grade: "3.5",
                recent_section_period: "spring 2020"
            }]
        }
    ]
}

function login(state = initialLoginState, action) {
    console.log(state, action)
    switch (action.type) {
        case "LOGIN":
            return {...state, auth: true}
        case "LOGOUT":
            return {...state, auth: false}
        default:
            return state
    }
} 

function list(state = initialListState, action) {
    console.log(state)
    switch (action.type) {
        case undefined:
            return 
        case "ADD_LIST":
            return {...state, auth: true}
        case "DELETE_LIST":
            return {...state, auth: false}
        case "CHANGE_LISTNAME":
            return {...state, auth: false}
        case "ADD_ITEM":
            return {...state, auth: true}
        case "DELETE_ITEM":
            return {...state, auth: false}
        default:
            return state
    }
}
    
let store = createStore(combineReducers({ login, list }), composeWithDevTools())
export default store