import axios from 'axios'

const SERVER_PORT = 'https://taskify-lyok.onrender.com/api/v1'

export const register = async (userData) => {
    try {
        const res = await axios.post(`${SERVER_PORT}/users/register`, userData, {
            withCredentials: true,
        })

        return res.data
    } catch (error) {
        return error
    }
}

export const login = async (loginData) => {
    try {
        const res = await axios.post(`${SERVER_PORT}/users/login`, loginData, {
            withCredentials: true,
        })

        return res.data
    } catch (error) {
        return error
    }
}

export const checkLogin = async () => {
    try {
        const response = await axios.get(`${SERVER_PORT}/users/check-login`, {
            withCredentials: true,
        })

        return response.data
    } catch (error) {
        return error
    }
}

export const logout = async () => {
    try {
        const response = await axios.delete(`${SERVER_PORT}/users/logout`, {
            withCredentials: true,
        })

        return response.data
    } catch (error) {
        return error
    }
}

export const addTask = async (task) => {
    try {
        const response = await axios.post(`${SERVER_PORT}/tasks/add-task`, task, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        return error
    }
}

export const getTasks = async () => {
    try {
        const response = await axios.get(`${SERVER_PORT}/tasks/get-tasks`, { withCredentials: true })

        return response.data
    } catch (error) {
        return error
    }
}

export const taskStatus = async (taskId) => {
    try {
        const response = await axios.patch(`${SERVER_PORT}/tasks/${taskId}/status`, {}, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return error
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${SERVER_PORT}/tasks/${taskId}/delete`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return error
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.patch(`${SERVER_PORT}/tasks/${taskId}/update`, taskData, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return error
    }
};