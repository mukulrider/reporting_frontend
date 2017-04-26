import React from 'react';

const parseHtml = Symbol();
const markupToShow = Symbol();
const referenceRows = Symbol();

class DynamicList extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    actionField: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    preparedData: React.PropTypes.func.isRequired,
    notFoundText: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
  };

  static defaultProps = {
    actionField: {
      description: '',
      wrapper: '',
      action: '',
    },
    onSelect: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataToShow: props.preparedData(props.data),
      selectedIndex: -1,
      maxIndex: props.preparedData(props.data).length - 1,
      referenceRows: [],
      isVisible: true,
    };
    this[markupToShow] = this[markupToShow].bind(this);
    this[referenceRows] = this[referenceRows].bind(this);

    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const dataToShow = nextProps.preparedData(data);

    this.setState({
      dataToShow,
      isVisible: nextProps.isVisible,
      maxIndex: dataToShow.length - 1,
    });
  }

  handleKeyboard(e) {
    const keyCode = e.keyCode;
    const presentIndex = this.state.selectedIndex;
    const maxIndex = this.state.maxIndex;
    let selectedIndex;

    switch (keyCode) {

    // when up arrow is pressed highlight on row up
    case 38 :
      selectedIndex = presentIndex < 0 ? -1 : presentIndex - 1;
      break;

    // when down arrow is pressed highlight one row down
    case 40 : selectedIndex = presentIndex > maxIndex + 1 ?
      maxIndex + 1 : presentIndex + 1;
      break;

    // when enter key (13) or spacebar key (32) is pressed
    // choose highlighted row
    case 13:
    case 32:
      this.state.referenceRows[presentIndex].focus();
      e.target = this.state.referenceRows[presentIndex];
      this.props.onSelect(e);
      selectedIndex = -1;
      break;

    // when escape key is pressed hide list
    case 27:
      this.setState({
        isVisible: false,
      });
      break;
    }
    this.setState({
      selectedIndex,
    });
  }

  handleMouseEnter(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  handleMouseLeave() {
    this.setState({
      selectedIndex: -1,
    });
  }

  [parseHtml](stringToParse) {
    if (stringToParse.wrapper !== '') {
      return stringToParse === undefined ?
        false :
        React.DOM[stringToParse.wrapper]({ dangerouslySetInnerHTML:
        { __html: stringToParse.description },
          onSelect: stringToParse.action,
          ...stringToParse.other,
        });
    }

    return false;
  }

  [markupToShow](row) {
    return { __html: row.toDisplay };
  }

  [referenceRows](c) {
    const rowsArray = this.state.referenceRows === [] ?
      [] : this.state.referenceRows;

    rowsArray.push(c);
    this.setState({
      referenceRows: rowsArray,
    });

    return true;
  }

  render() {
    const { dataToShow, isVisible, selectedIndex } = this.state;
    const { actionField } = this.props;
    let additionalField;
    const rows = dataToShow.length > 0 ?
      dataToShow.map((row, i) =>
        <li key={row.id} className="ui-component__dynamic-list__row-item" >
          <a
            onKeyDown={this.handleKeyboard}
            tabIndex={selectedIndex === row.id ? '0' : '-1'}
            ref={this[referenceRows]}
            data={row.id}
            className={selectedIndex === row.id ?
              'ui-component__dynamic-list__active-element--focused' :
              'ui-component__dynamic-list__active-element'}
            onClick={this.props.onSelect}
            dangerouslySetInnerHTML={this[markupToShow](row)}
            onMouseEnter={() => this.handleMouseEnter(i)} // eslint-disable-line react/jsx-no-bind
            onMouseLeave={this.handleMouseLeave}
          />
        </li>) :
      <li>
        <span className="ui-component__dynamic-list__inactive-element">
          {this.props.notFoundText || 'Nothing found'}
        </span>
      </li>;

    if (this.props.actionField.description) {
      const parsedHTML = this[parseHtml](actionField);

      additionalField = <span className="additional-dropdown-line">{parsedHTML}</span>;
    }

    return (
      <div
        className={isVisible ?
          'ui-component__dynamic-list-wrapper--active' :
          'ui-component__dynamic-list-wrapper'}
      >
        <ul className="ui-component__dynamic-list">

          {/* We are adding one additional because we need to*/}
          {/* focus initial row in the list */}
          {/* and it cannot be the first visible row*/}
          {/* It's just for initial focus*/}
          <li>
            <a
              className="ui-component__dynamic-list__row-item"
              key={-1}
              onKeyDown={this.handleKeyboard}
              tabIndex={selectedIndex === -1 ? '0' : '-1'}
            />
          </li>
          {rows}
        </ul>
        { additionalField }
      </div>
    );
  }
}

DynamicList.propTypes = {
  data: React.PropTypes.array.isRequired,
};

export default DynamicList;
