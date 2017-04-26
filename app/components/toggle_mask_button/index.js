import React from 'react';

class ToggleMaskButton extends React.Component {

  static propTypes = {
    textForShowButton: React.PropTypes.string,
    textForHideButton: React.PropTypes.string,
    altTextMasked: React.PropTypes.string,
    altTextNotMasked: React.PropTypes.string,
    onToggle: React.PropTypes.func,
  };

  static defaultProps = {
    textForShowButton: 'Show',
    textForHideButton: 'Hide',
    altShowTextOn: 'show password on',
    altShowTextOff: 'show password off',
    onToggle: () => {},
  };

  constructor(props) {
    super(props);

    this.getAltText = this.getAltText.bind(this);
    this.getButtonText = this.getButtonText.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      passwordMasked: true,
    };
  }

  getAltText() {
    return this.state.passwordMasked ?
      this.props.altShowTextOff : this.props.altShowTextOn;
  }

  getButtonText() {
    return this.state.passwordMasked ?
      this.props.textForShowButton : this.props.textForHideButton;
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({
      passwordMasked: !this.state.passwordMasked,
    }, () => {
      this.props.onToggle(this.state.passwordMasked);
    });
  }

  render() {
    return (
      <button
        className="ui-component__password-field__show-hide"
        type="button"
        onClick={this.handleClick}
        role="button"
        aria-pressed={!this.state.passwordMasked}
        aria-label={this.getAltText()}
      >
        {this.getButtonText()}
      </button>
    );
  }

}

export default ToggleMaskButton;
