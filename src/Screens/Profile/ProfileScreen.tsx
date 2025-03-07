import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../../Images/svg/profileCircler.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DeleteAccount, getUserProfile} from '../../API/Profile.Api';
import {clearItem, getItem} from '../../utils/asyncStorage';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState();

  const logoutHandler = () => {
    Alert.alert(
      'Confirmation', // Alert title
      'You want to logout your account ?', // Alert message
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // Optional: Gives a cancel button styling
        },
        {
          text: 'OK',
          onPress: () => {
            clearItem();
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false}, // Optional: Alert cannot be dismissed by tapping outside
    );
  };

  const deleteHandler = async () => {
    Alert.alert(
      'Confirmation',
      'You want to Delete your account ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const res = await DeleteAccount(user?.accessToken);
            if (res.message === 'user deactivated successfully') {
              clearItem();
              navigation.navigate('Login');
            }
          },
        },
      ],
      {cancelable: false},
    );

    const user = await getItem();
    const res = DeleteAccount(user?.accessToken);
  };

  let navigationHandler = label => {
    if (label === 'My Favourites Photos') {
      navigation.navigate('AlbumCategory', {screen: 'profile'});
    } else if (
      label === 'All Packages' ||
      label === 'Completed Packages' ||
      label === 'Canceled Packages'
    ) {
      navigation.navigate('TypeOfPackages', label);
    } else if (label === 'Shared Number') {
      navigation.navigate('SharedNumbers');
    }
  };

  useEffect(() => {
    const userProfile = async () => {
      const res = await getUserProfile();
      setProfile(res);
    };
    userProfile();
  }, []);

  const MenuItem = ({
    iconName,
    label,
    position,
  }: {
    iconName: string;
    label: string;
    position: string;
  }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        {
          justifyContent: position === 'right' ? 'space-between' : 'flex-start',
        },
      ]}
      onPress={() => {
        navigationHandler(label);
      }}>
      {position == 'left' && (
        <Icon name={iconName} size={24} style={styles.menuIcon} />
      )}
      <Text style={styles.menuLabel}>{label}</Text>
      {position == 'right' && (
        <Icon name={iconName} size={24} style={styles.menuIcon} />
      )}
    </TouchableOpacity>
  );
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.header} />
      <View style={styles.profileContainer}>
        {!!profile?.data?.avatarUrl ? (
          <Image
            source={{uri: profile?.data?.avatarUrl}}
            style={styles.image}
          />
        ) : (
          <View style={styles.avatar}>
            <FontAwesome
              name="user"
              size={50}
              color="#00897B"
              style={{zIndex: 1}}
            />
            <Profile
              style={{position: 'absolute'}}
              width={width}
              height={height / 10}
            />
          </View>
        )}

        <View style={styles.nameContainer}>
          <Text style={styles.name}>{profile?.data?.name}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate('Profile', profile);
            }}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menuContainer}>
          <MenuItem
            iconName="star-outline"
            label="My Favourites Photos"
            position="left"
          />

          <MenuItem
            iconName="star-outline"
            label="Shared Number"
            position="left"
          />

          <MenuItem
            iconName="book-outline"
            label="All Packages"
            position="left"
          />
          <MenuItem
            iconName="checkmark-circle-outline"
            label="Completed Packages"
            position="left"
          />
          <MenuItem
            iconName="close-circle-outline"
            label="Canceled Packages"
            position="left"
          />
        </View>

        {/* More Section */}
        <View style={styles.moreSection}>
          <Text style={styles.moreTitle}>More</Text>
          <MenuItem
            iconName="chevron-forward-outline"
            label="Privacy Policy"
            position="right"
          />
          <MenuItem
            iconName="chevron-forward-outline"
            label="Terms and Conditions"
            position="right"
          />
          <MenuItem
            iconName="chevron-forward-outline"
            label="Refund Policy"
            position="right"
          />
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
            <Icon name="log-out-outline" size={20} color="#1abc9c" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Icon
              name="trash-outline"
              size={20}
              color="#e74c3c"
              onPress={deleteHandler}
            />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '8%',
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: '90%',
    // paddingTop: '10%',
  },

  header: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: '35%',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -Dimensions.get('window').height / 15,
    zIndex: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  nameContainer: {
    marginTop: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  moreSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  moreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerButtons: {
    marginTop: 30,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1abc9c',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  logoutText: {
    marginLeft: 10,
    color: '#1abc9c',
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'center',
  },
  deleteText: {
    marginLeft: 10,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 5,
    fontFamily: 'Sansation-Bold',
    marginLeft: 15,
  },
  image: {
    width: width / 3.5,
    height: height / 8,
    borderRadius: 100,
    position: 'absolute',
    top: '-70%',
  },
});

export default ProfileScreen;
