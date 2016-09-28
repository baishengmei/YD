import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import styles from './SectionHeader.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(styles)
class SectionHeader extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    className: PropTypes.string,
    avatar: PropTypes.node,
    avatarClassName: PropTypes.string,
    title: PropTypes.node.isRequired,
    style: PropTypes.object,
    titleStyle: PropTypes.object
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { avatar, title, titleStyle } = this.props;
    const { avatar: navatar, title: ntitle, titleStyle: ntitleStyle } = nextProps;
    return avatar !== navatar
      || title !== ntitle
      || ((s1, s2) => JSON.stringify(s1) === JSON.stringify(s2))(titleStyle, ntitleStyle);
  }

  render() {
    const {
      className,
      avatar,
      avatarClassName,
      title,
      style,
      titleStyle
    } = this.props;

    return (
      <div
        className={classnames(styles.sectionHeader, className)}
        style={style}>
        {
          typeof avatar !== 'undefined' &&
          <div className={classnames(styles.sectionHeaderAvatar,avatarClassName)}>
          {
            typeof avatar === 'string' ?
            <img src={avatar} style='width: 100%' /> :
            avatar
          }
          </div>
        }
        <div
          className={styles.sectionTitleStyle}
          style={titleStyle}>
        {title}
        </div>
      </div>
    );
  }
}

export default SectionHeader;
