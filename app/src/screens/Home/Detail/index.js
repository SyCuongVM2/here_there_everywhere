import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Image from 'react-native-scalable-image';
import Modal from 'react-native-modal';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import styles from './styles';
import ActivityLoading from '../../../components/Common/ActivityLoading';
import { getArticle } from '../../../redux/actions/articleActions';
import { addComment, getTotalComments } from '../../../redux/actions/commentActions';

const Detail = ({ 
  navigation, 
  getArticle, 
  getTotalComments,
  addComment,
  auth: { isAuthenticated }, 
  articles: { article, article_loading },
  comments: { countComments }
}) => {
  const toastRef = useRef();

  const articleId = navigation.getParam('articleId');
  const { category, article_date, article_title, article_desc, article_content } = article;

  const [activeModal, setActiveModal] = useState(false);
  const [states, setStates] = useState({ 
    commentFocus: false,
    commentContent: null
  });
  const { commentContent, commentFocus } = states;
  const isEditing = commentFocus && commentContent;
  const modalCommentFocus = (status) => {
    setStates({ ...states, commentFocus: status });
  };

  useEffect(() => {
    getArticle(articleId);
    getTotalComments(articleId);
  }, [getArticle, articleId]);

  const onComment = () => {
    if (countComments > 0) {
      navigation.navigate("Comments", { articleId });
    } else {
      setActiveModal(true);
    }
  };
  const sendComment = () => {
    if (!commentContent) {
      toastRef.current.show('Vui lòng nhập bình luận của bạn', 3000);
    } else {
      if (isAuthenticated) {
        addComment(articleId, { text: commentContent });

        setStates({ ...states, commentContent: null })
        setActiveModal(false);
        toastRef.current.show('Bạn đã thêm bình luận thành công!', 3000);
        
        setTimeout(() => { 
          navigation.navigate("Comments", { articleId });
        }, 3000);
      } else {
        Alert.alert(
          'Bạn cần đăng nhập để gửi bình luận',
          '',
          [
            {
              text: 'Huỷ',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'Đồng ý', 
              onPress: () => {
                setActiveModal(false);
                navigation.navigate("Login");
              }
            },
          ],
          { cancelable: false },
        );
      }
    }
  };
  const saveArticle = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Bạn cần đăng nhập tài khoản để lưu tin',
        '',
        [
          {
            text: 'Huỷ',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Đồng ý', 
            onPress: () => {
              setActiveModal(false);
              navigation.navigate("Login");
            }
          },
        ],
        { cancelable: false },
      );
    }
  };

  const renderContent = (content) => {
    return (
      <View key={content._id}>
        {content.img_gallery && content.img_gallery.map(img => (
          <View key={img._id}>
            <Image source={{ uri: img.src }} width={Dimensions.get('window').width} />
          </View>
        ))}
        <View style={{marginHorizontal: 10}}>
          {content.img_title && (
            <View>
              <Text style={{fontSize: 13, fontWeight: '500', marginTop: 10}}>{content.img_title}</Text>
            </View>
          )}
          {content.img_desc && (
            <View>
              <Text style={{fontSize: 13, fontWeight: '300', marginVertical: 10}}>{content.img_desc.trim()}</Text>
            </View>
          )}
        </View>
      </View>
    )
  };
  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={{margin: 0, justifyContent: 'flex-end'}}
        backdropColor='#000000'
        onBackButtonPress={() => setActiveModal(false)}
        onBackdropPress={() => setActiveModal(false)}
        onSwipeComplete={() => setActiveModal(false)}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={{flexDirection: 'row', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
              <MaterialIcons name="mic" size={26} color="#999999" />
            </View>
            <View style={{flex: 4, justifyContent: 'center', height: 30, borderRadius: 15, borderColor: '#999999', borderWidth: 0.5, marginHorizontal: 10}}>
              <TextInput 
                autoFocus
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid="transparent"
                keyboardType='default'
                placeholder="Bình luận của bạn"
                placeholderTextColor="#999999"
                style={{fontSize: 14, fontWeight: '400', paddingLeft: 10}}
                onFocus={() => modalCommentFocus(true)}
                onChangeText={text => setStates({ ...states, commentContent: text })}
                value={commentContent}
              />
            </View>
            <View>
              <TouchableOpacity style={{marginRight: 10}} onPress={() => sendComment()}>
                <MaterialIcons name="send" size={28} color={isEditing ? "#9d234c" : "#999999"} style={{marginLeft: 5}} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  };

  return (article === null || article_loading) ? (
    <ActivityLoading />
  ) : (
    <View style={styles.container}>
      <ScrollView style={{flex: 1, marginBottom: 45}}>
        <View style={{flexDirection: 'row', marginTop: 10, marginHorizontal: 10}}>
          <Text style={{fontSize: 12, fontWeight: '300', color: '#9d234c'}}>{category && category.vn_name}</Text>
          <Text style={{fontSize: 12, fontWeight: '300', marginLeft: 10}}>{article_date}</Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 20, fontWeight: '600', marginVertical: 10}}>{article_title}</Text>
        </View>
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 15, fontWeight: '300', marginBottom: 10}}>{article_desc}</Text>
        </View>
        {article_content && article_content.map(content => renderContent(content))}
      </ScrollView>
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', height: 45, borderTopWidth: 0.8, borderTopColor: '#E5E5E5'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" color="#999999" size={28} style={{marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, borderRadius: 15, borderColor: '#999999', borderWidth: 0.5}}>
          {isAuthenticated &&
            <View style={{width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#9d234c', backgroundColor: '#999999', justifyContent: 'center', alignItems: 'center', marginLeft: 2}}>
              <Ionicons name="ios-person" size={22} color="#9d234c" />
            </View>
          }
          <TouchableOpacity onPress={() => setActiveModal(true)}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#999999', paddingHorizontal: 10}}>Bình luận của bạn</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => onComment()}>
              <Ionicons name="ios-contacts" color="#999999" size={28} />
            </TouchableOpacity>
            {countComments > 0 &&
              <View style={{position: 'absolute', top: -4, right: -10, backgroundColor: '#9d234c', height: 15, width: 20, borderRadius: 5}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 12, fontWeight: '400', color: '#FFFFFF'}}>{countComments}</Text>
                </View>
              </View>
            }
          </View>
          <TouchableOpacity onPress={() => saveArticle()}>
            <Ionicons name="ios-bookmark" color="#999999" size={28} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-cloud-upload" color="#999999" size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <Toast position='top' positionValue={25} ref={toastRef} />
      {renderModal()}
    </View>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles,
  comments: state.comments
});
export default connect(mapStateToProps, { 
  getArticle, 
  addComment,
  getTotalComments
})(Detail);