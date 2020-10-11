import * as React from "react";
import { Text, View, Icon } from "../components/Themed";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import {
  SectionList,
  Picker,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

let nome = "";
let cpf = "";
let sx = "";
let us = "";
let sh = "";
let cf = "";
let ft = "user.png";
let em = "";
let tel = "";
let tp = "";
let lg = "";
let nu = "";
let cp = "";
let ba = "";
let cep = "";

export default function Cadastrar() {
  const [sexo, setSexo] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [nomecli, setNomecli] = React.useState("");
  const [cpfcli, setCPFcli] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmar, setConfirmar] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [logradouro, setLogradouro] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [complemento, setComplemento] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  const [cepcli, setCEPcli] = React.useState("");

  return (
    <View style={estilo.area}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/fundoalternativo.jpg")}
          style={estilo.fundo}
        >
          <Image
            source={require("../assets/images/logomaskicon2.png")}
            style={estilo.icon}
          />

          <Text style={estilo.titulo}>Dados Essenciais</Text>
          <View style={estilo.dados}>
            <TextInput
              placeholder="Nome Completo"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setNomecli(value)}
              value={nomecli}
            />
            <TextInput
              placeholder="CPF"
              placeholderTextColor="#bdbdbd"
              keyboardType="number-pad"
              style={estilo.input}
              onChangeText={(value) => setCPFcli(value)}
              value={cpfcli}
            />
            <Picker
              selectedValue={sexo}
              mode="dialog"
              onValueChange={setSexo}
              style={estilo.input}
            >
              <Picker.Item label="Sexo" value="" />
              <Picker.Item label="M" value="M" />
              <Picker.Item label="F" value="F" />
            </Picker>
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Acesso</Text>
            <TextInput
              placeholder="Usuário"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setUsuario(value)}
              value={usuario}
            />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setSenha(value)}
              value={senha}
            />
            <TextInput
              secureTextEntry
              placeholder="Confirme"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setConfirmar(value)}
              value={confirmar}
            />
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Contato</Text>
            <TextInput
              placeholder="E-Mail"
              placeholderTextColor="#bdbdbd"
              keyboardType="email-address"
              style={estilo.input}
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
            <TextInput
              placeholder="Telefone"
              placeholderTextColor="#bdbdbd"
              keyboardType="phone-pad"
              style={estilo.input}
              onChangeText={(value) => setTelefone(value)}
              value={telefone}
            />
          </View>

          <View style={estilo.dados}>
            <Text style={estilo.titulo}>Localização</Text>
            <Picker
              mode="dialog"
              selectedValue={tipo}
              onValueChange={setTipo}
              style={estilo.input}
            >
              <Picker.Item label="Tipo" value="Tipo" />
              <Picker.Item label="Av" value="Av" />
              <Picker.Item label="Rua" value="Rua" />
              <Picker.Item label="Al" value="Al" />
              <Picker.Item label="Praça" value="Praça" />
            </Picker>
            <TextInput
              placeholder="Logradouro"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setLogradouro(value)}
              value={logradouro}
            />
            <TextInput
              placeholder="Número"
              placeholderTextColor="#bdbdbd"
              keyboardType="number-pad"
              style={estilo.input}
              onChangeText={(value) => setNumero(value)}
              value={numero}
            />
            <TextInput
              placeholder="Complemento"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setComplemento(value)}
              value={complemento}
            />
            <TextInput
              placeholder="Bairro"
              placeholderTextColor="#bdbdbd"
              style={estilo.input}
              onChangeText={(value) => setBairro(value)}
              value={bairro}
            />
            <TextInput
              placeholder="CEP"
              placeholderTextColor="#bdbdbd"
              keyboardType="numeric"
              style={estilo.input}
              onChangeText={(value) => setCEPcli(value)}
              value={cepcli}
            />
          </View>
          <TouchableOpacity
            style={estilo.cadastrar}
            onPress={() => {
              us = usuario;
              sh = senha;
              nome = nomecli;
              cpf = cpfcli;
              sx = sexo;
              ft = "user.png";
              em = email;
              tel = telefone;
              tp = tipo;
              lg = logradouro;
              nu = numero;
              cp = complemento;
              ba = bairro;
              cep = cepcli;

              efetuarCadastro();
            }}
          >
            <Text style={estilo.txtCadastrar}> Cadastrar </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const estilo = StyleSheet.create({
  area: {
    backgroundColor: "black",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },

  fundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  titulo: {
    textAlign: "center",
    borderBottomColor: "transparent",
    paddingTop: 20,
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },

  input: {
    width: "100%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
    color: "#e0e0e0",
  },
  cadastrar: {
    width: "60%",
    backgroundColor: "transparent",
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,
  },
  txtCadastrar: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  dados: {
    borderColor: "transparent",
    borderWidth: 1,
    marginVertical: 5,
    width: "70%",
    padding: 5,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    backgroundColor: "transparent",
    marginBottom: 10,
    paddingTop: 20,
  },
  icon: {
    width: 150,
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    paddingTop: 30,
  },
});

function efetuarCadastro() {
  fetch("http://192.168.15.2/maskedapi/service/cadastro/cadastro.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome,
      cpf: cpf,
      sexo: sx,
      telefone: tel,
      email: em,
      tipo: tp,
      logradouro: lg,
      numero: nu,
      complemento: cp,
      bairro: ba,
      cep: cep,
      nomeusuario: us,
      senha: sh,
      foto: ft,
    }),
  })
    .then((response) => response.json())
    .then((resposta) => {
      console.log(resposta);
      Alert.alert("Bem-Vindo a Super Mask");
    })
    .catch((error) => console.error(error));
}
