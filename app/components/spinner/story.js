import React from 'react';
import Spinner from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Spinner', module)
  .add('Default', () =>
    <div>
      <Spinner />
    </div>
  );
