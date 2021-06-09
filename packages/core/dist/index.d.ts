export * from "./types";
import { IFeatureToggleAdapterClient, IFeatureToggle, IFeatureToggleConfig, FeatureToggleValue } from "./types";
export declare const EVENTS: {
    READY: string;
};
export default class FeatureToggle<T> implements IFeatureToggle<T> {
    'adapter': IFeatureToggleAdapterClient<T>;
    'strategy': IFeatureToggleConfig<T>['strategy'];
    'isReady': boolean;
    constructor(opts: IFeatureToggleConfig<T>);
    ready: () => Promise<void>;
    isEnabled(flagName: string): boolean;
    getFlag(flagName: string): FeatureToggleValue<T> | undefined;
    start(): Promise<void>;
    stop(): Promise<void>;
}
