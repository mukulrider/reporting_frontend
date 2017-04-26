import React from 'react';
import EmailField from './index';
import { storiesOf, action, module } from '@kadira/storybook';

storiesOf('EmailField', module)
  .add('Default and valid', () =>
    <div>
      <EmailField label="email" fieldBlurred valueUpdated valid />
    </div>
  )
  .add('Invalid', () =>
    <div>
      <EmailField label="email" fieldBlurred valueUpdated valid={false} />
    </div>
  )
  .add('With custom placeholder', () =>
    <div>
      <EmailField
        label="email"
        fieldBlurred valueUpdated valid
        placeholder="Custom placeholder"
      />
    </div>
  )
  .add('Blurred', () =>
    <div>
      <EmailField
        label="email"
        fieldBlurred={action('input blurred')} valueUpdated valid
      />
    </div>
  )
  .add('Value updated', () =>
    <div>
      <EmailField
        label="email"
        valueUpdated={action('input valueupdated')}
        valid
      />
    </div>
  );
