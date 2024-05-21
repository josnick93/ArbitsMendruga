import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProjectImages } from "../../../../Constants";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../../../firebaseConfig";
import { colors } from "../../../theme/colors";
import { usePersonStore } from "../../../../store/store";

type ProfolioCarrouselProps = {
  navigation: any;
  navigateUser: any;
};

export const ProfolioCarrousel = ({
  navigation,
  navigateUser,
}: ProfolioCarrouselProps) => {
  const user = usePersonStore((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId =
      navigateUser !== null && navigateUser !== undefined
        ? navigateUser[0].user_id
        :user.user_id ;

    const collectionRef = collection(database, "Projects");
    const q = query(collectionRef, where("user_id", "==", userId)); 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
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
  }, [navigateUser]);
  /*Esta pantalla recibe todos los proyectos pertenecientes al usuario logueado*/
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "transparent" }}
    >
      <FlashList
        data={data}
        numColumns={1}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width / 2 - 20}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable
              onPress={() =>
                navigation.navigate("PorfolioDetail", { item: item })
              }
            >
              <View
                style={{
                  backgroundColor: colors.palette.white,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomEndRadius: 3,
                  borderBottomStartRadius: 3,
                }}
              >
                <Image
                  source={{ uri: item.url[0] }}
                  style={{
                    width: "100%",
                    minHeight: 250,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderColor: "#d35647",
                    resizeMode: "cover",
                  }}
                />
                <Text
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    fontWeight: 600,
                    letterSpacing: 0.7,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};
