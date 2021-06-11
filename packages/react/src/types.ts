import { ReactNode } from 'react';
import { IFeatureToggle } from '@wartech/morphling-core';

interface IFeatureFlagStatus {
  isReady?: boolean;
}

export interface IFeatureFlagContextValues<T> extends IFeatureFlagStatus {
  adapter?: IFeatureToggle<T>;
}

export interface ProviderProps<T> {
  adapter: IFeatureToggle<T>;
  children: ReactNode;
}
