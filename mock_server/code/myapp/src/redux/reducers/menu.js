import { HOME_MENU_CHANGE } from '../../constants/ActionTypes'
import { DateRangeItems } from '../../constants/MenuTypes'

const activeDateRange = {
  selectedIndex: 2,
  dateRangeItem: DateRangeItems[2]
};

const homeMenu = (state = activeDateRange, action) => {
  switch (action.type) {
    case HOME_MENU_CHANGE:
      return {
        selectedIndex: action.activeRangeIndex,
        dateRangeItem: DateRangeItems[action.activeRangeIndex]
      }
    default:
      return state
  }
}

export {
  homeMenu // eslint-disable-line import/prefer-default-export
}
