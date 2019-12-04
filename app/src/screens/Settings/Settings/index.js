import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';
import { logout } from '../../../redux/actions/authActions';

const Settings = ({ 
  navigation,
  auth: { isAuthenticated, user, loading }, 
  logout
}) => {
  const authLinks = (
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
      <Text style={{fontSize: 14, color: '#FFFFFF'}}>{user && user.name}</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={{fontSize: 14, color: 'yellow', marginTop: 10}}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
  const guestLinks = (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{fontSize: 14, color: 'yellow'}}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 14, color: 'yellow', marginHorizontal: 5}}>/</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{fontSize: 14, color: 'yellow'}}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 18, fontWeight: '400'}}>Thiết lập</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop: 30, paddingBottom: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9d234c'}}>
          <View style={{width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#ffffff', backgroundColor: '#9DA3C4', justifyContent: 'center', alignItems: 'center'}}>
            <Ionicons name="ios-person" size={50} color= {isAuthenticated ? "#9d234c" : "#ffffff"} />
          </View>
          {!loading && (
            <>
              {isAuthenticated ? authLinks : guestLinks}
            </>
          )}
        </View>
        <View style={{marginTop: 10}}>
          <View style={{paddingHorizontal: 20, marginVertical: 15}}>
            <Text style={{fontSize: 14, fontWeight: '500'}}>Nội dung</Text>
          </View>
          <TouchableOpacity> 
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{marginRight: 10}}>
                <Ionicons name="ios-apps" size={18} />
              </View>
              <Text style={{fontSize: 14, fontWeight: '300'}}>Tin đã lưu</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity> 
            <View style={{flexDirection: 'row', paddingHorizontal: 20, marginVertical: 15}}>
              <View style={{marginRight: 10}}>
                <Ionicons name="ios-chatboxes" size={18} />
              </View>
              <Text style={{fontSize: 14, fontWeight: '300'}}>Bình luận của bạn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity> 
            <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
              <View style={{marginRight: 10}}>
                <Ionicons name="ios-eye" size={18} />
              </View>
              <Text style={{fontSize: 14, fontWeight: '300'}}>Tin đã xem</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect( mapStateToProps, { logout })(Settings);