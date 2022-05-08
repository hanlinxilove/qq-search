import { FC, ReactElement, useEffect, useState } from "react";
import './index.css';

interface IProps {
    value: string,
    type?: string,
    placeholder?: string,
    onInput: (str: string) => void;
}

const Input: FC<IProps> = ({
    value = '',
    type = 'text',
    placeholder = '',
    onInput
}): ReactElement => {
    const [iptVal, setIptVal] = useState(value);

    useEffect(() => {
        setIptVal(value);
    }, [value]);

    useEffect(() => {
        onInput(iptVal);
    }, [iptVal]);

    const onIpt = (e : any): void => {
        const str: string = e.target.value;
        setIptVal(str);
    };

    return (
        <div className="ipt-wrap">
            <input className="ipt" value={ iptVal } type={ type } onInput={ onIpt } placeholder={ placeholder } />
        </div>
    )
}

export default Input;