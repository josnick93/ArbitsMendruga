import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";

export const JobScreenControler = () => {
    
  const [data, setData] = useState([]);


  // Esta función recibe todos los datos de los concursos
  //TODO: implementar filtros
  useEffect(() => {

    const collectionRef = collection(database, "Jobs");
    //Aquí hay que poner los filtros
    const q = query(collectionRef, orderBy("publishDate"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          city:doc.data().city,
          contractType:doc.data().contractType,
          companyName:doc.data().companyName,
          country:doc.data().country,
          description:doc.data().description,
          position:doc.data().position,
          requirements:doc.data().requirements,
          user_id:doc.data().user_id,
          weburl: doc.data().weburl,
          workModel: doc.data().workModel,
          workingHours: doc.data().workingHours,

        }))
      );
    });
    return unsubscribe; 

  }, []);

  return data
  
}