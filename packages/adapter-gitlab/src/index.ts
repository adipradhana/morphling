export * from '~types';
import {
  IFeatureToggleAdapterClient,
  FeatureToggleValue,
  FeatureTogglePollStrategy,
  EVENTS,
} from '@warungpintar/morphling-core';
import { IConfig as IGitlabUnleashConfig, Metadata } from '~types';
import { FlagsClient } from 'react-unleash-flags';
import { TinyEmitter } from 'tiny-emitter';

const DEFAULT_POLL_INTERVAL = 5 * 60000;
const SUPPORTED_STRATEGY_TYPES = ['init', 'poll'];

export default class GitlabUnleash extends TinyEmitter
  implements IFeatureToggleAdapterClient<Metadata> {
  client: FlagsClient;
  opts: IGitlabUnleashConfig;
  timerRef?: NodeJS.Timeout;
  isReady: boolean;

  SUPPORTED_STRATEGY_TYPES = {
    init: 'init',
    poll: 'poll',
  };

  constructor(opts: IGitlabUnleashConfig) {
    super();
  
    this._checkValidStrategy(opts.strategy?.type);
  
    this.opts = opts;
    this.client = new FlagsClient(opts);
    this.isReady = false;
    this.timerRef = undefined;
  }

  public start = (): Promise<void> => {
    const { strategy } = this.opts;

    switch (strategy.type) {
      case this.SUPPORTED_STRATEGY_TYPES.init:
        return this._handleStartInit();
      case this.SUPPORTED_STRATEGY_TYPES.poll:
        return this._handleStartPolling();
      default:
        throw new Error(`Strategy is recognize! Gitlab adapter only support ${Object.keys(this.SUPPORTED_STRATEGY_TYPES).join(', ')}`);
    }
  };

  public stop = (): Promise<void> => {
    const { strategy } = this.opts;
  
    switch (strategy.type) {
      case 'init':
        return this._handleStopInit();
      case 'poll':
        return this._handleStopPolling();
      default:
        throw new Error(`Strategy is recognize! Gitlab adapter only support ${Object.keys(this.SUPPORTED_STRATEGY_TYPES).join(', ')}`);
    }
  };

  public ready = (): Promise<void> => {
    if (this.isReady) {
      return Promise.resolve();
    }

    return new Promise((resolve) => this.once(EVENTS.READY, resolve));
  };

  private _handleStartInit = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.fetchFlags();
        this.isReady = true;
        this.emit(EVENTS.READY);
        resolve();
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  };

  private _handleStopInit = (): Promise<void> => {
    return Promise.resolve();
  };

  private _handleStartPolling = (): Promise<void> => {
    const strategy = this.opts.strategy as FeatureTogglePollStrategy;

    return new Promise(async (resolve, reject) => {
      try {
        await this._handleStopPolling();
        const interval = strategy.pollInterval  || DEFAULT_POLL_INTERVAL;
        await this.fetchFlags();
        this.isReady = true;
        this.emit(EVENTS.READY);
        this.timerRef = setInterval(this.polling, interval);
        resolve();
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  };

  private _handleStopPolling = (): Promise<void> => {
    if (this.timerRef) {
      clearInterval(this.timerRef);
      this.timerRef = undefined;
    }
    return Promise.resolve();
  };

  private _checkValidStrategy(type: string) {
    if (!SUPPORTED_STRATEGY_TYPES.includes(type)) {
      throw Error('[morphling] No type provided or type is not supported!');
    }
  }

  private _massageData = (original: Metadata): FeatureToggleValue<Metadata> => {
    return {
      name: original.name,
      isEnabled: original.enabled,
      metadata: original,
    };
  };

  public getFlag = (
    flagName: string,
  ): FeatureToggleValue<Metadata> | undefined => {
    const flag = this.client.getFlag(flagName);
    return flag ? this._massageData(flag) : undefined;
  };

  private fetchFlags = (): Promise<FeatureToggleValue<Metadata>[]> => {
    return new Promise(async (resolve) => {
      await this.client.init();
      const massagedFlags = this.client.getFlags().map(this._massageData);
      resolve(massagedFlags);
    });
  };

  private polling = async () => {
    const newPayload = await this.fetchFlags();
    this.emit(EVENTS.UPDATE, newPayload);
  };
}
