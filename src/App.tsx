import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image, CameraRollAssetType, ActivityIndicator, ListViewComponent, ScrollView, Dimensions } from 'react-native'
import { Camera } from 'expo-camera'
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons';
import { Appbar, Button, Divider, List, Menu, Provider, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { green100 } from 'react-native-paper/lib/typescript/styles/colors';
import MapView from 'react-native-maps';

const io = require('socket.io-client');

let endpoint = "http://127.0.0.1:5000/";

class App extends React.Component {

  state = {
    RequestFrom: false,
    HomeScreen: false,
    username: "",
    password: "",
    OrderSelection: false,
    loginPage: false,
    ReviewCart: false,
    ProgressScreen: false,
    KC_ProgressScreen: false,
    KC_Delivered_Screen: false,
    Register_SelectType: false,
    Delivered_Screen: false,
    CK_Programs_Offered: false,
    selectedCKProgram: '',
    CK_Today_Menu: false,
    SelectKitchen: 'Together Us Kitchens',
    Payment_Options: false,
    V_Requests: false,
    V_Map_Screen: true
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  }

  elements = ['Bread', "Bananas", "Eggs", 'Bread', "Bananas", "Eggs", 'Bread', "Bananas", "Eggs", 'Bread', "Bananas", "Eggs"]

  kitchens = ['SS Sikh Temple', "Red Community Kitchen", "Robert Memorial Community Kitchen", 'Christ Family Kitchen']

  colors = ['green', "yellow", "orange", 'red']

  render() {

    return (
      <View>
        {this.state.loginPage ? this.Login : (<View></View>)}
        {this.state.HomeScreen ? this.HomeScreen : (<View></View>)}
        {this.state.RequestFrom ? this.RequestFrom : (<View></View>)}
        {this.state.OrderSelection ? this.OrderSelection : (<View></View>)}
        {this.state.Register_SelectType ? this.Register_SelectType : (<View></View>)}
        {this.state.ReviewCart ? this.ReviewCart : (<View></View>)}
        {this.state.ProgressScreen ? this.ProgressScreen : (<View></View>)}
        {this.state.Delivered_Screen ? this.Delivered_Screen : (<View></View>)}
        {this.state.KC_ProgressScreen ? this.KC_ProgressScreen : (<View></View>)}
        {this.state.KC_Delivered_Screen ? this.KC_Delivered_Screen : (<View></View>)}
        {this.state.CK_Programs_Offered ? this.CK_Programs_Offered : (<View></View>)}
        {this.state.CK_Today_Menu ? this.CK_Today_Menu : (<View></View>)}
        {this.state.Payment_Options ? this.Payment_Options : (<View></View>)}
        {this.state.V_Requests ? this.V_Requests : (<View></View>)}
        {this.state.V_Map_Screen ? this.V_Map_Screen : (<View></View>)}

      </View>
    )
  }

  stars() {
    var items = [];
    for (var i = 0; i < 5; i++) {
      items.push(<Image key={i} style={{ width: 30, height: 30 }} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/vote-reward-7/24/award_reward_rate_rating_star_empty-512.png' }} />)
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        {items}
      </View>
    )
  }

  KC_Delivered_Screen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 170 }}>
        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>Your order has been delivered</Text>
        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 18, marginTop: 30, padding: 20 }}>Your community kitcehn also has:</Text>
        <Text style={{ margin: 20, textAlign: 'center', backgroundColor: '#FFF2CC', padding: 20, fontSize: 20, borderRadius: 20, color: '#5E5A4B' }}>
          After school meal program for ABC School
      </Text>
      </View>
      <Text style={{ margin: 10, width: '94%', position: 'absolute', bottom: 0, backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, padding: 10, borderWidth: 1, textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>
        Give Feedback
    </Text>
    </View>;

  V_Map_Screen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'column', paddingTop: 13,height:50, backgroundColor:'#e2e2e2'}}>
        <Text style={{textAlign: 'right', alignContent:'flex-end', alignItems:'flex-end', textAlignVertical:'center', paddingBottom:12, fontWeight: 'bold', width: '100%', paddingRight: 10}}>Distance: 5.2 miles</Text>
      </View>
      <View style={MapStyles.container}>
        <MapView style={MapStyles.map}
          initialRegion={{
            latitude: 49.22000084691575,
            longitude: -122.60016910353391,
            latitudeDelta: 0.01,
            longitudeDelta: 0.003
          }} />
      </View>
      <View style={{ position: 'absolute', bottom: 10, backgroundColor: '#00000087', margin: 10, borderRadius: 5, borderTopWidth: 5, borderTopColor: '#82B366' }}>
        <View style={{ flexDirection:'row', width:'100%' }}>
          <Text style={{ textAlignVertical:'center', width:'54%', paddingTop: 10, paddingLeft: 10, paddingBottom:12, color:'white', fontWeight: 'bold' }}>Pickup: Sikh Temple</Text>
          <Text style={{ textAlignVertical:'center', paddingBottom:12, paddingTop: 10, fontWeight: 'bold', textAlign: 'right', color:'white' }}> Drop off: 122 Heath St</Text>
        </View>
        <View style={{ flexDirection: 'row', borderColor: '#666666', backgroundColor: '#F5F5F5', margin: 10, marginTop: 0,  borderRadius: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10, marginLeft: 0, padding: 10, textAlignVertical: 'center', paddingBottom: 10, width: '50%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>+1-(716)-495-9321</Text>
          <Text style={{ fontSize: 15, margin: 10, marginLeft: 0, borderColor: '#FFD966', backgroundColor: '#FFD966', borderRadius: 10, padding: 10, textAlignVertical: 'center', paddingBottom: 10, borderWidth: 1, width: '40%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Make the call</Text>
        </View>
        <View style={{ flexDirection: 'row', borderRadius: 5 }}>
          <Text style={{ fontSize: 15, margin: 10, marginTop: 1, borderRadius: 5, marginBottom: 1, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '94%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Pending Orders: 12</Text>
        </View>
        <View style={{ flexDirection: 'row', borderRadius: 5 }}>
          <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', borderRadius: 5, padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
          <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, borderRadius: 5, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Check Drop Off Area</Text>
        </View>
      </View>

    </View>;

  V_Requests =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>A Request has been made at:</Text>
      <ScrollView persistentScrollbar={true} style={{ borderWidth: 1, paddingBottom: 5, flexDirection: 'column', width: '100%', height: '60%', backgroundColor: "#e2e2e2" }}>
        {this.kitchens.map((value, index) => {
          return <TouchableOpacity onPress={() => this.setScreen("CK_Today_Menu")} style={{ borderLeftWidth: 3, borderColor: this.colors[index], margin: 5, paddingLeft: 15, marginBottom: 0, padding: 10, backgroundColor: 'white' }}>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }} key={index}>{value}</Text>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }}>{5 * (index + 1)}{" mins ago"}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, margin: 10, backgroundColor: '#D5E8D4', borderColor: '#82B366', marginLeft: 0, padding: 10, borderWidth: 1, width: '50%', textAlign: 'center' }}>Accept</Text>
            </View>
          </TouchableOpacity>
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
        <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Refresh</Text>
      </View>
    </View>;

  KC_ProgressScreen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: 20, marginTop: 20 }}>Check Progress</Text>
        <View style={{ alignItems: 'center', backgroundColor: '#D5E8D4', margin: 20, padding: 20, marginBottom: 0, borderRadius: 10, borderColor: '#82B366', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Your request has been accepted by the Kitchen</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#FFF2CC', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#D6B656', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Searching Carrier</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#D5E8D4', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#82B366', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Carrier has agreed to deliver</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#FFF2CC', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#D6B656', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Your meal is being prepared</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, position: 'absolute', bottom: 0 }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#e2e2e2', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Map</Text>
        <Text style={{ backgroundColor: '#CDA2BE', borderColor: '#B5739D', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Cancel Request</Text>
      </View>
    </View>;

  Payment_Options =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }} /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Payment Options</Text>
        <Text style={{ fontSize: 18, backgroundColor: '#D5E8D4', borderColor: '#82B366', borderWidth: 1, padding: 10, width: '95%' }}>Wallet</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Image style={{ width: 45, height: 45, borderRadius: 50 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFvZq_uSqF1QAPQxyLr2_nAb6A1asmFCZpw&usqp=CAU' }} />
          <Text style={{ textAlignVertical: 'center' }}>Link Account</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
          <Image style={{ width: 45, height: 45, borderRadius: 50 }} source={{ uri: 'https://www.kindpng.com/picc/m/12-123392_transparent-paytm-logo-png-nerd-badge-png-download.png' }} />
          <Text style={{ textAlignVertical: 'center' }}>Link Account</Text>
        </View>

        <Text style={{ fontSize: 18, backgroundColor: '#D5E8D4', borderColor: '#82B366', borderWidth: 1, padding: 10, width: '95%' }}>Cards</Text>
        <Text style={{ fontSize: 20, borderWidth: 1, borderRadius: 30, width: 30, margin: 10, paddingLeft: 5 }}> {'+'}</Text>
        <Text style={{ fontSize: 18, backgroundColor: '#D5E8D4', borderColor: '#82B366', borderWidth: 1, padding: 10, width: '95%' }}>Food Cards</Text>
        <Text style={{ fontSize: 20, borderWidth: 1, borderRadius: 30, width: 30, margin: 10, paddingLeft: 5 }}> {'+'}</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
        <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("KC_ProgressScreen")}>Make Payment</Text>
      </View>
    </View>

  CK_Today_Menu =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>Today's Menu</Text>
      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>This meal contains</Text>

      <View style={{ borderWidth: 1, marginLeft: 20, marginRight: 20, borderRadius: 20, borderColor: 'black' }}>
        <Picker selectedValue={this.state.selectedCKProgram} style={{ height: 50, width: '100%' }} onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          <Picker.Item value="EnglewoodStreet" label="The Englewood Community Public Kitchen" />
          <Picker.Item value="HeathStreet" label="Presbysterian Community Food" />
        </Picker>
      </View>

      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>Community Kitchens in your locality</Text>
      <ScrollView persistentScrollbar={true} style={{ borderWidth: 1, paddingBottom: 5, flexDirection: 'column', width: '100%', height: '60%', backgroundColor: "#e2e2e2" }}>
        {this.kitchens.map((value, index) => {
          return <View style={{ borderLeftWidth: 3, borderColor: 'green', margin: 5, paddingLeft: 15, marginBottom: 0, padding: 10, backgroundColor: 'white' }}>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }} key={index + "-"}>{value}</Text>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }}>{"Timings: 8:00pm - 9:00pm"}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '50%', textAlign: 'center' }}>Open to all</Text>
              <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '40%', textAlign: 'center' }}>Free Service</Text>
            </View>
            {this.stars()}
          </View>
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
        <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("Payment_Options")}>Proceed to Checkout</Text>
      </View>
    </View>;

  CK_Programs_Offered =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>Programs offered in your locality</Text>
      <View style={{ borderWidth: 1, marginLeft: 20, marginRight: 20, borderRadius: 20, borderColor: 'black' }}>
        <Picker
          selectedValue={this.state.selectedCKProgram}
          style={{ height: 50, width: '100%' }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }>
          <Picker.Item value="EnglewoodStreet" label="The Englewood Community Public Kitchen" />
          <Picker.Item value="HeathStreet" label="Presbysterian Community Food" />
        </Picker>
      </View>
      <Text style={{ marginLeft: 20, fontWeight: '800', marginTop: 20, fontSize: 15, marginBottom: 15 }}>Community Kitchens in your locality</Text>
      <ScrollView persistentScrollbar={true} style={{ borderWidth: 1, paddingBottom: 5, flexDirection: 'column', width: '100%', height: '60%', backgroundColor: "#e2e2e2" }}>
        {this.kitchens.map((value, index) => {
          return <TouchableOpacity onPress={() => this.setScreen("CK_Today_Menu")} style={{ borderLeftWidth: 3, borderColor: 'green', margin: 5, paddingLeft: 15, marginBottom: 0, padding: 10, backgroundColor: 'white' }}>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }} key={index}>{value}</Text>
            <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '100%' }}>{"Timings: 8:00pm - 9:00pm"}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '50%', textAlign: 'center' }}>Open to all</Text>
              <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '40%', textAlign: 'center' }}>Free Service</Text>
            </View>
            {this.stars()}
          </TouchableOpacity>
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
        <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Review Basket</Text>
      </View>
    </View>;

  Delivered_Screen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 170 }}>
        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 30 }}>Your order has been delivered</Text>
        <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 18, marginTop: 30, padding: 20 }}>Here is one of the programs your foodbank offers:</Text>
        <Text style={{ margin: 20, textAlign: 'center', backgroundColor: '#FFF2CC', padding: 20, fontSize: 20, borderRadius: 20, color: '#5E5A4B' }}>
          Healthy Beginnings- Pre Natal Program
        </Text>
      </View>
      <Text style={{ margin: 10, width: '94%', position: 'absolute', bottom: 0, backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, padding: 10, borderWidth: 1, textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>
        Give Feedback
      </Text>
    </View>;

  ProgressScreen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontWeight: '600', fontSize: 20, marginLeft: 20, marginTop: 20 }}>Check Progress</Text>
        <View style={{ alignItems: 'center', backgroundColor: '#D5E8D4', margin: 20, padding: 20, marginBottom: 0, borderRadius: 10, borderColor: '#82B366', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Your request has been made</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#FFF2CC', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#D6B656', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Searching Foodbank</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#D5E8D4', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#82B366', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Foodbank has accepted request</Text>
        </View>
        <View style={{ margin: 10, transform: [{ rotateZ: '180deg' }], alignItems: 'center' }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://img.icons8.com/ios/344/long-arrow-up.png' }} />
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#FFF2CC', margin: 20, marginTop: 0, marginBottom: 0, padding: 20, borderRadius: 10, borderColor: '#D6B656', borderWidth: 2 }}>
          <Text style={{ fontSize: 18 }}>Searching Carrier</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20, position: 'absolute', bottom: 0 }}>
        <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#e2e2e2', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Map</Text>
        <Text style={{ backgroundColor: '#CDA2BE', borderColor: '#B5739D', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Cancel Request</Text>
      </View>
    </View>;

  OrderSelection =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("RequestFrom")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{}}>
        <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 25 }}>Basket</Text>
        <ScrollView persistentScrollbar={true} style={{ borderWidth: 1, paddingBottom: 5, flexDirection: 'column', width: '100%', height: '60%', backgroundColor: "#e2e2e2" }}>
          {this.elements.map((value, index) => {
            return <View style={{ margin: 5, paddingLeft: 15, marginBottom: 0, padding: 10, flexDirection: 'row', backgroundColor: 'white' }}>
              <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '80%' }} key={index}>{value}</Text>
              <Text style={{ textAlignVertical: 'center', marginRight: 5 }}>-</Text>
              <Text style={{ alignSelf: 'flex-end', textAlign: 'right', borderColor: '#3399FF', borderRadius: 80, borderWidth: 2, padding: 10, paddingRight: 13 }}>1x</Text>
              <Text style={{ textAlignVertical: 'center', marginLeft: 3 }}>+</Text>
            </View>
          })}
        </ScrollView>
        <View style={{ width: '100%', marginTop: 20 }}>
          <Text style={{ backgroundColor: '#e3e2e2', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginLeft: 10, padding: 10, borderWidth: 2, width: '95%' }}> I have a referral code of a food bank</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("RequestFrom")}>Back</Text>
          <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("ReviewCart")}>Review Basket</Text>
        </View>
      </View>
    </View>;

  ReviewCart =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("OrderSelection")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{}}>
        <Text style={{ marginLeft: 15, marginBottom: 10, fontSize: 25 }}>Basket</Text>
        <ScrollView persistentScrollbar={true} style={{ borderWidth: 1, paddingBottom: 5, flexDirection: 'column', width: '100%', height: '58%', backgroundColor: "#e2e2e2" }}>
          {this.elements.map((value, index) => {
            return <View style={{ margin: 5, paddingLeft: 15, marginBottom: 0, padding: 10, flexDirection: 'row', backgroundColor: '#EAFFE9' }}>
              <Text style={{ textAlignVertical: 'center', fontWeight: '800', fontSize: 15, textAlign: 'left', width: '85%' }} key={index}>{value}</Text>
              <Text style={{ alignSelf: 'flex-end', textAlign: 'right', borderColor: '#3399FF', borderRadius: 80, borderWidth: 2, padding: 10, paddingRight: 13 }}>2x</Text>
            </View>
          })}
        </ScrollView>
        <View style={{ width: '100%', marginTop: 20 }}>
          <Text style={{ backgroundColor: '#FFF2CC', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginLeft: 10, padding: 10, borderRadius: 5, width: '95%' }}>
            Acceptance of your request wholly or conditionally is subjected to availability at the food bank and viability of the request.
        </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, margin: 10, borderColor: '#666666', backgroundColor: '#F5F5F5', padding: 10, borderWidth: 1, width: '20%', textAlign: 'center' }} onPress={() => this.setScreen("OrderSelection")}>Back</Text>
          <Text style={{ backgroundColor: '#D5E8D4', borderColor: '#82B366', fontSize: 15, margin: 10, marginLeft: 0, padding: 10, borderWidth: 1, width: '72%', textAlign: 'center' }} onPress={() => this.setScreen("Delivered_Screen")}>Make Request</Text>
        </View>
      </View>
    </View>;

  Register_SelectType = <View style={{ height: '100%', width: '100%' }}>
    <Appbar style={{ backgroundColor: '#f3f3f3' }}>
      <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
      <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
    </Appbar>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ margin: 10 }}><Image
        style={{ width: 45, height: 45 }}
        source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
      /></View>
      <View>
        <Text>Bhavin Jawade</Text>
        <Text>bhavinjawade@gmail.com</Text>
      </View>
    </View>
    <View style={{ justifyContent: 'center', marginTop: 170 }}>
      <Text style={{ fontWeight: '600', fontSize: 25, marginLeft: 20 }}>I am a ...</Text>
      <View style={{ alignItems: 'center', backgroundColor: 'yellow', margin: 20, padding: 20, marginBottom: 0, borderRadius: 10, borderColor: '#CCCC6D', borderWidth: 2 }}><Text onPress={() => this.setScreen("HomeScreen")} style={{ fontSize: 25 }}>Agency/NGO POC</Text></View>
      <View style={{ alignItems: 'center', backgroundColor: '#FFCC99', margin: 20, padding: 20, borderRadius: 10, borderColor: '#D4A97F', borderWidth: 2 }}><Text style={{ fontSize: 25 }}>Individual</Text></View>
    </View>
  </View>;


  HomeScreen =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <Text style={{ textAlign: 'right', padding: 20, backgroundColor: '#e2e2e2' }} onPress={() => this.setScreen("loginPage")}>Login</Text>
      <View style={{ justifyContent: 'center', marginLeft: 30, marginTop: 170 }}>
        <Text style={{ fontWeight: '600', fontSize: 25 }}>Get Started</Text>
        <Text style={{ fontSize: 20 }}>What are you interested in?</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', width: '100%', bottom: 20, justifyContent: 'center' }}>
        <View>
          <TouchableOpacity style={buttonStyles.button} onPress={() => this.setScreen("RequestFrom")}>
            <Text style={{ fontSize: 15 }}>Need Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyles.button} onPress={() => console.log('Pressed')}>
            <Text style={{ fontSize: 15 }}>Donate Food</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={buttonStyles.button} onPress={() => console.log('Pressed')}>
            <Text style={{ fontSize: 15 }}>Help Deliver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={buttonStyles.button} onPress={() => console.log('Pressed')}>
            <Text style={{ fontSize: 15, textAlign: 'center' }}>Manage my foodbank</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>;

  RequestFrom =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.BackAction onPress={() => this.setScreen("HomeScreen")} />
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ margin: 10 }}><Image
          style={{ width: 45, height: 45 }}
          source={{ uri: 'https://www.hotelieracademy.org/wp-content/uploads/2019/04/user-icon-human-person-sign-vector-10206693.png' }}
        /></View>
        <View>
          <Text>Bhavin Jawade</Text>
          <Text>bhavinjawade@gmail.com</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', marginTop: 170 }}>
        <Text style={{ fontWeight: '600', fontSize: 25, marginLeft: 20 }}>Request from a ...</Text>
        <View style={{ alignItems: 'center', backgroundColor: 'yellow', margin: 20, padding: 20, marginBottom: 0, borderRadius: 10, borderColor: '#CCCC6D', borderWidth: 2 }}>
          <Text onPress={() => this.setScreen("OrderSelection")} style={{ fontSize: 25 }}>Food Bank</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: '#FFCC99', margin: 20, padding: 20, borderRadius: 10, borderColor: '#D4A97F', borderWidth: 2 }}>
          <Text onPress={() => this.setScreen("CK_Programs_Offered")} style={{ fontSize: 25 }}>Community Kitchen</Text>
        </View>
      </View>
    </View>;

  Login =
    <View style={{ height: '100%', width: '100%' }}>
      <Appbar style={{ backgroundColor: '#f3f3f3' }}>
        <Appbar.Content title="FoodUnity" subtitle="Community serving the community" />
      </Appbar>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Login</Text>
        <TextInput style={{ marginBottom: 20 }} label="Email" />
        <TextInput label="Password" secureTextEntry={true} onChangeText={text => this.setState({ username: text })} />
        <Text style={{ marginTop: 20, padding: 20, textAlign: 'center', fontSize: 20, backgroundColor: '#8835ff', borderColor: '#6200ee', borderWidth: 1, borderRadius: 10, color: 'white' }}>Sign In</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginLeft: 20 }}>Do not have an account?</Text><Text style={{ marginLeft: 5, color: '#8835ff' }} onPress={() => this.setScreen("Register_SelectType")}>Create One</Text>
      </View>
    </View>



  setScreen(screenname: string) {
    let dict = Object()
    dict[screenname] = true;
    this.setState(dict)
    for (var key in this.state) {
      if (key != screenname) {
        dict[key] = false
      }
    }
    this.setState(dict);
    console.log(dict, this.state);
  }
}

const MapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-100,
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    backgroundColor: '#D5E8D4',
    margin: 10,
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: '#82B366',
    borderRadius: 10
  }
})

export default App;