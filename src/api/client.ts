import axios from 'axios';

export const client = () => {
    const options = {
        baseURL: process.env.REACT_APP_URL,
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    return axios.create(options);
};
