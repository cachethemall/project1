/* @refresh reload */
import { render } from 'solid-js/web';
import type { Component } from 'solid-js';
import h from "solid-js/h";
import { App } from "./App";










const root = document.getElementById('appContainer');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(h(App), root!);
