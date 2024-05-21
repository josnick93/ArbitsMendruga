import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { database, storage } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

export const ProjectUploadControler = () => {
    
    const [image, setImage] = useState("");
    const {result} = ProjectUploadControler()
    const [title, setTittle] = useState("");
    const [description, setDescription] = useState("");


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          selectionLimit: 5,
          quality: 0.2,
          aspect: [3, 4],
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
    async function saveRecord(user_id, title, url, publish_date,description,fileType) {
      try {
        const docRef = await addDoc(collection(database, "Projects"), {
          user_id,
          title,
          url,
          publish_date,
          description,
          fileType,
        });
        console.log("document saved correctly", docRef.id);
      } catch (e) {
        console.log(e);
      }
    }
    async function uploadImage(uri:string, fileType) {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const storageRef = ref(storage, "Images/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await saveRecord("hvi0sEPCIvSL86pDLWMLhLkgxxj1",title, downloadURL, new Date().toISOString(),description, fileType,);
  
      }
      );
    }
    return {
        image, 
        title, 
        result,
        setImage,
        setTittle,
        setDescription,
        saveRecord,
        uploadImage,
        pickImage,
    }
}