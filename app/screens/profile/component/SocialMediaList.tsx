import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../../../hooks/useTranslations";
import { colors } from "../../../theme/colors";
const win = Dimensions.get("window");

export const SocialMediaList = () => {
  const { t } = useTranslation();

  return (
    <View style={{gap:10}}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-instagram" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-behance" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-linkedin" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-facebook" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-dribbble" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="logo-dribbble" size={20}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder={t("description.placeholder")}
          keyboardType="default"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: win.width * 0.82,
    marginStart: 10,
    borderColor: colors.palette.neutral500,
    borderBottomWidth: 1,
  },
});
