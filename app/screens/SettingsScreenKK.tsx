import { signOut } from "firebase/auth";
import { View, Button, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePersonStore } from "../../store/store";

export const SettingsScreenKK = ({ navigation }) => {
  const { signOutZustand } = usePersonStore();
  const user = usePersonStore((state) => state.user);
  const handleSignout = () => {
    signOutZustand();
    navigation.navigate("Sign in");
  };

  return (
    <View>
      <Text style={{ fontSize: 30, textAlign: "center", marginTop: "50%" }}>
        Settings
      </Text>
      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        {user
          ? `Logged in as: ${user.displayName}, ${user.email}`
          : "Not logged in"}
      </Text>

      <Button
        title="Log out"
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
           handleSignout();
        }}
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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
