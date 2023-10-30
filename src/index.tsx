import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { setupStore } from '@store/setup'
import '@styles/index.scss'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'

const domNode = document.getElementById('root')
const root = createRoot(domNode!!)
const store = setupStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme preset={presetGpnDefault}>
        <App />
      </Theme>
    </Provider>
  </React.StrictMode>
)
