import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";

export const PortfolioDetailControler = () => {

  const [userName, setUserName] = useState([]);

  useEffect(() => {
    const getFullName = async () => {
      const collectionRef = collection(database, "Users");
      const q = query(
        collectionRef,
        where("user_id", "==", "105088139162268302853")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => { 
        setUserName(
          querySnapshot.docs.map((doc) => ({
            displayName: doc.data().displayName,
          }))
        );
      });

      return unsubscribe;
    };

    getFullName(); 
    return () => {
    };
  }, []);
  
  return { userName };
};


