import { useState } from "react";
import { database, storage } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { CourseData } from "../../../../types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const CourseControler = () => {
  const currentDate = new Date().toISOString();
  const [image, setImage] = useState([]);
  const pickImage = async () => {
    setImage([]);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.2,
      aspect: [3, 4],
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };
  const CourseState: CourseData = {
    user_id: "123456789",
    organizationCentre: "",
    description: "",
    publishDate: currentDate,
    courseName: "",
    city: "",
    instructorName: "",
    country: "",
    startDate: "",
    finishDate: "",
    spots: "",
    schedule: "",
    price: "",
    weburl: "",
  };

  const [showErrors, setShowErrors] = useState(false);
  const [state, setState] = useState(CourseState);

  const checkAllTextFields = () => {
    const {
      instructorName,
      city,
      country,
      description,
      courseName,
      organizationCentre,
      startDate,
      finishDate,
      spots,
      schedule,
      price,
      weburl,
    } = state;
    return (
      courseName &&
      city &&
      country &&
      startDate &&
      description &&
      organizationCentre &&
      finishDate &&
      spots &&
      schedule &&
      instructorName &&
      weburl &&
      price
    );
  };

  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveCourse = async () => {
    if (checkAllTextFields()) {
      try {
        const uploadImagePromises = image.map(async (imageUri) => {
          try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const storageRef = ref(storage, "Images/" + new Date().getTime());
            await uploadBytesResumable(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
          } catch (error) {
            console.error("Error uploading image:", error);
            return null;
          }
        });
        const imageDownloadURLs = await Promise.all(uploadImagePromises);

        const data = {
          ...state,

          image: imageDownloadURLs.filter((url) => url !== null),
        };
        await addDoc(collection(database, "Courses"), { ...data });
        return true;
      } catch (error) {
        console.error("Error saving Course: ", error);
        Alert.alert("Error", "Error saving Course.");
        return false;
      }
    }
  };

  return {
    handleChangeTex,
    saveCourse,
    state,
    image,
    setShowErrors,
    pickImage,
    showErrors,

    checkAllTextFields,
  };
};
