import React from 'react';
import Footer from './';

describe('Footer component', () => {
  const footerData = {
    footerLinks: [
      {
        linkHref: 'http://footer.url/1',
        linkTitle: 'Link1',
      },
      {
        linkHref: 'http://footer.url/2',
        linkTitle: 'Link2',
      },
    ],
  };

  it('renders the appropriate class name', () => {
    expect(mount(<Footer />).find('.ui-component__footer').length)
      .to.have.equal(1);
  });
  it('renders tagline element', () => {
    expect(mount(<Footer />).find('.ui-component__footer--motto').length)
      .to.have.equal(1);
  });
  it('renders copyright element', () => {
    expect(mount(<Footer />).find('.ui-component__footer--copyright').length)
      .to.have.equal(1);
  });
  it('renders no footer links when none are passed in', () => {
    expect(mount(<Footer />).find('.ui-component__footer__link-item').length)
      .to.have.equal(0);
  });
  it('renders two footer links when passed in', () => {
    expect(mount(<Footer {...footerData} />)
      .find('.ui-component__footer__link-item').length)
      .to.have.equal(2);
  });
  it('renders no content class when none passed in', () => {
    expect(mount(<Footer />).find('.content-class'))
      .to.have.length(0);
  });
  it('renders with content class when passed in', () => {
    const contentClass = 'content-class';

    expect(mount(<Footer contentClass={contentClass} />)
      .find('.content-class'))
      .to.have.length(2);
  });
});
