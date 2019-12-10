import React from "react";
import { ResponsiveLine } from "@nivo/line";

class LineChart extends React.Component {
  render() {
    return (
      <ResponsiveLine
        data={this.props.data}
        margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
        xScale={{ type: "point", min: "auto", max: "auto" /*this.props.xmax*/ }}
        yScale={{
          type: "linear",
          stacked: false,
          min: 0,
          max: "auto"
        }}
        motionStiffness={30}
        motionDamping={10}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Rolls",
          legendOffset: 75,
          legendPosition: "middle"
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Armies Remaining",
          legendOffset: -50,
          legendPosition: "middle"
        }}
        colors={["hsl(0,75%,50%)", "hsl(250,75%,50%)"]}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
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
