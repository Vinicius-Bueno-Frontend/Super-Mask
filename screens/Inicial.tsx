import * as React from "react";
import { Text, View } from "../components/Themed";
import { Image, StyleSheet, ActivityIndicator, Button } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import DetalheProduto from "./DetalheProduto";

const Stack = createStackNavigator();

export default function Inicial() {
  return (
    <Stack.Navigator initialRouteName="Produtos">
      <Stack.Screen name="Produtos" component={Produtos} />
      <Stack.Screen name="DetalheProduto" component={DetalheProduto} />
    </Stack.Navigator>
  );
}

function Produtos({ navigation }) {
  const [carregado, setCarregado] = React.useState(true);
  const [dados, setDados] = React.useState([]);

  //Carregar a api com os dados do banco de dados.
  //Executar a consulta listartelainicial

  React.useEffect(() => {
    fetch("http://192.168.15.2/maskedapi/service/produto/listartelainicial.php")
      .then((response) => response.json())
      .then((produtos) => setDados(produtos.saida))
      .catch((error) => console.error(error))
      .finally(() => setCarregado(false));
  }, []);

  return (
    <View>
      <ScrollView>
        <Image
          source={require("../assets/images/logomaskicon2.png")}
          style={tela.imagem}
        />

        {carregado ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={dados}
            renderItem={({ item }) => (
              <View>
                <Image
                  source={{
                    uri: `http://192.168.15.2/maskedapi/img/${item.foto}`,
                  }}
                  style={tela.img}
                />
                <Text style={tela.nome}>{item.nomeproduto}</Text>

                <Text style={tela.preco}>R${item.preco}</Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DetalheProduto", {
                      idproduto: `${item.idproduto}`,
                    });
                  }}
                >
                  <Text style={tela.link}> Mais Informações </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={({ idproduto }, index) => idproduto}
          />
        )}
      </ScrollView>
    </View>
  );
}

const tela = StyleSheet.create({
  imagem: {
    width: 150,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
  },
  img: {
    width: 100,
    height: 100,
    padding: 100,
    margin: 10,
    flex: 1,
    resizeMode: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  link: {
    padding: 10,
    textAlign: "center",
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderColor: "#0d47a1",
    borderRadius: 15,
    borderWidth: 3,
  },
  nome: {
    textAlign: "center",
    padding: 10,
  },
  preco: {
    textAlign: "center",
  },
});
