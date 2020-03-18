import { CONSTANTS } from '../actions'
let listID = 3
let cardID = 8
const initialState = [
    // {
    //     title: "Last Episode",
    //     id: `list-${0}`,
    //     card: [
    //         {
    //             id: `card-${0}`,
    //             text: "ahihi ahehe"
    //         },
    //         {
    //             id: `card-${1}`,
    //             text: "we use mix between material UI React"
    //         },
    //     ]
    // },
    // {
    //     title: "This Episode",
    //     id: `list-${1}`,
    //     card: [
    //         {
    //             id: `card-${2}`,
    //             text: "create reudcers"
    //         },
    //         {
    //             id: `card-${3}`,
    //             text: "render any card"
    //         },
    //         {
    //             id: `card-${4}`,
    //             text: "make little change"
    //         },
    //     ]
    // },
    // {
    //     title: "Next Episode",
    //     id: `list-${2}`,
    //     card: [
    //         {
    //             id: `card-${5}`,
    //             text: "esc"
    //         },
    //         {
    //             id: `card-${6}`,
    //             text: "edit"
    //         },
    //         {
    //             id: `card-${7}`,
    //             text: "make baby"
    //         },
    //     ]
    // },
]



const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                id: `list-${listID}`,
                card: []
            }
            listID += 1
            return [...state, newList]

        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;

            // console.log("reveved", action)

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        card: [...list.card, newCard]
                    }
                } else {
                    return list
                }
            })
            return newState
        }

        case CONSTANTS.DRAG_HAPPENED:
            const { droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload

            const newState = [...state]

            //dragging list 
            if (type === "list") {
                const list = newState.splice(droppableIndexStart, 1)
                newState.splice(droppableIndexEnd, 0, ...list)
                return newState
            }
            //in same list
            if (droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id)
                const card = list.card.splice(droppableIndexStart, 1)
                list.card.splice(droppableIndexEnd, 0, ...card)
            }

            //in other list 
            if (droppableIdStart !== droppableIdEnd) {
                // find the list where drag happened
                const listStart = state.find(list => droppableIdStart === list.id)
                //pull out the card from this list 
                const card = listStart.card.splice(droppableIndexStart, 1)
                //find the list where drag end
                const listEnd = state.find(list => droppableIdEnd === list.id)
                //put the card in the new list
                listEnd.card.splice(droppableIndexEnd, 0, ...card)
            }

            return newState

        //delete list
        case CONSTANTS.DELETE_LIST: {
            const { payload } = action
            console.log(action, payload.index)
            return [...state].filter((e, i) => payload.index !== i)
        }

        //delete card
        case CONSTANTS.DELETE_CARD: {
            const { payload } = action
            const { listIndex, id } = payload
            let newState = [...state]
            // console.log(newState[listIndex].card[id])
            // console.log(newState[listIndex].card)
            console.log(newState[listIndex].card.filter(i => newState[listIndex].card[id] !== i))
            // return [...state].filter((e, i) => payload.index !== i)
            newState[listIndex].card = newState[listIndex].card.filter(i => newState[listIndex].card[id] !== i)
            return newState
        }

        //edit list 
        case CONSTANTS.EDIT_LIST: {
            const { payload } = action
            const { value, index } = payload
            let newState = [...state]
            // console.log(newState.title)
            newState.map((e, i) => {
                if (index === i) {
                    console.log(e.title)
                    e.title = value
                }
            })
            return newState
        }

        //move card to left side
        case CONSTANTS.EDIT_CARD : {
            const { payload } = action
            const { listIndex, id } = payload
            let newState = [...state]
            newState[listIndex - 1].card.push(newState[listIndex].card[id])
            // console.log(newState[listIndex].card[id])
            newState[listIndex].card = newState[listIndex].card.filter(i => newState[listIndex].card[id] !== i)
            // console.log(newState[listIndex - 1])
            return newState
        }
        //move card to right side
        case CONSTANTS.EDIT_CARD2 : {
            const { payload } = action
            const { listIndex, id } = payload
            let newState = [...state]
            newState[listIndex + 1].card.push(newState[listIndex].card[id])
            // console.log(newState[listIndex].card[id])
            newState[listIndex].card = newState[listIndex].card.filter(i => newState[listIndex].card[id] !== i)
            return newState
        }

        default:
            return state
    }
}

export default listReducer