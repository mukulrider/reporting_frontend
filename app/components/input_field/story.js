import React from 'react';
import InputField from './index';
import { storiesOf, module } from '@kadira/storybook';

const inputTypeText = 'text';
const inputTypePassword = 'password';
const inputTypeDate = 'date';
const inputTypeCheckbox = 'checkbox';
const inputTypeColor = 'color';
const inputTypeImage = 'image';
const inputTypeNumber = 'number';
const inputTypeCell = 'tel';
const inputTypeWeek = 'tel';

storiesOf('InputField', module)
  .add('Default text', () =>
    <div>
      <InputField type={inputTypeText} value="asd" />
    </div>
  )
  .add('Default password', () =>
    <div>
      <InputField type={inputTypePassword} value="asd" />
    </div>
  )
  .add('Default date', () =>
    <div>
      <InputField type={inputTypeDate} value="2016-07-20" />
    </div>
  )
  .add('Default checkbox', () =>
    <div>
      <InputField type={inputTypeCheckbox} value="19.07.1989" />
    </div>
  )
  .add('Default color', () =>
    <div>
      <InputField type={inputTypeColor} />
    </div>
  )
  .add('Default image', () =>
    <div>
      <InputField type={inputTypeImage} />
    </div>
  )
  .add('Default number', () =>
    <div>
      <InputField type={inputTypeNumber} value="12" />
    </div>
  )
  .add('Default Cell', () =>
    <div>
      <InputField type={inputTypeCell} value="+48 000 000 000" />
    </div>
  )
  .add('Default Week', () =>
    <div>
      <InputField type={inputTypeWeek} />
    </div>
  );
