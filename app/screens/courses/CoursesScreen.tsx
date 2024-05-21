import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View, Text } from "react-native";
import { CourseCard } from "../../components/CourseCard";
import { CourseScreenControler } from "./CourseScreenControler";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";

export const CoursesScreen = ({ navigation }) => {
  const data = CourseScreenControler();
  const { t } = useTranslation();


  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
            <Text style={styles.text}> {t("find")} {data.length} {t("courses.min")}</Text>

      <FlashList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("CoursesDetailScreen", { item: item })
              }
            >
              <CourseCard key={item.id} data={item} />
            </Pressable>
          </View>
        )}
       
      />
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
    fontSize: 12,
    lineHeight: 21,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.secondary,
  },
});
