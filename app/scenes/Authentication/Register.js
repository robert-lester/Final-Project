import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';

import ViewContainer from '../../components/ViewContainer'
import StatusbarBackground from '../../components/StatusbarBackground'
import { firebaseRef } from '../../services/firebase'
import { Actions } from 'react-native-router-flux'
import { styles } from './styles'

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            verifyPassword: ''
        };

        this._register = this._register.bind(this);
    }

    _register() {
        if(this.state.password == this.state.verifyPassword) {
            firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                // Handle errors here
                console.log(error.code);
                console.log(error.message);
            });

            Actions.pagecontrol();
        } else {
            console.log("Passwords did not match.");
        }
    }

    render() {
        return (
            <ViewContainer>
                <StatusbarBackground />
                <View style={styles.logoReg}>
                    <Image style={{width: 258, height: 150}} source={require('../../resources/Logo.jpg')}/>
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    autoCapitalize='none'
                    placeholder='EMAIL'
                    placeholderTextColor='black'
                    autoCorrect={false}
                    returnKeyType='next'
                    keyboardAppearance='dark'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({password: text})}
                    value={this.state.password}
                    autoCapitalize='none'
                    placeholder='PASSWORD'
                    placeholderTextColor= 'black'
                    secureTextEntry={true}
                    autoCorrect={false}
                    returnKeyType='go'
                    keyboardAppearance='dark'
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({verifyPassword: text})}
                    value={this.state.verifyPassword}
                    autoCapitalize='none'
                    placeholder='PASSWORD'
                    placeholderTextColor= 'black'
                    secureTextEntry={true}
                    autoCorrect={false}
                    returnKeyType='go'
                    keyboardAppearance='dark'
                />

                <View style={styles.login}>
                    <TouchableOpacity style={styles.loginButton} onPress={this._register}>
                        <Text style={styles.loginButtonText}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </ViewContainer>
        );
    }
}