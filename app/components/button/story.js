import React from 'react';
import Button from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Button', module)
  .add('Default', () =>
    <div>
      <Button />
    </div>
  )
  .add('with content', () =>
    <div>
      <Button>
        Button
      </Button>
    </div>
  );
