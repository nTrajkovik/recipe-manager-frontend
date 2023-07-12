import axios from 'axios';

const Api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_API,
        headers: {
            Authorization: localStorage.getItem('jwt'),
        },
    });
};

export default Api;