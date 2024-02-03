// 1. 남색 버튼
// 로그인 / 회원가입 버튼
// 프로세스 시작하기, 불러오기, 저장
// 검색(돋보기), 새 자기소개서 추가, 

// 2. 회색 버튼
// 취소

import styled from "styled-components"

import './Components.scss'

const CommonButton = styled.button`
    display: flex;
    justify-content: space-between;
    padding: 7px 10px;
    border: none;
    border-radius: 7px;
    font-weight: 500;

`

function Button({ className, onClick, children }) {
    return (
        <CommonButton
            className={className}
            onClick={onClick}>
            {children}
        </CommonButton>

    )
}

export default Button