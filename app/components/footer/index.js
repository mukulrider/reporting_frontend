import React from 'react';
import Link from '../link';
import Grid from '../grid';
import classNames from 'classnames';

function renderLinks(props) {
  if (!props.footerLinks) {
    return null;
  }

  return (
    <ul className="ui-component__footer__links" style={{paddingRight:'25px'}}>
      {
        props.footerLinks.map((link, i) =>
          <li key={i} className="ui-component__footer__link-item">
            <Link href={link.linkHref}>{link.linkTitle}</Link>
          </li>
        )
      }
    </ul>
  );
}

export default function Footer(props) {
  const currentYear = new Date().getFullYear();

  const classes = classNames(
    'ui-component__footer',
    props.className || null
  );

  return (
    <div className={classes} style={{width:'78%',float:'right'}}>
      <Grid>
        <div className={props.contentClass}>
          {renderLinks(props)}
          <div className="ui-component__footer--motto__wrapper" >
            <div className="ui-component__footer--motto" />
          </div>
        </div>
      </Grid>
      <div className="ui-component__footer--copyright">
        <Grid>
          <div className={props.contentClass}>
            <div className="ui-component__footer--copyright__content">
              &copy; Tesco.com {currentYear} All rights reserved
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
}

Footer.propTypes = {
  footerLinks: React.PropTypes.array,
  contentClass: React.PropTypes.string,
  className: React.PropTypes.string,
};

renderLinks.propTypes = {
  footerLinks: React.PropTypes.array,
  contentClass: React.PropTypes.string,
};
