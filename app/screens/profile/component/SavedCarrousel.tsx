import { FlashList } from "@shopify/flash-list";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    View
} from "react-native";
import { database } from "../../../../firebaseConfig";
  
  
  type ProfolioCarrouselProps = {
    navigation: any;  
    navigateUser: any;
    data : any[]
  };
  
  export const SavedCarrousel = ({ navigation, navigateUser, data}:ProfolioCarrouselProps) => {
  
  
  /*Esta pantalla recibe todos los proyectos pertenecientes al usuario logueado*/
    return (
      <ScrollView  showsVerticalScrollIndicator={false}  style= {{backgroundColor:"transparent"}}>
        <FlashList
          data={data}
          numColumns={2}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={Dimensions.get("window").width / 2 - 20}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, margin: 2 }}>
              <Pressable onPress={()=>navigation.navigate("PorfolioDetail",{ item:item} )}>
                <Image
                  source={{ uri: item.url[0]}}
                  style={{
                    width: "100%",
                    minHeight: 200,
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
    );
  };
  