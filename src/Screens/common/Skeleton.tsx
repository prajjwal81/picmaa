import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Skeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <>
        <View style={styles.img} />
        <View style={{marginLeft: '5%'}}>
          <View style={styles.detailTextContainer2} />
          <View style={styles.detailTextContainer2} />
        </View>
        <View style={styles.Bid2} />
        <View style={{paddingHorizontal: '5%'}}>
          <View style={styles.detailContainer}>
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
          </View>
          <View style={styles.detailContainer2}>
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
            {/* <View style={styles.detailTextContainer} /> */}
          </View>
          <View style={{marginTop: '2%'}}>
            <View style={styles.detailTextContainer2} />
          </View>
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export default Skeleton;

export const SingleLineSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={styles.Bid} />
        {/* <View style={styles.Bid} /> */}
      </>
    </SkeletonPlaceholder>
  );
};

export const MultipleImagesSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
          <View style={styles.multiImg} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export const ImageSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.img2} />
    </SkeletonPlaceholder>
  );
};

export const SmallImageSection = () => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={styles.detailContainer}>
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
          <View style={styles.detailTextContainer} />
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export const HeadingSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <>
        <View style={styles.detailContainer}>
          <View style={styles.detailTextContainer3} />
          <View style={{flexDirection: 'row'}}>
            <View style={styles.filter} />
            <View style={styles.filter} />
          </View>
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

export const SoldCarSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <>
        <View style={styles.img} />
        <View style={{marginLeft: '5%'}}>
          <View style={styles.detailTextContainer2} />
          <View style={styles.detailTextContainer2} />
        </View>
        <View style={styles.Bid2} />
        <View style={{paddingHorizontal: '5%'}}>
          <View style={styles.detailContainer}>
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
          </View>
          <View style={styles.detailContainer2}>
            <View style={styles.detailTextContainer} />
            <View style={styles.detailTextContainer} />
            {/* <View style={styles.detailTextContainer} /> */}
          </View>
          <View style={{marginTop: '2%'}}>
            <View style={styles.detailTextContainer2} />
          </View>
        </View>
      </>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  img: {
    height: height / 5,
    width: width / 1.1,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  detailContainer: {
    // marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  detailContainer2: {
    // marginLeft: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  detailTextContainer: {
    width: width / 4,
    height: 15,
    marginRight: 10,
    borderRadius: 10,
  },
  detailTextContainer2: {
    width: width / 3.5,
    height: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  detailTextContainer3: {
    width: width / 2.5,
    height: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  Bid: {
    width: width / 1.1,
    marginTop: 10,
    height: 40,
    alignSelf: 'center',
  },
  Bid2: {
    width: width / 1.2,
    marginTop: 10,
    height: 60,
    alignSelf: 'center',
  },
  multiImg: {
    height: Dimensions.get('window').height / 8,
    width: '30%',
    marginRight: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  img2: {
    height: height / 3.6,
    width: width / 1.1,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  filter: {
    width: width / 5,
    height: 25,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
  },
});
