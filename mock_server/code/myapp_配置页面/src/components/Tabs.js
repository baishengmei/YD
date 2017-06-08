import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

// 计算 Tabs 组件宽度
const calcWidth = ({ tabItems, tabPadding, tabSpacing, fontSize }) => {
  const len = tabItems.length;
  if (len === 0) return 0;

  // eslint-disable-next-line no-mixed-operators
  let w = (len - 1) * tabSpacing + len * (tabPadding.left + tabPadding.right);

  tabItems.forEach(({ name }) => {
    for (let i = 0, length = name.length; i < length; i += 1) {
      // 一个中文占据 fs 像素，一个英文占据 .5 * fs 个像素
      w += fontSize * (name.charCodeAt(i) > 255 ? 1 : 0.5);
    }
  });
  return w;
};

const tabKeyShape = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const tabItemShape = PropTypes.shape({
  key: tabKeyShape.isRequired,
  name: PropTypes.string.isRequired,
});

/* eslint-disable react/no-unused-prop-types */
class Tabs extends Component {
  static propTypes = {
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.object,
    tabsClassName: PropTypes.string,
    tabsStyle: PropTypes.object,
    tabClassName: PropTypes.string,
    tabStyle: PropTypes.object,
    tabPadding: PropTypes.shape({
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
    }),
    tabSpacing: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    activeTabClassName: PropTypes.string,
    activeTabStyle: PropTypes.object,
    tabItems: PropTypes.arrayOf(tabItemShape).isRequired,
    activeTabKey: tabKeyShape.isRequired,
    onTabClick: PropTypes.func,
    onTabChange: PropTypes.func,
  };

  static defaultProps = {
    containerClassName: null,
    containerStyle: {},
    tabsClassName: null,
    tabsStyle: {},
    tabClassName: null,
    tabStyle: {},
    tabPadding: {
      left: 0,
      right: 0,
    },
    activeTabClassName: null,
    activeTabStyle: {},
    onTabClick: null,
    onTabChange: null,
  };

  state = {
    activeTabKey: this.props.activeTabKey
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTabKey: nextProps.activeTabKey
    });
  }

  onTabClick(index, key) {
    return () => {
      const {
        tabItems,
        onTabClick,
        onTabChange,
      } = this.props;
      const tabItem = tabItems[index];
      const { activeTabKey } = this.state;

      if (onTabClick) {
        onTabClick(tabItem, index);
      }
      if (activeTabKey !== key) {
        this.setState({
          activeTabKey: key
        }, () => {
          if (onTabChange) {
            onTabChange(tabItem, index);
          }
        });
      }
    };
  }

  render() {
    const {
      containerClassName,
      containerStyle,
      tabsClassName,
      tabsStyle,
      tabClassName,
      tabStyle,
      activeTabClassName,
      activeTabStyle,
      tabItems,
    } = this.props;

    const { activeTabKey } = this.state;

    const tabsWidth = calcWidth(this.props);

    return (
      <section
        className={containerClassName}
        style={containerStyle}
      >
        <div
          className={tabsClassName}
          style={{
            width: `${tabsWidth}px`,
            flex: `0 0 ${tabsWidth}px`,
            ...tabsStyle,
          }}
        >
          {
            tabItems.map((tabItem, i) => {
              const isActive = activeTabKey === tabItem.key;
              return (
                <div
                  key={tabItem.key}
                  className={cx(
                    tabClassName,
                    isActive ? activeTabClassName : null
                  )}
                  onClick={this.onTabClick(i, tabItem.key)}
                  style={{
                    ...tabStyle,
                    ...(isActive ? activeTabStyle : {})
                  }}
                >
                  {tabItem.name}
                </div>
              );
            })
          }
        </div>
      </section>
    );
  }
}

export default Tabs;
