import React from 'react';
import Footer from './index';
import { storiesOf, module } from '@kadira/storybook';

const linksMock = [
  { linkHref: '#', linkTitle: 'Link 1' },
  { linkHref: '#', linkTitle: 'Link 2' },
];

storiesOf('Footer', module)
  .add('Empty', () =>
    <div>
      <Footer contentClass="footer-content-class" footerLinks={null} />
    </div>
  )
  .add('With links', () =>
    <div>
      <Footer contentClass="footer-content-class" footerLinks={linksMock} />
    </div>
  );
