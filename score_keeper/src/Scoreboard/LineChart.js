import React from "react";
import { ResponsiveLine } from "@nivo/line";

class LineChart extends React.Component {
  theme = {
    //fontSize: "1.25vw"
  };

  render() {
    var markers;
    if (this.props.ymax === "auto") {
      // game is to rounds
      if (typeof this.props.data[0] !== "undefined") {
        if (this.props.data[0].data.length >= this.props.gameLimit) {
          markers = [
            {
              axis: "x",
              value: this.props.gameLimit,
              lineStyle: { stroke: "#000000", strokeWidth: 1 },
              legend: "Game Over!"
            }
          ];
        } else {
          markers = [];
        }
      } else {
        markers = [];
      }
    } else {
      // game is to points
      markers = [
        {
          axis: "y",
          value: this.props.gameLimit,
          lineStyle: { stroke: "#000000", strokeWidth: 1 },
          legend: "Game Over!"
        }
      ];
    }
    return (
      <ResponsiveLine
        data={this.props.data}
        theme={this.theme}
        markers={markers}
        margin={{
          top: this.props.chartMargins[0],
          right: this.props.chartMargins[1],
          bottom: this.props.chartMargins[2],
          left: this.props.chartMargins[3]
        }}
        xScale={{ type: "point", min: "auto", max: 10 /*this.props.xmax*/ }}
        yScale={{
          type: "linear",
          stacked: false,
          min: "auto",
          max: this.props.ymax
        }}
        motionStiffness={10}
        motionDamping={5}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Round",
          legendOffset: 30,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Points",
          legendOffset: -30,
          legendPosition: "middle"
        }}
        colors={[
          "hsl(0,100%,50%)",
          "hsl(60,100%,50%)",
          "hsl(120,100%,50%)",
          "hsl(180,100%,50%)",
          "hsl(240,100%,50%)",
          "hsl(300,100%,50%)",
          "hsl(30,100%,50%)",
          "hsl(90,100%,50%)",
          "hsl(150,100%,50%)",
          "hsl(210,100%,50%)",
          "hsl(270,100%,50%)",
          "hsl(330,100%,50%)"
        ]}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 35,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      ></ResponsiveLine>
    );
  }
}

export default LineChart;
