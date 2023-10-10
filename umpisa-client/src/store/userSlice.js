import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk('/login', async (data) => {
    const request = await axios.post('/login', data)
    const response = await request.data
    return response
})

export const logoutUser = createAsyncThunk('/logout', async () => {
    const request = await axios.post('/logout')
    const response = await request.data
    return response
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        state: null,
        authenticated: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.loading = false
                    state.user = action.payload
                    state.error = null
                    state.authenticated = false
                } else {
                    state.loading = false
                    state.user = action.payload
                    state.error = null
                    state.authenticated = true
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.user = null
                console.log(action.error.message)
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied! Invalid Credentials'
                } else {
                    state.error = action.error.message
                }
                state.authenticated = false
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
            })
    }
})

export default userSlice.reducer
