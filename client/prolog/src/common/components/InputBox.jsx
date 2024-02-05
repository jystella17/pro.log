import styled from 'styled-components'

const InputBox = styled.input`
    border: 0.5px solid black;
    border-radius: 5px;
    padding: 0px 10px;

    width: ${props => props.width};
    height: ${props => props.height};

    &:focus {
        outline: none;
    }

`

export default function Input({width, height, text, value, onChange}) {
    return (
        <div>
            <InputBox width={width} height={height}
                placeholder={text}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}