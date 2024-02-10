import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { Switch } from "antd";

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
  return (
    <Body>
      <InfoComponent title="이름" inputType="text"></InfoComponent>
      <InfoComponent
        title="닉네임"
        explain="채팅에 사용되는 닉네임을 입력해주세요"
        inputType="text"
      ></InfoComponent>
      <InfoComponent title="이메일" inputType="email"></InfoComponent>
      {/* tel이 입력안되는 브라우저는 text가 입력됨 */}
      <InfoComponent title="전화번호" inputType="tel"></InfoComponent>
      <InfoComponent title="프로필 사진" explain="내 정보 사진에 표시됩니다."></InfoComponent>
      <InfoComponent title="공고를 표시할 직군"></InfoComponent>
      {/* 희망기업을 어떻게 받아야하지..? input은 안되고.. 태그..? */}
      <InfoComponent
        title="희망하는 기업(최대 3개)"
        explain="공고가 올라오면 알람을 보내드려요."
      ></InfoComponent>
    </Body>
  );
}

export default MyInfoBody;
