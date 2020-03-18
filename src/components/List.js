import React from 'react'
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Card from './Card'
import * as Font from 'expo-font'
import { CustomText } from '../CustomText'
import ActionButton from './ActionButton'
import { editList, deleteList } from '../actions'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false,
            isEdit: false,
            text: ''
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

    changeText = () => {
        const { dispatch } = this.props
        this.setState({ isEdit: !this.state.isEdit })
        dispatch(editList(this.state.text, this.props.index))
    }

    delete = ()=> {
        const { dispatch, index } = this.props
        dispatch(deleteList(index))
    }

    render() {
        const { listID, title, cards, index, dispatch, lists } = this.props
        return (
            <View
            >
                <ScrollView>
                    {this.state.fontLoaded == true ?
                        (
                            <View style={{
                                width: 200,
                                padding: 10,
                                borderRadius: 5,
                                marginLeft: 4,
                                paddingLeft: 20,
                                paddingRight: 20,
                                backgroundColor: '#CCD1D1',
                                position: 'relative'
                            }} >
                                <View style={{ flexDirection: 'row', justifyContent:'space-between' }} >
                                    {
                                        this.state.isEdit ?
                                            <View>
                                                <TextInput

                                                    value={this.state.text}
                                                    onChangeText={(text) => this.setState({ text })}
                                                />
                                            </View>
                                            :
                                            <Text style={styles.textContant} >{title}</Text>
                                    }
                                    
                                        <TouchableOpacity
                                            onPress={this.changeText}
                                        >
                                            <Entypo name="edit" size={20} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={this.delete}
                                        >
                                            <MaterialIcons name="delete-sweep" size={20} />
                                        </TouchableOpacity>
                                    
                                </View>
                                {cards.map((card, i) => (
                                    <Card
                                        key={card.id}
                                        index={i}
                                        listIndex={index}
                                        listID={listID}
                                        text={card.text}
                                        id={card.id}
                                        dispatch={dispatch}
                                        listTitle={title}
                                        cards={cards}
                                        lists={lists}
                                    />
                                ))}
                                <ActionButton listID={listID} />
                            </View>
                        )
                        :
                        (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={require('../../assets/loading.gif')}
                            />
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        // backgroundColor: '#D5DBDB',
        // width: 200,
        // padding: 10,
        // borderRadius: 5,
        // marginLeft: 4,
        // height: '100%',
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 400,
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
    },
    textContant: {
        fontSize: 20,
        fontFamily: 'Caveat'
    }
})

export default List