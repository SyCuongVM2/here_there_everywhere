import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity,
  FlatList, ActivityIndicator, RefreshControl
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';
import SearchArticle from '../../../components/SearchArticle';
import { getArticlesByCategory } from '../../../redux/actions/articleActions';

const Search = ({ 
  navigation,
  getArticlesByCategory,
  articles: { articles, total_pages, total_records }
}) => {
  const [states, setStates] = useState({ 
    searchFocus: false,
    searchString: null,
    submitted: false
  });
  const { searchString, searchFocus } = states;
  const isEditing = searchFocus && searchString;
  const isSubmit = searchFocus && searchString && states.submitted;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); //for pull to refresh
  const [onEnd, setOnEnd] = useState(true);

  useEffect(() => { articles = null }, []);

  const fetchData = (currentPage) => {
    setLoading(true)
    getArticlesByCategory("du-lich", currentPage);
    setLoading(false);
  };

  const renderSearchList = (item) => {
    return (
      <SearchArticle data={item} navigation={navigation} />
    )
  };

  const handleLoadMore = () => {
    if (!loading && !onEnd) {
      if (page < total_pages) {
        setPage(page + 1);
      }
      
      fetchData(page);
      setOnEnd(true);
    }
  };
  const onRefresh = () => {
    setIsRefreshing(true); // true isRefreshing flag for enable pull to refresh indicator
    fetchData(1);
    setIsRefreshing(false);
  };
  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;

    return (
      <ActivityIndicator
        style={{color: '#000'}}
      />
    );
  };
  const onSubmit = () => {
    setStates({ ...states, submitted: true });
    fetchData(1);
  };

  if (loading && page === 1) {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <ActivityIndicator style={{ color:'#000'}} />
      </View>
    );
  }

  const results = (
    <View>
      <View style={{alignItems: 'flex-start', justifyContent: 'center', height: 35, paddingHorizontal: 10, borderBottomWidth: 0.7, borderBottomColor: '#E5E5E5'}}>
        <Text style={{fontSize: 14, fontWeight: '300', color: '#9d234c'}}>
          Bạn đang xem 
          <Text style={{fontSize: 14, fontWeight: '600', color: '#9d234c'}}> {total_records} </Text>
          kết quả
        </Text>
      </View>
      <View style={{paddingHorizontal: 15}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={articles}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderItem={({item}) => renderSearchList(item)}
          keyExtractor={item => { return item._id }}
          ItemSeparatorComponent={()=><View style={{height: 0.6, backgroundColor: '#E5E5E5', marginHorizontal: 10}}/>}
          ListFooterComponent={() => renderFooter()}
          onEndReachedThreshold={0.01}
          onEndReached={() => handleLoadMore()}
          onMomentumScrollBegin={() => setOnEnd(false)}
        />
      </View>
    </View>
  );
  const noResult = (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50}}>
      <Text style={{fontSize: 16, fontWeight: '300', flexWrap: 'wrap', textAlign: 'center'}}>
        Không có kết quả phù hợp với từ khoá 
        <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}> "{states.searchString}"</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="md-arrow-back" color="#999999" size={28} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Ionicons name="ios-search" color="#999999" size={28} style={{marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <TextInput 
            autoFocus
            autoCapitalize='none'
            autoCorrect={false}
            underlineColorAndroid="transparent"
            keyboardType='default'
            placeholder="Nhập nội dung cần tìm"
            placeholderTextColor="#999999"
            style={{fontSize: 16, fontWeight: '400', paddingLeft: 10}}
            onFocus={() => setStates({ ...states, searchFocus: true })}
            onChangeText={text => setStates({ ...states, searchString: text })}
            onSubmitEditing={onSubmit}
            value={searchString}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => isEditing ? setStates({ ...states, searchString: null }) : null}>
            <Ionicons name="ios-close" color="#999999" size={30} style={{marginLeft: 10}} />
          </TouchableOpacity>
        </View>
      </View>
      {articles.length > 0 ? results : ( isSubmit ? noResult : null )}
    </View>
  )
};

const mapStateToProps = state => ({
  articles: state.articles
});
export default connect(mapStateToProps, { 
  getArticlesByCategory
})(Search);