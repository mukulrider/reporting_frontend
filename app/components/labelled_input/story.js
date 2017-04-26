import React from 'react';
import LabelledInput from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('LabelledInput', module)
  .add('Default', () =>
    <div>
      <LabelledInput label="Some label with input" type="text" />
    </div>
  );
