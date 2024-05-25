import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../app/+html";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeProps = NativeStackScreenProps<RootStackParamList, "TabOneScreen">;

GoogleSignin.configure({
  webClientId:
    "314338457766-utj6cg05vgpn9kb8g7pb7tqt27r1mov6.apps.googleusercontent.com", // Google Cloud Console API Web Client ID
});

const GglSignin = ({ route, navigation }: HomeProps) => {
  const nav=useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo.user, null, 2));
      console.log(route);
      console.log(navigation);
      console.log(nav);
      nav.navigate("newtab", { userDetails: userInfo.user })
    } catch (error) {
      console.log("Error signing in with Google: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{ width: 192, height: 48, cursor: "pointer" }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GglSignin;
