import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";

export const CourseScreenControler = () => {
    
  const [data, setData] = useState([]);


  // Esta función recibe todos los datos de los concursos
  useEffect(() => {

    const collectionRef = collection(database, "Courses");
    //Aquí hay que poner los filtros
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          courseName:doc.data().courseName,
          city:doc.data().city,
          instructorName:doc.data().instructorName,
          country:doc.data().country,
          startDate:doc.data().startDate,
          finishDate:doc.data().finishDate,
          spots:doc.data().spots,
          description:doc.data().description,
          schedule: doc.data().schedule,
          name: doc.data().name,
          price: doc.data().price,
          weburl: doc.data().weburl,
          organizationCentre: doc.data().organizationCentre,
          image: doc.data().image,
    
        }))
      );
    });
    return unsubscribe; 

  }, []);

  return data
  
}