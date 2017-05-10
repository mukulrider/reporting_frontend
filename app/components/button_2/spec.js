import React from 'react';
import Button from './';

describe('Button component', () => {
  it('has the default class name', () => {
    expect(shallow(<Button />).find('button'))
      .to.have.className('ui-component__button');
  });

  it('has the secondary button class name', () => {
    expect(shallow(<Button buttonType="secondary" />).find('button'))
      .to.have.className('ui-component__button--secondary');
  });

  it('has the button value set', () => {
    expect(shallow(<Button>test</Button>))
      .to.have.text('test');
  });

  it('passes any additional props passed to the html button', () => {
    expect(shallow(<Button disabled>test</Button>).find('button'))
      .to.have.attr('disabled');
  });

  it('renders any children', () => {
    expect(shallow(<Button disabled><img /></Button>).find('img'))
      .to.have.length(1);
  });
});
