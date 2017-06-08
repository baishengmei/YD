import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Modal } from 'antd';
import s from '../NewAd.css';
import s2 from './index.css';
import BasicSetting, {
  checkObjectValidity,
  checkNameValidity,
  checkBudgetValidity,
} from './BasicSetting';
import TimeSetting, { checkRunTimeRangeValidity } from './TimeSetting';
import RegionSetting from './RegionSetting';
import history from '../../../../core/history';
import { NewAdCampaignSettingItems } from '../../../../constants/MenuTypes';
import { componentUpdateByState } from '../../../../core/utils';

const onCancel = () => {
  Modal.confirm({
    title: '是否取消？',
    onOk() {
      setTimeout(() => {
        history.push('/adManagement/adCampaign');
      }, 0);
    }
  });
};

class NewAdCampaign extends Component {
  static propTypes = {
    basicSetting: PropTypes.object.isRequired,
    timeSetting: PropTypes.object.isRequired,
    regionSetting: PropTypes.object.isRequired,
    fetchRegionList: PropTypes.func.isRequired,
    onDataChange: PropTypes.func.isRequired,
    onSaveData: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const {
      basicSetting,
      timeSetting,
      regionSetting,
    } = this.props;
    this.subItemValidity = Object.create(null);
    this.setValidity(this.props);
    this.state = {
      showError: false,
      basicSetting,
      timeSetting,
      regionSetting,
      formValid: this.getFormValid(),
    };
    this.shouldComponentUpdate = componentUpdateByState;
  }

  componentWillReceiveProps(nextProps) {
    this.setValidity(nextProps);
    this.setState({
      basicSetting: nextProps.basicSetting,
      timeSetting: nextProps.timeSetting,
      regionSetting: nextProps.regionSetting,
      formValid: this.getFormValid(),
    });
  }

  onBasicSettingChange = (type, value) => {
    this.props.onDataChange(NewAdCampaignSettingItems[0].value, type, value);
  }

  onObjectChange = (value) => {
    this.onBasicSettingChange('object', value);
  }

  onAdCampaignNameChange = (value) => {
    this.onBasicSettingChange('adCampaignName', value);
  }

  onBudgetChange = (value) => {
    this.onBasicSettingChange('budget', value);
  }

  onClientTypeChange = (value) => {
    this.onBasicSettingChange('clientType', value);
  }

  onTimeSettingChange = (type, value) => {
    this.props.onDataChange(NewAdCampaignSettingItems[1].value, type, value);
  }

  onStartDateChange = (value) => {
    this.onTimeSettingChange('startDate', value);
  }

  onEndDateChange = (value) => {
    this.onTimeSettingChange('endDate', value);
  }

  onRunTimeRangeChange = (value) => {
    this.onTimeSettingChange('runTimeRange', value);
  }

  onRegionSettingChange = (type, value) => {
    this.props.onDataChange(NewAdCampaignSettingItems[2].value, type, value);
  }

  onRegionChange = (value) => {
    this.onRegionSettingChange('region', value);
  }

  onSave = () => {
    if (!this.state.formValid) {
      this.setState({
        showError: true,
      });
    } else {
      this.props.onSaveData();
    }
  }

  setValidity = (data) => {
    this.setBasicSettingValidity(data.basicSetting);
    this.setTimeSettingValidity(data.timeSetting);
  }

  setBasicSettingValidity = (bs) => {
    this.subItemValidity.basicSetting = [
      checkObjectValidity(bs.object), // object validity
      checkNameValidity(bs.adCampaignName), // adCampaignName validity
      checkBudgetValidity(bs.budget), // budget validity
    ];
  }

  setTimeSettingValidity = (ts) => {
    this.subItemValidity.timeSetting = [
      checkRunTimeRangeValidity(ts.runTimeRange), // runTimeRange validity
    ];
  }

  getFormValid = () => Object.values(this.subItemValidity)
    .map(subArr => subArr.reduce((a, b) => a && b))
    .reduce((a, b) => a && b);

  render() {
    const {
      basicSetting,
      timeSetting,
      regionSetting,
      formValid,
    } = this.state;
    const {
      basicSetting: bsValidity,
      timeSetting: tsValidity,
    } = this.subItemValidity;
    return (
      <div className={s.main}>
        <BasicSetting
          showError={false}
          {...basicSetting}
          objectValid={bsValidity[0]}
          nameValid={bsValidity[1]}
          budgetValid={bsValidity[2]}
          onObjectChange={this.onObjectChange}
          onAdCampaignNameChange={this.onAdCampaignNameChange}
          onBudgetChange={this.onBudgetChange}
          onClientTypeChange={this.onClientTypeChange}
        />
        <TimeSetting
          showError={false}
          {...timeSetting}
          runTimeRangeValid={tsValidity[0]}
          onStartDateChange={this.onStartDateChange}
          onEndDateChange={this.onEndDateChange}
          onRunTimeRangeChange={this.onRunTimeRangeChange}
        />
        <RegionSetting
          showError={false}
          {...regionSetting}
          onRegionChange={this.onRegionChange}
          fetchRegionList={this.props.fetchRegionList}
        />
        <div className={s.actionBar}>
          <Button
            size='large'
            onClick={onCancel}
          >
            取消
          </Button>
          <Button
            size='large'
            type='primary'
            disabled={!formValid}
            onClick={this.onSave}
          >
            保存并继续
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(s2)(NewAdCampaign);
