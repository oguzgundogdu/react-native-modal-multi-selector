'use strict';

import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    Switch,
    Image
} from 'react-native';

import ModalSelector from 'react-native-modal-multi-selector'
import { countryList } from "./assets/CountryList";

class SampleApp extends Component {

    constructor() {
        super();

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, section: true, label: 'Fruits' },
            { key: index++, label: 'Red Apples', component: <View style={{backgroundColor: 'red', borderRadius: 5, alignItems: 'center'}}><Text style={{color: 'white'}}>Red Apples custom component ☺</Text></View> },
            { key: index++, label: 'Cherries' },
            { key: index++, label: 'Cranberries' },
            { key: index++, label: 'Pink Grapefruit' },
            { key: index++, label: 'Raspberries' },
            { key: index++, section: true, label: 'Vegetables' },
            { key: index++, label: 'Beets' },
            { key: index++, label: 'Red Peppers' },
            { key: index++, label: 'Radishes' },
            { key: index++, label: 'Radicchio' },
            { key: index++, label: 'Red Onions' },
            { key: index++, label: 'Red Potatoes' },
            { key: index++, label: 'Rhubarb' },
            { key: index++, label: 'Tomatoes' }
        ];

        return (
            <View style={{ flex: 1, justifyContent: 'space-around', padding: 50 }}>

                { /* Multi mode: a clickable button will re rendered */ }
                <ModalSelector
                    data={data}
                    selectStyle={{borderColor: "black"}}
                    selectTextStyle={{color: "blue"}}
                    multi={true}
                    onChange={item => { console.log(item) }}
                />

                { /* Default mode: a clickable button will re rendered */ }
                <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    initValueTextStyle={{color: "black"}}
                    selectStyle={{borderColor: "black"}}
                    selectTextStyle={{color: "blue"}}
                    onChange={option => { alert(`${option.label} (${option.key}) nom nom nom`) }}
                />

               

                { /*
                    Wrapper mode: just wrap your existing component with ModalSelector.
                    When the user clicks on your element, the modal selector is shown.
                 */ }
                <ModalSelector
                    data={data}
                    initValue="Select something yummy!"
                    onChange={option => { this.setState({textInputValue:option.label}) }}>

                    <TextInput
                        style={{ borderWidth: 1, borderColor: "black", padding: 10, height: 40 }}
                        editable={false}
                        placeholder="Select something yummy!"
                        placeholderTextColor={"black"}
                        value={this.state.textInputValue} />

                </ModalSelector>

                { /*
                    Custom mode: you have to provide a react-native component that have to
                    control how the selector should open (and for this you need a ref to the modal)
                 */ }
                <ModalSelector
                    data={data}
                    ref={selector => { this.selector = selector; }}
                    customSelector={
                        <Switch
                            style={{ alignSelf: 'center' }}
                            onValueChange={() => this.selector.open()}
                            thumbColor={"#88f"}
                        />
                    }
                />

            { /* Default mode: a clickable button will re rendered with FlatList */}
            <ModalSelector
              data={countryList}
              listType="FLATLIST"
              keyExtractor={(x) => x.name}
              labelExtractor={(x) => x.name}
              initValue="listType with FlatList"
              initValueTextStyle={{color: "black"}}
              selectStyle={{borderColor: "black"}}
              selectTextStyle={{color: "blue"}}
              onChange={option => { this.setState({ textInputValue: option.name }) }}
              componentExtractor={(option) => <ListItem data={option} />}
            />

            { /* Default mode: a clickable button will re rendered without FlatList */}
            <ModalSelector
              data={countryList}
              keyExtractor={(x) => x.name}
              labelExtractor={(x) => x.name}
              initValue="listType without FlatList"
              initValueTextStyle={{color: "black"}}
              selectStyle={{borderColor: "black"}}
              selectTextStyle={{color: "blue"}}
              onChange={option => { this.setState({ textInputValue: option.name }) }}
              componentExtractor={(option) => <ListItem data={option} />}/>


                 
            </View>
        );
    }
}

const ListItem = ({ data }) => {
  return (
    <View key={data.number} style={{ flexDirection: "row" }}>
      <Image
        style={{ width: 26, height: 26, borderRadius: 13 }}
        resizeMode="cover"
        source={{ uri: data.flag }}
      />
      <Text> {data.number}</Text>
      <Text> {data.name}</Text>
    </View>
  );
};

export default SampleApp;
