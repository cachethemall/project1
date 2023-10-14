import { h, Component, render } from "preact";
import { useState, useCallback, useRef, useEffect } from "preact/hooks";
import { exampleApexCharts } from "./exampleCode";

export function EmptyDiv(): any {
  return h("div", null, "Empty");
}

export function mainMenu() {
  const [chartElement2, chartElement2Set] = useState(
    h(exampleApexCharts, null),
  );
  let chartLibs = {
    ApexCharts: exampleApexCharts,
    "Lightweight Charts": () => null,
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
                    onClick: () => chartElement2Set(h(x[1], null)),
                  },
                  x[0],
                ),
              );
            }),
          ),
        ),
      ]),
    ),
    chartElement2,
  ];
}
