import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput , TouchableOpacity, Button } from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import db from '../databse.js'

class HomeScreen extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            text: '',
            isSearchPressed: false,
            word: '',
            lexicalCategory: '',
            examples: [],
            defination: ''
        }
    }

    getWord = (word) =>
    {
        var searchWord = word.toLowerCase();
        var lexCat;
        var definition;

        if(db[searchWord])
        {
            var wrd = db[searchWord];
            lexCat = wrd["lexicalCategory"];
            definition = wrd["definition"];
        }else
        {
            lexCat = '';
            definition = 'this is not available in the database'
        }

        this.setState({lexicalCategory : lexCat, defination: definition});
    }

    render()
    {
        return(
            <SafeAreaProvider>
                <SafeAreaView>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Dictionary App</Text>
                    </View>
                    <TextInput 
                        onChangeText = {text => 
                        {
                            this.setState({
                                text: text,
                                word: "Loading...."
                            })
                        }}

                        value = {this.state.text}
                        style = {styles.textBox}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title={'Search'} color={'blue'} onPress={
                            () => {
                                this.setState({isSearchPressed: true})
                                this.getWord(this.state.text);                            
                            }
                        }></Button>
                    </View>

                    <Text>Word: {this.state.text}</Text>
                    <Text>Type: {this.state.lexicalCategory}</Text>
                    <Text>Definition: {this.state.defination}</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    textBox : {
        backgroundColor: '#ff0000',
        width: 500,
        height: 50,
        marginLeft: 500,
        marginTop: 200,
    },

    textContainer: {
        backgroundColor: '#FF00A7', 
        justifyContent:'center', 
        alignItems:'center'
    },

    text: {
        fontSize: 20, 
        marginTop: 20, 
        marginBottom: 20
    },

    buttonContainer: {
        marginTop: 50, 
        width: 200, 
        height:50, 
        marginLeft: 650
    }
})

export default HomeScreen;
