import React from 'react';
import ErrorText from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('ErrorText', module)
  .add('Default hidden', () =>
    <div>
      <ErrorText text="Error text" />
    </div>
  )
  .add('Visible', () =>
    <div>
      <ErrorText text="Error text" visuallyHidden={false} />
    </div>
  );
