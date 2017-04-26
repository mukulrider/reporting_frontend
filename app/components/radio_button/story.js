import React from 'react';
import RadioButton from './index';
import { storiesOf, module } from '@kadira/storybook';

const isValid = () => true;

storiesOf('RadioButton', module)
  .add('Default', () =>
    <div>
      <RadioButton id="1" name="radiotest" label="" value="1" valid={isValid} />
      <RadioButton id="2" name="radiotest" label="" value="2" valid={isValid} />
      <RadioButton id="3" name="radiotest" label="" value="3" valid={isValid} />
    </div>
  )
  .add('Labeled', () =>
    <div>
      <RadioButton
        id="1"
        name="radio-test"
        label="<b>Bold</b> element of label here."
        valid={isValid}
      />
      <RadioButton
        id="2"
        name="radio-test"
        label="Long label here!</br>(nested!)</br>ant it works!"
        valid={isValid}
      />
      <RadioButton
        id="3"
        name="radio-test"
        label="Normal label"
        valid={isValid}
      />
    </div>
  )
  .add('Disabled', () =>
    <div>
      <RadioButton id="radio-dis" disabled valid={isValid} value="disabled" />
      <RadioButton
        id="radio-dis2" checked disabled valid={isValid} value="dis"
        label="checked"
      />
      <RadioButton
        id="radio-dis3" disabled
        valid={isValid} value="dis" label="with label"
      />
      <RadioButton
        id="radio-dis4" disabled
        valid={isValid} value="dis" label="<strong>with bold </strong> label"
      />
    </div>
  )
  .add('Invalid', () =>
    <div>
      <RadioButton id="radio-invalid" value="invalid" />
    </div>
  )
  .add('Default checked', () =>
    <div>
      <RadioButton
        id="radio-checked"
        value="checked-default"
        checked
        valid={isValid}
      />
    </div>
  );
