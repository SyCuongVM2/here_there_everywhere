import React, { useState, useEffect } from 'react';
import { 
  View, ScrollView, TouchableOpacity, Text, Image, 
  FlatList, ActivityIndicator, RefreshControl 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import styles from './styles';
import Article from '../../../components/Article';
import { getCategories } from '../../../redux/actions/categoryActions';
import { getArticlesByCategory, getArticles } from '../../../redux/actions/articleActions';

const Home = ({ 
  navigation,
  getCategories, 
  getArticlesByCategory,
  getArticles,
  categories: { categories },
  articles: { articles, total_pages }
}) => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); //for pull to refresh
  const [onEnd, setOnEnd] = useState(true);

  const fetchData = (currentPage) => {
    setLoading(true)

    if (activeCategory === 'home') {
      getArticles(currentPage);
    } else {
      getArticlesByCategory(activeCategory, currentPage);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCategories();

    fetchData(1);
  }, [getCategories, activeCategory]);

  const handleTab = (category) => {
    setActiveCategory(category.cate_code);
  };
  const renderCategoryList = (category) => {
    const isActive = category.cate_code === activeCategory;

    return (
      <TouchableOpacity 
        key={category._id}
        onPress={() => handleTab(category)}
      >
        <View>
          <Text style={[styles.categoryText, 
            { color: isActive ? "#9d234c": "#000000" },
            { fontWeight: isActive ? "bold" : "300" },
          ]}>
            {category.vn_name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  };
  const renderArticleList = (item, index) => {
    return (
      <Article data={item} index={index} navigation={navigation} />
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

  if (loading && page === 1) {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <ActivityIndicator style={{ color:'#000'}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/logo.png')} style={{width: 180, height: 35}} />
        <View style={styles.row}>
          <TouchableOpacity>
            <Ionicons name="ios-information-circle-outline" color="#999999" size={28} style={styles.headerItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons name="ios-search" color="#999999" size={28} style={styles.headerItem} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity>
          <Ionicons name="ios-menu" color="#999999" size={26} style={{marginRight: 10}} />
        </TouchableOpacity>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories && categories.map(category => renderCategoryList(category))}
        </ScrollView>
      </View>
      <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 80}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={articles}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderItem={({item, index}) => renderArticleList(item, index)}
          keyExtractor={item => { return item._id }}
          ItemSeparatorComponent={()=><View style={{height: 0.7, backgroundColor: '#E5E5E5', marginHorizontal: 10}}/>}
          ListFooterComponent={() => renderFooter()}
          onEndReachedThreshold={0.5}
          onEndReached={() => handleLoadMore()}
          onMomentumScrollBegin={() => setOnEnd(false)}
        />
      </View>
    </View>
  )
};

const mapStateToProps = state => ({
  categories: state.categories,
  articles: state.articles
});

export default connect(mapStateToProps, { 
  getCategories,
  getArticlesByCategory,
  getArticles
})(Home);