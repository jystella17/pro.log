import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import "./Dashboard.scss";

function ProgressBarBox() {
  const essay = {
    // store에서 배열을 가져와서 count세기
    percent: 60, // is require
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
    // store에서 배열을 가져와서 count세기
    percent: 40, // is require
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
    // store에서 배열을 가져와서 count세기
    percent: 40, // is require
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
    percent: 20, // is require
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
        <p>Result</p>
        <CircularProgressBar {...result} />
      </div>
    </div>
  );
}

export default ProgressBarBox;
