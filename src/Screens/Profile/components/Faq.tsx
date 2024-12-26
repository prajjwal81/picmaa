import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useState} from 'react';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const data = [
  {
    heading: 'How do I Book My Packages ?',
    content: '',
  },
  {
    heading: 'What Kind of Packages I can Buy ??',
    content: '',
  },
  {
    heading: 'What Type of Photography you do ?',
    content: '',
  },
  {
    heading: 'How Can I See my Bought Packages ? ',
    content: '',
  },
  {
    heading: 'How to buy a used car in Delhi?',
    content:
      'If you plan to buy a used car you have to visit our website, browse the available cars, and raise and enquiry on the selected car and get their car health report in which we include 210 Quality checks. You can complete the purchase process via online or offline methods by providing token amount.',
  },
  {
    heading: 'How Can I book Photographer',
    content: '',
  },
  {
    heading: 'How Cancel My Order?',
    content: '',
  },
];

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.preHeading}>FAQ's</Text>
        {data.map((item, idx) => (
          <View style={styles.headerContainer} key={idx}>
            <Collapse
              isExpanded={activeIndex === idx}
              onToggle={() => handleToggle(idx)}>
              <CollapseHeader>
                <View style={styles.innerHeaderContainer}>
                  <View style={{width: '91%'}}>
                    <Text
                      style={[
                        styles.headingTxtStyle,
                        {color: activeIndex === idx ? '#F38120' : 'black'},
                      ]}>
                      {item.heading}
                    </Text>
                  </View>
                  <View style={{width: '5%', left: '3%'}}>
                    <Entypo
                      name={
                        activeIndex === idx ? 'triangle-up' : 'triangle-down'
                      }
                      size={28}
                      color="black"
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderTopWidth: 1,
                    borderColor: 'black',
                    marginBottom: '5%',
                  }}
                />
              </CollapseHeader>

              <CollapseBody>
                <View style={[styles.innerHeaderContainer, {width: '90%'}]}>
                  <Text style={styles.textStyle}>{item.content}</Text>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};
export default Question;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: '5%',
    marginHorizontal: '3%',
    paddingLeft: '3%',
    flex: 1,
  },

  preHeading: {
    color: '#000',
    fontFamily: 'Futura-bold',
    fontSize: 24,
    fontStyle: 'normal',
    lineHeight: 37,
    marginBottom: '7%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontStyle: 'normal',
  },
  headingTxtStyle: {
    color: '#F38120',
    fontSize: 18,
    fontFamily: 'Inter',
    fontStyle: 'normal',
  },
});
