import React from 'react';
import Logo from './';

describe('Logo component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Logo
        altText="test alt text"
        href="amazing.com"
        imageSrc="/super/awesome/image"
        id="logo"
      />
    );
  });

  it('should have the appropriate class name', () => {
    expect(component.find('div'))
      .to.have.className('ui-component__logo');
  });

  it('should have the correct id', () => {
    expect(component.find('div'))
    .to.have.id('logo');
  });

  it('should render altText on image', () => {
    expect(component.find('img')).to.have.attr('alt', 'test alt text');
  });

  it('should render href', () => {
    expect(component.find('a')).to.have.attr('href', 'amazing.com');
  });

  it('should render imageSrc', () => {
    expect(component.find('img')).to.have.attr('src', '/super/awesome/image');
  });
});
