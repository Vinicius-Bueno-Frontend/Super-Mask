import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Inicial from "../screens/Inicial";
import Perfil from "../screens/Perfil";
import Login from "../screens/Login";
import Cadastrar from "../screens/Cadastrar";
import Carrinho from "../screens/Carrinho";
import Pagamento from "../screens/Pagamento";
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inicial"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Inicial"
        component={InicialNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="home" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="user-alt" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="shopping-cart" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Login"
        component={LoginNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Cadastrar"
        component={CadastrarNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon2 name="user-plus" size={25} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pagamento"
        component={PagamentoNavegador}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon2(props: { name: string; color: string }) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

//function LogoTitle() {
//return (
//<Image
// style={{ width: 50, height: 50 }}
// source={require("../assets/images/logomaskicon.png")}
// />
/// );
//}

const InicialStack = createStackNavigator<TabOneParamList>();

function InicialNavegador() {
  return (
    <InicialStack.Navigator>
      <InicialStack.Screen
        name="Inicial"
        component={Inicial}
        options={{
          headerBackImage: () => (
            <Image source={require("../assets/images/logomaskicon2.png")} />
          ),
        }}
      />
    </InicialStack.Navigator>
  );
}

const PerfilStack = createStackNavigator<TabOneParamList>();

function PerfilNavegador() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerTitle: "Perfil do Usuário" }}
      />
    </PerfilStack.Navigator>
  );
}

const CarrinhoStack = createStackNavigator<TabTwoParamList>();

function CarrinhoNavegador() {
  return (
    <CarrinhoStack.Navigator>
      <CarrinhoStack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerTitle: "Meu Carrinho" }}
      />
    </CarrinhoStack.Navigator>
  );
}

const LoginStack = createStackNavigator<TabTwoParamList>();

function LoginNavegador() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackImage: () => (
            <Image source={require("../assets/images/logomaskicon2.png")} />
          ),
        }}
      />
    </LoginStack.Navigator>
  );
}

const CadastrarStack = createStackNavigator<TabTwoParamList>();

function CadastrarNavegador() {
  return (
    <CadastrarStack.Navigator>
      <CadastrarStack.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{ headerTitle: "Cadastro" }}
      />
    </CadastrarStack.Navigator>
  );
}

const PagamentoStack = createStackNavigator<TabTwoParamList>();

function PagamentoNavegador() {
  return (
    <PagamentoStack.Navigator>
      <PagamentoStack.Screen
        name="Pagamento"
        component={Pagamento}
        options={{ headerTitle: "Pagamento" }}
      />
    </PagamentoStack.Navigator>
  );
}
