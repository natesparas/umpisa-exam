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
        authenticated: false,
        token: null,
        refreshToken: null
    },
    reducers: {
        updateAccessToken: (state, action) => {
            state.token = action.payload
        }
        // Force logout when all tokens are expired or invalid
    },
    extraReducers: (builder) => {
        builder
            .addCase('UPDATE_TOKEN', (state, action) => {
                state.token = action.payload.newToken
            })
            .addCase('FORCE_LOGOUT', (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
                state.token = null
                state.refreshToken = null
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
                state.token = null
                state.refreshToken = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.loading = false
                    state.user = action.payload
                    state.error = null
                    state.authenticated = false
                    state.token = null
                    state.refreshToken = null
                } else {
                    state.loading = false
                    state.user = action.payload.user
                    state.error = null
                    state.authenticated = true
                    state.token = action.payload.accessToken
                    state.refreshToken = action.payload.refreshToken
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
                state.token = null
                state.refreshToken = null
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
                state.token = null
                state.refreshToken = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
                state.token = null
                state.refreshToken = null
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = true
                state.user = null
                state.error = null
                state.authenticated = false
                state.token = null
                state.refreshToken = null
            })
    }
})

export default userSlice.reducer
