import React from 'react';
import Label from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Label', module)
  .add('Default', () =>
    <div>
      <Label text="Some label" />
    </div>
  );
