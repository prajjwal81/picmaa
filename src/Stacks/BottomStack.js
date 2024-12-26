import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from '../Navigations/Home';
import ExploreStack from '../Navigations/Explore';
import ProfileStack from '../Navigations/Profile';
import PhotographerStack from '../Navigations/photographer';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const removeBottomTab = useSelector(state => state.global.removeBottomTab);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0, 137, 123, 1)',
          elevation: 0,
          borderRadius: Platform.OS == 'android' ? 20 : 40,
          borderEndStartRadius: 80,
          borderEndEndRadius: 80,
          justifyContent: 'center',
          alignItems: 'center',
          width: Platform.OS == 'android' ? '98%' : '95%',
          position: 'absolute',
          marginLeft: Platform.OS == 'android' ? '1%' : '2.5%',
          display: removeBottomTab ? 'flex' : 'none',
          // display: 'none',
          // bottom: 10,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabelStyle: {},
          tabBarLabel: () => null,
          tabBarIcon: ({color, focused}) => (
            <View style={[styles.container]}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={'white'}
                size={35}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ExploreStack"
        component={ExploreStack}
        options={{
          tabBarLabelStyle: {},
          tabBarLabel: () => null,
          tabBarIcon: ({color, focused}) => (
            <View style={[styles.container]}>
              <Icon
                name={focused ? 'grid' : 'grid-outline'}
                color={'white'}
                size={35}
                style={{}}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PhotographerStack"
        component={PhotographerStack}
        options={{
          tabBarLabelStyle: {},
          tabBarLabel: () => null,
          tabBarIcon: ({color, focused}) => (
            <View style={[styles.container]}>
              <MaterialIcons
                name={focused ? 'photo' : 'photo-camera-back'}
                color={'white'}
                size={40}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Photographer"
        component={ProfileStack}
        options={{
          tabBarLabelStyle: {},
          tabBarLabel: () => null,
          tabBarIcon: ({color, focused}) => (
            <View style={[styles.container]}>
              <Icon
                name={focused ? 'person-circle-sharp' : 'person-circle-outline'}
                color={'white'}
                size={40}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top: Platform.OS == 'android' ? '30%' : '60%',
  },
});
