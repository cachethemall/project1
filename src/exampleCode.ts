import ApexCharts from "apexcharts";
import { h, Component, render } from "preact";
import { useState, useCallback, useRef, useEffect } from "preact/hooks";

export function exampleApexCharts() {
  const chartContainerRef = useRef(null);
  useEffect(() => {
    async function prepare() {
      let dataJson = await fetch("./data.json").then((response) =>
        response.json(),
      );
      let candleData = dataJson[0].map((x, index) => [
        index,
        x.open,
        x.high,
        x.low,
        x.close,
      ]);

      var options = {
        chart: {
          type: "candlestick",
        },
        series: [
          {
            name: "sales",
            data: candleData,
          },
        ],
        // xaxis: {
        //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        // },
      };

      let chart = new ApexCharts(chartContainerRef.current, options);

      chart.render();
    }
    prepare();
  }, []);
  return h("div", {
    ref: chartContainerRef,
  });
}
