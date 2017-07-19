import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdManagementList.css';
import Finance from './Finance';
import QuickSearch from './QuickSearch';
import MainContent from '../../../containers/AdManagementMainContent';

class AdManagementList extends Component {
  static propTypes = {
    finance: PropTypes.object.isRequired,
    sponsorBudget: PropTypes.object.isRequired,
    quickSearch: PropTypes.object.isRequired,
    fechFinanceBudget: PropTypes.func.isRequired,
    onDailyBudgetChange: PropTypes.func.isRequired,
    fetchQuickSearchList: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fechFinanceBudget();
    this.props.fetchQuickSearchList('');
  }

  shouldComponentUpdate(nextProps) {
    const { finance, sponsorBudget, quickSearch } = this.props;
    return finance !== nextProps.finance
      || sponsorBudget !== nextProps.sponsorBudget
      || quickSearch !== nextProps.quickSearch;
  }

  render() {
    const {
      finance,
      sponsorBudget,
      quickSearch,
      onDailyBudgetChange,
      fetchQuickSearchList,
      sendErrorMessage,
    } = this.props;

    return (
      <div className='adManagement-wrapper'>
        <Finance
          {...finance}
          sponsorBudget={sponsorBudget}
          onDailyBudgetChange={onDailyBudgetChange}
          sendErrorMessage={sendErrorMessage}
        />
        <section className='root'>
          <div className={s.mainContainer}>
            <QuickSearch
              data={quickSearch}
              fetchQuickSearchList={fetchQuickSearchList}
            />
            <MainContent />
          </div>
        </section>
      </div>
    );
  }
}

export default withStyles(s)(AdManagementList);
