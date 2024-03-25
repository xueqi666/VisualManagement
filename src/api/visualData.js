import axios from './request';

export function proCityYear(data) {
    return axios({
        url: '/visual/data/proCityYear',
        method: 'get',
        params:data
    });
}