const initialState = {
    menuItemText: '首页'
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_MENU_ITEM':
            return {
                ...state,
                menuItemText: action.text
            }
        default:
            return state
    }
}