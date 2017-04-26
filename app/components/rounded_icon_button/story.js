import React from 'react';
import RoundedIconButton from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('RoundedIconButton', module)
.add('Default', () =>
  <div>
    <RoundedIconButton icon="menu" />
  </div>
);
