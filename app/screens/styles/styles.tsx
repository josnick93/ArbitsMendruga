import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';


export const grantContesttSyles = StyleSheet.create({
    title: {
      fontSize: 17,
      letterSpacing: 1,
      fontWeight: "700",
      color: colors.text,
    },
    divided: {
      paddingBottom: 10,
    },
    text_intup: {
      marginVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "#C9C6C6",
      height: 40,
    },
    container: {
      flex: 1,
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      margin: 8,
    },
    cash_texinput: {
      width: "50%",
    },
    cash_title: { fontSize: 14, letterSpacing: 1 },
    publish_button: {
      display: "flex",
      height: 45,
      borderRadius: 30,
      width: "90%",
      paddingHorizontal: 40,
      justifyContent: "center",
      backgroundColor: colors.main,
    },
    publis_button_text: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 1.25,
    },
    errors: {
      fontSize: 12,
      color: "red",
    },
    placeholderStyle: {
      fontSize: 14,
      color:colors.dateText
    },
    dropdown: {
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "#C9C6C6",
      height: 40,
      padding: 7,
      marginTop: 5,
    },
    item: {
      padding: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: colors.secondary,
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 15,
    },
  
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
  