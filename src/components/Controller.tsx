/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import QuickAction, {TAction} from './QuickAction';

export type TListControl = {
  name: string;
  key: TKeyDevices;
  type?: TAction;
  image: string;
};

export type TKeyDevices =
  | 'main_door'
  | 'ceil'
  | 'bed_door'
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
    name: 'Bed Door',
    key: 'bed_door',
    image:
      'https://www.pirnar.in/pic/page/front-doors/wooden-models/premium-0160-model.png',
  },
];

export const LIST_LIGHT: TListControl[] = [
  {
    name: 'Đèn Phòng Ngủ',
    key: 'light_bed_room',
    image:
      'https://i.pinimg.com/originals/fc/87/85/fc87855c316d3d587fc184cbe3a0d2d4.jpg',
  },
  {
    name: 'Đèn Khách',
    key: 'light_living_room',
    image:
      'https://fancyhouse-design.com/wp-content/uploads/2024/03/Warm-wood-tones-add-a-cozy-touch-to-the-modern-living-room-enhancing-its-inviting-atmosphere.jpg',
  },
  {
    name: 'Đèn Nhà Vệ Sinh',
    key: 'light_wc_room',
    image:
      'https://i.pinimg.com/474x/5c/d9/bd/5cd9bdeb45508e0117731866799357c4.jpg',
  },
  {
    name: 'Đèn Phòng Bếp',
    key: 'light_kitchen',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/rebel-builders-rebelbuilders-com-lara-kimmerer-larakimmerer-com-2-lara-kimmerer-6580b6737d1b3.jpg?crop=0.591xw:0.887xh;0.240xw,0.106xh&resize=1200:*',
  },
];

type Props = {
  data?: string;
  isConnceted?: boolean;
  onChange: (params: {key: TKeyDevices; value: boolean; id: number}) => void;
  isLoading?: boolean;
};

const ItemSeparatorComponent = () => <View style={{height: 16}} />;
const widthScreen = Dimensions.get('screen').width;

const Controller = (props: Props) => {
  const {isConnceted, onChange, isLoading, data} = props;
  const [doorData, setDoorData] = useState({
    main_door: false,
    bed_door: false,
  });

  const onToggleLight = useCallback(
    (item: TListControl, index: number) => {
      const status = !(data?.[index] === '1');
      onChange({key: item.key, value: status, id: index});
    },
    [data, onChange],
  );

  const onToggleDoor = useCallback(
    (item: TListControl, index: number) => {
      const status = !doorData[item.key as keyof typeof doorData];
      setDoorData({
        ...doorData,
        [item.key]: status,
      });
      onChange({key: item.key, value: status, id: index});
    },
    [doorData, onChange],
  );

  const renderItemDoor: ListRenderItem<TListControl> = ({index, item}) => (
    <QuickAction
      connected={isConnceted}
      data={item}
      index={index}
      isLoading={isLoading}
      value={doorData[item.key as keyof typeof doorData]}
      type={'swipe'}
      onToggle={onToggleDoor}
      style={{
        width: (widthScreen - 20 * 3) / 2,
        marginLeft: index % 2 !== 0 ? 20 : 0,
      }}
    />
  );

  const renderItemLight: ListRenderItem<TListControl> = ({index, item}) => (
    <QuickAction
      connected={isConnceted}
      isLoading={isLoading}
      data={item}
      index={index}
      value={data?.[index] === '1'}
      type={'switch'}
      onToggle={onToggleLight}
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
