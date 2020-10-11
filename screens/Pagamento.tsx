import * as React from "react";
import { Text, View } from "../components/Themed";
import { Picker, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("maskeddb.banco");

let idc = 0;
let tp = "";
let ds = "";
let vl = "";
let qp = 0;
let vp = "";
let total = "";

export default function Pagamento({ navigation }) {
  const [tipo, setTipo] = React.useState("");
  const [parcelas, setParcelas] = React.useState(1);
  const [idcliente, setIdCliente] = React.useState(0);
  const [produtos, setProdutos] = React.useState([]);

  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [vParcela, setVParcelas] = React.useState("");

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select idcliente from perfil",
        [],
        (_, { rows: { _array } }) => {
          setIdCliente(_array[0].idcliente.toString());
          console.log(_array);
        }
      );

      tx.executeSql("select * from itens", [], (_, { rows: { _array } }) => {
        setProdutos(_array);
        console.log(_array);
      });

      tx.executeSql(
        "select sum(preco) as total from itens",
        [],
        (_, { rows: { _array } }) => {
          setValor(_array[0].total.toString());
          console.log(_array[0].total.toString());
        }
      );
    });
  }, []);

  return (
    <View style={estilo.area}>
      <Text style={estilo.txtTitle}>Pagamento do Produto</Text>
      <Picker selectedValue={tipo} mode="dialog" onValueChange={setTipo} style={estilo.txtInput}>
        <Picker.Item label="Tipo" value="" />
        <Picker.Item label="Boleto" value="Boleto" />
        <Picker.Item label="Crédito" value="Crédito" />
        <Picker.Item label="Débito" value="Débito" />
      </Picker>

      <View style={estilo.dados}>
      <TextInput
        style={estilo.txtInput}
        placeholder="Descrição do Pagamento"
        placeholderTextColor="#bdbdbd"
        value={descricao}
        onChangeText={(value) => setDescricao(value)}
      />
      </View>
      <View style={estilo.dados}>
      <TextInput
        style={estilo.txtInput}
        keyboardType="decimal-pad"
        placeholder="Valor: R$ 00,00"
        placeholderTextColor="#bdbdbd"
        value={valor}
        onChangeText={(value) => setValor(value)}
      />
      </View>
      <View style={estilo.dados}>
      <Picker
        style={estilo.txtInputQP}
        selectedValue={parcelas}
        mode="dialog"
        onValueChange={(parcelas) => {
          setParcelas(parcelas);
          setVParcelas((parseFloat(valor) / parcelas).toString());
        }}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      </View>
      <View style={estilo.dados}>
      <TextInput
        style={estilo.txtInput}
        keyboardType="decimal-pad"
        placeholder="R$ 00,00"
        placeholderTextColor="#bdbdbd"
        value={vParcela}
        onChangeText={(value) => setVParcelas(value)}
      />
      </View>

      <TouchableOpacity
      style={estilo.btnFinalizar}
        onPress={() => {
          // passagens de dados do formulário para as variáveis e depois cadastro do pgamento
          idc = idcliente;
          tp = tipo;
          ds = descricao;
          vl = valor;
          qp = parcelas;
          vp = vParcela;
          efetuarPagamento();

          navigation.navigate("ConfirmacaoPagamento");
        }}
      >
        <Text style={estilo.txtFinalizar}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  area:{
    backgroundColor: "black",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  txtTitle:{
    textAlign:"center",
    borderBottomColor: "transparent",
    padding: 50,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "grey",
  },
  txtInput:{
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "#e0e0e0",
  },
  txtInputQP:{
    width: "50%",
    color:"#e0e0e0",
  },
  dados:{
    borderColor: "transparent",
    borderWidth: 1,
    marginVertical: 5,
    width: "90%",
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    backgroundColor: "transparent",
    marginBottom: 10,
    paddingTop: 20,
  },
  btnFinalizar:{
    width: "60%",
    backgroundColor: "transparent",
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    borderColor: "lightgreen",
    borderWidth: 3,
  },
  txtFinalizar:{
    color: "lightgreen",
    textAlign: "center",
    fontWeight: "bold",
  },



});

function efetuarPagamento() {
  fetch("http://192.168.15.2/maskedapi/service/pagamento/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idcliente: idc,
      tipo: tp,
      descricao: ds,
      valor: vl,
      parcelas: qp,
      valorparcela: vp,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      alert("Seu pagamento foi efetuado. Volte Sempre!!!");
    })
    .catch((error) => console.error(error));

  limparCarrinho();
}

function limparCarrinho() {
  db.transaction((tx) => {
    tx.executeSql("delete from itens");
  });
}
