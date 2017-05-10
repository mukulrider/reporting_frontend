import React from 'react';
import ToggleMaskButton from './index';
import { storiesOf } from '@kadira/storybook';

storiesOf('ToggleMaskButton', module)
.add('textForShowButton Show', () =>
  <div>
    <ToggleMaskButton
      textForShowButton="show"
      textForHideButton="hide"
    />
  </div>
  )
  .add('textForShowButton hide', () =>
    <div>
      <ToggleMaskButton
        textForShowButton="hide"
        textForHideButton="show"
      />
    </div>
  );
