import { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, StyleSheet, View } from "react-native";
import { ContestCard } from "../../components/ContestCard";
import { ScrollView } from "react-native";
import { ContesteViewControler } from "./ContestScreenControler";
import { FlashList } from "@shopify/flash-list";
import { colors } from "../../theme/colors";
import { useTranslation } from "../../hooks/useTranslations";

// Aqui coger todos los concursos de toda la aplicación

export const ContestScreen = ({ navigation }) => {
  const data = ContesteViewControler();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);

  // Esta función recibe todos los datos de los concursos
  //TODO: implementar filtros

  return (
    <View style={{ flex: 1, padding: 10, paddingTop:5 }}>
      <Text style={styles.text}> {t("find")} {data.length} {t("contests.min")}</Text>
      <FlashList
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("ContestDetailScreen", { item: item })
              }
            >
              <ContestCard key={item.id} data={item} />
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
    paddingHorizontal:10,
    paddingBottom:5,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.secondary,
  },
});
