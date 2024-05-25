import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../app/+html";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type newtabProps = NativeStackScreenProps<RootStackParamList, "newtab">;

const newtab = ({ route, navigation }: newtabProps) => {
  const { userDetails } = route.params;
  console.log(userDetails);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome, {userDetails.name}!</Text>
      {/* You can display other user details here */}
    </View>
  );
};

export default newtab;
