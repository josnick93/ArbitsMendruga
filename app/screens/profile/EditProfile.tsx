import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { database, storage } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { AppUser } from "../../../types";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const win = Dimensions.get("window");

export const EditProfile = ({ route, navigation }) => {
  //Recoger el usuario actualmente logueado
  const user = usePersonStore((state) => state.user);
  const { t } = useTranslation();
  async function uploadImage(uri, fileType) {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, "Images/" + new Date().getTime());
      await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setNewData((prevData) => ({
        ...prevData,
        avatar: downloadURL,
      }));

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  }
  const [image, setImage] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  };


  //Se inicia un estado con los valores del usuario
  const UserState: AppUser = {
    displayName: user.displayName,
    email: user.email,
    country: user.country,
    city: user.city,
    about_description: user.about_description,
    avatar: user.avatar,
    web_url: user.web_url,
    rol: user.rol,
    user_id: user.user_id,
  };

  //Estado para poder actualizar los nuevos datos
  const [newData, setNewData] = useState(UserState);
  const handleChangeTex = (value, name) => {
    setNewData({ ...newData, [name]: value });
  };


  const handleUpdate = async()=> {
    const result = await update()

    if(result === "success"){
     navigation.reset({
      index: 0,
      routes: [{ name: "ProfileScreen" }],
    });}
  }
  const update = async () => {
    try {
      const usersRef = collection(database, "Users");
      const q = query(usersRef, where("user_id", "==", user.user_id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = docSnapshot.ref;
        await updateDoc(docRef, {
          ...newData,
        });
      });
      ToastAndroid.showWithGravity(
        t("succesful.edit"),
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return "success";

    } catch (error) {
      Alert.alert("Error", error.message);
    }
    return "error"
  };

  const header = require("../../../assets/headerprofile.png");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <Pressable onPress={pickImage}>
        <Ionicons
          name="camera-outline"
          size={30}
          color={"white"}
          style={{ position: "absolute", top: 120, left: 180, zIndex: 1 }}
        />
        <Image
          source={header}
          style={{
            height: 150,
            width: "auto",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <Image source={{ uri: newData.avatar }} style={[styles.image]} />
      </Pressable>

      <View style={[styles.card, { marginTop: 40 }]}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 8,
            justifyContent: "flex-start",
          }}
        >
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("name")}</Text>
            <TextInput
              style={styles.input}
              value={newData.displayName}
              onChangeText={(value) => handleChangeTex(value, "displayName")}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("city")}</Text>
            <TextInput
              style={styles.input}
              value={newData.city}
              onChangeText={(value) => handleChangeTex(value, "city")}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("country")}</Text>
            <TextInput
              style={styles.input}
              value={newData.country}
              onChangeText={(value) => handleChangeTex(value, "country")}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          <View style={styles.divided}>
            <Text style={styles.textTittle}>Summary</Text>
            <TextInput
              style={[
                styles.input,
                {
                  minHeight: 70,
                  textAlignVertical: "top",
                  paddingTop: 5,
                  paddingEnd: 0.8,
                },
              ]}
              multiline={true}
              value={newData.about_description}
              placeholder={t("description.placeholder")}
              onChangeText={(value) =>
                handleChangeTex(value, "about_description")
              }
              keyboardType="default"
            />
          </View>
          <View style={[styles.divided, { marginTop: 30 }]}>
            <Text style={styles.textTittle}>Personal webpage</Text>
            <TextInput
              style={styles.input}
              value={newData.web_url}
              onChangeText={(value) => handleChangeTex(value, "web_url")}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          <View style={styles.divided}>
            <Text style={styles.textTittle}>Contact</Text>
            <TextInput
              style={styles.input}
              value={newData.email}
              placeholder={t("description.placeholder")}
              keyboardType="default"
              onChangeText={(value) => handleChangeTex(value, "email")}
            />
          </View>
          {/* <View style={styles.divided}>
            <Text style={[styles.textTittle, { paddingBottom: 10 }]}>
              Social
            </Text>
            {/* Array de cuentas de redes sociales */}
          {/* <SocialMediaList />
          </View> */}
        </View>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttontext} onPress={handleUpdate}>
          {t("save")}
        </Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  divided: {
    marginBottom: 3,
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
  input: {
    height: 35,
    width: win.width * 0.88,
    paddingStart: 5,
    borderColor: colors.palette.neutral500,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.neutral05,
  },

  textTittle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },

  card: {
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
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
  button: {
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: 150,
    backgroundColor: colors.main,
    borderColor: "transparent",
    height: "auto",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "center",
  },
  ellipsis_vertical: {
    position: "absolute",
    marginStart: win.width * 0.9,
  },
});

