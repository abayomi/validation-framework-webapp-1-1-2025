import { createSlice } from '@reduxjs/toolkit'

export const formHomeSlice =  createSlice({
    name: 'user',
    initialState: {
        name: 'Test',
        email: 'test@email.com',
        fieldsData: '',
        rulesData: ''
    },
    reducers: {
        nameChange: (state, action) => {
            state.name = action.payload;
        },
        emailChange: (state, action) => {
            state.email = action.payload;
        },
        fieldsDataChange: (state, action) => {
            state.fieldsData = action.payload.fields;
        },
        rulesDataChange: (state, action) => {
            state.rulesData = action.payload.rules;
        },
    }
})

export const { nameChange, emailChange, fieldsDataChange, rulesDataChange } = formHomeSlice.actions

export const selectName = state => state.user.name;
export const selectEmail = state => state.user.email;
export const fieldsData = state => state.user.fieldsData;
export const rulesData = state => state.user.rulesData;

export default formHomeSlice.reducer