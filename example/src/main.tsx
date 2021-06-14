import React from 'react'
import ReactDOM from 'react-dom'
import { FeatureToggleProvider } from '@wartech/morphling-react';
import Unleash, { Metadata, IConfig } from '@wartech/morphling-adapter-unleash';
import FeatureToggle, { IFeatureToggle } from '@wartech/morphling-core';
import './index.css'
import App from './App'

const flagConfig: IConfig = {
  url: import.meta.env.VITE_MORPHLING_URL,
  appName: import.meta.env.VITE_MORPHLING_APP_NAME,
  instanceId: import.meta.env.VITE_MORPHLING_INTANCE_ID,
};

const ffClient: IFeatureToggle<Metadata> = new FeatureToggle({
  adapter: new Unleash(flagConfig),
  // strategy: {
  //   type: 'poll',
  //   pollInterval: 5000, //milisec
  // },
  strategy: {
    type: 'init'
  },
});

ReactDOM.render(
  <React.StrictMode>
    <FeatureToggleProvider adapter={ffClient}>
      <App />
    </FeatureToggleProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
