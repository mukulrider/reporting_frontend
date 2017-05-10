import React from 'react';
import Logo from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Logo', module)
  .add('Default', () =>
    <div >
      <Logo />
    </div>
  );
