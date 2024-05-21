import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { User, signOut } from "firebase/auth";
import { AboutScreen } from "./AboutScreen";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfolioCarrousel } from "./component/PortfolioCarrousel";
import { SavedScreen } from "./SavedScreen";
import { CombinedUser } from "../../../types";
const windowWidth = Dimensions.get("window").width;

export const ProfileScreen = ({ route, navigation }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("Portfolio");
  //Recoger el usuario actualmente logueado
  const [navigateUser, setNavigateUser] = useState<CombinedUser>();
  const user = usePersonStore((state) => state.user);
  const { t, changeLanguage, getCurrentLocale } = useTranslation();
  const handleTranslation = () => {
    changeLanguage(getCurrentLocale() === "en" ? "es" : "en");
  };

  useEffect(() => {
    const { item } = route.params || {};
    if (item !== undefined) {
      setNavigateUser(item);
    }
  }, [route.params, user]);

  type ViewMode = "Portfolio" | "About" | "Saved";

  const { signOutZustand } = usePersonStore();
  const handleSignout = () => {
    signOutZustand();
  };
  const header = require("../../../assets/headerprofile.png");

  return (
    <>
      <View>
        <Image
          source={header}
          style={{
            height: 150,
            width: "auto",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        ></Image>
        {navigateUser ? (
          navigateUser[0].user_id === user.user_id ? (
            <>
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  marginTop: 50,
                  marginStart: 20,
                  justifyContent: "flex-start",
                }}
              >
                <Pressable
                  style={{ alignItems: "center", flexDirection: "row" }}
                  onPress={handleTranslation}
                >
                  <Feather name="globe" size={20} color={colors.secondary} />
                  {getCurrentLocale() === "en" ? (
                    <Text style={styles.translation}> EN</Text>
                  ) : (
                    <Text style={styles.translation}> ES</Text>
                  )}
                </Pressable>
              </View>
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  marginStart: windowWidth * 0.78,
                  alignItems: "center",
                  display: "flex",
                  gap: 15,
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={28}
                  onPress={async () => {
                    await signOut(auth);
                    await AsyncStorage.removeItem("@user");
                    handleSignout();
                  }}
                  color={colors.secondary}
                  style={{ marginTop: 20 }}
                />
                <Feather
                  name="edit-2"
                  onPress={() => {
                    navigation.navigate("EditProfile");
                  }}
                  size={22}
                  color={colors.secondary}
                  style={{ marginTop: 20 }}
                />
              </View>
            </>
          ) : null
        ) : (
          <>
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                marginTop: 20,
                marginStart: 20,
                justifyContent: "flex-start",
              }}
            >
              <Pressable
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={handleTranslation}
              >
                <Feather name="globe" size={20} color={colors.secondary} />
                {getCurrentLocale() === "en" ? (
                  <Text style={styles.translation}> EN</Text>
                ) : (
                  <Text style={styles.translation}> ES</Text>
                )}
              </Pressable>
            </View>
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                marginStart: windowWidth * 0.78,
                alignItems: "center",
                display: "flex",
                gap: 15,
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={28}
                onPress={async () => {
                  await signOut(auth);
                  await AsyncStorage.removeItem("@user");
                  handleSignout();
                }}
                color={colors.secondary}
                style={{ marginTop: 20 }}
              />
              <Feather
                name="edit-2"
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
                size={22}
                color={colors.secondary}
                style={{ marginTop: 20 }}
              />
            </View>
          </>
        )}
      </View>

      {navigateUser ? (
        <Image
          source={{ uri: navigateUser[0].avatar }}
          style={[styles.image]}
        />
      ) : (
        <Image source={{ uri: user.avatar }} style={[styles.image]} />
      )}

      <View style={styles.card}>
        {navigateUser ? (
          <Text style={styles.textTittle}>{navigateUser[0].displayName}</Text>
        ) : (
          <Text style={styles.textTittle}>{user.displayName}</Text>
        )}
        {/* <Text style={styles.text}>{user.email}</Text> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Ionicons size={20} name="location-sharp" color={colors.main} />

          <Text style={styles.textLocation}>
            {navigateUser
              ? navigateUser[0].city + ", " + navigateUser[0].country
              : user.city + ", " + user.country}
          </Text>
        </View>
        <Text style={styles.textUrl}>
          {navigateUser ? navigateUser[0].web_url : user.web_url}
        </Text>
      </View>
      <View
        style={{ height: 2, backgroundColor: "#EBE9E9", marginVertical: 2 }}
      ></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 5,
          justifyContent: "center",
        }}
      >
        <Pressable
          style={[
            styles.switchButton,
            viewMode === "Portfolio" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("Portfolio");
          }}
        >
          <Text
            style={
              viewMode === "Portfolio"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("portfolio")}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.switchButton,
            viewMode === "Saved" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("Saved");
          }}
        >
          <Text
            style={
              viewMode === "Saved"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("saved")}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.switchButton,
            viewMode === "About" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            setViewMode("About");
          }}
        >
          <Text
            style={
              viewMode === "About"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("about")}
          </Text>
        </Pressable>
      </View>

      {viewMode === "Portfolio" ? (
        <ProfolioCarrousel
          navigation={navigation}
          navigateUser={navigateUser}
        />
      ) : viewMode === "About" ? (
        <AboutScreen navigateUser={navigateUser} />
      ) : (
        <SavedScreen navigateUser={navigateUser} navigation={navigation} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  switchButton: {
    flex: 1,
    textAlignVertical: "center",
    marginHorizontal: 10,
    alignItems: "center",
    padding: 8,
    maxWidth: 100,
    borderRadius: 30,
  },
  translation: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondary,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  textLocation: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
  },
  textTittle: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
    textAlign: "center",
  },
  textUrl: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDim,
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
    letterSpacing: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderColor: "white",
    backgroundColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: 85,
  },
  active: {
    backgroundColor: "#D9D9D9",
  },
  inactive: {
    backgroundColor: "transparent",
  },
  switchTextActive: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "600",
  },
  ellipsis_vertical: {
    position: "absolute",
    marginStart: windowWidth * 0.9,
  },
});
