import React, { PropTypes } from 'react';

function Logo({ imageSrc, altText, href, id }) {
  return (
    <div className="ui-component__logo" id={id}>
      <a href={href}>
        <img src={imageSrc} alt={altText} />
      </a>
    </div>
  );
}

Logo.propTypes = {
  altText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default Logo;
