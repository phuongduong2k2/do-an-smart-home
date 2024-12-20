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
  humi?: number;
  pm10?: number;
  pm25?: number;
  rain?: number;
  temp?: number;
  servo1?: number;
  servo2?: number;
  servo3?: number;
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
      'https://hoatrangnguyen.com.vn/wp-content/uploads/2023/10/mua-pham-phuong-lan-1.jpg',
    color: 'red',
  },
  {
    name: 'Nhiệt Độ',
    key: 'temp',
    maxRange: 1,
    type: 'circle',
    image:
      'https://congnghedoluong.com/wp-content/uploads/2020/03/11-427x400.png',
    color: 'purple',
  },
  {
    name: 'Bụi Mịn PM10',
    key: 'pm10',
    image:
      'https://thumbs.dreamstime.com/z/pm-text-cloud-smoke-pattern-pollution-dust-concept-design-illustration-isolated-float-dark-sky-background-vector-eps-pm-text-142467731.jpg',
    maxRange: 1,
    type: 'circle',
  },
  {
    name: 'Bụi Mịn PM2.5',
    key: 'pm25',
    maxRange: 1,
    type: 'circle',
    image: 'https://kosmen.vn/upload/images/bui-min-pm-la-gi-1.jpg',
    color: 'black',
  },
  {
    name: 'Độ Ẩm',
    key: 'humi',
    maxRange: 1,
    image:
      'https://maydochuyendung.com/img/uploads/images/may-do-do-am-khong-khi/do-am-min.jpg',
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
      value={data[item.key as keyof typeof data] ?? 0}
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
