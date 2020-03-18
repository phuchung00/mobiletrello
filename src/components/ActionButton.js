import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import { addList, addCard } from '../actions/index'
import * as Font from 'expo-font'

import { MaterialIcons, Entypo } from '@expo/vector-icons'

class ActionButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formOpen: false,
            text: '',
            fontLoaded: false,
            bool: true
        }
    }



    async componentDidMount() {
        await Font.loadAsync({
            'Caveat': require('../../assets/fonts/Caveat.ttf')
        }).then(() => {
            this.setState({
                fontLoaded: true
            })
        })
    }

    openForm = () => {
        this.setState({
            formOpen: !this.state.formOpen
        })
    }

    closeForm = () => {
        this.setState({
            formOpen: false
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props
        const { text } = this.state
        if (text) {
            dispatch(addList(text))
        }

        this.setState({
            text:'', formOpen:false
        })
        return
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props
        const { text } = this.state

        if (text) {
            dispatch(addCard(listID, text))
        }
        this.setState({
            text:'', formOpen: false
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    renderAddButton = () => {
        const { list } = this.props
        const buttonIconText = list ? (<Entypo name="add-to-list" />) : (<MaterialIcons name="note-add" />)
        const buttonText = list ? 'Add another list' : 'Add another card'
        const { fontLoaded } = this.state

        return (
            <View>
                {
                    fontLoaded == true ?
                        (
                            <TouchableOpacity onPress={this.openForm} >
                                <View
                                    style = {{ display: 'flex', flexDirection: 'row'}}
                                >
                                    <Text style = {{fontFamily: 'Caveat', fontSize: 15}} > {buttonIconText} </Text>
                                    <Text style = {{fontFamily: 'Caveat', fontSize: 15}} >{buttonText}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                        :
                        <View></View>
                }
            </View>
        )
    }

    renderForm = () => {
        const { list } = this.props

        const placeholder = list ? 'Enter list title ...' : 'Enter title of this card ...'

        const buttonTitle = list ? 'Add list' : 'Add card'

        return (
            <View>
                <TextInput
                    placeholder={placeholder}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text })}
                />
                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPressOut={list ? this.handleAddList : this.handleAddCard}
                    >
                        <Entypo name="plus" size={25} />
                        <Text style = {{fontFamily:'Caveat'}} >{buttonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render() {
        const { formOpen } = this.state
        return (
            formOpen ? this.renderForm() : this.renderAddButton()
        )
    }
}

const styles = {
    openForButtonGroup: {
        display: 'flex',
        alignItem: 'center',
        borderRadius: 4,
        height: 36,
        width: 273,
        paddingLeft: 10,
        flexDirection:'row'
    },
    formButtonGroup: {
        marginTop: 8,
        display: 'flex',
        alignItem: 'center',

    },
    buttonContainer: {
        flexDirection: 'row'
    }
}

export default connect()(ActionButton)