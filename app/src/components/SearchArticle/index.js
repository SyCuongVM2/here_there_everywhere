import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';
import { getTotalComments } from '../../redux/actions/commentActions';

const SearchArticle = ({ 
  data, 
  navigation, 
  getTotalComments, 
  comments: { countComments } 
}) => {
  const { _id, article_thumb_art, article_title, article_date, category } = data;

  useEffect(() => {
    getTotalComments(_id);
  }, [getTotalComments, _id]);
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { articleId: _id })}>
      <View style={{flexDirection: 'row', paddingVertical: 15}}>
        <View style={{flex: 2.5, marginRight: 10}}>
          <View>
            <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'left'}}>{article_title}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontSize: 12, fontWeight: '200'}}>{article_date}</Text>
            { category && 
              <Text style={{fontSize: 12, fontWeight: '200', marginHorizontal: 10}}>{category.vn_name}</Text> 
            }
            { countComments > 0 && 
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-text" color="#9d234c" size={18} style={{marginRight: 10}} />
                <Text style={{fontSize: 12, fontWeight: '200', color: '#9d234c'}}>{countComments}</Text>
              </View>
            }
          </View>
        </View>
        <View style={{flex: 1}}>
          <Image source={{uri: article_thumb_art}} style={{width: 120, height: 60}} />
        </View>
      </View>
    </TouchableOpacity>
  )
};

const mapStateToProps = state => ({
  comments: state.comments
});
export default connect(mapStateToProps, { 
  getTotalComments 
})(SearchArticle);