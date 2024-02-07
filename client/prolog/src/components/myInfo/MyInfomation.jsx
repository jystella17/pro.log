import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { Switch } from "antd";
// 헤더
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button";

// const Container = styled.div`
//   margin: 0 auto;
//   padding: 40px 50px;
//   width: 60vw;
//   min-height: 100vh;
// `;

const Header = styled.div`
  padding: 0px 10px;
  display: flex;
  margin: 50px 0;
  justify-content: space-between;
  & div {
    color: #686767;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;

const Body = styled.div`
  /* display: flex; */
  margin-top: 40px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  padding: 25px 30px 25px 0px;
  border-top: 1px solid lightgray;
  min-height: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  & p {
    margin: 2px 0;
    font-size: x-small;
    color: #8d8c8c;
  }
`;

const InputContent = styled.input`
  /* placeholder로 icon넣기 */
  padding-left: 10px;
  width: 30vw;
  height: 30px;
  border: 2px solid lightgray;
  border-radius: 5px;
`;

const OtherContent = styled.div`
  display: flex;
  gap: 15px;
  width: 30vw;
`;

// 사진 업로드 ant design
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function UploadPicture() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    // 파일 리스트가 1을 초과하지 않도록 설정
    const updatedFileList = newFileList.slice(-1); // 마지막 파일만 유지
    setFileList(updatedFileList);
  };

  const uploadButton =
    fileList.length >= 1 ? null : ( // 파일이 이미 있으면 업로드 버튼 숨김
      <button
        style={{
          border: 0,
          background: "none",
          width: "30vw",
        }}
        type="button"
      >
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload Picture!</div>
      </button>
    );

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}

// 토글버튼 ant design
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
function Toggle() {
  return <Switch defaultChecked onChange={onChange} style={{ backgroundColor: "#F99417" }} />;
}

function InfoComponent({ title, explain, inputType }) {
  if (title === "프로필 사진") {
    return (
      <Info>
        <Title>
          <div>{title}</div>
          <p>{explain}</p>
        </Title>
        <OtherContent>
          <UploadPicture></UploadPicture>
        </OtherContent>
      </Info>
    );
  } else if (title === "공고를 표시할 직군") {
    return (
      <Info>
        <Title>
          <div>{title}</div>
        </Title>
        <OtherContent>
          <div>모든 직군 보기</div>
          <Toggle></Toggle>
          <div>개발 직군만 보기</div>
        </OtherContent>
      </Info>
    );
  } else {
    return (
      <Info>
        <Title>
          <div>{title}</div>
          <p>{explain}</p>
        </Title>
        <InputContent type={inputType} />
      </Info>
    );
  }
}

function MyInfoBody() {
  const navigate = useNavigate();
  function NavigateToMain() {
    navigate("/");
  }

  // const [userInfo, setUserInfo] = useState({
  //   name: "",
  //   nickname: "",
  //   email: "",
  //   develop: false,
  // });

  // function handleInputChange(e) {
  //   const { name, value } = e.target;
  //   setUserInfo((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }

  // userInfo db에 저장
  function handleSaveInfo() {
    window.alert("저장되었습니다.");
  }

  return (
    <div>
      <Header>
        <div>닉네임, 프로필 사진 등 개인정보를 업데이트 하세요</div>
        <Buttons>
          {/* onClick 저장 -> db에 저장 */}
          <Button className="grey" children="취소하기" onClick={NavigateToMain} />
          <Button className="navy" children="저장하기" onClick={handleSaveInfo} />
        </Buttons>
      </Header>

      <Body>
        <InfoComponent title="이름" inputType="text" name="name"></InfoComponent>
        <InfoComponent
          title="닉네임"
          explain="채팅에 사용되는 닉네임을 입력해주세요"
          inputType="text"
          name="nickname"
        ></InfoComponent>
        <InfoComponent title="이메일" inputType="email" name="email"></InfoComponent>
        {/* tel이 입력안되는 브라우저는 text가 입력됨 */}
        <InfoComponent title="전화번호" inputType="tel"></InfoComponent>
        <InfoComponent title="프로필 사진" explain="내 정보 사진에 표시됩니다."></InfoComponent>
        <InfoComponent title="공고를 표시할 직군" name="develop"></InfoComponent>
        {/* <InfoComponent
            title="희망하는 기업(최대 3개)"
            explain="공고가 올라오면 알람을 보내드려요."
          ></InfoComponent> */}
      </Body>
    </div>
  );
}

export default MyInfoBody;
