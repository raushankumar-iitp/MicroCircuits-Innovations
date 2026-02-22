import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'

console.log("Attempting to render React App...");
try {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
} catch (error) {
    console.error("CRITICAL RENDER ERROR:", error);
    document.body.innerHTML = `<div style='color:red; padding:20px; font-size:20px'><h1>CRITICAL ERROR</h1><pre>${error.message}</pre></div>`;
}
