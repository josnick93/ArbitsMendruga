import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "../hooks/useTranslations";
import { SettingsScreenKK } from "../screens/SettingsScreenKK";
import SignInScreen from "../screens/login/SignInScreen";
import { ArtGrantScreen } from "../screens/artGrants/ArtGrantsScreen";
import { ContestScreen } from "../screens/contest/ContestScreen";
import { HomeGalleryScreen } from "../screens/gallery/HomeGalleryScreen";
import { PorfolioDetail } from "../screens/profile/PortfolioDetail";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { ContestArtGrantViewForms } from "../screens/uploads/ContestArtGrantViewForms";
import { ProjectUploadScreen } from "../screens/uploads/ProjectUploadScreen";
import { PublishProjectScreen } from "../screens/uploads/PublishProjectScreen";
import { SuccesUpload } from "../screens/uploads/SuccesUpload";
import { UploadList } from "../screens/uploads/UploadList";
import { JobFormView } from "../screens/uploads/jobs/JobForm";
import { colors } from "../theme/colors";
import { FlatListContestInternships } from "../screens/gallery/FlatListContestInternships";
import { ContestDetailScreen } from "../screens/contest/ContestDetailScreen";
import { ArtGrantDetailScreen } from "../screens/artGrants/ArtGrantDetailScreen";
import { FlatlistJobs } from "../screens/jobs/FlatListJobs";
import { JobsDetailScreen } from "../screens/jobs/JobsDetailScreen";
import { CourseForm } from "../screens/uploads/course/CourseForm";
import { CoursesScreen } from "../screens/courses/CoursesScreen";
import { EditProfile } from "../screens/profile/EditProfile";
import { CoursesDetailScreen } from "../screens/courses/CoursesDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UploadStackNavigation = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadList"
        component={UploadList}
      />
      <Stack.Screen
        name="ProjectUploadScreen"
        component={ProjectUploadScreen}
        options={({ navigation }) => ({
          headerTitle: t("upload"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContestArtGrantViewForms"
        component={ContestArtGrantViewForms}
        options={({ navigation }) => ({
          headerShown: true,
          navigationBarColor: "transparent",
          headerTitle: t("upload.contest.artGrant"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
        })}
      />
      <Stack.Screen
        name="CourseForm"
        component={CourseForm}
        options={({ navigation }) => ({
          headerShown: true,
          backgroundColor: "transparent",
          navigationBarColor: "transparent",
          headerTitle: t("upload.course"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
        })}
      />
      <Stack.Screen
        name="JobFormView"
        component={JobFormView}
        options={({ navigation }) => ({
          headerShown: true,
          backgroundColor: "transparent",
          navigationBarColor: "transparent",
          headerTitle: t("upload.job"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
        })}
      />
      <Stack.Screen
        name="PublishProjectScreen"
        component={PublishProjectScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          navigationBarColor: "transparent",

          headerTitle: "Info",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            // backgroundColor: "transparent",
          },
        })}
      />
      <Stack.Screen
        name="SuccesUpload"
        component={SuccesUpload}
        options={({ navigation }) => ({
          headerShown: false,
          navigationBarColor: "transparent",
          headerShadowVisible: false,
          animation: "ios",
          headerTitle: "Info",
          headerStyle: {
            backgroundColor: "transparent",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const GalleryStackNavigator = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="HomeGalleryScreen"
        component={HomeGalleryScreen}
        options={{
          animation: "ios",
          headerShown: false,
          headerTitle: "",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="PorfolioDetail"
        component={PorfolioDetail}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          navigationBarColor: "transparent",
          headerShadowVisible: false,
          headerTitle: t("detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.text,
          navigationBarColor: "transparent",
          animation: "ios",          headerTitle: t("detail"),

          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    
    </Stack.Navigator>
  );
};
const JobstStackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="FlatlistJobs"
        component={FlatlistJobs}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          navigationBarColor: "transparent",
          headerShadowVisible: false,
          headerTitle: t("jobs"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="JobsDetailScreen"
        component={JobsDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          headerBackTitle: "",
          headerTransparent: true,
          headerTitle: t("job.detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const InternShipsAndContestStackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="FlatListContestInternships"
        component={FlatListContestInternships}
      />
      <Stack.Screen name="Sign in" component={SignInScreen} />
      <Stack.Screen
        name="ArtGrantScreen"
        component={ArtGrantScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          headerShadowVisible: false,
          headerTitle: t("art.grants"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContestScreen"
        component={ContestScreen}
        options={({ navigation }) => ({
          headerTitle: t("contests"),
          animation: "ios",
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.text,
          navigationBarColor: "transparent",
          headerTitle: t("edit.profile"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContestDetailScreen"
        component={ContestDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          headerTransparent: true,
          navigationBarColor: "transparent",
          headerTitle: t("contest.detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CoursesDetailScreen"
        component={CoursesDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          headerTransparent: true,
          navigationBarColor: "transparent",
          headerTitle: t("course.detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CoursesScreen"
        component={CoursesScreen}
        options={({ navigation }) => ({
          headerShown: true,
          animation: "ios",
          navigationBarColor: "transparent",

          headerBackTitle: "",
          headerTitle: t("courses"),

          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ArtGrantDetailScreen"
        component={ArtGrantDetailScreen}
        options={({ navigation }) => ({
          headerShown: true,
          navigationBarColor: "transparent",
          animation: "ios",
          headerShadowVisible: false,
          headerTransparent: true,
          headerTitle: t("art.grant.detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const PortfolioStackNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserProfile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="PorfolioDetail"
        component={PorfolioDetail}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: t("detail"),
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
        <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.text,
          navigationBarColor: "transparent",
          // headerShadowVisible: false,
          headerTitle: t("edit.profile"),

          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconSize = 25;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Upload") {
            (iconName = focused ? "add-circle" : "add-circle"), (iconSize = 50);
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else iconName = focused ? "briefcase" : "briefcase-outline";
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: "#72809C",
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={GalleryStackNavigator}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={InternShipsAndContestStackNavigator}
      />
      <Tab.Screen name="Upload" component={UploadStackNavigation} />
      <Tab.Screen name="Jobs" component={JobstStackNavigator} />
      <Tab.Screen name="Profile" component={PortfolioStackNavigator} />
    </Tab.Navigator>
  );
};

export const CustomNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
