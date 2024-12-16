import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import AnalyticSummary from './AnalyticSummary';

type Props = {
  data: TSensorData;
};

export type TSensorData = {
  humi: number;
  pm10: number;
  pm25: number;
  rain: number;
  temp: number;
};

type TListSensor = {
  name: string;
  key: string;
  maxRange: number;
  type: 'bar' | 'circle';
  color?: string;
  image: string;
};

const LIST_SENSOR: TListSensor[] = [
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
    key: 'temp',
    maxRange: 1,
    type: 'circle',
    image:
      'https://media3.giphy.com/media/fFaIwKs1EcEmY9CPvG/giphy.gif?cid=6c09b9525gvj61dygphhdljbbckro7w20zk256pmswkwpogj&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    color: 'purple',
  },
  {
    name: 'Bụi Mịn PM10',
    key: 'pm10',
    image:
      'https://static.wixstatic.com/media/600e73_90db2052880f4bfd934600e674aa99a8~mv2.gif',
    maxRange: 1,
    type: 'circle',
  },
  {
    name: 'Bụi Mịn PM2.5',
    key: 'pm25',
    maxRange: 1,
    type: 'circle',
    image:
      'https://img1.picmix.com/output/stamp/normal/5/8/6/8/448685_c9b9f.gif',
    color: 'black',
  },
  {
    name: 'Độ Ẩm',
    key: 'humi',
    maxRange: 1,
    image: 'https://cdn-icons-gif.flaticon.com/11201/11201779.gif',
    type: 'circle',
    color: 'green',
  },
];

const ItemSeparatorComponent = () => <View style={{height: 16}} />;
const widthScreen = Dimensions.get('screen').width;

const SensorData = (props: Props) => {
  const {data} = props;
  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={{marginVertical: 20}}>
        <Text style={styles.text}>Sensor Data</Text>
      </View>
    );
  }, []);

  const renderItemSensor: ListRenderItem<TListSensor> = ({index, item}) => (
    <AnalyticSummary
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
      value={data[item.key as keyof typeof data]}
      color={item.color}
      name={item.name}
      image={item.image}
    />
  );
  return (
    <FlatList
      scrollEnabled={false}
      ListHeaderComponent={ListHeaderComponent}
      data={LIST_SENSOR}
      ItemSeparatorComponent={ItemSeparatorComponent}
      numColumns={2}
      keyExtractor={item => item.key}
      renderItem={renderItemSensor}
    />
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 28, fontWeight: '500'},
});

export default memo(SensorData);
