export const loadingState = {
  INITIAL: 'initial',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export type LoadingState = (typeof loadingState)[keyof typeof loadingState];
