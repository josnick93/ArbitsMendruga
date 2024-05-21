import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { Dimensions, Pressable,Text, StyleSheet, View } from "react-native";
import { ArtGrantCard } from "../../components/ArtGrantCard";
import { ArtGrantScreenControler } from "./ArtGrantScreenControler";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";

// Para el state, tendré que comprar el finish date con el día de hoy
export const ArtGrantScreen = ({ navigation }) => {

  const data = ArtGrantScreenControler();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
    {/* <ScrollView>
      {data.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ScrollView> */}
          <Text style={styles.text}> {t("find")} {data.length} {t("artGrants.min")}</Text>

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
              navigation.navigate("ArtGrantDetailScreen", { item: item })
            }
          >
            <ArtGrantCard key={item.id} data={item} />
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
