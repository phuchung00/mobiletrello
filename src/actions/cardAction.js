import { CONSTANTS } from '../actions'

export const addCard = (listID, text) => {
    {console.log(text)}
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    }
}

export const deleteCard = (id, listIndex) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { id, listIndex }
    }
}

export const editCard = (id, listIndex) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {
            id,
            listIndex,
        }
    }
}

export const editCard2 = (id, listIndex) => {
    return {
        type: CONSTANTS.EDIT_CARD2,
        payload: {
            id,
            listIndex,
        }
    }
}
