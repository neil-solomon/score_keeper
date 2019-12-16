import React from "react";
import { ResponsiveLine } from "@nivo/line";

class LineChart extends React.Component {
  render() {
    return (
      <ResponsiveLine
        data={this.props.data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        xScale={{ type: "point", min: "auto", max: "auto" }}
        yScale={{
          type: "linear",
          stacked: false,
          min: "auto",
          max: "auto"
        }}
        motionStiffness={100}
        motionDamping={10}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 75,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -75,
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
