import { CONSTANTS } from '../actions'

export const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    }
}

export const deleteList = (index) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: { index }
    }
}

export const editList = (value, index) => {
    return {
        type: CONSTANTS.EDIT_LIST,
        payload: {
            value,
            index
        }
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}