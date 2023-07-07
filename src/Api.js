import axios from 'axios';

const Api = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BACKEND_API,
    });
};

export default Api;