import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
const win = Dimensions.get("window");

export const CourseCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Image
        resizeMode="cover"
          source={{
            uri: data.image[0]
          }}
          style={styles.position}
        />
        <View style={{ width: "75%", paddingStart: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: colors.main,
            }}
          >
            {data.instructorName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: colors.dateText,
            }}
          >
            {data.courseName}
          </Text>

          <Text style={styles.companyName}>{data.startDate}-{data.finishDate}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              paddingTop: 5,
            }}
          >
            <Text style={styles.location}>
     {data.organizationCentre}
            </Text>
          </View>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 3,
    borderRadius: 10,
    flexDirection: "column",
    backgroundColor: "#FFFF",
    borderColor: "#E3E3E3",
    padding: 12,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: win.width * 0.94,
  },
  imagen: {
    fontSize: 17,
    letterSpacing: 1,
    fontWeight: "700",
    color: colors.text,
  },
  position: {
    minWidth: 100,
    borderColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
    minHeight: 120,
  },
  companyName: {
    paddingTop: 3,
    paddingBottom: 5,
    fontSize: 13,
    fontWeight: "200",

    color: colors.text,
  },
  location: {

    fontSize: 14,
    color: colors.dateText,
  },
  chip: {
    backgroundColor: colors.neutral05,
    paddingHorizontal: 10,
    padding: 5,
    width: "auto",
    borderRadius: 5,
  },
});
