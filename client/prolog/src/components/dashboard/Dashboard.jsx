import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import "./Dashboard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
// 로그인 인증 토큰이 포함된 axios interceptor
import api from "../login/Axios";

function ProgressBarBox() {
  const [data, setData] = useState();

  useEffect(() => {
    api
      .get("https://i10b112.p.ssafy.io/api/process")
      .then((response) => {
        setData(response.data);
        // console.log(response.data, "what is this");
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
      });
  }, []);

  if (data === undefined) {
  } else {
    const length = data.length;

    let paperLen = 0;
    let testLen = 0;
    let interviewLen = 0;
    let passLen = 0;
    let failLen = 0;

    for (let i = 0; i < length; i++) {
      const element = data[i];
      if (element.step === "paper" || element.step === "assay") {
        paperLen += 1;
      } else if (element.step === "test") {
        testLen += 1;
      } else if (element.step === "interview") {
        interviewLen += 1;
      } else if (element.step === "pass") {
        passLen += 1;
      } else if (element.step === "fail") {
        failLen += 1;
      }
    }

    // let paperPerc = Math.round((paperLen / length) * 100);
    // let testPerc = Math.round((testLen / length) * 100);
    // let interviewPerc = Math.round((interviewLen / length) * 100);
    // let resultPerc = Math.round((passLen / (passLen + failLen)) * 100);

    const newLen = length - (passLen + failLen);

    let paperPerc = Math.round((paperLen / newLen) * 100);
    let testPerc = Math.round((testLen / newLen) * 100);
    let interviewPerc = Math.round((interviewLen / newLen) * 100);
    let resultPerc = Math.round((passLen / (passLen + failLen)) * 100);
    // console.log("카드 수", length, newLen);
    // console.log("서류 수", paperLen);
    // console.log("테스트 수", testLen);
    // console.log("면접 수", interviewLen);
    // console.log("합 수", passLen);
    // console.log("불 수", failLen);

    const essay = {
      percent: paperPerc, // is require
      colorSlice: "#4D4C7D",
      colorCircle: "#f4f4f4",
      fontColor: "#000000",
      fontSize: "18px",
      fontWeight: 600,
      size: 200,
      stroke: 10,
      strokeBottom: 10,
      speed: 60,
      cut: 0,
      rotation: -90,
      fill: "none",
      unit: "%",
      animationOff: false,
      inverse: false,
      round: true,
      number: true,
    };

    const test = {
      percent: testPerc, // is require
      colorSlice: "#4D4C7D",
      colorCircle: "#f4f4f4",
      fontColor: "#000000",
      fontSize: "18px",
      fontWeight: 600,
      size: 200,
      stroke: 10,
      strokeBottom: 10,
      speed: 60,
      cut: 0,
      rotation: -90,
      fill: "none",
      unit: "%",
      animationOff: false,
      inverse: false,
      round: true,
      number: true,
    };
    const interview = {
      percent: interviewPerc, // is require
      colorSlice: "#4D4C7D",
      colorCircle: "#f4f4f4",
      fontColor: "#000000",
      fontSize: "18px",
      fontWeight: 600,
      size: 200,
      stroke: 10,
      strokeBottom: 10,
      speed: 60,
      cut: 0,
      rotation: -90,
      fill: "none",
      unit: "%",
      animationOff: false,
      inverse: false,
      round: true,
      number: true,
    };

    const result = {
      // store에서 배열을 가져와서 count세기
      percent: resultPerc, // is require
      colorSlice: "#F99417",
      colorCircle: "#f4f4f4",
      fontColor: "#000000",
      fontSize: "18px",
      fontWeight: 600,
      size: 200,
      stroke: 10,
      strokeBottom: 10,
      speed: 60,
      cut: 0,
      rotation: -90,
      fill: "none",
      unit: "%",
      animationOff: false,
      inverse: false,
      round: true,
      number: true,
    };

    return (
      <div className="progressbars">
        <div className="progressbar">
          <p>Essay</p>
          <CircularProgressBar {...essay} />
        </div>
        <div className="progressbar">
          <p>Test</p>
          <CircularProgressBar {...test} />
        </div>
        <div className="progressbar">
          <p>Interview</p>
          <CircularProgressBar {...interview} />
        </div>
        <div className="progressbar">
          <p>Pass rate</p>
          <CircularProgressBar {...result} />
        </div>
      </div>
    );
  }
}

export default ProgressBarBox;
