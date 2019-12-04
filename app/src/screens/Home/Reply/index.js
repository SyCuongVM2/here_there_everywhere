import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, 
  KeyboardAvoidingView, Image 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';

import styles from './styles';
import ActivityLoading from '../../../components/Common/ActivityLoading';
import { getComment, getReply, addReply } from '../../../redux/actions/commentActions';

const Reply = ({ 
  navigation,
  getComment,
  getReply,
  addReply,
  comments: { comments_loading, comment }
}) => {
  const articleId  = navigation.getParam('articleId');
  const commentId = navigation.getParam('commentId');
  const replyId = navigation.getParam('replyId');
  const type = navigation.getParam('type');

  const toastRef = useRef();

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
    if (type == "comment") {
      getComment(commentId);
    } else {
      getReply(commentId, replyId);
    }
  }, [commentId]);

  const sendReply = () => {
    if (!commentContent) {
      toastRef.current.show('Vui lòng nhập bình luận của bạn', 3000);
    } else {
      if (type == "comment") {
        addReply(articleId, commentId, { text: commentContent });
      } else {
        addReply(articleId, commentId, { text: "@" + comment.name + ": " + commentContent });
      }
      
      navigation.goBack();
    }
  };

  return (comments_loading) ? (
    <ActivityLoading />
  ) : (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={{flex: 1, alignItems: 'flex-start'}} onPress={() => navigation.goBack()}>
            <Ionicons name="ios-close" size={30} />
          </TouchableOpacity>
          <View style={{flex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 40}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>Trả lời</Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 300}}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 14, fontWeight: '300', textAlign: 'left'}}>{comment.text}</Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <Image source={{ uri: comment.avatar }} style={{width: 18, height: 18, borderRadius: 9}} />
          <Text style={{fontSize: 14, fontWeight: '500', marginLeft: 5}}>{comment.name}</Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, justifyContent: 'center', alignItems: 'center', borderTopWidth: 0.8, borderTopColor: '#E5E5E5'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
            <MaterialIcons name="mic" size={26} color="#999999" />
          </View>
          <View style={{flex: 4, justifyContent: 'center', height: 80, borderRadius: 15, borderColor: '#999999', borderWidth: 0.5, marginHorizontal: 10}}>
            <TextInput 
              autoFocus
              multiline
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
            <TouchableOpacity style={{marginRight: 10}} onPress={() => sendReply()}>
              <MaterialIcons name="send" size={28} color={isEditing ? "#9d234c" : "#999999"} style={{marginLeft: 5}} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast position='top' positionValue={25} ref={toastRef} />
    </View>
  )
};

const mapStateToProps = state => ({
  auth: state.auth,
  comments: state.comments
});
export default connect(mapStateToProps, { 
  getComment, 
  getReply,
  addReply
})(Reply);