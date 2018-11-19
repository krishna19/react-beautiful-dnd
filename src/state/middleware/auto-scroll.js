// @flow
import type { AutoScroller } from '../auto-scroller/auto-scroller-types';
import type { State } from '../../types';
import type { Action, Dispatch, MiddlewareStore } from '../store-types';
import isActiveDragFinishing from './util/is-active-drag-finishing';

const shouldCancel = (action: Action): boolean =>
  isActiveDragFinishing(action) || action.type === 'COLLECTION_STARTING';

export default (getScroller: () => AutoScroller) => (
  store: MiddlewareStore,
) => (next: Dispatch) => (action: Action): any => {
  if (shouldCancel(action)) {
    getScroller().cancel();
    next(action);
    return;
  }

  // auto scroll happens in response to state changes
  // releasing all actions to the reducer first
  next(action);

  const state: State = store.getState();

  // Only allowing auto scrolling in the DRAGGING phase
  if (state.phase !== 'DRAGGING') {
    return;
  }

  if (state.movementMode === 'FLUID') {
    getScroller().fluidScroll(state);
    return;
  }

  if (!state.scrollJumpRequest) {
    return;
  }

  getScroller().jumpScroll(state);
};
