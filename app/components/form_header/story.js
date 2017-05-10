import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { FormHeader } from '../../';

storiesOf('Form Header', module)
  .add('with title and description', () =>
    <FormHeader title="Title Goes Here" description="Description goes here" />
  );
