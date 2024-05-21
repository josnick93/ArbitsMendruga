import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { colors } from "../../theme/colors";
import { GalleryCarousel } from "./GalleryCarrousel";
import { useTranslation } from "../../hooks/useTranslations";
import { Feather } from "@expo/vector-icons";

export const HomeGalleryScreen = ({navigation}) => {
  const { t } = useTranslation();
  type ViewMode = "Traditional" | "Digital";
  const [viewMode, setViewMode] = useState<ViewMode>("Traditional");

  return (
    <View style={styles.container}>

      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Traditional" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            {
              setViewMode("Traditional");
            }
          }}
        >
          <Text
            style={
              viewMode === "Traditional"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            {t("traditional")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Digital" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            {
              setViewMode("Digital");
            }
          }}
        >
          <Text
            style={
              viewMode === "Digital"
                ? styles.switchTextActive
                : styles.switchTextinactive
            }
          >
            Digital
          </Text>
        </TouchableOpacity>
      </View>
      <GalleryCarousel viewMode={viewMode} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    margin: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  switchButton: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    borderColor: "transparent",
    justifyContent: "center",
    height: 40,
  },
  active: {
    backgroundColor: colors.main,
  },
  inactive: {
    backgroundColor: "#D3D3D3",
  },
  switchTextActive: {
    fontSize: 14,
    color: "white",
    fontWeight: "800",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "400",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
