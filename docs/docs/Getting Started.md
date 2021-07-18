---
sidebar_position: 1
---

## Install Dependencies

before installing dependencies make sure you already setup the `~/.npmrc` or `~/.yarnrc` head to https://gitlab.warungpintar.co/warungpintar/feature-toggle/-/packages/84 for more details

```shell
yarn add @warungpintar/morphling-core @warungpintar/morphling-unleash-adapter @warungpintar/morphling-react
```

## Setup Feature Flags ( gitlab )

### 1. Open Operations menu in sidebar and click **Feature Flags**

![locate feature toggle menu](/img/getting-started/locate-feature-toggle-menu.png)

### 2. Click configure button

![locate feature toggle menu](/img/getting-started/configure-button.png)

after clicking **configure button** now you should see modal that shows **url** and **instanceId**

![locate feature toggle menu](/img/getting-started/modal.png)

copy that **api url** and **instanceId** to used in Provider

## Setup Provider ( React )

open your root component to setup morphling provider, for example `Nextjs` use `pages/_app.tsx`

lets pretend this is the config that we got after setting up gitlab unleash from previous step

```
apiUrl=https://gitlab.warungpintar.co/api/v4/feature_flags/unleash/101
instanceId=sSgwm_mP7sH-kjasdhs
```

```tsx
import React from 'react';
import { FeatureToggleProvider } from '@warungpintar/morphling-react';
import Unleash, {
  Metadata,
  IConfig,
} from '@warungpintar/morphling-adapter-unleash';
import FeatureToggle, { IFeatureToggle } from '@warungpintar/morphling-core';

const config: IConfig = {
  url: 'https://gitlab.warungpintar.co/api/v4/feature_flags/unleash/101',
  instanceId: 'sSgwm_mP7sH-kjasdhs',
  // appName is environment
  appName: process.env.NODE_ENV ?? 'staging',
};

const featureToggleClient: IFeatureToggle<Metadata> = new FeatureToggle({
  adapter: new Unleash(config),
  strategy: {
    type: 'init',
  },
});

const App = (props) => {
  return (
    <FeatureToggleProvider adapter={featureToggleClient}>
      {props.children}
    </FeatureToggleProvider>
  );
};
```
