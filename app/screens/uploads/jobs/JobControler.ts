import { useState } from "react";
import { database } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Alert } from "react-native";
import { JobData } from "../../../../types";

export const JobControler = () => {
  const currentDate = new Date().toISOString()
  const JobState: JobData = {
    user_id: "",
    publishDate: currentDate,
    position: "",
    city: "",
    companyName:"",
    country: "",
    workModel: "",
    contractType: "",
    workingHours: "",
    description: "",
    requirements: "",
    weburl: "",
  };

  const [showErrors, setShowErrors] = useState(false);
  const [state, setState] = useState(JobState);

  const checkAllTextFields = () => {
    const {
      position,
      city,
      country,
      workModel,
      contractType,
      companyName,
      workingHours,
      description,
      requirements,
      weburl,
    } = state;
    return (
      position &&
      city &&
      country &&
      companyName &&
      workModel &&
      contractType &&
      workingHours &&
      description &&
      weburl &&
      requirements
    );
  };

  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveJob = async () => {
    if(checkAllTextFields()){
      try {
        await addDoc(collection(database, "Jobs"), { ...state });
        return true;
      } catch (error) {
        console.error("Error saving job: ", error);
        Alert.alert("Error", "Error saving job data.");
        return false;
      }}
      else{
        setShowErrors(true)
      }
  };

  return {
    handleChangeTex,
    saveJob,
    state,
    setShowErrors,
    showErrors,
    checkAllTextFields
  };
};