import React, { useState } from 'react';
import { 
  Text, View, Animated, ImageBackground, TextInput,
  Dimensions, TouchableOpacity, FlatList
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';
import mocks from '../../../assets/mocks';
import { register } from '../../../redux/actions/authActions';

const { width } = Dimensions.get('window');

const Register = ({ navigation, register, isAuthenticated }) => {
  const scrollX = new Animated.Value(0);

  const [credentials, setCredentials] = useState({ 
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = credentials;

  const renderHeaderItem = (item) => {
    return (
      <ImageBackground
        style={{ width: width, height: width * 0.5 }}
        source={{uri: item.preview}}
      >
        <View style={{marginTop: 10, alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" color="#999999" size={28} style={{marginLeft: 5}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#999999'}}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft: 10, marginVertical: 15}}>
          <Text style={{fontSize: 14, fontWeight: '600', color: '#ffffff'}}>{item.header}</Text>
        </View>
        <View style={{width: width/2, marginLeft: 10}}>
          <Text style={{fontSize: 14, fontWeight: '300', color: '#ffffff'}}>{item.content}</Text>
        </View>
      </ImageBackground>
    )
  };
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    
    return (
      <View style={[styles.flex, styles.row, styles.dotsContainer]}>
        {mocks.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp'
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDot, {opacity}]}
            />
          )
        })}
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={{flex: 1}}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          style={{overflow:'visible'}}
          data={mocks}
          keyExtractor={item => { return item.id.toString() }}
          onScroll={Animated.event([
            { 
              nativeEvent: { 
                contentOffset: { x: scrollX }
              } 
            }
          ])}
          renderItem={({item}) => renderHeaderItem(item)}
        />
        {renderDots()}
      </View>
    )
  };

  const onSubmit = () => {
    register({ name, email, password });
  };

  if (isAuthenticated) {
    navigation.navigate('Settings');
  }

  return (
    <View style={styles.flex}>
      <View style={{flex: 1}}>
        {renderHeader()}
      </View>
      <View style={{flex: 2.44, paddingHorizontal: 25, paddingTop: 50}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{flexDirection: 'row', width: (width - 55)/2, height: 40, backgroundColor: '#3A5795', justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
            <Ionicons name="logo-facebook" color="#FFFFFF" size={28} style={{marginRight: 10}} />
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', width: (width - 55)/2, height: 40, backgroundColor: '#D73D32', justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="logo-google" color="#FFFFFF" size={28} style={{marginRight: 10}} />
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
          <View style={{width: (width - 100)/2, height: 0.5, backgroundColor: '#999999'}} />
          <Text style={{fontSize: 14, color: '#999999', paddingHorizontal: 5}}> Hoặc </Text>
          <View style={{width: (width - 100)/2, height: 0.5, backgroundColor: '#999999'}} />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center', width: width - 50, alignItems: 'flex-start', height: 35, borderColor: '#999999', borderWidth: 0.5}}>
            <TextInput 
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Họ và tên"
              placeholderTextColor="#999999"
              style={{fontSize: 14, fontWeight: '400', paddingLeft: 10}}
              onChangeText={name => setCredentials({ ...credentials, name })}
              value={name}
            />
          </View>
          <View style={{justifyContent: 'center', width: width - 50, alignItems: 'flex-start', height: 35, borderColor: '#999999', borderWidth: 0.5, marginVertical: 10}}>
            <TextInput 
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Email"
              keyboardType='email-address'
              placeholderTextColor="#999999"
              style={{fontSize: 14, fontWeight: '400', paddingLeft: 10}}
              onChangeText={email => setCredentials({ ...credentials, email })}
              value={email}
            />
          </View>
          <View style={{justifyContent: 'center', width: width - 50, alignItems: 'flex-start', height: 35, borderColor: '#999999', borderWidth: 0.5}}>
            <TextInput 
              secureTextEntry
              autoCapitalize='none'
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Mật khẩu"
              placeholderTextColor="#999999"
              style={{fontSize: 14, fontWeight: '400', paddingLeft: 10}}
              onChangeText={password => setCredentials({ ...credentials, password })}
              value={password}
            />
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 30}}>
          <TouchableOpacity 
            style={{width: (width - 50), height: 40, backgroundColor: '#9d234c', justifyContent: 'center', alignItems: 'center'}}
            onPress={() => onSubmit()}
          >
            <Text style={{fontSize: 14, color: '#FFFFFF'}}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', height: 45, borderTopWidth: 0.8, borderTopColor: '#E5E5E5'}}>
        <Text style={{fontSize: 14, fontWeight: '300'}}>Đã có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 14, fontWeight: '300', color: '#9d234c', marginLeft: 5}}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);