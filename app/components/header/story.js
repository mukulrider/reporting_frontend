import React from 'react';
import Header from './index';
import { storiesOf } from '@kadira/storybook';

storiesOf('Header', module)
  .add('Default', () =>
    <div>
      <Header />
    </div>
  );
