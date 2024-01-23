// Clayton DeSimone
// Client Side Programming
// Task 2
// 12/11/2023

import { API } from './config';

import axios from "axios";
// eslint-disable-next-line
import VueAxios from 'vue-axios'

const getCharacters = async function() {
  try {
    const response = await axios.get(`${API}/characters`);

    let data = parseList(response);

    const characters = data;

    return characters;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getLocations = async function() {
  try {
    const response = await axios.get(`${API}/locations`);

    let data = parseList(response);

    const locations = data;

    return locations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUserCharacter = async function(id) {
  try {
    // console.log("Try to get character: " + id);
    const response = await axios.get(`${API}/userCharacters/${id}`);
    let userCharacter = parseItem(response, 200);
    return userCharacter;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateUserCharacter = async function(user) {
  try {
    const response = await axios.put(`${API}/userCharacters/${user.id}`, user);
    const updatedUser = parseItem(response, 200);
    return updatedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};


export const dataService = {
  getCharacters,
  getLocations,
  getUserCharacter,
  updateUserCharacter
};
