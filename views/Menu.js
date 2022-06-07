import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import FirebaseContext from "../context/firebase/firebaseContext";

const Menu = () => {

    //context de firebase
    const { menu, ObtenerProductos } = useContext(FirebaseContext)

    useEffect(() => {
        ObtenerProductos();

        console.log(menu)
    }, []);

    return ( 
        <Text>Menu</Text>
     );
}
 
export default Menu;