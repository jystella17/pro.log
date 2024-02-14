import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import loginedUser from "../components/store/atom";

function Test() {
  // const loginedUserInfo = useRecoilValue(loginedUser);
  const [info, setInfo] = useRecoilState(loginedUser);
  console.log(info);

  useEffect(() => {
    console.log(info);
  }, [info]);
  // if (!info) {
  //   return <div>로그인 정보가 없습니다.</div>;
  // }

  return (
    <div>
      <h1>사용자 프로필</h1>
      {/* 사용자 정보 렌더링 */}
      <div>이름: {info.nickname}</div>
      <div>이메일: {info.email}</div>
    </div>
  );
}

export default Test;
