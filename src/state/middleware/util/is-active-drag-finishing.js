// @flow
import type { Action } from '../../store-types';

export default (action: Action): boolean =>
  action.type === 'DROP_COMPLETE' ||
  action.type === 'CLEAN' ||
  // no longer accepting changes once the drop has started
  action.type === 'DROP_ANIMATE';
