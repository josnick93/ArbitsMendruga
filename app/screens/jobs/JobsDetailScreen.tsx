import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { useRoute } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const win = Dimensions.get("window");

export const JobsDetailScreen = ({}) => {
  const route: any = useRoute();
  const { t } = useTranslation();
  const jobLogo = require("../../../assets/pollo-job.png");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "column", top: 25 }}>
          <Image source={jobLogo} style={[styles.image]}  />
        </View>

        <View
          style={[styles.loginCard, { shadowColor: "#000000", elevation: 20 }]}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ paddingTop: 50, flexDirection: "row" }}>
                <Text style={styles.title}>{route.params.item.position}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.body}>{route.params.item.city}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  paddingTop: 5,
                }}
              >
                <Ionicons name="location-sharp" size={20} color={colors.main} />
                <Text style={styles.location}>
                  {route.params.item.city}, {route.params.item.country}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 20,
                  paddingBottom: 10,
                  gap: 30,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <View style={styles.chip}>
                    <Text
                      style={[
                        styles.body,
                        {
                          color: colors.secondary,
                          fontWeight: "700",
                          fontSize: 12,
                        },
                      ]}
                    >
                      {route.params.item.contractType}
                    </Text>
                  </View>
                  <View style={styles.chip}>
                    <Text
                      style={[
                        styles.body,
                        {
                          color: colors.secondary,
                          fontWeight: "700",
                          fontSize: 12,
                        },
                      ]}
                    >
                      {route.params.item.workModel}
                    </Text>
                  </View>
                  <View style={styles.chip}>
                    <Text
                      style={[
                        styles.body,
                        {
                          color: colors.secondary,
                          fontWeight: "700",
                          fontSize: 12,
                        },
                      ]}
                    >
                      {route.params.item.workingHours}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 2,
                backgroundColor: "#EBE9E9",
                alignContent: "center",
                left: 0,
                marginVertical: 10,
                marginHorizontal: -20,
                width: win.width,
              }}
            ></View>

            <View style={{ gap: 10, paddingBottom: 15, paddingTop: 10 }}>
              <Text style={styles.titleBody}>{t("about.job")}</Text>
              <Text style={styles.bodybody}>
                {route.params.item.description}
              </Text>
            </View>
            <View style={{ gap: 10, paddingBottom: 15 }}>
              <Text style={styles.titleBody}>{t("skills.requirements")}</Text>
              <Text style={styles.bodybody}>
                {route.params.item.requirements}
              </Text>
            </View>

            <View style={{ gap: 10, paddingBottom: 250 }}>
              <Text style={styles.titleBody}>{t("web.url")}</Text>
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL("http://" + route.params.item.weburl);
                }}
              >
                {route.params.item.weburl}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#D7E2F4",
  },
  division: {
    marginVertical: 5,
    flexDirection: "row",
    width: screenWidth,
    alignItems: "center",
  },
  link: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: colors.secondary,
  },

  loginCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    left: 0,
    right: 0,
    bottom: -100,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.5,
    textAlign: "center",
    color: colors.text,
  },
  titleBody: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },
  chip: {
    borderColor: colors.secondary,
    borderWidth: 2,
    alignItems: "center",
    padding: 3,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: colors.dateText,
  },
  body: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1.5,
    color: colors.text,
  },
  bodybody: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: colors.text,
  },

  image: {
    width: 130,
    height: 130,
    resizeMode:"center",
    zIndex: 1,
    borderColor: "white",
    backgroundColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 80,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
    letterSpacing: 2,
  },
  location: {
    paddingTop: 3,
    fontSize: 14,
    color: colors.dateText,
  },
});
