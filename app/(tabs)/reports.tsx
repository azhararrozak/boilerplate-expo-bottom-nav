import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/color';
import CustomHeader from '../../components/CustomHeader';

const ReportsScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <CustomHeader title="Langgananku" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-col p-4 mt-2 mb-10">
        <Text className="font-label text-sm uppercase tracking-wider text-on-surface-variant">
          Financial Insight
        </Text>
        <Text className="font-headline text-4xl font-extrabold tracking-tight text-primary">
          Monthly Reports
        </Text>
        
        {/* Spending Summary Card */}
        <View className="mt-8 bg-surface-container-lowest rounded-[2rem] p-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          {/* Decorative Corner */}
          <View className="absolute -top-8 -right-8 w-32 h-32 bg-secondary-container/20 rounded-bl-full" />
          
          <View className="relative z-10">
            <Text className="font-headline text-sm uppercase tracking-widest font-bold mb-5 text-on-surface-variant">
              Spending Summary
            </Text>
            
            <View className="flex-col gap-4">
              <View>
                <Text className="text-sm font-medium text-on-surface-variant">Total This Month</Text>
                <Text className="text-4xl font-extrabold font-headline text-primary mt-1">Rp 1.420.000</Text>
              </View>
              
              <View className="flex-row self-start items-center gap-2 bg-secondary-container/40 px-4 py-2 rounded-full">
                <MaterialIcons name="trending-down" size={20} color={colors.secondary.DEFAULT} />
                <Text className="text-sm font-bold text-secondary">12.5% vs last month</Text>
              </View>
            </View>
            
            {/* Spending Pulse */}
            <View className="mt-8">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-sm font-bold text-on-surface">Budget Utilization</Text>
                <Text className="text-sm font-medium text-on-surface-variant">Rp 1.420.000 / 2.000.000</Text>
              </View>
              <View className="w-full h-4 bg-secondary-container/30 rounded-full overflow-hidden">
                <View className="h-full bg-secondary w-[71%] rounded-full shadow-sm" />
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="mt-4 bg-primary rounded-[2rem] p-6 flex-col justify-between shadow-md">
          <View>
            <Text className="font-headline text-lg font-bold mb-6 text-on-primary">
              Top Categories
            </Text>
            
            <View className="flex-col gap-5">
              {/* Streaming */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/10 p-2 rounded-xl">
                    <MaterialIcons name="movie" size={20} color={colors.secondary.DEFAULT} />
                  </View>
                  <Text className="font-medium text-on-primary text-base">Streaming</Text>
                </View>
                <Text className="font-bold text-on-primary text-base">42%</Text>
              </View>

              {/* Music */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/10 p-2 rounded-xl">
                    <MaterialIcons name="music-note" size={20} color={colors.secondary.DEFAULT} />
                  </View>
                  <Text className="font-medium text-on-primary text-base">Music</Text>
                </View>
                <Text className="font-bold text-on-primary text-base">18%</Text>
              </View>

              {/* Gym */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/10 p-2 rounded-xl">
                    <MaterialIcons name="fitness-center" size={20} color={colors.secondary.DEFAULT} />
                  </View>
                  <Text className="font-medium text-on-primary text-base">Gym</Text>
                </View>
                <Text className="font-bold text-on-primary text-base">15%</Text>
              </View>

              {/* Cloud */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/10 p-2 rounded-xl">
                    <MaterialIcons name="cloud" size={20} color={colors.secondary.DEFAULT} />
                  </View>
                  <Text className="font-medium text-on-primary text-base">Cloud</Text>
                </View>
                <Text className="font-bold text-on-primary text-base">12%</Text>
              </View>

              {/* Productivity */}
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/10 p-2 rounded-xl">
                    <MaterialIcons name="rocket-launch" size={20} color={colors.secondary.DEFAULT} />
                  </View>
                  <Text className="font-medium text-on-primary text-base">Productivity</Text>
                </View>
                <Text className="font-bold text-on-primary text-base">13%</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          {/* Note: Pressable import is required. It should be imported globally. If not, we use View, but standard is Pressable */}
          <View className="mt-8 bg-secondary-fixed py-3 px-6 rounded-2xl w-full flex-row items-center justify-center gap-2">
            <Text className="text-on-secondary-fixed font-bold">View Details</Text>
            <MaterialIcons name="arrow-forward-ios" size={14} color="#000000" />
          </View>
        </View>

      </View>
    </ScrollView>
    </View>
  );
};

export default ReportsScreen;
