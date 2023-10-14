import { createChart } from "lightweight-charts";
import { h, Component, render } from "preact";
import { useState, useCallback, useRef, useEffect } from "preact/hooks";

let chartDataGlobal = null;

function prepareChartDataGlobal(priceDataManyJsonStr) {
  chartDataGlobal = JSON.parse(priceDataManyJsonStr);
  chartDataGlobal = chartDataGlobal.map((d) =>
    d.map((dd) => {
      dd.time += 25200;
      return dd;
    }),
  );
}

function GetRoundNumber(price, roundDigit) {
  return ((Math.round((price * 10) ^ roundDigit) / 10) ^ roundDigit).toFixed(
    roundDigit,
  );
}

function timestampToDateString(timestamp) {
  const date = new Date(timestamp * 1000);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function TopLeftInfo(props) {
  const bar = props.currentBar;

  return h(
    "div",
    { class: "z-1 position-absolute p-1" },
    h("dl", { class: "row" }, [
      h("dt", { class: "col" }, bar?.symbol),
      h("dd", { class: "col" }, ""),
      // h("dt", { class: "col" }, "T"),
      // h(
      //   "dd",
      //   { class: "col" },
      //   bar?.time != null ? timestampToDateString(bar?.time) : null
      // ),
      h("dt", { class: "col" }, "O"),
      h("dd", { class: "col" }, bar?.open),
      h("dt", { class: "col" }, "H"),
      h("dd", { class: "col" }, bar?.high),
      h("dt", { class: "col" }, "L"),
      h("dd", { class: "col" }, bar?.low),
      h("dt", { class: "col" }, "C"),
      h("dd", { class: "col" }, bar?.close),
      h("dt", { class: "col" }, "V"),
      h("dd", { class: "col" }, bar?.volume),
    ]),
  );
}

function ChartApp(props) {
  //  const appContainerRef = useRef(null);
  const chartContainerRef = useRef(null);
  const [currentBar, currentBarSet] = useState(null);
  const [mouseEventParamData, mouseEventParamDataSet] = useState(null);

  useEffect(() => {
    const candleStickData = chartDataGlobal[0];
    const chartOptions = {
      layout: {
        textColor: "#d1d4dc",
        //backgroundColor: '#131722',
        background: { type: "solid", color: "#131722" },
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
      },
      //rightPriceScale: {
      //    borderVisible: false,
      //},
    };

    const chart = createChart(chartContainerRef.current, chartOptions);

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    });
    volumeSeries.priceScale().applyOptions({
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0.0,
      },
    });

    volumeSeries.setData(
      candleStickData.map((d) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? "#26a69a" : "#ef5350",
      })),
    );

    // Generate sample data to use within a candlestick series

    // Create the Main Series (Candlesticks)
    const mainSeries = chart.addCandlestickSeries();
    // Set the data for the Main Series
    mainSeries.setData(candleStickData);
    mainSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0.4, // lowest point will be 40% away from the bottom
      },
    });

    chart.resize(800, 600);

    const timeScale = chart.timeScale();
    timeScale.applyOptions({
      timeVisible: true,
      secondsVisible: false,
    });

    // Adding a window resize event handler to resize the chart when
    // the window size changes.
    // Note: for more advanced examples (when the chart doesn't fill the entire window)
    // you may need to use ResizeObserver -> https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
    //window.addEventListener("resize", () => {
    //    chart.resize(window.innerWidth, window.innerHeight);
    //});

    currentBarSet(candleStickData[candleStickData.length - 1]);

    const getLastBar = (series) => {
      const lastIndex = series.dataByIndex(Math.Infinity, -1);
      return series.dataByIndex(lastIndex);
    };

    chart.subscribeCrosshairMove(function (mouseEventParam) {
      const validCrosshairPoint = !(
        mouseEventParam === undefined ||
        mouseEventParam.time === undefined ||
        mouseEventParam.point.x < 0 ||
        mouseEventParam.point.y < 0
      );
      const bar = validCrosshairPoint
        ? candleStickData.find((d) => d.time === mouseEventParam.time)
        : candleStickData.at(-1);

      currentBarSet(bar);
      mouseEventParamDataSet(mouseEventParam);
      return () => {
        chart.remove();
      };
    });
  }, []);

  return h("div", { class: "container-fluid" }, [
    h(
      "div",
      { class: "row" },
      h("div", { class: "col" }, [
        h(TopLeftInfo, {
          currentBar,
          mouseEventParamData,
        }),
        h("div", {
          id: "chartContainer",
          class: "z-0 position-absolute",
          ref: chartContainerRef,
        }),
      ]),
    ),
    h("div", { class: "row" }, [h("div", { class: "col" })]),
  ]);
}

export function showChart(dataJsonStr) {
  prepareChartDataGlobal(dataJsonStr);
  render(
    h(ChartApp, { dataJsonStr: dataJsonStr }),
    document.getElementById("appContainer"),
  );
}
