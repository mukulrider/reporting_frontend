import React from 'react';
import Grid from './index';
import { storiesOf } from '@kadira/storybook';

storiesOf('Grid', module)
  .add('Default', () =>
    <div>
      <Grid>
        <div className="wrapper" />ASD
        <div className="wrapper" />ASD2
        <div className="wrapper" />ASD3
      </Grid>
      <Grid>
        <div className="wrapper" />AS3
        <div className="wrapper" />AS3
        <div className="wrapper" />AS3
      </Grid>
    </div>
  );
