import React from 'react';
import Link from './index';
import { storiesOf, module } from '@kadira/storybook';

storiesOf('Link', module)
  .add('Link arrow right', () =>
    <div>
      <Link arrow="right"> click me</Link>
    </div>
  )
  .add('Link arrow left', () =>
    <div>
      <Link arrow="left"> click me</Link>
    </div>
  )
  .add('Link with specific secondary styles', () =>
    <div>
      <Link className="ui-component__button--secondary"> click me</Link>
    </div>
  );
