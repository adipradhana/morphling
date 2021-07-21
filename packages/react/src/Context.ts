import { IFeatureFlagContextValues } from './types';
import { createContext } from 'react';
import { Metadata as GitlabUnleashMetadata } from '@warungpintar/morphling-adapter-gitlab';

const FeatureFlagContext = createContext<
  IFeatureFlagContextValues<GitlabUnleashMetadata>
>({
  adapter: undefined,
  isReady: false,
});

export default FeatureFlagContext;
