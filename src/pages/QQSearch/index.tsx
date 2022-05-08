import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { IQQInfo } from '../../typings/index';
import { toSearchQQ } from '../../request/api';
import Input from '../../components/Input';
import QQInfo from '../../components/QQInfo';
import './index.css';
import { useDebounce } from '../../utils/utils';

const qqReg = /^[1-9]\d{4,11}$/;

interface IProps {
    isLoading: boolean,
    errTips: string,
    qqInfo: IQQInfo | null,
}

const QQSearch: FC = (): ReactElement => {
    const [keyword, setKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errTips, setErrTips] = useState<string>('');
    const [qqInfo, setQqInfo] = useState<IQQInfo | null>(null);

    const onInputChange = useCallback((keyword: string): void => {
        setKeyword(keyword.trim());
    }, []);

    const searchQQInfo = (value: string) => {
        if(!value) {
            setIsLoading(false);
            setQqInfo(null);
            setErrTips('暂无数据');
            return;
        } else if(!qqReg.test(value)) {
            setIsLoading(false);
            setQqInfo(null);
            setErrTips('请输入正确的QQ号码');
            return
        } else {
            setErrTips('');
            setIsLoading(true);
        }

        toSearchQQ(value).then((data = {}) => {
            if (data.code === 1) {
                setErrTips("");
                setQqInfo(data);
            } else {
                setErrTips(data.msg || '暂无数据');
                setQqInfo(null);
            }
        }).finally(() => setIsLoading(false));
    }

    const debouncedKeyword = useDebounce(keyword, 600);
    
    useEffect(() => {
        searchQQInfo(debouncedKeyword);
    }, [debouncedKeyword]);

    return (
        <div className="qs-wrap">
            <h1 className="qs-title">QQ号查询</h1>
            <Input value={ keyword } onInput={ onInputChange } placeholder="请输入QQ号码" />
            <div className="qi-wrap">
                { isLoading && <div className='loading'>正在加载中...</div> }
                { !isLoading && qqInfo && <QQInfo item={ qqInfo } /> }
                { errTips && <div className='err-tips'>{ errTips }</div> }
            </div>
        </div>
    )
}

export default QQSearch;