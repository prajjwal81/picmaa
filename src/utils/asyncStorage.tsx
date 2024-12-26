import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (userObject: object) => {
  try {
    console.log('---|||USER---|||', userObject);
    await AsyncStorage.setItem('user', JSON.stringify(userObject));
    console.log('Data Saved');
  } catch (error) {
    console.error('Error', error);
  }
};

export const getItem = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
  }
};

export const clearItem = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
