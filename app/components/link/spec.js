import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Link from './';

chai.use(chaiEnzyme());

describe('Link component', () => {
  it('renders an <a> element', () => {
    expect(shallow(<Link />).find('a'))
      .to.have.length(1);
  });

  it('renders its children', () => {
    expect(shallow(<Link>demo</Link>).find('a'))
      .to.have.text('demo');
  });

  it('adds a class for a left-pointing chevron', () => {
    expect(shallow(<Link arrow="left">demo</Link>).find('a'))
      .to.have.className('ui-component__icon--chevron_left');
  });

  it('adds a class for a right-pointing chevron', () => {
    expect(shallow(<Link arrow="right">demo</Link>).find('a'))
      .to.have.className('ui-component__icon--chevron_right');
  });

  it('adds a class for a home icon', () => {
    expect(shallow(<Link icon="home">demo</Link>).find('a'))
      .to.have.className('ui-component__icon--home');
  });

  it('does not add an arrow class when no arrow is provided', () => {
    expect(shallow(<Link>demo</Link>).html())
      .not.to.match(/ui\-component__icon\-\-arrow/);
  });

  it('adds custom classes', () => {
    expect(shallow(<Link className="custom">demo</Link>).find('a'))
      .to.have.className('custom');
  });

  it('does not add custom classes when className not present', () => {
    expect(shallow(<Link>demo</Link>).find('a'))
      .to.have.attr('class', 'ui-component__link');
  });

  it('should expose a PropType property', () => {
    expect(Link).to.have.property('PropType');
  });

  it('adds an href attribute', () => {
    const href = 'http://example.com';

    expect(shallow(<Link href={href}>example</Link>).find('a'))
      .to.have.attr('href', href);
  });

  it('should render it as a span so it is not be clickable', () => {
    expect(shallow(<Link arrow="left" disabled="true">demo</Link>)
      .find('a')).to.have.length(0);
  });
});
