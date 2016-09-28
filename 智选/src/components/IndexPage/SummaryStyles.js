import {
  mainBlack,
  bodyGrey,
  borderGrey,
  indexPageColor
} from '../variables';

const styles = {
  /* summary root */
  root: {
    margin: '5px',
    width: '300px',
    height: '170px',
    padding: '10px 20px',
    display: 'block',
    float: 'left',
    backgroundColor: bodyGrey,
    border: `1px solid ${borderGrey}`
  },

  header: {
    padding: '5px 0',
    height: 'auto'
  },

  info: {
    padding: '0 40px'
  },

  infoLine : {
    lineHeight: '20px',
    verticalAlign: 'middle',
    fontSize: '14px',
    color: mainBlack,
  },

  infoLineSpan: {
    marginLeft: '10px',
  },

  charge: {
    padding: '0 40px',
    marginTop: '20px',
  },

  chargeBtn: {
    width: '100px',
    height: '30px',
    lineHeight: '30px',
  },

  infoCell: {
    display: 'inline-block',
    width: '50%',
  },

  iconButton: {
    padding: 0,
    width: '20px',
    height: '20px',
    verticalAlign: 'top'
  },

  tooltipIcon: {
    color: mainBlack,
    marginLeft: '5px',
    width: '20px',
    height: '20px'
  },

  tooltipStyle: {
    margin: '0 0 0 10px',
    padding: '10px',
    width: 'auto',
    textAlign: 'left',
    transform: 'translateY(-100%)',
    WebkitTransform: 'WebkitTranslateY(-100%)'
  },

  /* budgetPopover style is in IndexPage.css */
  popoverButton: {
    margin: '10px 10px 10px 0',
    minWidth: '60px',
    height: '24px',
    lineHeight: '24px',
    verticalAlign: 'middle'
  },

  /* detail summary styles */
  detailSummary: {
    margin: '5px 15px',
    width: '200px',
    height: '90px',
    padding: '10px 20px',
    display: 'block',
    float: 'left',
    color: indexPageColor,
    fontWeight: 700,
    textAlign: 'center',
    backgroundColor: bodyGrey,
    border: `1px solid ${borderGrey}`,
  },

  title: {
    display: 'block',
    lineHeight: '30px',
  },

  desc: {
    display: 'block',
    lineHeight: '40px',
    fontSize: '20px',
  }

};

export default styles;
