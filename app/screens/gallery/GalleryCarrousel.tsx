import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  View
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";
import { colors } from "../../theme/colors";

export const GalleryCarousel = ({
  viewMode,
  navigation,
}: {
  viewMode: string;
  navigation;
}) => {
  const [data, setData] = useState([]);
  const [column, setColums]= useState(2);

  /*Se debe mostrar el orderby publish date y luego por el filtro cuando se presione */
  let filter = viewMode.toLowerCase();

  useEffect(() => {
    const collectionRef = collection(database, "Projects");
    const q = query(
      collectionRef,
      where("medium_type", "==", filter),
      orderBy("publish_date", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          user_id: doc.data().user_id,
          url: doc.data().url,
          title: doc.data().title,
          description: doc.data().description,
          publish_date: doc.data().publish_date,
          medium_type: doc.data().medium_type,
        }))
      );
    });
    return unsubscribe;
  }, [filter]);

  return (
    <>
      <Pressable
        style={{
          position: "absolute",
          bottom: 50,
          left: "85%",
          right: 0,
          height:50,
          width:45,
          zIndex: 1, 
          borderRadius:5,
          borderColor:colors.dateText,
          borderWidth:1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:"#rgba(222, 222, 222, 0.5)"
        }}
        onPress={()=>setColums(column == 1 ? 2 : 1)}
      >
        {column === 1 ? 
       <Feather name="columns" size={30} color={colors.main}/> : 
       <Ionicons name="browsers-sharp" size={30} color={colors.main}/> 
        }
      </Pressable>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <FlashList
          data={data}
          numColumns={column}
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
                <Image
                  source={{ uri: item.url[0] }}
                  style={{
                    width: "100%",
                    minHeight: 250,
                    borderRadius: 10,
                    borderColor: "#d35647",
                    resizeMode: "cover",
                  }}
                />
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
    </>
  );
};
