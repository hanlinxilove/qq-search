import { FC, ReactElement, useEffect, useState } from "react";
import './index.css';
import { useDebounce } from '../../utils/utils';

interface IProps {
    value: string,
    type?: string,
    wait?: number,
    placeholder?: string,
    onInput: (str: string) => void;
}

const Input: FC<IProps> = ({
    value = '',
    type = 'text',
    wait = 600,
    placeholder = '',
    onInput
}): ReactElement => {
    const [iptVal, setIptVal] = useState(value);
    const debounceVal = useDebounce(iptVal, wait);

    useEffect(() => {
        setIptVal(value);
    }, [value]);

    useEffect(() => {
        onInput(debounceVal);
    }, [debounceVal]);

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