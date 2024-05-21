import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { useRoute } from "@react-navigation/native";
const screenWidth = Dimensions.get("window").width;
const win = Dimensions.get("window");

export const ArtGrantDetailScreen = ({}) => {
  const route: any = useRoute();
  //   const { name } = route.params;
  const user = usePersonStore((state) => state.user);
  const { t } = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "column", top: 15 }}>
          <Image
            source={{ uri: route.params.item.image[0] }}
            style={[styles.image]}
          />
        </View>
        <View
          style={{
            position: "absolute",
            borderColor: colors.secondary,
            borderWidth: 2,
            alignItems: "center",
            padding: 3,
            top: 170,
            zIndex: 1,
            left: 20,
            paddingHorizontal: 12,
            borderRadius: 30,
          }}
        >
          <Text
            style={[
              styles.body,
              { color: colors.secondary, fontWeight: "700", fontSize: 10 },
            ]}
          >
            {route.params.item.participants}
          </Text>
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
                <Text style={styles.title}>{route.params.item.name}</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.body}>
                  {route.params.item.organization}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  gap: 30,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.subtitle}>{t("start.date")}</Text>
                  {/* Aqui tengo que coger la fecha formateada */}
                  <Text style={styles.body}>19/05/2024</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  {/* Aqui tengo que coger la fecha formateada */}
                  <Text style={styles.subtitle}>{t("dead.line")}</Text>
                  <Text style={styles.body}>19/05/2024</Text>
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
          <View style={{ gap: 10, paddingBottom: 15 }}>
            <Text style={styles.titleBody}>{t("destinty.centre")}</Text>
            <Text style={styles.bodybody}>
              {route.params.item.destinyCentre}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 40,
            }}
          >
            <View style={{ gap: 10, paddingBottom: 15 }}>
              <Text style={styles.titleBody}>{t("min.age")}</Text>
              <Text style={styles.bodybody}>{route.params.item.minAge}</Text>
            </View>
            <View style={{ gap: 10, paddingBottom: 15 }}>
              <Text style={styles.titleBody}>{t("max.age")}</Text>
              <Text style={styles.bodybody}>{route.params.item.maxAge}</Text>
            </View>
          </View>
          <View style={{ gap: 10, paddingBottom: 15 }}>
            <Text style={styles.titleBody}>{t("total.granted")}</Text>
            <Text style={styles.bodybody}>
              {route.params.item.totalGranted}
            </Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 15 }}>
            <Text style={styles.titleBody}>{t("work.specifications")}</Text>
            <Text style={styles.bodybody}>
              {route.params.item.specifications}
            </Text>
          </View>

          <View style={{ gap: 10, paddingBottom: 15 }}>
            <Text style={styles.titleBody}>{t("terms")}</Text>
            <Text style={styles.bodybody}>{route.params.item.terms}</Text>
          </View>
          <View style={{ gap: 10, paddingBottom: 140 }}>
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
          {/* <View style={{ gap: 10, paddingBottom: 100 }}>
            <Text style={styles.titleBody}>{t("download.bases")}</Text>
            <Text style={styles.bodybody}>
              {route.params.item.urlbases.assets[0].uri}
            </Text>
          </View> */}
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
    color: colors.text,
  },
  titleBody: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
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
    zIndex: 1,
    borderColor: "#DEDEDE",
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
});
