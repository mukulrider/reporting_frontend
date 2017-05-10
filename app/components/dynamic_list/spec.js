import React from 'react';
import DynamicList from './index.js';

const data = [
  { id: 0, name: 'Mark' },
  { id: 1, name: 'Ann' },
  { id: 2, name: 'Lukasz' }];


const prepareData = (dataObject) => {
  const dataToShow = [];

  dataObject.forEach((user) => {
    user.toDisplay = user.name;
    dataToShow.push(user);
  });

  return dataToShow;
};

const actionField1 = {
  description: 'test text',
  wrapper: 'article',
  action: '',
};
let foo2Variable = '';

function foo() {
  return true;
}

function foo2() {
  foo2Variable = 'ENTER';

  return true;
}
describe('Dynamic List for postcodeInput', () => {
  it('has default properties empty if none given', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
      />);
    const props = dynamicList.props();

    expect(props.actionField.wrapper).to.be.equal('');
    expect(props.onSelect).to.be.a('function');
  });

  it('has the proper type of props', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);
    const props = dynamicList.props();

    expect(props.data).to.be.an('Array');
    expect(props.preparedData).to.be.a('function');
    expect(props.actionField).to.be.an('object');
    expect(props.onSelect).to.be.a('function');
  });

  it('returns node with "nothing found" if data prop is empty', () => {
    const dynamicList = mount(
      <DynamicList
        data={[]}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('li').length).to.be.equal(2);
    expect(dynamicList.find('li').last().children('span').text())
      .to.be.equal('Nothing found');
  });

  it('returns list', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('ul').length).to.be.equal(1);
  });

  it('returns 1 node with "nothing found" ' +
    'if prepare data function returns wrong data', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={(foo)}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('ul').length).to.be.equal(1);
    expect(dynamicList.find('li').length).to.be.equal(2);
    expect(dynamicList.find('li').last().children('span').text())
      .to.be.equal('Nothing found');
  });

  it('returns text given in wrapper in action field', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={(foo)}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('.additional-dropdown-line').length).to.be.equal(1);
    expect(dynamicList.find('.additional-dropdown-line')
      .children('article').length).to.be.equal(1);
    expect(dynamicList.find('.additional-dropdown-line')
      .children('article').text()).to.be.equal('test text');
  });

  it('returns a list of data rows', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('ul').children('li').length).to.be.equal(4);
  });

  it('has data rows with links', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);

    expect(dynamicList.find('ul').children()
      .last('li').children('a').length).to.be.equal(1);
  });

  it('first element is focusable', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo}
      />);


    expect(dynamicList.find('ul').children()
      .first('li').children('a')).to.have.attr('tabIndex').which.equal('0');
  });

  it('after pressing down arrow, increase row index', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    firstElement.simulate('focus');
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    firstElement.simulate('keyDown', { keyCode: 40 });
    expect(dynamicList.state().selectedIndex).to.be.equal(0);
  });

  it('after pressing down arrow at the last row, ' +
    'keeps last row index + 1', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    firstElement.simulate('focus');
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 40 });
    expect(dynamicList.state().selectedIndex)
      .to.be.equal(dynamicList.state().maxIndex + 1);
  });

  it('after pressing up arrow, decrease row index', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    firstElement.simulate('focus');
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 38 });
    expect(dynamicList.state().selectedIndex).to.be.equal(0);
  });

  it('after pressing up arrow on the first row, keeps index equals -1', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    firstElement.simulate('focus');
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    firstElement.simulate('keyDown', { keyCode: 38 });
    firstElement.simulate('keyDown', { keyCode: 38 });
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
  });

  it('fires onclick function after pressing enter key', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    expect(foo2Variable).to.be.equal('');
    firstElement.simulate('focus');
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 13 });
    expect(foo2Variable).to.be.equal('ENTER');
  });

  it('fires onclick function after pressing spacebar key', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    foo2Variable = '';

    expect(foo2Variable).to.be.equal('');
    firstElement.simulate('focus');
    firstElement.simulate('keyDown', { keyCode: 40 });
    firstElement.simulate('keyDown', { keyCode: 32 });
    expect(foo2Variable).to.be.equal('ENTER');
  });

  it('hides list after pressing escape button', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);
    const firstElement = dynamicList.find('li').first().find('a');

    expect(dynamicList.state().isVisible).to.be.equal(true);
    firstElement.simulate('focus');
    firstElement.simulate('keyDown', { keyCode: 27 });
    expect(dynamicList.state().isVisible).to.be.equal(false);
  });

  it('when cursor is over list, change active row index', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);

    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    dynamicList.find('li').last().find('a').simulate('mouseEnter');
    expect(dynamicList.state().selectedIndex).to.be.equal(2);
  });

  it('when cursor is out of the list, reset row index', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={prepareData}
        actionField={actionField1}
        onSelect={foo2}
        isVisible
      />);

    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
    dynamicList.find('li').last().find('a').simulate('mouseEnter');
    dynamicList.find('li').last().find('a').simulate('mouseLeave');
    expect(dynamicList.state().selectedIndex).to.be.equal(-1);
  });
  it('should not display action field when no description passed', () => {
    const dynamicList = mount(
      <DynamicList
        data={data}
        preparedData={(foo)}
        onSelect={foo}
      />);

    expect(dynamicList.find('.additional-dropdown-line').length).to.be.equal(0);
    expect(dynamicList.find('.additional-dropdown-line')
      .children('article').length).to.be.equal(0);
  });
});
