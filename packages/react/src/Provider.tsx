import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import { Metadata as GitlabUnleashMetadata } from '@warungpintar/morphling-adapter-gitlab';
import { ProviderProps } from './types';
import FeatureFlagContext from './Context';

const FeatureToggleProvider: React.FC<ProviderProps<GitlabUnleashMetadata>> = ({
  children,
  adapter,
}) => {
  const [isReady, setReady] = useState(false);
  // initialize the client instance
  const initState = useCallback(async () => {
    adapter.start();
    adapter.ready().then(() => {
      setReady(true);
    });
  }, [adapter]);

  // call the init on load
  useEffect(() => {
    initState();

    return () => {
      adapter.stop();
    };
  }, [initState]);

  return (
    <FeatureFlagContext.Provider value={{ adapter, isReady }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

FeatureToggleProvider.propTypes = {
  adapter: propTypes.any,
};

export default FeatureToggleProvider;
