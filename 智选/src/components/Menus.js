import React, { PropTypes, Component } from 'react';
import Menu, { MenuItemShape, SelectedMenuShape } from './Menu';
import RaisedButton from 'material-ui/RaisedButton';
import MenuTypes, { MenuTypeArr } from '../constants/MenuTypes';
import { getDebugger } from '../core/utils';

const myDebug = getDebugger('Menus');

const DateRangeRequireEnum = {
  bothRequired: 'bothRequired',
  oneRequired: 'oneRequired',
  startRequired: 'startRequired',
  endRequired: 'endRequired',
  bothNotRequired: 'bothNotRequired'
};

const DateRangeInvalidMessageEnum = {
  bothRequired: '请指定开始和结束日期!',
  startRequired: '请指定开始日期!',
  endRequired: '请指定结束日期!',
  oneRequired: '请指定开始或结束日期!'
};

class Menus extends Component {

  constructor(...args) {
    super(...args);

    this.handleMenusChange = this.handleMenusChange.bind(this);
    this.doQuery = this.doQuery.bind(this);
  }

  static propTypes = {
    showQueryButton: PropTypes.bool,
    menus: PropTypes.arrayOf(
      PropTypes.shape({
        menuType: PropTypes.oneOf(MenuTypeArr).isRequired,
        selectedMenu: SelectedMenuShape.isRequired,
        menuItems: PropTypes.arrayOf(
          MenuItemShape
        ).isRequired
      })
    ).isRequired,
    dateRangeRequired: PropTypes.oneOf(Object.values(DateRangeRequireEnum)),
    onMenusChange: PropTypes.func.isRequired,
    onQuery: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
    style: PropTypes.object,
    primary: PropTypes.bool,
    queryButtonStyle: PropTypes.object
  };

  static defaultProps = {
    showQueryButton: false,
    primary: true,
    dateRangeRequired: DateRangeRequireEnum.bothRequired
  };

  componentWillMount() {
    const { showQueryButton, menus } = this.props;
    this.setState({
      menus,
      showQueryButton: this.calcQueryButton(showQueryButton, menus)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { showQueryButton, menus } = nextProps;
    this.setState({
      menus,
      showQueryButton: this.calcQueryButton(showQueryButton, menus)
    })
  }

  calcQueryButton(showQueryButton, menus) {
    return showQueryButton
      || menus.length > 1
      || (menus[0].selectedMenu.value === 'custom');
  }

  render() {

    myDebug('render');

    let {
      props: {
        menus: menuObjArr,
        primary,
        style = {},
        queryButtonStyle = {}
      },
      handleMenusChange
    } = this;

    let menus = menuObjArr.map( (menu, index) => {
      return (
        <Menu
          ref={'menu'+index}
          key={index}
          menuType={menu.menuType}
          menuItems={menu.menuItems}
          selectedMenu={menu.selectedMenu}
          onMenuChange={handleMenusChange(index)}
          style={{
            display: 'inline-block',
            minWidth: '100px'
          }} />
      );
    });

    const {
      backgroundColor = '',
      labelColor = '',
      ...restStyles
    } = queryButtonStyle;

    return (
      <div
        className='menus'
        style={style}>
        {menus}
        {
          this.state.showQueryButton ?
            <RaisedButton
              onTouchTap={this.doQuery}
              label="查询"
              labelColor={labelColor}
              backgroundColor={backgroundColor}
              primary={primary}
              {...restStyles}/> :
            null
        }
      </div>
    );
  }

  handleMenusChange(index) {
    return (menuType, selectedMenu) => {
      const { showQueryButton: _showQueryButton, menus } = this.state;
      const { showQueryButton: pShowQueryButton, onMenusChange } = this.props;
      menus[index].selectedMenu = selectedMenu;
      let showQueryButton = this.calcQueryButton(pShowQueryButton, menus);
      if ( showQueryButton !== _showQueryButton ) {
        this.setState({
          showQueryButton
        })
      }

      // 延迟触发是为了先保障更新 UI
      setTimeout(() => {
        onMenusChange({
          index,
          menuType,
          selectedMenu
        });
        if ( !showQueryButton ) {
          this.doQuery();
        }
      }, 50);
    };
  }

  doQuery() {
    let menus = this.state.menus;

    let timeMenus = menus.filter( m => m.menuType === MenuTypes['TIME'] );

    let validity = ( menu => {
      let validity = {
        valid: true
      };
      if ( menu.selectedMenu.value === 'custom' ) {
        let { start, end } = menu.selectedMenu.dateRange;
        switch(this.props.dateRangeRequired) {
          case DateRangeRequireEnum.bothRequired:

            validity = {
              valid: !!(start && end)
            };
            if ( !validity.valid ) {
              validity.errmsg = DateRangeInvalidMessageEnum[
                !(start || end) ?
                  'bothRequired' :
                  !start ? 'startRequired' : 'endRequired'
              ];
            }
            break;
          case DateRangeRequireEnum.oneRequired:
            validity = {
              valid: !!(start || end)
            };
            if ( !validity.valid ) {
              validity.errmsg = DateRangeInvalidMessageEnum[
                'oneRequired'
              ];
            }
            break;
          case DateRangeRequireEnum.startRequired:
            validity = {
              valid: !!start,
              errmsg: DateRangeInvalidMessageEnum[
                'startRequired'
              ]
            };
            break;
          case DateRangeRequireEnum.endRequired:
            validity = {
              valid: !!end,
              errmsg: DateRangeInvalidMessageEnum[
                'endRequired'
              ]
            };
            break;
          case DateRangeRequireEnum.bothNotRequired:
            break;
        }
      }
      return validity;
    })(timeMenus[0]);

    if ( validity.valid ) {
      this.props.onQuery();
    } else {
      this.props.sendErrorMessage(validity.errmsg);
    }

  }
}

export {
  Menus as default,
  DateRangeRequireEnum
};
