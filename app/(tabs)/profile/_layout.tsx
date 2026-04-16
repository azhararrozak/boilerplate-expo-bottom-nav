import { Stack } from 'expo-router';
import { Image, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../../../utils/color';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface.DEFAULT },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerShown: true,
          headerTitle: 'Tentang Kami',
          headerStyle: { backgroundColor: colors.surface.DEFAULT },
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="privacypolicy"
        options={{
          headerShown: true,
          headerTitle: 'Kebijakan Privasi',
          headerStyle: { backgroundColor: colors.surface.DEFAULT },
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        }}
      />
    </Stack>
  );
}
