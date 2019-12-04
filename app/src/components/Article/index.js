import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Image from 'react-native-scalable-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';

import { getTotalComments } from '../../redux/actions/commentActions';

const Article = ({ 
  data, 
  index, 
  navigation, 
  getTotalComments, 
  comments: { countComments } 
}) => {
  const { _id, article_thumb_art, article_title, article_desc, article_date, category } = data;
  const large_thumb_art = article_thumb_art.replace("180x108", "500x300"); // vnexpress trick
  const others = index != 0;

  useEffect(() => {
    getTotalComments(_id);
  }, [getTotalComments, _id]);
  
  return (
    <View>
      <View style={{marginHorizontal: others ? 10 : 0}}>
        <View style={{ paddingTop: others ? 15 : 0}}>
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { articleId: _id })}>
            <Image source={{ uri: large_thumb_art }} width={others? Dimensions.get('window').width - 20: Dimensions.get('window').width} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { articleId: _id })}>
          <Text style={[styles.header, { color: others ? "#333": "#9d234c" }]}>{article_title}</Text>
        </TouchableOpacity>
        <Text style={styles.desc}>{article_desc}</Text>
        <View style={{flexDirection: 'row', height: 40, paddingVertical: 10}}>
          <Text style={styles.footText}>{article_date}</Text>
          { category && 
              <TouchableOpacity>
                <Text style={[styles.footText, { marginHorizontal: 10 }]}>{category.vn_name}</Text> 
              </TouchableOpacity>
          }
          { countComments > 0 && 
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-text" color="#9d234c" size={18} style={{marginRight: 10}} />
                <Text style={[styles.footText, { color: '#9d234c' }]}>{countComments}</Text>
              </View>
          }
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = state => ({
  comments: state.comments
});
export default connect(mapStateToProps, { 
  getTotalComments 
})(Article);