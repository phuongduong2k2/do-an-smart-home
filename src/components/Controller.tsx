/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import QuickAction, {TAction} from './QuickAction';
import moment from 'moment';
import {TDateModal} from './ModalDate';

export type TListControl = {
  name: string;
  key: TKeyDevices;
  type?: TAction;
  image: string;
  dateData?: TDateModal;
};

export type TKeyDevices =
  | 'main_door'
  | 'curtain_door'
  | 'canopy_door'
  | 'light_bed_room'
  | 'light_kitchen'
  | 'light_living_room'
  | 'light_wc_room';

const LIST_DOOR: TListControl[] = [
  {
    name: 'Front Door',
    key: 'main_door',
    image:
      'https://www.pirnar.in/pic/page/front-doors/wooden-models/premium-0160-model.png',
  },
  {
    name: 'Curtain',
    key: 'curtain_door',
    image:
      'https://remminhdang.com/wp-content/uploads/2024/02/Rem-Vai-Gia-Bao-Nhieu-1m-Dat-May-Rem-Cua-Tai-Minh-Dang-Ma-BYG27-12-5.jpg',
  },
  // {
  //   name: 'Canopy',
  //   key: 'canopy_door',
  //   image: 'https://phuongtoan.vn/upload/images/mai%20hien(5).jpg',
  // },
];

type Props = {
  lightData?: string;
  doorData?: string;
  isConnceted?: boolean;
  dateData?: (TDateModal | undefined)[];
  onChange: (params: {key: TKeyDevices; value: boolean; id: number}) => void;
  isLightLoading?: boolean;
  isDoorLoading?: boolean;
  onSetSchedule?: (
    id: number,
    date: string,
    value: boolean,
    _date: Date,
  ) => void;
};

const ItemSeparatorComponent = () => <View style={{height: 16}} />;
const widthScreen = Dimensions.get('screen').width;

const Controller = (props: Props) => {
  const {
    isConnceted,
    onChange,
    isLightLoading,
    lightData,
    onSetSchedule = () => {},
    dateData = [],
    doorData,
    isDoorLoading,
  } = props;

  const LIST_LIGHT: TListControl[] = [
    {
      name: 'Đèn Phòng Ngủ',
      key: 'light_bed_room',
      dateData: dateData[0],
      image:
        'https://i.pinimg.com/originals/fc/87/85/fc87855c316d3d587fc184cbe3a0d2d4.jpg',
    },
    {
      name: 'Đèn Khách',
      key: 'light_living_room',
      dateData: dateData[1],
      image:
        'https://fancyhouse-design.com/wp-content/uploads/2024/03/Warm-wood-tones-add-a-cozy-touch-to-the-modern-living-room-enhancing-its-inviting-atmosphere.jpg',
    },
    {
      name: 'Đèn Nhà Vệ Sinh',
      key: 'light_wc_room',
      dateData: dateData[2],
      image:
        'https://i.pinimg.com/474x/5c/d9/bd/5cd9bdeb45508e0117731866799357c4.jpg',
    },
    {
      name: 'Đèn Phòng Bếp',
      key: 'light_kitchen',
      dateData: dateData[3],
      image:
        'https://hips.hearstapps.com/hmg-prod/images/rebel-builders-rebelbuilders-com-lara-kimmerer-larakimmerer-com-2-lara-kimmerer-6580b6737d1b3.jpg?crop=0.591xw:0.887xh;0.240xw,0.106xh&resize=1200:*',
    },
  ];

  const onToggle = useCallback(
    (item: TListControl, index: number, status: boolean) => {
      onChange({key: item.key, value: !status, id: index + 1});
    },
    [onChange],
  );

  const onSelectDate = useCallback(
    (date: Date, value: boolean, index: number) => {
      const sendDate = `${moment(date)
        .format('YYYY-MM-DD')
        .toString()} ${moment(date).format('HH:mm:ss').toString()}`;
      onSetSchedule(index, sendDate, value, date);
    },
    [onSetSchedule],
  );

  const renderItemDoor: ListRenderItem<TListControl> = ({index, item}) => (
    <QuickAction
      connected={isConnceted}
      isLoading={isDoorLoading}
      data={item}
      index={index}
      value={doorData?.[index] === '1'}
      type={'swipe'}
      onToggle={onToggle}
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
    />
  );

  const renderItemLight: ListRenderItem<TListControl> = ({index, item}) => (
    <QuickAction
      connected={isConnceted}
      isLoading={isLightLoading}
      data={item}
      index={index}
      value={lightData?.[index] === '1'}
      type={'switch'}
      onToggle={onToggle}
      onSelectDate={onSelectDate}
      dateData={item.dateData}
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
    />
  );
  return (
    <>
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={
          <Text style={[styles.text, {marginVertical: 20}]}>Remote Doors</Text>
        }
        data={LIST_DOOR}
        ItemSeparatorComponent={ItemSeparatorComponent}
        numColumns={2}
        renderItem={renderItemDoor}
        keyExtractor={item => item.key}
      />
      <FlatList
        scrollEnabled={false}
        ListHeaderComponent={
          <Text style={[styles.text, {marginVertical: 20}]}>Remote Lights</Text>
        }
        data={LIST_LIGHT}
        ItemSeparatorComponent={ItemSeparatorComponent}
        numColumns={2}
        renderItem={renderItemLight}
        keyExtractor={item => item.key}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 28, fontWeight: '500'},
});

export default memo(Controller);
