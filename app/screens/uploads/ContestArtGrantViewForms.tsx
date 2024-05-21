import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { ArtGrantForm } from "./artGrant/ArtGrantForm";
import { ContestForm } from "./contest/ContestForm";

export const ContestArtGrantViewForms = ({navigation}) => {

 
  const { t} = useTranslation();


  type ViewMode = "Beca" | "Concurso";
  const [viewMode, setViewMode] = useState<ViewMode>("Concurso");
  return (
    <>
      <View
        style={{
          display: "flex",
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          style={[
            styles.switchButtonRight,
            viewMode === "Concurso" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            {
              setViewMode("Concurso");
            }
          }}
        >
          <Text
            style={
              (styles.switchButtonRight,
              viewMode === "Beca"
                ? styles.switchTextActive
                : styles.switchTextinactive)
            }
          >
            {t("contest")}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.switchButtonLeft,
            viewMode === "Beca" ? styles.active : styles.inactive,
          ]}
          onPress={() => {
            {
              setViewMode("Beca");
            }
          }}
        >
          <Text
            style={
              (styles.switchButtonLeft,
              viewMode === "Concurso"
                ? styles.switchTextActive
                : styles.switchTextinactive)
            }
          >
            {t("artGrant")}
          </Text>
        </Pressable>
      </View>
     
      <View
        style={{
          flexDirection: "column",
          display: "flex",
          flex: 1,
          margin: 10,
        }}
      >
        {viewMode === "Beca" ?  <ArtGrantForm navigation={navigation} />:<ContestForm navigation={navigation}/> }
      </View>
    </>
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
    marginBottom: 5,
  },
  switchButtonRight: {
    alignItems: "center",
    borderTopStartRadius: 30,
    borderBottomStartRadius: 30,
    justifyContent: "center",
    height: 40,
    borderWidth: 2,
    width: 140,
    marginEnd: -1,
    borderColor: "#323232",
    paddingHorizontal: 35,
  },
  switchButtonLeft: {
    alignItems: "center",
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    justifyContent: "center",
    height: 40,
    marginStart: -1,
    borderWidth: 2,
    width: 140,
    borderColor: "#323232",
    paddingHorizontal: 35,
  },
  active: {
    backgroundColor: colors.contest,
  },
  inactive: {
    backgroundColor: colors.transparent,
  },
  switchTextActive: {
    fontSize: 14,
    fontWeight: "600",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "400",
  },
});
