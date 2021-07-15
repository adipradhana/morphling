export * from '~types';
export { EVENTS } from '~constants';
import { EVENTS } from '~constants';
import {
  IFeatureToggleAdapterClient,
  IFeatureToggle,
  IFeatureToggleConfig,
  FeatureToggleValue,
} from '~types';

let adapter: FeatureToggle<any> = null;
export class FeatureToggle<T> implements IFeatureToggle<T> {
  adapter: IFeatureToggleAdapterClient<T>;
  strategy: IFeatureToggleConfig<T>['strategy'];
  isReady: boolean;

  constructor(opts: IFeatureToggleConfig<T>) {
    this.adapter = opts.adapter;
    this.strategy = opts.strategy;
    this.isReady = false;

    this.adapter.once(EVENTS.READY, () => {
      this.isReady = true;
    });
    adapter = this;
  }

  public getContext = () => ({
    adapter: this.adapter,
    strategy: this.strategy,
    isReady: this.isReady,
  });

  public ready = (): Promise<void> => {
    return this.adapter.ready();
  };

  public update = (callback) => {
    this.adapter.on(EVENTS.UPDATE, (val) => callback(val));
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

/**
 * accept two function to be switched based on
 * feature toggle key
 *
 * @param name toggle name
 * @returns function
 */
export const createFeatureToggleFn = <T>(name: string) => (
  fallbackFn: (a: T) => any,
) => (fn: (a: T) => any) => (a: T) => {
  if (!adapter) {
    console.warn(
      `undefined context, make sure instance FeatureToggle has been initiated`,
    );
    return fallbackFn(a);
  }

  if (adapter.isEnabled(name)) {
    return fn(a);
  }

  return fallbackFn(a);
};
export const createToggleFn = createFeatureToggleFn;

export default FeatureToggle;
