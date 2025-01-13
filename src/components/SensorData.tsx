/* eslint-disable react-native/no-inline-styles */
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
  smoke?: number;
  gas?: number;
};

export type TListSensor = {
  name: string;
  key: string;
  color?: string;
  image: string;
  maxRange?: number;
  minRange?: number;
  haveProgress?: boolean;
  activeValue?: number;
};

const LIST_SENSOR: TListSensor[] = [
  {
    name: 'Mưa',
    key: 'rain',
    image:
      'https://hoatrangnguyen.com.vn/wp-content/uploads/2023/10/mua-pham-phuong-lan-1.jpg',
    color: 'red',
  },
  {
    name: 'Nhiệt Độ',
    key: 'temp',
    image:
      'https://congnghedoluong.com/wp-content/uploads/2020/03/11-427x400.png',
    color: 'purple',
  },
  {
    name: 'Khí Gas',
    key: 'gas',
    image:
      'https://img.freepik.com/premium-vector/illustration-gas_498740-30390.jpg',
    color: 'blue',
    haveProgress: true,
    maxRange: 6000,
    minRange: 0,
    activeValue: 3000,
  },
  {
    name: 'Khói',
    key: 'smoke',
    image:
      'https://images.pexels.com/photos/59810/smoke-fumes-black-white-59810.jpeg?cs=srgb&dl=pexels-pixabay-59810.jpg&fm=jpg',
    haveProgress: true,
    color: 'red',
    maxRange: 3500,
    activeValue: 1500,
    minRange: 500,
  },
  {
    name: 'Bụi Mịn PM10',
    key: 'pm10',
    image:
      'https://thumbs.dreamstime.com/z/pm-text-cloud-smoke-pattern-pollution-dust-concept-design-illustration-isolated-float-dark-sky-background-vector-eps-pm-text-142467731.jpg',
  },
  {
    name: 'Bụi Mịn PM2.5',
    key: 'pm25',
    image: 'https://kosmen.vn/upload/images/bui-min-pm-la-gi-1.jpg',
    color: 'black',
  },
  {
    name: 'Độ Ẩm',
    key: 'humi',
    image:
      'https://maydochuyendung.com/img/uploads/images/may-do-do-am-khong-khi/do-am-min.jpg',
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

  const renderItemSensor: ListRenderItem<TListSensor> = ({index, item}) => {
    let progress = 0;
    const value = data[item.key as keyof typeof data] ?? 0;
    let color = 'blue';
    if (
      typeof item?.maxRange === 'number' &&
      typeof item?.minRange === 'number' &&
      typeof item?.activeValue === 'number'
    ) {
      progress = value / (item.maxRange - item.minRange);
      if (item.key === 'smoke') {
        progress =
          (item.maxRange - item.minRange - value) /
          (item.maxRange - item.minRange);
        if (value <= item.activeValue) {
          color = 'red';
        } else {
          color = 'blue';
        }
      } else if (value >= item.activeValue) {
        color = 'red';
      }
    }
    console.log(item.key, color, progress);
    return (
      <AnalyticSummary
        style={{
          width: (widthScreen - 20 * 3) / 2,
          marginLeft: index % 2 !== 0 ? 20 : 0,
        }}
        value={value}
        color={color}
        name={item.name}
        image={item.image}
        haveProgress={item.haveProgress}
        progress={progress}
      />
    );
  };
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
