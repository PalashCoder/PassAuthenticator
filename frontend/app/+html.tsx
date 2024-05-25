import { NavigationContainer } from "@react-navigation/native";
import { ScrollViewStyleReset } from "expo-router/html";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabOneScreen from "@/app/Home/index";
import newtab from "@/app/newtab";


type UserDetails = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

export type RootStackParamList = {
  TabOneScreen: undefined;
  newtab: { userDetails: UserDetails };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* 
          Disable body scrolling on web. This makes ScrollView components work closer to how they do on native. 
          However, body scrolling is often nice to have for mobile web. If you want to enable it, remove this line.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="TabOneScreen">
          <Stack.Screen
            name="TabOneScreen"
            component={TabOneScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="newtab"
            component={newtab}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
        </NavigationContainer>
      </body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
