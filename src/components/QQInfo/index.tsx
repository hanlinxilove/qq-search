import { FC, ReactElement, memo } from "react";
import { IQQInfo } from '../../typings';
import './index.css';
import qqDefault from '../../assets/qq_default.png';

interface IProps {
    item: IQQInfo;
}

const QQInfo: FC<IProps> = memo(({
    item
}): ReactElement => {
    return (
        <div className="qi-box">
            <div className="qi-img-wrap">
                <img className="qi-img" src={ item.qlogo || qqDefault } alt="头像" />
            </div>
            <div className="qi-info">
                <div className="qi-name">{ item.name || '' }</div>
                <div className="qi-qq">{ item.qq || '' }</div>
            </div>
        </div>
    )
})

export default QQInfo;