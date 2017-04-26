import React from 'react';
import PasswordField from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('PasswordField', module)
  .add('Default', () =>
    <div>
      <PasswordField fieldBlurred valueUpdated />
    </div>
  )
  .add('Invalid', () =>
    <div>
      <PasswordField
        valid=""
        fieldBlurred
        valueUpdated
        showConstraints="true"
        constraints="[ABC]"
      />
    </div>
  );
