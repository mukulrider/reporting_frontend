import React from 'react';
import Panel from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Panel', module)
  .add('Default', () =>
    <div>
      <Panel> Panel </Panel>
    </div>
  );
