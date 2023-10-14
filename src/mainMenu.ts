
import { render } from 'solid-js/web';
import h from "solid-js/h";
import { createSignal } from "solid-js";
import { exampleApexCharts, exampleLightWeightCharts } from "./exampleCode";

export function EmptyDiv(): any {
  return h("div", null, "Empty");
}

export function mainMenu() {
  const [chartElement2, chartElement2Set] = createSignal(
    h(EmptyDiv, null),
  );
  let chartLibs = {
    ApexCharts: exampleApexCharts,
    "Lightweight Charts": exampleLightWeightCharts,
    Empty: EmptyDiv,
  };
  return [
    h(
      "nav",
      { class: "navbar navbar-expand-sm bg-body-tertiary" },
      h("div", { class: "container-fluid" }, [
        h("a", { class: "navbar-brand", href: "#" }, "Chart"),
        h(
          "div",
          { class: "collapse navbar-collapse", id: "navbarNav" },
          h(
            "ul",
            { class: "navbar-nav" },
            Object.entries(chartLibs).map((x) => {
              return h(
                "li",
                { class: "nav-item" },
                h(
                  "a",
                  {
                    class: "nav-link",
                    onClick: (e) => {
                        console.log('Set set');
                        chartElement2Set(h(x[1], null));},
                  },
                  x[0],
                ),
              );
            }),
          ),
        ),
      ]),
    ),
    () => chartElement2(),
  ];
}
