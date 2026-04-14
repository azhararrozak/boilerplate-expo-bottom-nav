import { View, Text, ScrollView, ActivityIndicator, Pressable, Alert, TextInput, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../utils/color';
import { useSubscriptionStore } from '../../../store/useSubscriptionStore';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const categories = ['Hiburan', 'Musik', 'Kesehatan & Olahraga', 'Cloud & Storage', 'Produktivitas'];
const billingCycles = ['monthly', 'yearly'];

export default function SubscriptionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedSubscription, isLoading, fetchSubscriptionById, removeSubscription, editSubscription, clearSelected } = useSubscriptionStore();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Hiburan');
  const [cost, setCost] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [nextBillingDate, setNextBillingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatPrice = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  useEffect(() => {
    if (id) {
      fetchSubscriptionById(id);
    }
    return () => {
      // Clear data when unmounting so previous data isn't shown momentarily on next visit
      clearSelected();
    };
  }, [id]);

  useEffect(() => {
    if (selectedSubscription) {
      setName(selectedSubscription.name);
      setCategory(selectedSubscription.category || 'Hiburan');
      setCost(formatPrice(selectedSubscription.cost.toString()));
      setBillingCycle(selectedSubscription.billingCycle || 'monthly');
      setNextBillingDate(new Date(selectedSubscription.nextBillingDate));
    }
  }, [selectedSubscription]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert('Validasi', 'Nama layanan tidak boleh kosong');
      return;
    }

    const numericPrice = parseInt(cost.replace(/\./g, '')) || 0;
    if (numericPrice <= 0) {
      Alert.alert('Validasi', 'Harga harus lebih besar dari 0');
      return;
    }

    setIsSaving(true);
    try {
      await editSubscription(id, {
        name,
        category,
        cost: numericPrice,
        billingCycle: billingCycle as 'monthly' | 'yearly',
        nextBillingDate: nextBillingDate.toISOString(),
      });
      setIsEditing(false);
      Alert.alert('Sukses', 'Langganan berhasil diperbarui!');
    } catch (error) {
      Alert.alert('Gagal', error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Hapus Langganan',
      'Apakah Anda yakin ingin menghapus langganan ini? Data tidak dapat dikembalikan.',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await removeSubscription(id);
              router.back();
            } catch (error) {
              Alert.alert('Gagal', 'Tidak dapat menghapus langganan. Silahkan coba lagi.');
            } finally {
              setIsDeleting(false);
            }
          }
        }
      ]
    );
  };

  if (isLoading && !selectedSubscription) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
        <Text className="mt-4 text-on-surface-variant font-medium">Memuat rincian...</Text>
      </View>
    );
  }

  if (!selectedSubscription) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <MaterialIcons name="error-outline" size={48} color={colors.outline.DEFAULT} />
        <Text className="text-on-surface-variant text-base mt-4 font-medium">Langganan tidak ditemukan</Text>
      </View>
    );
  }

  if (isEditing) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-col gap-6 p-4 mt-2 mb-10">
          {/* Header Edit Mode */}
          <View className="items-center gap-3">
            <View className="h-20 w-20 items-center justify-center rounded-3xl bg-secondary-container shadow-sm">
              <MaterialIcons name="edit" size={40} color={colors.secondary.DEFAULT} />
            </View>
            <Text className="font-headline text-3xl font-extrabold text-on-surface text-center">
              Edit Langganan
            </Text>
          </View>

          <View className="gap-5 rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/10">
            <Text className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Formulir Edit
            </Text>

            {/* Nama */}
            <View>
              <Text className="mb-2 text-sm font-medium text-on-surface-variant">Nama Layanan</Text>
              <TextInput
                className="h-14 w-full rounded-xl bg-surface-container-highest px-4 text-base font-semibold"
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.outline.DEFAULT}
              />
            </View>

            {/* Kategori */}
            <View>
              <Text className="mb-2 text-sm font-medium text-on-surface-variant">Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                <View className="flex-row gap-2">
                  {categories.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={`rounded-full px-5 py-2.5 ${
                        category === cat ? 'bg-primary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <Text className={`text-sm font-medium ${category === cat ? 'text-white' : 'text-on-surface-variant'}`}>{cat}</Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Harga */}
            <View>
              <Text className="mb-2 text-sm font-medium text-on-surface-variant">Biaya Tagihan</Text>
              <View className="relative justify-center">
                <Text className="absolute left-4 z-10 font-bold text-on-surface-variant">Rp</Text>
                <TextInput
                  className="h-14 w-full rounded-xl bg-surface-container-highest pl-12 pr-4 text-base font-semibold"
                  keyboardType="numeric"
                  value={cost}
                  onChangeText={(text) => setCost(formatPrice(text))}
                />
              </View>
            </View>

            {/* Siklus */}
            <View>
              <Text className="mb-2 text-sm font-medium text-on-surface-variant">Siklus</Text>
              <View className="flex-row gap-2">
                {billingCycles.map((cycle) => (
                  <Pressable
                    key={cycle}
                    onPress={() => setBillingCycle(cycle)}
                    className={`flex-1 rounded-xl items-center py-3.5 ${
                      billingCycle === cycle ? 'bg-primary' : 'bg-surface-container-highest'
                    }`}
                  >
                    <Text className={`text-sm font-medium uppercase tracking-wider ${billingCycle === cycle ? 'text-white' : 'text-on-surface-variant'}`}>
                      {cycle === 'monthly' ? 'Bulanan' : 'Tahunan'}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Tanggal */}
            <View>
              <Text className="mb-2 text-sm font-medium text-on-surface-variant">Perpanjangan Berikutnya</Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="h-14 flex-row items-center justify-between rounded-xl bg-surface-container-highest px-4"
              >
                <Text className="text-base font-semibold">
                  {nextBillingDate.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <MaterialIcons name="calendar-today" size={20} color={colors.outline.DEFAULT} />
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={nextBillingDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (selectedDate) setNextBillingDate(selectedDate);
                  }}
                />
              )}
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3 mt-4">
            <Pressable 
              onPress={handleUpdate}
              disabled={isSaving}
              className={`items-center rounded-2xl bg-primary p-4 active:opacity-80 ${isSaving ? 'opacity-70' : ''}`}
            >
              {isSaving ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text className="text-sm font-bold uppercase tracking-widest text-white">Simpan Perubahan</Text>
              )}
            </Pressable>
            
            <Pressable 
              onPress={() => {
                 setIsEditing(false);
                 if (selectedSubscription) {
                    setName(selectedSubscription.name);
                    setCategory(selectedSubscription.category || 'Hiburan');
                    setCost(formatPrice(selectedSubscription.cost.toString()));
                    setBillingCycle(selectedSubscription.billingCycle || 'monthly');
                    setNextBillingDate(new Date(selectedSubscription.nextBillingDate));
                 }
              }}
              disabled={isSaving}
              className="items-center rounded-2xl border border-outline-variant/30 p-4 active:bg-surface-container-highest"
            >
              <Text className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Batal</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="flex-col gap-6 p-4 mt-2 mb-10">
        {/* Header */}
        <View className="items-center gap-3">
          <View className="h-20 w-20 items-center justify-center rounded-3xl bg-primary-fixed shadow-sm">
            <MaterialIcons name="card-membership" size={40} color={colors.primary.DEFAULT} />
          </View>
          <Text className="font-headline text-3xl font-extrabold text-on-surface text-center">
            {selectedSubscription.name}
          </Text>
          <View className={`rounded-full px-5 py-1.5 ${selectedSubscription.status === 'active' ? 'bg-secondary-fixed-dim' : 'bg-surface-container-highest'}`}>
            <Text className={`text-sm font-bold uppercase tracking-widest ${selectedSubscription.status === 'active' ? 'text-secondary' : 'text-on-surface-variant'}`}>
              {selectedSubscription.status}
            </Text>
          </View>
        </View>

        {/* Detail Card */}
        <View className="gap-5 rounded-3xl bg-surface-container-lowest p-6 shadow-sm border border-outline-variant/10">
          <Text className="font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">
            Detail Informasi
          </Text>

          <View className="gap-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-on-surface-variant">Kategori</Text>
              <Text className="text-sm font-bold">{selectedSubscription.category || '-'}</Text>
            </View>
            <View className="border-t border-dashed border-outline-variant/30" />

            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-on-surface-variant">Biaya Tagihan</Text>
              <Text className="text-lg font-bold text-primary">Rp {selectedSubscription.cost.toLocaleString('id-ID')}</Text>
            </View>
            <View className="border-t border-dashed border-outline-variant/30" />

            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-on-surface-variant">Siklus</Text>
              <Text className="text-sm font-bold uppercase tracking-wider">{selectedSubscription.billingCycle === 'monthly' ? 'Bulanan' : 'Tahunan'}</Text>
            </View>
            <View className="border-t border-dashed border-outline-variant/30" />

            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-on-surface-variant">Perpanjangan Berikutnya</Text>
              <Text className="text-sm font-bold">
                {new Date(selectedSubscription.nextBillingDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="gap-3 mt-4">
          <Pressable 
            onPress={() => setIsEditing(true)}
            className="items-center rounded-2xl bg-primary-fixed p-4 active:opacity-80">
            <Text className="text-sm font-bold uppercase tracking-widest text-primary">Edit Langganan</Text>
          </Pressable>
          
          <Pressable 
            onPress={handleDelete}
            disabled={isDeleting}
            className={`items-center rounded-2xl border border-error p-4 active:bg-error-container ${isDeleting ? 'opacity-50' : ''}`}
          >
            {isDeleting ? (
              <ActivityIndicator color={colors.error.DEFAULT} size="small" />
            ) : (
              <Text className="text-sm font-bold uppercase tracking-widest text-error">Hapus Langganan</Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
