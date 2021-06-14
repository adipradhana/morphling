import { TinyEmitter } from 'tiny-emitter';

export type EVENTS = {
  READY: string;
  UPDATE: string;
};
export interface FeatureToggleContext {
  adapter: (keys: boolean, fallback: boolean) => [boolean];
}

export type FeatureToggleValue<T> = {
  name: string;
  isEnabled: boolean;
  metadata: T;
};

export type FeatureToggleStrategies =
  | FeatureTogglePollStrategy
  | FeatureToggleSseStrategy;

export type FeatureTogglePollStrategy = {
  type: 'poll';
  pollInterval: number;
};

export type FeatureToggleSseStrategy = {
  type: 'sse';
  pollInterval: number;
  ttl: number;
  reconnectInterval: number;
};

export interface IFeatureToggleAdapterClient<T> extends TinyEmitter {
  start: (strategy: FeatureToggleStrategies) => Promise<void>;
  stop: (strategy: FeatureToggleStrategies) => Promise<void>;
  ready: () => Promise<void>;
  getFlag: (flagName: string) => FeatureToggleValue<T> | undefined;
}

export interface IFeatureToggle<T> {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  ready: () => Promise<void>;
  update: (callback: (value: FeatureToggleValue<T>) => void) => void;
  isEnabled: (flagName: string) => boolean;
  getFlag: (flagName: string) => FeatureToggleValue<T> | undefined;
}

export interface IFeatureToggleConfig<T> {
  adapter: IFeatureToggleAdapterClient<T>;
  strategy: FeatureToggleStrategies;
}
