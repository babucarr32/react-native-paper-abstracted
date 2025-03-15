// app/(drawer)/_layout.tsx

import * as React from "react";

import { Text, View } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";

import DrawerItem from "@/components/Drawer/DrawerItem"; 

import {
  CommonActions,
  DrawerActions,
  type DrawerNavigationState,
  type ParamListBase,
  useLinkBuilder,
} from "@react-navigation/native";
import type { DrawerDescriptorMap, DrawerNavigationHelpers } from "@react-navigation/drawer/src/types";
import DrawerSection from "@/components/Drawer/DrawerSection";

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const CustomDrawerItemList = ({ state, navigation, descriptors }: Props) => {
  const { buildHref } = useLinkBuilder();

  return state.routes.map((route, i) => {
    const focused = i === state.index;

    const onPress = () => {
      const event = navigation.emit({
        type: "drawerItemPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate(route)),
          target: state.key,
        });
      }
    };

    const {
      title,
      drawerIcon,
      drawerItemStyle,
    } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={title !== undefined
          ? title
          : route.name}
        icon={drawerIcon as any as string}
        style={drawerItemStyle}
        active={focused}
        onPress={onPress}
      />
    );
  }) as React.ReactNode as React.ReactElement;
};

const HomeScreenLayout = ({navigation}: any) => (
  <Text></Text>
);

const FavoritesScreen = () => (
  <Text>Favorite Screen</Text>
);

const SettingsScreen = () => (
  <Text>Settings Screen</Text>
);

const ContactUsScreen = () => (
  <Text>Contact Us Screen</Text>
);

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingEnd: 0,
        paddingStart: 0,
        overflow: "scroll",
        justifyContent: "space-between",
      }}
    >
      <CustomDrawerItemList {...props} />

      <DrawerSection title="Section">
        <View>
          <DrawerItem label="Tell a Friend" icon="bullhorn" />
          <DrawerItem
            onPress={() => {
              props.navigation.navigate("(drawer)", { screen: "Contact us" });
            }}
            label="Contact us"
            icon="face-agent"
          />
        </View>
      </DrawerSection>

    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerScreen() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "slide",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreenLayout}
          options={{
            drawerIcon: "home" as any,
          }}
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            headerShown: true,
            drawerIcon: "heart" as any,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            drawerIcon: "cog" as any,
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
