/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ListRenderItem,
} from 'react-native';
import React, {useState} from 'react';
import AppContainer from '../components/AppContainer';
import QuickAction, {TAction} from '../components/QuickAction';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AnalyticSummary from '../components/AnalyticSummary';
import CustomSwitch from '../components/CustomSwitch';

type TListControl = {
  name: string;
  key: string;
  type: TAction;
  image: string;
};

type TListSensor = {
  name: string;
  key: string;
  maxRange: number;
  type: 'bar' | 'circle';
  color?: string;
  image: string;
};

export const LIST_DEVICE: TListControl[] = [
  {
    name: 'Front Door',
    key: 'lockDoor',
    type: 'swipe',
    image:
      'https://www.pirnar.in/pic/page/front-doors/wooden-models/premium-0160-model.png',
  },
  {
    name: 'Mái Hiên',
    key: 'ceil',
    type: 'swipe',
    image:
      'https://funas.vn/wp-content/uploads/2024/05/mai-hien-mh02-300x300.png',
  },
  {
    name: 'Đèn Ngủ',
    key: 'lamp',
    type: 'switch',
    image:
      'https://product.hstatic.net/200000539781/product/13_976d9ff0917c4fabadf0463359bdf984_large.png',
  },
  {
    name: 'Đèn Khách',
    key: 'livingLight',
    type: 'switch',
    image:
      'https://cdn.pixabay.com/photo/2013/07/13/12/43/bulb-160207_1280.png',
  },
];

export const LIST_SENSOR: TListSensor[] = [
  {
    name: 'Mưa',
    key: 'rain',
    maxRange: 1,
    type: 'circle',
    image:
      'https://cdn.pixabay.com/animation/2023/09/07/17/09/17-09-50-395_512.gif',
    color: 'red',
  },
  {
    name: 'Nhiệt Độ',
    key: 'tempature',
    maxRange: 1,
    type: 'circle',
    image:
      'https://media3.giphy.com/media/fFaIwKs1EcEmY9CPvG/giphy.gif?cid=6c09b9525gvj61dygphhdljbbckro7w20zk256pmswkwpogj&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: 'purple',
  },
  {
    name: 'Độ Ẩm',
    key: 'humidity',
    maxRange: 1,
    image: 'https://cdn-icons-gif.flaticon.com/11201/11201779.gif',
    type: 'circle',
    color: 'green',
  },
  {
    name: 'Khí Gas',
    key: 'gas',
    image:
      'https://static.wixstatic.com/media/600e73_90db2052880f4bfd934600e674aa99a8~mv2.gif',
    maxRange: 1,
    type: 'circle',
  },
  {
    name: 'Bụi Mịn',
    key: 'dust',
    maxRange: 1,
    type: 'circle',
    image:
      'https://img1.picmix.com/output/stamp/normal/5/8/6/8/448685_c9b9f.gif',
    color: 'black',
  },
];

const ItemSeparatorComponent = () => <View style={{height: 16}} />;

const widthScreen = Dimensions.get('screen').width;

const HomeScreen = () => {
  const [controller, setController] = useState({
    lockDoor: false,
    ceil: false,
    lamp: false,
    livingLight: false,
  });

  const [analytic, setAnalytic] = useState(false);

  const insets = useSafeAreaInsets();

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
      }}>
      <View style={{width: '50%'}}>
        <Text style={{color: 'white', fontSize: 28}}>Welcome</Text>
        <Text style={{color: '#BDBCBC', fontSize: 25}}>Admin</Text>
      </View>
      <View style={{width: '50%', alignItems: 'flex-end'}}>
        <Image
          source={{
            uri: 'https://t4.ftcdn.net/jpg/06/31/54/63/360_F_631546389_9Ip7mK7WJB3iUNrveuLnaJWxEmemZPAI.jpg',
          }}
          style={{
            resizeMode: 'cover',
            height: 60,
            width: 60,
            borderRadius: 1000,
          }}
        />
      </View>
    </View>
  );

  const renderItemControl: ListRenderItem<TListControl> = ({index, item}) => (
    <QuickAction
      connected={false}
      name={item.name}
      imgSrc={item.image}
      value={controller[item.key as keyof typeof controller]}
      type={item.type}
      onToggle={() => {
        setController(prev => ({
          ...prev,
          [item.key]: !controller[item.key as keyof typeof controller],
        }));
      }}
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
    />
  );

  const renderItemSensor: ListRenderItem<TListSensor> = ({index, item}) => (
    <AnalyticSummary
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
      start={analytic}
      value={item.key}
      color={item.color}
      name={item.name}
      image={item.image}
    />
  );

  return (
    <AppContainer style={{paddingTop: insets.top}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 150}}>
        {renderHeader()}
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={
            <Text style={[styles.text, {marginVertical: 20}]}>
              Quick Actions
            </Text>
          }
          data={LIST_DEVICE}
          ItemSeparatorComponent={ItemSeparatorComponent}
          numColumns={2}
          renderItem={renderItemControl}
        />
        <FlatList
          scrollEnabled={false}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.text, {marginVertical: 20}]}>
                Sensor Analytics
              </Text>
              <CustomSwitch
                width={70}
                value={analytic}
                onPress={() => {
                  setAnalytic(!analytic);
                }}
              />
            </View>
          }
          data={LIST_SENSOR}
          ItemSeparatorComponent={ItemSeparatorComponent}
          numColumns={2}
          keyExtractor={item => item.key}
          renderItem={renderItemSensor}
        />
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 28, fontWeight: '500'},
});

export default HomeScreen;
