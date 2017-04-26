import React from 'react';
import Header from './';

describe('Header component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(<Header />).first())
      .to.have.className('ui-component__header');
  });

  it('renders default utility bar links', () => {
    expect(shallow(<Header />).find('.ui-component__utility-list').find('li'))
      .to.have.length(3);
  });

  it('renders custom utility bar links', () => {
    const links = [{ text: 'custom' }];

    expect(
      shallow(<Header links={links} />)
        .find('.ui-component__utility-list')
        .find('li')
    )
    .to.have.length(1);
  });

  it('renders with content class when passed in', () => {
    const contentClass = 'content-class';

    expect(mount(<Header contentClass={contentClass} />).find('.content-class'))
      .to.have.length(2);
  });

  it('renders a skip navigation link with correct id for the logo', () => {
    expect(shallow(<Header />).find('#logo')).to.be.present();
    expect(shallow(<Header />).find('.ui-component__skip-navigation')).to.have.attr('href', '#logo');
  });
});
