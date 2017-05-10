import React from 'react';
import DynamicList from './index';
import { storiesOf, module } from '@kadira/storybook';


let data = [
  { id: 0, name: 'Lukasz' },
  { id: 1, name: 'Mark' },
  { id: 2, name: 'Tom' },
  { id: 3, name: 'Ann' },
  { id: 4, name: 'Tom' },
  { id: 5, name: 'Ann' },
  { id: 6, name: 'Tom' },
  { id: 7, name: 'Tomislaw' },
  { id: 8, name: 'MarcoPolo' },
  { id: 9, name: 'Mark' },
  { id: 10, name: 'Mark' },

];

let prepareData = (dataObject) => {
  const dataToShow = [];

  dataObject.forEach((user) => {
    user.toDisplay = user.name;
    dataToShow.push(user);
  });

  return dataToShow;
};

const actionField1 = {
  description: 'This is a static text',
  wrapper: 'span',
  action: '',
};

const actionField2 = {
  description: 'This is a linked text',
  wrapper: 'a',
  action: '',
  other: {
    href: 'http://google.pl',
    className: 'fancyLink',
  },
};

storiesOf('DropdownList', module)
  .add('DynamicList', () =>
    <div>
      <DynamicList
        data={[]}
        preparedData={prepareData}
        actionField={actionField1}
        isVisible
      />

    </div>
  )
  .add('DynamicList with HTML', () =>
    <div>
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField2}
        isVisible
      />
    </div>
  )
  .add('DynamicList without additional field', () =>
    <div>
      <DynamicList
        data={data}
        preparedData={prepareData}
        isVisible
      />
    </div>
  );

