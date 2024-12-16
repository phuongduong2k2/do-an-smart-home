import axios from 'axios';

export enum TDoor {
  MAIN_DOOR = 1,
  BED_ROOM = 2,
  CLOSE = 0,
}

export enum TLight {
  BED_ROOM = 1,
  LIVING_ROOM = 2,
  WC_ROOM = 3,
  KITCHEN_ROOM = 4,
}

const setDoor = async (url: string, id: TDoor, value: boolean) => {
  try {
    const response = await axios.post(`http://${url}/remote_door`, {
      id: String(id),
      value: String(value),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const setLight = async (url: string, id: TLight, value: boolean) => {
  try {
    const response = await axios.post(`http://${url}/remote_light`, {
      id: String(id),
      value: String(value),
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getLight = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(`http://${url}/get_light`);
    return response.data as string;
  } catch (error) {
    return error as string;
  }
};

export const commonApi = {
  setDoor,
  setLight,
  getLight,
};
