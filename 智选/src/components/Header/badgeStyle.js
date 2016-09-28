import {
  orangeBtn,
  bodyGrey,
  headerTabColor
} from '../variables';

const styles = {
  badge: {
    padding: 0,
    cursor: 'pointer'
  },
  badgeStyle: {
    backgroundColor: orangeBtn.bgColor,
    color: orangeBtn.color,
    textAlign: 'center',
    right: -6,
    top: -6
  },
  icon: {
    color: headerTabColor,
    margin: '-10px 5px 0'
  },
  tooltipStyles: {
    marginTop: '-2px',
    padding: '5px 10px',
  },
  // menuItemStyle 放在这里而不是 Header.css
  // 是因为 MenuItem 只有 style 参数
  // 没有 className
  menuItemStyle: {
    height: '40px',
    lineHeight: '40px',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default styles;
