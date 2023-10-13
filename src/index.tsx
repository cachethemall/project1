/* @refresh reload */
import { render } from 'solid-js/web';
import type { Component } from 'solid-js';
import h from "solid-js/h";




function App() {
  return (
    <div>
      <header >

        <p>
          Edit <code>src/App.tsx</code> and save to reload 9.
        </p>
        <a
          
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};






const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(h(App), root!);
