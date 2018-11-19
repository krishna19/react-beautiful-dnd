// @flow
import type { Action, Dispatch } from '../store-types';
import type { DimensionMarshal } from '../dimension-marshal/dimension-marshal-types';
import isActiveDragFinishing from './util/is-active-drag-finishing';

export default (getMarshal: () => DimensionMarshal) => () => (
  next: Dispatch,
) => (action: Action): any => {
  // Not stopping a collection on a 'DROP' as we want a collection to continue
  if (isActiveDragFinishing(action)) {
    const marshal: DimensionMarshal = getMarshal();
    marshal.stopPublishing();
  }

  next(action);
};
