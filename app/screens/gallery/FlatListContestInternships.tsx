import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { colors } from "../../theme/colors";

export const FlatListContestInternships = ({ navigation }) => {
  const { t } = useTranslation();

  const data: string[] = ["contests", "artGrants", "courses"];
  const handleNavigation = (item) => {
    if(
      item === "artGrants"
    )
      navigation.navigate("ArtGrantScreen")
      else if (      item === "contests"
    )navigation.navigate("ContestScreen");
    else{
      navigation.navigate("CoursesScreen");
    }
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlashList
        horizontal={false}
        data={data}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={300}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text style={styles.text}>{t(item.toString())}</Text>
            <Pressable
              onPress={() =>
                handleNavigation(item)
              }>
              <Ionicons
                size={25}
                name="chevron-forward-outline"
                color={colors.secondary}
              ></Ionicons>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#E9E8E8",
    justifyContent: "space-between",
  },
  text: {
    color: "#323232",
    fontWeight: "600",
    fontSize: 16,
  },
});
