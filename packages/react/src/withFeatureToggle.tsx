import React from 'react';
import ContextProvider from './Context';

const withFeatureToggle =
  (name: string) => (FallbackComponent: React.FC) => (Component: React.FC) => {
    const WithFeatureToggle: React.FC<any> = (props) => {
      const _props = props ?? {};
      const { adapter } = React.useContext(ContextProvider) ?? {};

      if (!adapter) {
        throw new Error(`featureFlag Provider is missing`);
      }

      console.log('adapter.isEnabled(name)', name, adapter.isEnabled(name));

      if (adapter.isEnabled(name)) {
        return <Component {..._props} />;
      }

      return <FallbackComponent {..._props} />;
    };

    return WithFeatureToggle;
  };

export default withFeatureToggle;
