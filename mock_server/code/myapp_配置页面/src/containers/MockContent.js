import { connect } from 'react-redux'
import doChangeRulename from '../actions/ChangeRulename'
import MockContent from '../components/MockContent/MockContent.js'


const mapStateToProps = (state) => {
  const mockNames = state.mockNames;
  // const ruleName = mockNames.ruleName;
  // const projName = mockNames.projName;
};

const mapDispatchToProps = dispatch => ({
  onChangeRulename: () => {
    dispatch(doChangeRulename())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MockContent)
