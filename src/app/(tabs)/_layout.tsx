import { useAuth } from "@/src/context/auth";
import { Redirect, Tabs } from "expo-router";
import { BookOpen, House, Search, User } from "lucide-react-native";

export default function TabsLayout() {
  const { user } = useAuth();

  // Route guard sementara: tanpa login tidak boleh masuk tab.
  // Saat backend siap, cek token dari secure storage di sini.
  if (!user) return <Redirect href="/welcome" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1F3F6E",
        tabBarInactiveTintColor: "#7A8494",
        tabBarLabelStyle: { fontFamily: "Poppins_500Medium", fontSize: 11 },
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          height: 68,
          paddingTop: 8,
          borderRadius: 24,
          borderTopWidth: 0,
          backgroundColor: "#fff",
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color }) => <House color={color} size={22} /> }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", tabBarIcon: ({ color }) => <Search color={color} size={22} /> }} />
      <Tabs.Screen name="saved" options={{ title: "Saved", tabBarIcon: ({ color }) => <BookOpen color={color} size={22} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <User color={color} size={22} /> }} />
    </Tabs>
  );
}
