import React from 'react'
import ReactDOM from 'react-dom'
import { FeatureToggleProvider } from '@warungpintar/morphling-react';
import GitlabUnleash, { Metadata, IConfig } from '@warungpintar/morphling-adapter-gitlab';
import FeatureToggle, { IFeatureToggle } from '@warungpintar/morphling-core';
import './index.css'
import App from './App'

const flagConfig: IConfig = {
  url: import.meta.env.VITE_MORPHLING_URL,
  appName: import.meta.env.VITE_MORPHLING_APP_NAME,
  instanceId: import.meta.env.VITE_MORPHLING_INTANCE_ID,
  strategy: {
    type: 'poll',
    pollInterval: 5000, //milisec
  },
};

const ffClient: IFeatureToggle<Metadata> = new FeatureToggle({
  adapter: new GitlabUnleash(flagConfig),
});

ReactDOM.render(
  <React.StrictMode>
    <FeatureToggleProvider adapter={ffClient}>
      <App />
    </FeatureToggleProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
