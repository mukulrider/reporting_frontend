import React from 'react';
import ConstraintList from './index';
import { storiesOf, module } from '@kadira/storybook';

const constraints = [
 { type: 'minLength',
   text: '8 x characters',
   validator: (val) => val.length >= 8 },
 { type: 'oneLowercase',
   text: '1 x lowercase letter',
   validator: (val) => /[a-z]/.test(val) },
 { type: 'oneUppercase',
   text: '1 x uppercase letter',
   validator: (val) => /[A-Z]/.test(val) },
 { type: 'oneNumberOrSpecial',
   text: '1 x number or special character \n (e.g. 1 2 3 4 or £ $ ! ?)',
   validator: (val) => /[0-9£$!?<>_-]/.test(val) },
];

storiesOf('ConstraintList', module)
 .add('Default', () =>
   <div>
     <ConstraintList
       constraints={constraints}
       currentVal="QWerty1234!"
       renderedOnClient={false}
       constraintsHint="Your password must include at least:"
       isVisible
     />
   </div>
 );
