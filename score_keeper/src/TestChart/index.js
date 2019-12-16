import React from "react";
import LineChart from "./LineChart.js";

class TestChart extends React.Component {
  state = {
    data: [
      {
        id: "fuck you",
        data: []
      },
      {
        id: "fuck him",
        data: []
      },
      {
        id: "fuck me",
        data: []
      }
    ]
  };

  makeData = () => {
    var randomNumber = (Math.random() * 1000000) % 100;
    var data = [...this.state.data],
      data0 = [],
      data1 = [],
      data2 = [];
    for (let i = 0; i < 10; ++i) {
      data0.push({ x: i, y: (Math.random() * 1000000) % 100 });
      data1.push({ x: i, y: (Math.random() * 1000000) % 100 });
      data2.push({ x: i, y: (Math.random() * 1000000) % 100 });
    }
    data[0].data = data0;
    data[1].data = data1;
    data[2].data = data2;
    this.setState({ data });
  };

  render() {
    return (
      <div className="mainContainer">
        <h1 style={{ fontSize: "30px" }}>TEST MY SHIT BITCH</h1>
        <h2
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={this.makeData}
        >
          Randomize my shit bitch
        </h2>
        <div style={{ width: "100vw", height: "30vw" }}>
          <LineChart data={this.state.data}></LineChart>
        </div>
      </div>
    );
  }
}

export default TestChart;
