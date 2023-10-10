import axios from 'axios'

export const getCustomer = async () => {
    try {
        const result = await axios.get('/customer')
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteCustomer = async (id) => {
    try {
        const result = await axios.delete(`/customer/${id}`)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const createCustomer = async (data) => {
    try {
        const result = await axios.post(`/customer`, data)
        return result.data
    } catch (error) {
        console.log(error)
    }
}

export const updateCustomer = async (data) => {
    try {
        const result = await axios.put(`/customer`, data)
        return result.data
    } catch (error) {
        console.log(error)
    }
}
