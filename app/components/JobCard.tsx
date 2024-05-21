import { View, Image, Text, Dimensions, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../hooks/useTranslations";
const win = Dimensions.get("window");

export const JobCard = ({ data }) => {

  const jobLogo = require("../../assets/pollo-job.png");
  const { t } = useTranslation();



  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Image
          source={jobLogo
          }
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
            {data.position} - {data.contractType}
          </Text>
          <Text style={styles.companyName}>{data.companyName}</Text>
          <View
            style={{
              
              flexDirection: "row",
              alignItems: "flex-start",
              paddingTop: 5,
            }}
          >
            <Ionicons name="location-sharp" size={20} color={colors.main} />
            <Text style={styles.location}>
              {data.city}, {data.country}
            </Text>
          </View>
        </View>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingTop: 10,
        }}
      >
        <Ionicons name="location-sharp" size={20} color={colors.main} />
        <Text style={styles.location}>
          {data.city}, {data.country}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingBottom: 10,
          paddingTop: 20,
          gap: 10,
        }}
      >
        <Text style={styles.chip}>{t(data.workModel)}</Text>
        <Text style={styles.chip}>{t(data.contractType)}</Text>
        <Text style={styles.chip}>{t(data.workingHours)}</Text>
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
    maxWidth: 90,
    borderColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
    maxHeight: 90,
  },
  companyName: {
    
    paddingTop: 3,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: "200",

    color: colors.text,
  },
  location: {
    paddingTop: 3,
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
