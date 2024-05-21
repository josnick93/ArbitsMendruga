import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";

const win = Dimensions.get("window");

export const ProjectUploadScreen = ({ navigation }) => {
  const [image, setImages] = useState([]);
  const { t } = useTranslation();

  const pickImage = async () => {
    setImages([]);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection:true,
      selectionLimit:5,
      quality: 0.2,
      aspect: [3, 4],
    });

    if (!result.canceled && result.assets.length > 0) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const goToDetail = () => {
    navigation.navigate("PublishProjectScreen", { image: image });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      ></View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={40} name="cloud-upload-outline" color={colors.text} />

        <Text style={{ fontSize: 20, fontWeight: "700", padding: 10 }}>
          {t("upload.multimedia.archives")}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "200" }}>{t("max.size")}</Text>
        <View style={{ marginTop: 50 }}>
          <Pressable
            onPress={pickImage}
            style={{
              borderWidth: 2,
              borderColor: colors.secondary,
              paddingHorizontal: 25,
              paddingVertical: 8,
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                color: colors.secondary,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              {image.length === 0 ? t("select.image") : t("change.image")}
            </Text>
          </Pressable>
        </View>

        {image.length > 0 && (
          <View style={{ marginTop: 50, display: "flex", flex: 1 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {image.map((uri, index) => (
                <Image key={index} source={{ uri: uri }} style={styles.image} />
              ))}
            </ScrollView>
          </View>
        )}

        {image.length > 0 && (
          <View
            style={{
              flex: 1,
              position: "absolute",
              height: 120,
              bottom: -20,
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              alignItems: "center",
              width: win.width,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 30,
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 30,
                width: 150,
                backgroundColor: colors.secondary,
                borderColor: "transparent",
                height: "auto",
              }}
              onPress={() => goToDetail()}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {t("continue")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  image: {
    margin: 10,
    width: 200,
    height: 200,
  },
});
