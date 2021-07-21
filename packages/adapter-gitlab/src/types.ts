import { FlagsConfig } from 'react-unleash-flags'
import { FeatureToggleInitStrategy, FeatureTogglePollStrategy } from '@warungpintar/morphling-core'

export interface IConfig extends FlagsConfig {
  strategy: FeatureToggleInitStrategy | FeatureTogglePollStrategy;
};

export type Strategy = {
  name: string;
  parameters: Record<string, string | number | boolean>;
};

export type Metadata = {
  description: string;
  enabled: boolean;
  name: string;
  strategies: Strategy[];
};
