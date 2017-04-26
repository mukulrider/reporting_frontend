import React from 'react';
import SelectInput from './index';
import { storiesOf, module } from '@kadira/storybook';

const callback = () => {
  // do nothing.
};

const mock = [
  { name: 'Mr' },
  { name: 'Mrs' },
  { name: 'Miss' },
  { name: 'Dr' },
];

const prepData = (dataObject) => {
  const dataToShow = [];

  dataObject.forEach((title) => {
    title.rowText = title.name;
    dataToShow.push(title);
  });

  return dataToShow;
};

storiesOf('SelectInput', module)
  .add('Default', () =>
    <div>
      <SelectInput
        valueUpdated={callback}
        fieldBlurred={callback}
        id="test-id"
        label="Title"
        placeholder="Select title"
        data={prepData(mock)}
        valid
      />
    </div>
  );
