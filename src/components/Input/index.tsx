import { FC, ReactElement } from "react";
import './index.css';

interface IProps {
    type?: string,
    placeholder?: string,
    onInput: (str: string) => void;
}

const Input: FC<IProps> = ({
    type = 'text',
    placeholder = '',
    onInput
}): ReactElement => {
    const onIpt = (e : any): void => {
        const str: string = e.target.value;
        onInput(str);
    }

    return (
        <div className="ipt-wrap">
            <input className="ipt" type={ type } onInput={ onIpt } placeholder={ placeholder } />
        </div>
    )
}

export default Input;