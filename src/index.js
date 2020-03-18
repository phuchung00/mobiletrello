import React, { Component, PureComponent } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import ActionButton from './components/ActionButton'
import List from './components/List'
import { connect } from 'react-redux'

import { sort } from './actions'

class index extends Component {
    componentDidUpdate(prevProps, prevState) {
        if(this.props.lists !== prevProps.lists){
            this.forceUpdate
        }
    }

    componentDidMount() {
        
    }
    
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.lists !== nextProps.lists){
            console.log(true)
            this.forceUpdate()
            return true
        }
    }

    componentWillReceiveProps(nextProps) {
        
    }


    render() {
        const { lists, dispatch } = this.props
        return (
            <View style = {styles.container}>

                {
                    lists.map((list, index) => <List
                        listID={list.id}
                        key={list.id}
                        title={list.title}
                        cards={list.card}
                        index={index}
                        dispatch={dispatch}
                        lists ={lists}
                    />)
                }
                <ActionButton list />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 8,
        display: 'flex',
        flexDirection: 'row',
    },
});

const mapStateToProps = state => ({
    lists: state.lists
})

export default connect(mapStateToProps)(index);
