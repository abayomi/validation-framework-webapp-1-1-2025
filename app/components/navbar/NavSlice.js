import { createSlice } from '@reduxjs/toolkit'

export const navSlice =  createSlice({
    name: 'navKey',
    initialState: {
        value: 2
    },
    reducers: {
        activeKey: (state, param) => {
            state.value = param
        }
    }
})

export const {activeKey} = navSlice.actions

export default navSlice.reducer