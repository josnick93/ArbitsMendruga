import { colors } from "../../theme/colors";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTranslation } from "../../hooks/useTranslations";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { FlashList } from "@shopify/flash-list";

export const SavedScreen = ({ navigateUser, navigation }) => {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const user = usePersonStore((state) => state.user);

  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      // @ts-ignore: esto funciona bien pero da un error si no porngo el ts-ignore
      routes: [{ name: "Home" }],
    });
  };

  useEffect(() => {
    const userId =
      navigateUser !== null && navigateUser !== undefined
        ? navigateUser[0].user_id
        : user.user_id;

    const collectionRef = collection(database, "SavedArtworks");
    const q = query(collectionRef, where("save_user_id", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setImages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          title: doc.data().title,
          publish_date: doc.data().publish_date,
          medium_type: doc.data().medium_type,
          user_id: doc.data().user_id,
          description: doc.data().description,
        }))
      );
    });

    return unsubscribe;
  }, [navigateUser, user]);

  return (
    <View style={{ flex: 1 }}>
      {navigateUser === null || navigateUser === undefined ? (
        images.length > 0 ? (
          <FlashList
            data={images}
            numColumns={2}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={Dimensions.get("window").width / 2 - 20}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 2 }}>
                <Ionicons
                  name={"bookmark"}
                  size={25}
                  style={{
                    color: colors.main,
                    position: "absolute",
                    zIndex: 1,
                    top: 10,
                    right: 10,
                  }}
                />
                <Pressable
                  onPress={() =>
                    navigation.navigate("PorfolioDetail", { item: item })
                  }
                >
                  <Image
                    source={{ uri: item.url[0] }}
                    style={{
                      width: "100%",
                      minHeight: 250,
                      borderRadius: 10,
                      resizeMode: "cover",
                    }}
                  />
                </Pressable>
              </View>
            )}
          />
        ) : (
          <View style={{ flex: 1, padding: 50 }}>
            <View style={styles.justifyTitle}>
              <Text style={styles.mainTitle}>{t("save.first.work")}</Text>
              <Text style={styles.text}>{t("save.first.work.body")}</Text>
              <View style={{ marginTop: 10 }}>
                <Pressable
                  style={styles.findButton}
                  onPress={handleNavigateToHome}
                >
                  <Text style={styles.buttontext}>{t("find.work")}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )
      ) : (
        <>
          {navigateUser.user_id === user.user_id ? (
            images.length > 0 ? (
              <FlashList
                data={images}
                numColumns={2}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={Dimensions.get("window").width / 2 - 20}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, margin: 2 }}>
                    <Ionicons
                      name={"bookmark"}
                      size={25}
                      style={{
                        color: colors.main,
                        position: "absolute",
                        zIndex: 1,
                        top: 10,
                        right: 10,
                      }}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate("PorfolioDetail", { item: item })
                      }
                    >
                      <Image
                        source={{ uri: item.url[0] }}
                        style={{
                          width: "100%",
                          minHeight: 250,
                          borderRadius: 10,
                          resizeMode: "cover",
                        }}
                      />
                    </Pressable>
                  </View>
                )}
              />
            ) : (
              <View style={{ flex: 1, padding: 50 }}>
                <View style={styles.justifyTitle}>
                  <Text style={styles.mainTitle}>{t("save.first.work")}</Text>
                  <Text style={styles.text}>{t("save.first.work.body")}</Text>
                  <View style={{ marginTop: 10 }}>
                    <Pressable
                      style={styles.findButton}
                      onPress={handleNavigateToHome}
                    >
                      <Text style={styles.buttontext}>{t("find.work")}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )
          ) : images.length > 0 ? (
            <FlashList
              data={images}
              numColumns={2}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={Dimensions.get("window").width / 2 - 20}
              renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 2 }}>
                  <Ionicons
                    name={"bookmark"}
                    size={25}
                    style={{
                      color: colors.main,
                      position: "absolute",
                      zIndex: 1,
                      top: 10,
                      right: 10,
                    }}
                  />
                  <Pressable
                    onPress={() =>
                      navigation.navigate("PorfolioDetail", { item: item })
                    }
                  >
                    <Image
                      source={{ uri: item.url[0] }}
                      style={{
                        width: "100%",
                        minHeight: 250,
                        borderRadius: 10,
                        resizeMode: "cover",
                      }}
                    />
                  </Pressable>
                </View>
              )}
            />
          ) : (
            <View style={[styles.justifyTitle, { paddingVertical: 60 }]}>
              <Text style={styles.mainTitle}>{t("not.saved.artwork")}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  justifyTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.secondarytext,
    paddingBottom: 10,
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 1.25,
    paddingVertical: 10,
  },
  findButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: "center",
  },
  buttontext: {
    fontSize: 14,
    color: "white",
    fontWeight: "700",
    letterSpacing: 1,
  },
});
