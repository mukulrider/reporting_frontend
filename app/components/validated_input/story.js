import React from 'react';
import ValidatedInput from './index';
import { storiesOf, action, module } from '@kadira/storybook';

storiesOf('ValidatedInput', module)
  .add('Default and valid', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred
        valueUpdated
        valid
        id="id"
      />
    </div>
  )
  .add('Invalid', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred
        valueUpdated
        valid={false}
        id="id"
      />
    </div>
  )
  .add('With custom placeholder', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred valueUpdated valid
        placeholder="Custom placeholder"
        id="id"
      />
    </div>
  )
  .add('With custom error message', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred valueUpdated invalid
        clientErrorText="Invalid!!!"
        id="id"
      />
    </div>
  )
  .add('Blurred', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred={action('input blurred')} valueUpdated valid
        id="id"
      />
    </div>
  )
  .add('Value updated', () =>
    <div>
      <ValidatedInput
        label="validated input"
        valueUpdated={action('input valueupdated')}
        valid
        id="id"
      />
    </div>
  ).add('With description', () =>
    <div>
      <ValidatedInput
        label="validated input"
        fieldBlurred
        valueUpdated
        valid
        id="id"
        description="Example description"
      />
    </div>
  );
