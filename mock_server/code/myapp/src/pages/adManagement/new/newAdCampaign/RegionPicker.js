import React, { Component, PropTypes } from 'react';
import { Input, Menu, Spin, Icon } from 'antd';
import s from './index.css';
import {
  classnames,
  updateComponentStateByKeys,
  componentUpdateByState,
} from '../../../../core/utils';

const regionListShape = PropTypes.shape({
  status: PropTypes.oneOf(['initial', 'loading', 'success', 'fail']).isRequired,
  list: PropTypes.array.isRequired,
});

const searchStyle = {
  width: 208,
  height: 28,
  marginLeft: 24,
};

const innerSearchRegion = (regionList, name) => {
  const ret = [];
  regionList.forEach((prov) => {
    if (prov.name.includes(name)) {
      ret.push({ ...prov });
    } else {
      const matchCities = prov.children.filter(city => city.name.includes(name));
      if (matchCities.length > 0) {
        ret.push({
          ...prov,
          children: matchCities,
        });
      }
    }
  });
  return ret;
};

/* eslint-disable react/no-unused-prop-types */
class RegionPicker extends Component {
  static propTypes = {
    showError: PropTypes.bool.isRequired,
    regionList: regionListShape.isRequired,
    selectedRegion: PropTypes.array.isRequired,
    fetchRegionList: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const stateKeys = [
      'showError',
      'regionList',
      'selectedRegion',
    ];
    this.keyword = '';
    this.regionFullList = this.props.regionList;
    this.state = {
      regionListOpenKeys: [],
      selectedRegionListOpenKeys: [],
    };
    stateKeys.forEach((key) => {
      this.state[key] = this.props[key];
    });

    this.componentWillReceiveProps = updateComponentStateByKeys(stateKeys);
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentDidMount() {
    this.props.fetchRegionList('');
  }

  componentDidUpdate() {
    if (this.regionFullList.status !== 'success'
      && this.keyword.length === 0
      && this.state.regionList.status === 'success') {
      this.regionFullList = this.state.regionList;
    }
  }

  // eslint-disable-next-line react/sort-comp
  delaySearch = (keyword) => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.searchTimer = setTimeout(() => {
      this.onSearchRegion(keyword);
    }, 50);
  }

  onInputChange = (keyword) => {
    const {
      regionList: {
        status,
        list,
      }
    } = this.state;
    this.keyword = keyword;

    if (status !== 'loading') {
      // 首先更改页面上的 loading 状态
      this.setState({
        regionList: {
          status: 'loading',
          list,
        }
      }, () => {
        this.delaySearch(keyword);
      });
    } else {
      this.delaySearch(keyword);
    }
  }

  onSearchRegion = (value) => {
    const keyword = (value || '').trim();
    // 保存的是所有的数据，使用内部搜索
    if (this.regionFullList.status === 'success') {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.setState({
        regionList: {
          status: 'success',
          list: keyword.length === 0
            ? this.regionFullList.list
            : innerSearchRegion(this.regionFullList.list, keyword),
        },
      });
    } else { // 使用服务端搜索
      this.props.fetchRegionList(keyword);
    }
  }

  onRegionListOpenChange = (regionListOpenKeys) => {
    this.setState({
      regionListOpenKeys,
    });
  }

  onSelectedRegionListOpenChange = (selectedRegionListOpenKeys) => {
    this.setState({
      selectedRegionListOpenKeys,
    });
  }

  onSelectProvince = (province) => {
    const { selectedRegion } = this.state;
    let findProv = selectedRegion.find(prov => prov.value === province.value);
    if (findProv) {
      findProv.children = [
        ...province.children,
      ];
    } else {
      findProv = {
        ...province,
        children: [
          ...province.children,
        ],
      };
      selectedRegion.push(findProv);
    }
    this.forceUpdate();
  }

  onSelectCity = ({ keyPath }) => {
    const { selectedRegion, regionList } = this.state;
    const provinceValue = keyPath[1];
    const cityValue = keyPath[0];
    const findProv = regionList.list.find(prov => prov.value === provinceValue);
    if (findProv) {
      let findSelectedProv = selectedRegion.find(prov => prov.value === provinceValue);
      if (!findSelectedProv) {
        findSelectedProv = {
          ...findProv,
          children: [],
        };
        selectedRegion.push(findSelectedProv);
      }
      const city = findProv.children.find(c => c.value === cityValue);
      if (city && findSelectedProv.children.every(c => c !== city)) {
        findSelectedProv.children.push(city);
        this.forceUpdate();
      }
    }
  }

  onDeselectAllProvince = () => {
    const { selectedRegion } = this.state;
    selectedRegion.length = 0;
    this.forceUpdate();
  }

  onDeselectProvince = (province) => {
    const { selectedRegion } = this.state;
    const findProvinceIndex = selectedRegion.findIndex(prov => prov.value === province.value);
    if (findProvinceIndex >= 0) {
      selectedRegion.splice(findProvinceIndex, 1);
      this.forceUpdate();
    }
  }

  onDeselectCity = (province, city) => {
    const { selectedRegion } = this.state;
    const provinceIndex = selectedRegion.findIndex(prov => prov.value === province.value);
    if (provinceIndex >= 0) {
      const cities = selectedRegion[provinceIndex].children;
      const cityIndex = cities.findIndex(c => c === city);
      if (cityIndex >= 0) {
        cities.splice(cityIndex, 1);
        this.forceUpdate();
      }
    }
  }

  render() {
    const {
      regionListOpenKeys,
      selectedRegionListOpenKeys,
      regionList: {
        status,
        list,
      },
      selectedRegion,
    } = this.state;

    return (
      <div className={s['region-picker-wrapper']}>
        <div className={s['region-list-wrapper']}>
          <header className={s.header}>
            请选择区域
          </header>
          <div className={s.content}>
            <Input.Search
              placeholder='请输入省／城市名称'
              style={searchStyle}
              onChange={(e) => {
                this.onInputChange(e.target.value);
              }}
              onSearch={this.onInputChange}
            />
            <div className={s['region-list-menu-wrapper']}>
              <Spin spinning={status === 'loading'}>
                <Menu
                  openKeys={regionListOpenKeys}
                  mode='inline'
                  selectable={false}
                  onOpenChange={this.onRegionListOpenChange}
                  onClick={this.onSelectCity}
                >
                  {list.map(province =>
                    <Menu.SubMenu
                      key={province.value}
                      title={
                        <div className={s['submenu-title']}>
                          <Icon
                            className={classnames({
                              [s['submenu-title-icon']]: true,
                              [s.open]: regionListOpenKeys.includes(province.value),
                            })}
                            type='right'
                          />
                          <span className={s['submenu-title-text']}>{province.name}</span>
                          <span
                            className={s['select-province']}
                            onClick={(e) => {
                              e.stopPropagation();
                              this.onSelectProvince(province);
                            }}
                          >
                          全选
                          </span>
                        </div>
                      }
                    >
                      {province.children.map(city =>
                        <Menu.Item key={city.value} onClick={this.onSelectCity}>
                          <span className={s['menu-item-text']}>{city.name}</span>
                          {
                            selectedRegion.some(prov =>
                              prov.children.some(c => c === city)
                            ) &&
                            <Icon className={s.selectedCity} type='check' />
                          }
                        </Menu.Item>
                      )}
                    </Menu.SubMenu>
                  )}
                </Menu>
              </Spin>
            </div>
          </div>
        </div>
        <div className={s['selected-region-wrapper']}>
          <header className={s.header}>
            已选择区域
            <span
              className={s['deselect-all-province']}
              onClick={this.onDeselectAllProvince}
            >
              全部删除
            </span>
          </header>
          <div className={s.content}>
            <div className={s['selected-region-list-menu-wrapper']}>
              <Menu
                openKeys={selectedRegionListOpenKeys}
                mode='inline'
                selectable={false}
                onOpenChange={this.onSelectedRegionListOpenChange}
              >
                {selectedRegion.map(province =>
                  <Menu.SubMenu
                    key={province.value}
                    title={
                      <div className={s['submenu-title']}>
                        <Icon
                          className={classnames({
                            [s['submenu-title-icon']]: true,
                            [s.open]: selectedRegionListOpenKeys.includes(province.value),
                          })}
                          type='right'
                        />
                        <span className={s['submenu-title-text']}>{province.name}</span>
                        <Icon
                          className={s.deselect}
                          type='close'
                          onClick={(e) => {
                            e.stopPropagation();
                            this.onDeselectProvince(province);
                          }}
                        />
                      </div>
                    }
                  >
                    {province.children.map(city =>
                      <Menu.Item key={city.value}>
                        <span className={s['menu-item-text']}>{city.name}</span>
                        {
                          selectedRegion.some(prov =>
                            prov.children.some(c => c === city)
                          ) &&
                          <Icon
                            className={s.deselect}
                            type='close'
                            onClick={(e) => {
                              e.stopPropagation();
                              this.onDeselectCity(province, city);
                            }}
                          />
                        }
                      </Menu.Item>
                    )}
                  </Menu.SubMenu>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegionPicker;
