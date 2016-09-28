import { INDEX_PAGE_MENU_CHANGE } from '../../constants/ActionTypes'
import MenuTypes, { TimeMenuItems } from '../../constants/MenuTypes'

const timeMenuInitialState = {
  type: MenuTypes.TIME,
  selectedIndex: 2,
  value: TimeMenuItems[2].value
}

const timeMenu = (state = timeMenuInitialState, menu) => {
  switch(menu.menuType) {
    case MenuTypes.TIME:
      return {
        ...state,
        ...menu.selectedMenu
      }
    default:
      return state
  }
}


const indexPageMenu = (state = timeMenu(undefined, {}), action) => {
  switch(action.type) {
    case INDEX_PAGE_MENU_CHANGE:
      return timeMenu(state, action.menu)
    default:
      return state
  }
}

export {
  indexPageMenu
}
