import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import propTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Metadata as UnleashMetadata } from '@wartech/morphling-adapter-unleash';
import { IFeatureToggle } from '@wartech/morphling-core';

interface IFeatureFlagStatus {
  isReady: boolean;
}

export interface IFeatureFlagContextValues<T> extends IFeatureFlagStatus {
  adapter?: IFeatureToggle<T>;
}

export interface ProviderProps<T> {
  adapter: IFeatureToggle<T>;
  children: ReactNode;
}

const FeatureFlagContext = createContext<
  IFeatureFlagContextValues<UnleashMetadata>
>({
  adapter: undefined,
  isReady: false,
});

const FeatureToggleProvider: React.FC<ProviderProps<UnleashMetadata>> = ({
  children,
  adapter,
}) => {
  const [flags, setFlags] = useState([]);
  const [isReady, setReady] = useState(false);
  const stateRef = useRef();
  stateRef.current = flags as any;

  const handleUpdate = (val) => {
    if (!isEqual(stateRef.current, val)) {
      setFlags(val);
    }
  };

  // initialize the client instance
  const initState = useCallback(async () => {
    adapter.start();
    adapter.ready().then(() => {
      if (!isReady) {
      }
      setReady(true);
    });
  }, [adapter]);

  useEffect(() => {
    if (isReady) {
      adapter.update(handleUpdate);
    }
  }, [isReady]);

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

const withFeatureToggle = (name: string) => (FallbackComponent: React.FC) => (
  Component: React.FC,
) => {
  const withFeatureToggle: React.FC<any> = (props) => {
    const _props = props ?? {};
    const { adapter } = React.useContext(FeatureFlagContext) ?? {};

    if (!adapter) {
      throw new Error(`featureFlag Provider is missing`);
    }

    if (adapter.isEnabled(name)) {
      return <Component {..._props} />;
    }

    return <FallbackComponent {..._props} />;
  };

  return withFeatureToggle;
};

export { FeatureFlagContext, FeatureToggleProvider, withFeatureToggle };
