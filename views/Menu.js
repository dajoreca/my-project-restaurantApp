import React, { useContext, useEffect, Fragment } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
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

import FirebaseContext from "../context/firebase/firebaseContext";
import PedidoContext from "../context/pedidos/pedidosContext";

const Menu = () => {
  //context de firebase
  const { menu, ObtenerProductos } = useContext(FirebaseContext);

  //Context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext);

  useEffect(() => {
    ObtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <View style={styles.separador}>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.separador}>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </View>
      );
    }
  };

  return (
    <Container style={globalStyles.contenedor}>
      <View>
        {menu.map((platillo, i) => {
          const { imagen, nombre, descripcion, categoria, precio, id } =
            platillo;

          return (
            <List key={id}>
              <View>{mostrarHeading(categoria, i)}</View>
              <TouchableOpacity
                style={styles.contenedor}
                onPress={() => {
                  //Eliminar algunas propiedades del platillo
                  const { existencia, ...platillo2 } = platillo;

                  seleccionarPlatillo(platillo2);

                  console.log(platillo2);
                }}
              >
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
                  <View>
                    <Text style={styles.description} note numberOfLines={2}>
                      {descripcion}
                    </Text>
                    <Text style={styles.textDescription}>
                      {" "}
                      Precio: {precio}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </List>
          );
        })}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    //flex: 1,
    padding: 20,
    //borderWidth: 1,
    //borderStyle: "solid",
    //borderWidth: 0,
  },
  box: {
    // backgroundColor: "#FFF",
    //width: "-webkit-fill-available",
  },
  textoNombre: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  description: {
    //flexshrink: 0,
    //margin: "auto",
    marginRight: 10,
    marginLeft: 20,
    padding: 5,
    maxWidth: 280,
    color: "#4B4B4B",
  },
  textDescription: {
    //margin: "auto",
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
    textTransform: "uppercase",
  },
});

export default Menu;
