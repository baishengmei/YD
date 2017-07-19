import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewAd.css';
import Steps from './Steps';
import NewAdCampaign from './newAdCampaign';
import { componentUpdateByState } from '../../../core/utils';

class NewAd extends Component {
  static propTypes = {
    adCampaignData: PropTypes.object.isRequired,
    fetchRegionList: PropTypes.func.isRequired,
    onAdCampaignDataChange: PropTypes.func.isRequired,
    onAdGroupDataChange: PropTypes.func.isRequired,
    onAdContentDataChange: PropTypes.func.isRequired,
    onSaveAdCampaignData: PropTypes.func.isRequired,
    onSaveAdGroupData: PropTypes.func.isRequired,
    onSaveAdContentData: PropTypes.func.isRequired,
  };

  state = {
    total: 3,
    current: 1,
    adCampaignData: this.props.adCampaignData,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      adCampaignData: nextProps.adCampaignData,
    });
  }

  shouldComponentUpdate = componentUpdateByState;

  getAdCampaignComponent = () => {
    const { adCampaignData } = this.state;
    const {
      fetchRegionList,
      onAdCampaignDataChange,
      onSaveAdCampaignData,
    } = this.props;
    return (
      <NewAdCampaign
        {...adCampaignData}
        fetchRegionList={fetchRegionList}
        onDataChange={onAdCampaignDataChange}
        onSaveData={onSaveAdCampaignData}
      />
    );
  }

  render() {
    const { total, current } = this.state;
    return (
      <section className={`${s.root} root`}>
        <Steps
          total={total}
          current={current}
        />
        {this.getAdCampaignComponent()}
      </section>
    );
  }
}

export default withStyles(s)(NewAd);
