import { IFeatureFlagContextValues } from './types';
import { createContext } from 'react';
import { Metadata as UnleashMetadata } from '@warungpintar/morphling-adapter-unleash';

const FeatureFlagContext = createContext<
  IFeatureFlagContextValues<UnleashMetadata>
>({
  adapter: undefined,
  isReady: false,
});

export default FeatureFlagContext;
