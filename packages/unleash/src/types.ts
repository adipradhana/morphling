import { FlagsConfig } from 'react-unleash-flags'

export interface IConfig extends FlagsConfig {
  appName: string;
  instanceId: string;
  url: string;
}

export type Strategy = {
    name: string;
    parameters: Record<string, string | number | boolean>;
  }

export type Metadata = {
  description: string;
  enabled: boolean;
  name: string;
  strategies: Strategy[];
};
