import React from 'react';
import Checkbox from './index';
import { storiesOf } from '@kadira/storybook';

storiesOf('Checkbox', module)
  .add('Default', () =>
    <div>
      <Checkbox id="1" />
    </div>
  )
  .add('Is disabled', () =>
    <div>
      <Checkbox id="2" isDisabled isValid />
    </div>
  )
  .add('Valid', () =>
    <div>
      <Checkbox id="3" valid="true" />
    </div>
  )
  .add('Invalid', () =>
    <div>
      <Checkbox id="4" />
    </div>
  )
  .add('Label', () =>
    <div>
      <Checkbox id="5" valid="true" label={'Text label'} />
    </div>
  );
