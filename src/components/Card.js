import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { CardImage, CardTitle } from 'react-native-cards'
import * as Font from 'expo-font'
import { editCard, editCard2, deleteCard } from '../actions/cardAction'
import { Octicons , MaterialCommunityIcons} from '@expo/vector-icons'



class Card extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            fontLoaded: false,
            isDisplayArrowLeft: false,
            isDisplayArrowRight: true,
            title: '',
        }
    }

    componentDidMount() {
        Font.loadAsync({
            'Caveat': require('../../assets/fonts/Caveat.ttf')
        }).then(() => {
            this.setState({
                fontLoaded: true
            })
        }).then
        this.displayArrow()
    }

    delete = () => {
        const { dispatch, index, listIndex} = this.props
        dispatch(deleteCard(index, listIndex))
    }

    displayArrow = () => {
        if (this.props.lists[this.props.listIndex - 1] === undefined) {
            this.setState({ isDisplayArrowLeft: false })
        } if (this.props.lists[this.props.listIndex - 1]) {
            this.setState({ isDisplayArrowLeft: true })
        } if (this.props.lists[this.props.listIndex + 1] === undefined) {
            this.setState({ isDisplayArrowRight: false })
        }
        if (this.props.lists[this.props.listIndex] === 0) {
            this.setState({ isDisplayArrowLeft: true })
        }
    }

    renderComponent = () => {
        const { fontLoaded } = this.state
        const { text, id, index, listIndex, dispatch } = this.props
        return (
            <View style={{ flexDirection: 'row', left: -17, alignItems: 'center' }}  >
                
                <View style={styles.cardContent}>
                    {
                        fontLoaded == true ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={styles.textStyle}> {text} </Text>
                                <TouchableOpacity onPress = {this.delete}>
                                    <MaterialCommunityIcons size = {20} name ="delete-empty" />
                                </TouchableOpacity>
                            </View>
                            :
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={require('../../assets/loading.gif')}
                            />
                    }
                </View>
                
            </View>
        )
    }

    render() {
        return (
            this.renderComponent()
        )
    }
}

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 20,
        shadowColor: '#E6B0AA',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 4,
        flexDirection: 'row',
    },
    textStyle: {
        fontFamily: "Caveat",
        fontSize: 20, 
        marginRight: 10
    }
})

export default Card