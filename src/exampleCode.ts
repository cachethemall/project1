import ApexCharts from "apexcharts";
import { render } from 'solid-js/web';
import h from "solid-js/h";
import { createSignal, createEffect } from "solid-js";
import { ChartApp } from "./chartLib";

export function exampleApexCharts() {
    let chartContainerRef;
    createEffect(() => {
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

            let chart = new ApexCharts(chartContainerRef, options);

            chart.render();
        }
        prepare();
    }, []);
    return h("div", {
        ref: (el) => chartContainerRef = el,
    });
}

export function exampleLightWeightCharts() {
    let [dataJson, dataJsonSet] = createSignal(null);
    
    createEffect(() => {
        async function prepare() {
            let dataJson1 = await fetch("./data.json").then((response) =>
                response.json(),
            );
            dataJson1 = dataJson1.map((d) =>
                d.map((dd) => {
                    dd.time += 25200;
                    return dd;
                })
            );
            dataJsonSet(dataJson1);
        }
        prepare();
    });
    return h(ChartApp, { chartData: () => dataJson(), textData: "abc" });
}
