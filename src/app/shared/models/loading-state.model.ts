import { loadingState } from '../constants/loading-state.constant';

export type LoadingState = (typeof loadingState)[keyof typeof loadingState];
