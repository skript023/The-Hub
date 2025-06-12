import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

Object.defineProperty(window, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    get() {
      return undefined;
    },
    set() {}
});

ReactDOM.createRoot(document.getElementById('app-entry')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
