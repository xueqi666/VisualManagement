import axios from './request';
export function pageList(data) {
    console.log(data);
    return axios({
        url: '/list/dataList/pageList',
        method: 'get',
        params:data
    });
}
export function provinceCityGet() {
    return axios({
        url: '/list/dataList/provinceCity',
        method: 'get',
    });
}


