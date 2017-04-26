
// convert camel-case string to hyphen-separated lowercase
// e.g. ThisString => this-string
// Using traditional export approach as babel does not
// seem to transpile this file
export function camelCaseToHyphen(str) { // eslint-disable-line func-names
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

const validElementProps = {
  autoComplete: true,
  id: true,
  name: true,
  className: true,
  onChange: true,
  onBlur: true,
  onFocus: true,
  onClick: true,
  placeholder: true,
  defaultValue: true,
  value: true,
  readonly: true,
  disabled: true,
  checked: true,
  pattern: true,
  tabIndex: true,
  required: true,
};

export function validDOMProps(props) {
  const newProps = {};

  for (const prop in props) {
    if (validElementProps[prop] || prop.substring(0, 5) === 'aria-') {
      newProps[prop] = props[prop];
    }
  }

  return newProps;
}
