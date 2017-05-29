/**
*
* Breadcrumb
*
*/

import React from 'react';
import Link from 'components/link';

// import styled from 'styled-components';


class Breadcrumb extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        {(() => {
          // let this.props.promotion.urlParamsString
          if (this.props.selected_week && this.props.urlParamsString) {
            let urlParamString = this.props.urlParamsString;
            urlParamString = urlParamString.split('&')
            let urlParamObject = {};
            urlParamString.map(obj => {
              if (obj) {
                let key = obj.split('=')[0], value = obj.split('=')[1]
                urlParamObject[key] ? urlParamObject[key].push(value) : (() => {
                  urlParamObject[key] = [];
                  urlParamObject[key].push(value)
                })()
              }
            });

            // console.log(urlParamObject);
            return (
              <div>
                {Object.keys(urlParamObject).map(obj=>{
                  return (
                    <Link arrow="right" className="back-link"> {urlParamObject[obj].length < 2 ? urlParamObject[obj].join(', ') :  urlParamObject[obj][1] + ' and ' + (urlParamObject[obj].length - 1)+ ' more'}</Link>
                  )
                })}
                <Link arrow="right" className="back-link"> {this.props.selected_week}</Link>
                {/*<Link arrow="right" className="back-link">Back To Groceries</Link>*/}
              </div>
            )
          } else {
            return (
              <Link arrow="left" className="back-link"></Link>
            )
          }
        })()}
      </div>
    );
  }
}

Breadcrumb.propTypes = {

};

export default Breadcrumb;
