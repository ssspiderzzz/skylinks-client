export const TOTAL_ITEMS = 'TOTAL_ITEMS'
export const LOADING_ITEMS_UPDATE = 'LOADING_ITEMS_UPDATE'
export const LOADING_STATUS_UPDATE = 'LOADING_STATUS_UPDATE'

const initState = {
  itemsTotal: 1,
  itemsLoaded: 0,
  loadingCompleted: false,
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case TOTAL_ITEMS:
      return { ...state, itemsTotal: action.itemsTotal }
    case LOADING_ITEMS_UPDATE:
      return { ...state, itemsLoaded: action.itemsLoaded }
    case LOADING_STATUS_UPDATE:
      return { ...state, loadingCompleted: true }

    default:
      return state
  }
}
