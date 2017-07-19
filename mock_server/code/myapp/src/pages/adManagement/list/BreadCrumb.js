import React, { Component, PropTypes } from 'react';
import Link from '../../../components/Link';
import s from './AdManagementList.css';

const crumbShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  path: PropTypes.string.isRequired,
});

const genBreadCrumb = (crumb) => {
  let len = crumb.length - 1;
  let c;
  const ret = [
    <span
      className={s.crumb}
      key={crumb[len].path}
    >
      {crumb[len].name}
    </span>
  ];

  while (len--) { // eslint-disable-line no-plusplus
    c = crumb[len];
    ret.unshift(
      <Link
        className={`${s.crumb} ${s.link}`}
        key={c.path}
        to={c.path}
      >
        {c.name}
      </Link>,
      <span key={`k-${len}`} className={s.crumb}>&gt;</span>
    );
  }

  return ret;
};


class BreadCrumb extends Component {
  static propTypes = {
    crumb: PropTypes.arrayOf(crumbShape).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.crumb !== nextProps.crumb;
  }

  render() {
    return (
      <div className={s.breadcrumb}>
        <span className={s.title}>当前位置:</span>
        {genBreadCrumb(this.props.crumb)}
      </div>
    );
  }
}

export default BreadCrumb;
