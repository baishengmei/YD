import React, { Component, PropTypes } from 'react';
import { Steps } from 'antd';
import s from './NewAd.css';
import {
  NewAdCampaignSettingItems,
  NewAdGroupSettingItems,
  NewAdContentSettingItems,
} from '../../../constants/MenuTypes';

const stepNodes = [{
  title: '新建推广系列',
  desc: NewAdCampaignSettingItems.map(item => item.name),
}, {
  title: '新建推广组',
  desc: NewAdGroupSettingItems.map(item => item.name),
}, {
  title: '新建创意',
  desc: NewAdContentSettingItems.map(item => item.name),
}].map(({ title, desc }) => (
  <Steps.Step
    key={title}
    title={title}
    description={
      <div>
        {desc.map(txt => <div key={txt}>{txt}</div>)}
      </div>
    }
  />
));

class NewAdSteps extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { total, current } = this.props;
    return total !== nextProps.total || current !== nextProps.current;
  }

  render() {
    const {
      total,
      current,
    } = this.props;

    return (
      <Steps
        className={s.steps}
        direction='vertical'
        size='small'
        current={current}
      >
        {stepNodes.slice(3 - total)}
      </Steps>
    );
  }
}

export default NewAdSteps;
