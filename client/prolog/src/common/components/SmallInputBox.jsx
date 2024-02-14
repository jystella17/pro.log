import styled from 'styled-components'

const InputBox = styled.input`
    border: none;
    border-radius: 5px;
    background-color: #7077A1;
    color: white;
    font-size: ${props => `${props.size}`};
    text-align: center;

    width: ${props => `${props.width}`};
    height: ${props => `${props.height}`};

    &:focus {
        outline: none;
    }

`

export default function SmallInputBox({width, height, size, value, onChange}) {
    return (
        <div>
            <InputBox
                width={width} height={height} size={size}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}