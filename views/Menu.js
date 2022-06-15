import React, { useContext, useEffect, Fragment } from "react";
import { StyleSheet, View } from "react-native";
import FirebaseContext from "../context/firebase/firebaseContext";
import {
  Container,
  Divider,
  List,
  ListItem,
  Thumbnail,
  Text,
  InputLeftAddon,
  Body,
  Box,
  Actionsheet,
  Content,
  Image,
} from "native-base";

import globalStyles from "../styles/global";

const Menu = () => {
  //context de firebase
  const { menu, ObtenerProductos } = useContext(FirebaseContext);

  useEffect(() => {
    ObtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Divider style={styles.separador}>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </Divider>
        );
      }
    } else {
      return (
        <Divider style={styles.separador}>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </Divider>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <View style={styles.box}>
        <List>
          {menu.map((platillo, i) => {
            const { imagen, nombre, descripcion, categoria, precio, id } =
              platillo;
            //console.log(imagen);

            return (
              <View key={id}>
                <View>{mostrarHeading(categoria, i)}</View>

                <View style={styles.contenedor}>
                  <Text marginBottom={2} style={styles.textoNombre}>
                    {nombre}
                  </Text>

                  <View style={styles.imgText}>
                    <Image
                      size={60}
                      //resizeMode={"contain"}
                      borderRadius={100}
                      source={{ uri: imagen }}
                      alt="Alternate Text"
                    />

                    <Text style={styles.description} note numberOfLines={2}>
                      {descripcion}
                    </Text>
                    <Text marginRight={2}> Precio: {precio}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </List>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderStyle: "solid",
  },
  box: {
    backgroundColor: "#FFF",
    width: "-webkit-fill-available",
  },
  textoNombre: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  description: {
    margin: "auto",
    marginRight: 10,
    marginLeft: 20,
  },
  imgText: {
    flexDirection: "row",
  },
  separador: {
    backgroundColor: "#000",
  },
  separadorTexto: {
    color: "#FFDA00",
    fontWeight: "bold",
  },
});

export default Menu;
