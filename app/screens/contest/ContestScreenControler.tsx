import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";

export const ContesteViewControler = () => {
    
  const [data, setData] = useState([]);


  // Esta función recibe todos los datos de los concursos
  //TODO: implementar filtros
  useEffect(() => {

    const collectionRef = collection(database, "Contest");
    //Aquí hay que poner los filtros
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          maxAge:doc.data().maxAge,
          minAge:doc.data().minAge,
          organization:doc.data().organization,
          participants:doc.data().participants,
          publishDate:doc.data().publishDate,
          startDate:doc.data().startDate,
          finishDate:doc.data().finishDate,
          specifications:doc.data().specifications,
          terms: doc.data().terms,
          name: doc.data().name,
          objetive: doc.data().objetive,
          urlbases: doc.data().urlbases,
          weburl: doc.data().weburl,
          image: doc.data().image,
    
        }))
      );
    });
    return unsubscribe; 

  }, []);

  return data
  
}