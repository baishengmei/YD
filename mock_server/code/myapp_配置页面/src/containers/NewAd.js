import { connect } from 'react-redux'
import NewAd from '../pages/adManagement/new'
import {
  adCampaignDataChange,
  adGroupDataChange,
  adContentDataChange,
  fetchRegionList,
  createAdCampaign,
} from '../actions/AdManagementNew'

const mapStateToProps = state => ({
  adCampaignData: state.adManagement.new.adCampaign,
})

const mapDispatchToProps = dispatch => ({
  fetchRegionList(keyword) {
    dispatch(fetchRegionList(keyword))
  },
  onAdCampaignDataChange(type, itemType, itemValue) {
    dispatch(adCampaignDataChange(type, itemType, itemValue))
  },
  onAdGroupDataChange(type, itemType, itemValue) {
    dispatch(adGroupDataChange(type, itemType, itemValue))
  },
  onAdContentDataChange(type, itemType, itemValue) {
    dispatch(adContentDataChange(type, itemType, itemValue))
  },
  onSaveAdCampaignData() {
    dispatch(createAdCampaign())
  },
  onSaveAdGroupData() {
    console.log('save ad group data ...');
  },
  onSaveAdContentData() {
    console.log('save ad content data ...');
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAd)
