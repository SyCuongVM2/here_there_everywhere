import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, FlatList,
  ScrollView, KeyboardAvoidingView, Alert, Image 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import styles from './styles';
import ActivityLoading from '../../../components/Common/ActivityLoading';
import { 
  getComments, getTotalComments, 
  addComment, likeComment, likeReply 
} from '../../../redux/actions/commentActions';

const Comments = ({ 
  navigation,
  getComments,
  getTotalComments,
  addComment,
  likeComment,
  likeReply,
  auth: { loading, isAuthenticated },
  comments: { comments_loading, comments, countComments }
}) => {
  const toastRef = useRef();

  const articleId = navigation.getParam('articleId');

  useEffect(() => {
    getComments(articleId, activeSort);
    getTotalComments(articleId);
  }, [articleId, activeSort]);

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

  const [activeSort, setActiveSort] = useState("likes");
  const handleSort = (type) => {
    setActiveSort(type);
  };

  const onSend = () => {
    if (isAuthenticated) {
      toastRef.current.show('Vui lòng nhập bình luận của bạn', 3000);
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
  const onReply = (commentId, replyId, type) => {
    if (isAuthenticated) {
      navigation.navigate("Reply", { articleId, commentId, replyId, type });
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

  const renderReply = (item, commentId) => {
    const { _id, text, avatar, name, date, likes } = item;

    return (
      <View key={_id}>
        <Text style={{fontSize: 14, fontWeight: '300', textAlign: 'left', marginTop: 10}}>{text}</Text>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Image source={{ uri: avatar }} style={{width: 18, height: 18, borderRadius: 9}} />
          <Text style={{fontSize: 14, fontWeight: '500', marginLeft: 5}}>{name}</Text>
          <Text style={{fontSize: 14, fontWeight: '500', marginHorizontal: 5}}>-</Text>
          <Text style={{fontSize: 14, fontWeight: '300', color: '#999999'}}>{date}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Ionicons name="md-thumbs-up" size={16} color="#9d234c" />
            <Text style={{fontSize: 14, fontWeight: '500', color: '#00345B', marginHorizontal: 5}}>{likes && likes.length}</Text>
            <TouchableOpacity onPress={() => likeReply(articleId, commentId, _id)}>
              <Text style={{fontSize: 14, fontWeight: '300', color: '#00345B'}}>Thích</Text>
            </TouchableOpacity>
            <View style={{width: 0.5, height: 10, backgroundColor: '#999999', marginHorizontal: 5}} />
            <TouchableOpacity onPress={() => onReply(commentId, _id, "reply")}>
              <Text style={{fontSize: 14, fontWeight: '300', color: '#00345B'}}>Trả lời</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  };
  const renderComments = (comment) => {
    return (
      <View>
        <View key={comment._id} style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 14, fontWeight: '300', textAlign: 'left', marginTop: 10}}>{comment.text}</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image source={{ uri: comment.avatar }} style={{width: 18, height: 18, borderRadius: 9}} />
            <Text style={{fontSize: 14, fontWeight: '500', marginLeft: 5}}>{comment.name}</Text>
            <Text style={{fontSize: 14, fontWeight: '500', marginHorizontal: 5}}>-</Text>
            <Text style={{fontSize: 14, fontWeight: '300', color: '#999999'}}>{comment.date_created}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Ionicons name="md-thumbs-up" size={16} color="#9d234c" />
              <Text style={{fontSize: 14, fontWeight: '500', color: '#00345B', marginHorizontal: 5}}>{comment.likes && comment.likes.length}</Text>
              <TouchableOpacity onPress={() => likeComment(articleId, comment._id)}>
                <Text style={{fontSize: 14, fontWeight: '300', color: '#00345B'}}>Thích</Text>
              </TouchableOpacity>
              <View style={{width: 0.5, height: 10, backgroundColor: '#999999', marginHorizontal: 5}} />
              <TouchableOpacity onPress={() => onReply(comment._id, "", "comment")}>
                <Text style={{fontSize: 14, fontWeight: '300', color: '#00345B'}}>Trả lời</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {comment.replies &&
          <View style={{ marginLeft: 25, marginRight: 10}}>
            <FlatList
              data={comment.replies}
              renderItem={({item}) => renderReply(item, comment._id)}
              keyExtractor={item => { return item._id }}
              ItemSeparatorComponent={()=><View style={{height: 0.7, backgroundColor: '#E5E5E5', marginTop: 10, marginLeft: 25}}/>}
              showsVerticalScrollIndicator={false}
            />
          </View>
        }
      </View>
    );
  };

  return (comments_loading) ? (
    <ActivityLoading />
  ) :  (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>Bình luận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{marginBottom: 60}}>
        <View style={{backgroundColor: '#E5E5E5', paddingLeft: 10, height: 30, alignItems: 'flex-start', justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#9d234c', marginRight: 5}}>Ý kiến bạn đọc</Text>
            <Text style={{fontSize: 14, fontWeight: '300', color: '#9d234c'}}>(</Text>
            <Text style={{fontSize: 14, fontWeight: '300', color: '#9d234c'}}>{countComments}</Text>
            <Text style={{fontSize: 14, fontWeight: '300', color: '#9d234c'}}>)</Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-start', backgroundColor: '#F0F0F0'}}>
          <View style={{flexDirection: 'row', height: 30, alignItems: 'center', justifyContent: 'center', paddingLeft: 10, borderBottomWidth: 1.5, borderBottomColor: '#E5E5E5'}}>
            <View style={[activeSort === "likes" ? styles.bottomActive : styles.bottomInActive, { height: 30, alignItems: 'center', justifyContent: 'center' }]}>
              <TouchableOpacity onPress={() => handleSort("likes")}>
                <Text style={{fontSize: 14, fontWeight: '400', color: activeSort === "likes" ? '#9d234c' : '#000000'}}>Quan tâm nhất</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 0.5, height: 10, backgroundColor: '#999999', marginHorizontal: 5}} />
            <View style={[activeSort === "latest" ? styles.bottomActive : styles.bottomInActive, { height: 30, alignItems: 'center', justifyContent: 'center' }]}>
              <TouchableOpacity onPress={() => handleSort("latest")}>
                <Text style={{fontSize: 14, fontWeight: '400', color: activeSort === "latest" ? '#9d234c' : '#000000'}}>Mới nhất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {comments && comments.map(comment => renderComments(comment))}
      </ScrollView>
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', height: 45, borderTopWidth: 0.8, borderTopColor: '#E5E5E5'}}>
        {!loading && (
          <>
            {isAuthenticated ? (
              <View style={{width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: '#9d234c', backgroundColor: '#BDBDBD', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                <Ionicons name="ios-person" size={26} color="#9d234c" />
              </View>
            ) : null}
          </>
        )}
        <View style={{flex: 4, justifyContent: 'center', height: 30, borderRadius: 15, borderColor: '#BDBDBD', borderWidth: 0.5, marginHorizontal: 10}}>
          <TouchableOpacity onPress={() => setActiveModal(true)}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#BDBDBD', paddingHorizontal: 10}}>Bình luận của bạn</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{marginRight: 10}} onPress={() => onSend()}>
            <MaterialIcons name="send" size={28} color="#BDBDBD" style={{marginLeft: 5}} />
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
  comments: state.comments
});
export default connect(mapStateToProps, { 
  getComments,
  getTotalComments,
  addComment, 
  likeComment,
  likeReply
})(Comments);