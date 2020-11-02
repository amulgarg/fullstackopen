import axios from 'axios';
const baseUrl = 'http://localhost:3002/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data);
}

const services = {getAll, create};

export default services;