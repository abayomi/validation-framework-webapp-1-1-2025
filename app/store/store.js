import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/counter/counterSlice'
import formHomeReducer from '../components/homepage/formHomeSlice'

export default configureStore({
    reducer: {
        counter : counterReducer,
        user : formHomeReducer
    }
})