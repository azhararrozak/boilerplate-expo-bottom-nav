import { View, Text, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../utils/color';
import { useRouter } from 'expo-router';

interface CustomHeaderProps {
  title?: string;
}

export default function CustomHeader({ title = 'Langgananku' }: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  return (
    <View 
      style={{ 
        paddingTop: insets.top + 8, 
        paddingBottom: 12, 
        backgroundColor: colors.surface.DEFAULT 
      }} 
      className="flex-row items-center justify-between px-4 border-b border-gray-100 relative"
    >
      <View className="flex-row items-center">
        <Image 
          source={require('../assets/icon.png')} 
          style={{ width: 35, height: 35, borderRadius: 6 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: '700', fontSize: 18, color: colors.primary.container, marginLeft: 4 }}>{title}</Text>
      </View>

      <Pressable
        onPress={() => router.push('/(tabs)/profile/notification')}
      >
        <MaterialIcons name="notifications-none" size={24} color={colors.outline.DEFAULT} />
      </Pressable>
    </View>
  );
}
