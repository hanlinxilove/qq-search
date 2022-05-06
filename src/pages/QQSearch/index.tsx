import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { getInfoByQQ } from '../../request/api';
import { IQQInfo } from '../../typings/index';
import { debounce } from 'lodash';
import Input from '../../components/Input';
import QQInfo from '../../components/QQInfo';
import './index.css';

const qqReg = /^[1-9]\d{4,9}$/;

const QQSearch: FC = (): ReactElement => {
    const [keyword, setKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errTips, setErrTips] = useState<string>('');
    const [qqInfo, setQqInfo] = useState<IQQInfo | null>(null);

    const onInputChange = useCallback(debounce((keyword: string) :void => {
        setKeyword(keyword.trim());
    }, 600), []);
    
    useEffect(() => {
        if(!keyword) {
            return setErrTips('暂无数据');
        } else if(!qqReg.test(keyword)) {
            return setErrTips('请输入正确的qq号码');
        } else {
            setErrTips('');
            setIsLoading(true);
        }

        getInfoByQQ({
            qq: keyword
        }).then(res => {
            setIsLoading(false);
            setQqInfo(res as any);
        })
    }, [keyword]);

    return (
        <div className="qs-wrap">
            <h1 className="qs-title">QQ号查询</h1>
            <Input onInput={ onInputChange } placeholder="请输入QQ号码" />
            <div className="qi-wrap">
                {
                    isLoading ? <div className='loading'>正在加载中...</div>
                    : errTips ? <div className='err-tips'>{ errTips }</div>
                    : qqInfo ? <QQInfo item={ qqInfo } /> 
                    : <div className='err-tips'>暂无1数据</div>
                }
            </div>
        </div>
    )
}

export default QQSearch;