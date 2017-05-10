import React from 'react';
import Notice from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Notice', module)
  .add('Success', () =>
    <div>
      <Notice type="success" />
    </div>
  )
  .add('Error', () =>
    <div>
      <Notice type="error" />
    </div>
  )
  .add('Exclamation', () =>
    <div>
      <Notice type="exclamation" />
    </div>
  );
