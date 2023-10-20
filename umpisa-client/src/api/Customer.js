import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../store/index'

const getNewToken = async (token, refreshToken) => {
    try {
        const result = await axios.post(
            '/refreshToken',
            {
                refreshToken: refreshToken
            },
            {
                headers: { Authorization: token }
            }
        )
        return result.data.accessToken
    } catch (error) {
        toast.error(error.message)
        return
    }
}

export const getCustomer = async (token, refreshToken) => {
    try {
        const result = await axios.get('/customer', {
            headers: { Authorization: token }
        })

        return result.data
    } catch (error) {
        const response = error.response
        const data = response.data
        if (data.message == 'Token Expired') {
            // refresh token
            const newToken = await getNewToken(token, refreshToken)
            store.dispatch({ type: 'UPDATE_TOKEN', payload: { newToken } })
            // return res
        } else if (data.message == 'Unauthorized') {
            store.dispatch({ type: 'FORCE_LOGOUT' })
            // toast.error(data.message)
        } else {
            toast.error(response.message)
        }
        // return
    }
}

export const deleteCustomer = async (id, token, refreshToken) => {
    try {
        const result = await axios.delete(`/customer/${id}`, {
            headers: { Authorization: token }
        })
        return result.data
    } catch (error) {
        const response = error.response
        const data = response.data
        if (data.message == 'Token Expired') {
            // refresh token
            const newToken = await getNewToken(token, refreshToken)
            store.dispatch({ type: 'UPDATE_TOKEN', payload: { newToken } })
            // return res
        } else if (data.message == 'Unauthorized') {
            store.dispatch({ type: 'FORCE_LOGOUT' })
            // toast.error(data.message)
        } else {
            toast.error(response.message)
        }
    }
}

export const createCustomer = async (data, token, refreshToken) => {
    try {
        const result = await axios.post(`/customer`, data, {
            headers: { Authorization: token }
        })
        return result.data
    } catch (error) {
        const response = error.response
        const data = response.data
        if (data.message == 'Token Expired') {
            // refresh token
            const newToken = await getNewToken(token, refreshToken)
            store.dispatch({ type: 'UPDATE_TOKEN', payload: { newToken } })
            // return res
        } else if (data.message == 'Unauthorized') {
            store.dispatch({ type: 'FORCE_LOGOUT' })
            // toast.error(data.message)
        } else {
            toast.error(response.message)
        }
    }
}

export const updateCustomer = async (data) => {
    try {
        const result = await axios.put(`/customer`, data)
        return result.data
    } catch (error) {
        toast.error(error.message)
        return
    }
}
