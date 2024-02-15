import styled from 'styled-components'
import { StyleSheetManager } from "styled-components"

const InputBox = styled.input`
    border: 0.5px solid rgb(203, 203, 203);
    border-radius: 5px;
    padding: 0px 10px;

    font-size: ${props => `${props.size}`};

    width: ${props => props.width};
    height: ${props => props.height};

    &:focus {
        outline: none;
    }

`

export default function Input({width, height, text, size, value, onChange}) {
    return (
        <div>
            
                <InputBox
                    width={width}
                    height={height}
                    placeholder={text}
                    value={value}
                    onChange={onChange}
                    size={size}
                />
            
        </div>
    )
}