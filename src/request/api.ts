import request from "./request";
import { IQQInput } from '../typings/index';

export const getInfoByQQ = (params: IQQInput) => {
    return request.get('/qq.info', { params })
};