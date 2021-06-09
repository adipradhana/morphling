import { TinyEmitter } from 'tiny-emitter';
export interface FeatureToggleContext {
    adapter: (keys: boolean, fallback: boolean) => [boolean];
}
export declare type FeatureToggleValue<T> = {
    name: string;
    isEnabled: boolean;
    metadata: T;
};
export declare type FeatureToggleStrategies = FeatureTogglePollStrategy | FeatureToggleSseStrategy;
export declare type FeatureTogglePollStrategy = {
    type: 'poll';
    pollInterval: number;
};
export declare type FeatureToggleSseStrategy = {
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
    start: (strategy: FeatureToggleStrategies) => Promise<void>;
    stop: (strategy: FeatureToggleStrategies) => Promise<void>;
    ready: () => Promise<void>;
    isEnabled: (flagName: string) => boolean;
    getFlag: (flagName: string) => FeatureToggleValue<T> | undefined;
}
export interface IFeatureToggleConfig<T> {
    adapter: IFeatureToggleAdapterClient<T>;
    strategy: FeatureToggleStrategies;
}
