import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../store/useAuthStore';
import { colors } from '../../../utils/color';
import CustomHeader from '../../../components/CustomHeader';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Konfirmasi Logout', 'Apakah Anda yakin ingin keluar dari akun?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <CustomHeader title="Langgananku" />
      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-2"></View>
        <Text className="font-manrope text-sm font-bold uppercase tracking-widest text-primary">
          Active Account
        </Text>
        <Text className="font-manrope text-on-surface text-4xl font-extrabold capitalize tracking-tight">
          {user?.username || 'Username'}
        </Text>
        <Text className="font-body text-on-surface-variant">
          {user?.email || 'email@example.com'}
        </Text>
        <View className="mt-8 flex-col gap-8 pb-10">
          {/* Account Settings */}
          <View>
            <Text className="font-manrope mb-4 pl-1 text-lg font-bold text-indigo-900">
              Account Settings
            </Text>
            <View className="overflow-hidden rounded-xl bg-surface-container-low">
              <TouchableOpacity className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="person" size={24} color={colors.primary.DEFAULT} />
                  <Text className="text-on-surface font-medium">Edit Profile</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
              </TouchableOpacity>
              <View className="mx-5 h-[1px] bg-outline-variant/20" />
              <TouchableOpacity className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="lock" size={24} color={colors.primary.DEFAULT} />
                  <Text className="text-on-surface font-medium">Change Password</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Subscription Preferences */}
          <View>
            <Text className="font-manrope mb-4 pl-1 text-lg font-bold text-indigo-900">
              Subscription Preferences
            </Text>
            <View className="overflow-hidden rounded-xl bg-surface-container-low">
              <TouchableOpacity className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="payments" size={24} color={colors.primary.DEFAULT} />
                  <Text className="text-on-surface font-medium">Default Currency</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-on-surface-variant">USD ($)</Text>
                  <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
                </View>
              </TouchableOpacity>
              <View className="mx-5 h-[1px] bg-outline-variant/20" />
              <TouchableOpacity className="w-full flex-row items-center justify-between p-5">
                <View className="flex-row items-center gap-4">
                  <MaterialIcons
                    name="notifications-active"
                    size={24}
                    color={colors.primary.DEFAULT}
                  />
                  <Text className="text-on-surface font-medium">Notification Settings</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info & Support */}
          <View>
            <Text className="font-manrope mb-4 pl-1 text-lg font-bold text-indigo-900">
              App Info
            </Text>
            <View className="overflow-hidden rounded-xl bg-surface-container-low">
              <TouchableOpacity 
                className="w-full flex-row items-center justify-between p-5"
                onPress={() => router.push('/(tabs)/profile/about')}
              >
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="info" size={24} color={colors.primary.DEFAULT} />
                  <Text className="text-on-surface font-medium">About Langgananku</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
              </TouchableOpacity>
              <View className="mx-5 h-[1px] bg-outline-variant/20" />
              <TouchableOpacity 
                className="w-full flex-row items-center justify-between p-5"
                onPress={() => router.push('/(tabs)/profile/privacypolicy')}
              >
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="verified-user" size={24} color={colors.primary.DEFAULT} />
                  <Text className="text-on-surface font-medium">Privacy Policy</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.outline.DEFAULT} />
              </TouchableOpacity>
              <View className="mx-5 h-[1px] bg-outline-variant/20" />
              <TouchableOpacity
                className="w-full flex-row items-center justify-between bg-error-container/10 p-5"
                onPress={handleLogout}>
                <View className="flex-row items-center gap-4">
                  <MaterialIcons name="logout" size={24} color={colors.error.DEFAULT} />
                  <Text className="font-semibold text-error">Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Version */}
          <View className="flex-col items-center">
            <Text className="font-label text-sm capitalize tracking-widest text-outline">
              Version 1.0.0 (Build 1)
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
