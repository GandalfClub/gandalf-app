import * as fromUsers from './users.reducer';
import { selectUsersState } from './users.selectors';

describe('Users Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsersState({
      [fromUsers.usersFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
