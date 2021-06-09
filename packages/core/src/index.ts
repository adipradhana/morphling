export * from "~types";
import { IFeatureToggleAdapterClient, IFeatureToggle, IFeatureToggleConfig, FeatureToggleValue } from "~types";

export const EVENTS = {
  READY: 'ready',
};

export default class FeatureToggle<T> implements IFeatureToggle<T> {
  'adapter': IFeatureToggleAdapterClient<T>;
  'strategy': IFeatureToggleConfig<T>['strategy'];
  'isReady': boolean;

  constructor(opts: IFeatureToggleConfig<T>) {
    this.adapter = opts.adapter;
    this.strategy = opts.strategy;
    this.isReady = false;

    this.adapter.once(EVENTS.READY, () => {
      this.isReady = true;
    });
  }

  public ready = (): Promise<void> => {
    return this.adapter.ready();
  };

  public isEnabled(flagName: string): boolean {
    return this.adapter.getFlag(flagName)?.isEnabled || false;
  }

  public getFlag(flagName: string): FeatureToggleValue<T> | undefined {
    return this.adapter.getFlag(flagName);
  }

  public start() {
    return this.adapter.start(this.strategy);
  }

  public stop() {
    return this.adapter.stop(this.strategy);
  }
}
