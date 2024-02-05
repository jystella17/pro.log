import styled from 'styled-components'

const InputBox = styled.input`
    border: none;
    border-radius: 10px;
    background-color: rgb(245, 245, 245);
    font-size: x-large;
    text-align: center;

    width: ${props => `${props.wid}`};
    height: ${props => `${props.hei}`};

    &:focus {
        outline: none;
    }

`

export default function Input({wid, hei}) {
    return (
        <div>
            <InputBox wid={wid} hei={hei} />
        </div>
    )
}