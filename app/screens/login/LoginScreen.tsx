import {
  Montserrat_600SemiBold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { colors } from "../../theme/colors";
import { LoginControler } from "./LoginControler";

const win = Dimensions.get("window");

export default function LoginScreen({}) {
  const [disabled, setIsDisabled] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const { isValidEmail, isValidPassword } = LoginControler();
  let [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleSignUp = () => {
    if (isValidPassword(password) && isValidEmail(email)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          const user = userCreds.user;
        })
        .catch((error) => {
          alert("Email already registered");
        });
    } else {
      setShowEmailError(!isValidEmail(email));
      setShowPasswordError(!isValidPassword(password));
    }
  };

  const handleLogin = () => {
    if (isValidPassword(password) && isValidEmail(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCreds) => {
          const user = userCreds.user;
        })
        .catch((error) => alert("Invalid credentials"));
    } else {
      setShowEmailError(!isValidEmail(email));
      setShowPasswordError(!isValidPassword(password)); 
    }
  };

  useEffect(() => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  if (!fontsLoaded) {
    return null;
  } else
    return (
      <>
        <View style={styles.loginCard}>
          <Pressable
            onPress={() => setIsLogin(!isLogin)}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{ color: colors.main, textAlign: "right", fontSize: 20 }}
            >
              {isLogin ? "Sign Up" : "Log in"}
            </Text>
          </Pressable>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 20,
              letterSpacing: 1,
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Text>

          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(email) => {
              setEmail(email);
              setShowEmailError(false);
            }}
            placeholder="Email"
            keyboardType="default"
          />
          {showEmailError && (
            <Text style={styles.errors}>Invalid email format</Text>
          )}
          <View style={[styles.textInput, { justifyContent: "space-between" }]}>
            <TextInput
              value={password}
              secureTextEntry={viewPassword}
              onChangeText={(pwd) => {
                setPassword(pwd);
                setShowPasswordError(false);
              }}
              placeholder="Password"
              keyboardType="default"
            />
            {viewPassword ? (
              <Ionicons
                onPress={() => setViewPassword(!viewPassword)}
                name="eye-outline"
                size={25}
                color={colors.dateText}
              />
            ) : (
              <Ionicons
                onPress={() => setViewPassword(!viewPassword)}
                name="eye-off-outline"
                size={25}
                color={colors.dateText}
              />
            )}
          </View>
          {showPasswordError && (
            <Text style={styles.errors}>
              Invalid password. Must be at least 8 characters long and contain
              numbers
            </Text>
          )}

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Pressable
              disabled={disabled}
              style={[
                styles.basebutton,
                disabled ? styles.buttonDisabled : styles.buttonEnabled,
              ]}
              onPress={isLogin ? handleLogin : handleSignUp}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {isLogin ? "Log in" : "Sign up"}
              </Text>
            </Pressable>
          </View>
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    borderColor: "#5E5F61",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  basebutton: {
    marginTop: 30,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: win.width * 0.9,
    height: "auto",
  },
  buttonEnabled: {
    backgroundColor: colors.main,
  },
  errors: {
    fontSize: 12,
    color: "red",
  },
  buttonDisabled: {
    backgroundColor: colors.secondarytext,
  },
  loginCard: {
    padding: 20,
    backgroundColor: "white",
  },
});
