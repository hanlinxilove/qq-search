import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { getInfoByQQ } from '../../request/api';
import { IQQInfo } from '../../typings/index';
import Input from '../../components/Input';
import QQInfo from '../../components/QQInfo';
import './index.css';
import { useDebounce } from '../../utils/utils';

const qqReg = /^[1-9]\d{4,9}$/;

interface IProps {
    isLoading: boolean,
    errTips: string,
    qqInfo: IQQInfo | null,
}

const PureDisplay: FC<IProps> = ({isLoading, errTips, qqInfo}): ReactElement => {
    if (errTips) {
        return <div className='err-tips'>{ errTips }</div>;
    }

    if (isLoading) {
        return <div className='loading'>正在加载中...</div>;
    }

    if (qqInfo === null) {
        return <div className='err-tips'>暂无数据</div>;
    }

    return <QQInfo item={ qqInfo } />;
};

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
            return setErrTips('暂无数据');
        } else if(!qqReg.test(value)) {
            return setErrTips('请输入正确的QQ号码');
        } else {
            setErrTips('');
            setIsLoading(true);
        }
        
        getInfoByQQ({
            qq: value
        }).then(res => {
            setIsLoading(false);
            setQqInfo(res as any);
        })
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
                <PureDisplay qqInfo={ qqInfo } isLoading={ isLoading } errTips={ errTips } />
            </div>
        </div>
    )
}

export default QQSearch;