import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../utils/color';
import CustomHeader from '../../../components/CustomHeader';

const ReportsScreen = () => {
  return (
    <View className="flex-1 bg-background">
      <CustomHeader title="Langgananku" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="mb-10 mt-2 flex-col p-4">
          <Text className="font-label text-sm uppercase tracking-wider text-on-surface-variant">
            Financial Insight
          </Text>
          <Text className="font-headline text-4xl font-extrabold tracking-tight text-primary">
            Monthly Reports
          </Text>

          {/* Spending Summary Card */}
          <View className="relative mt-8 overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
            {/* Decorative Corner */}
            <View className="absolute -right-8 -top-8 h-32 w-32 rounded-bl-full bg-secondary-container/20" />

            <View className="relative z-10">
              <Text className="mb-5 font-headline text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Spending Summary
              </Text>

              <View className="flex-col gap-4">
                <View>
                  <Text className="text-sm font-medium text-on-surface-variant">
                    Total This Month
                  </Text>
                  <Text className="mt-1 font-headline text-4xl font-extrabold text-primary">
                    Rp 1.420.000
                  </Text>
                </View>

                <View className="flex-row items-center gap-2 self-start rounded-full bg-secondary-container/40 px-4 py-2">
                  <MaterialIcons name="trending-down" size={20} color={colors.secondary.DEFAULT} />
                  <Text className="text-sm font-bold text-secondary">12.5% vs last month</Text>
                </View>
              </View>

              {/* Spending Pulse */}
              <View className="mt-8">
                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-on-surface text-sm font-bold">Budget Utilization</Text>
                  <Text className="text-sm font-medium text-on-surface-variant">
                    Rp 1.420.000 / 2.000.000
                  </Text>
                </View>
                <View className="h-4 w-full overflow-hidden rounded-full bg-secondary-container/30">
                  <View className="h-full w-[71%] rounded-full bg-secondary shadow-sm" />
                </View>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View className="mt-4 flex-col justify-between rounded-[2rem] bg-primary p-6 shadow-md">
            <View>
              <Text className="mb-6 font-headline text-lg font-bold text-on-primary">
                Top Categories
              </Text>

              <View className="flex-col gap-5">
                {/* Streaming */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-xl bg-white/10 p-2">
                      <MaterialIcons name="movie" size={20} color={colors.secondary.DEFAULT} />
                    </View>
                    <Text className="text-base font-medium text-on-primary">Streaming</Text>
                  </View>
                  <Text className="text-base font-bold text-on-primary">42%</Text>
                </View>

                {/* Music */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-xl bg-white/10 p-2">
                      <MaterialIcons name="music-note" size={20} color={colors.secondary.DEFAULT} />
                    </View>
                    <Text className="text-base font-medium text-on-primary">Music</Text>
                  </View>
                  <Text className="text-base font-bold text-on-primary">18%</Text>
                </View>

                {/* Gym */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-xl bg-white/10 p-2">
                      <MaterialIcons
                        name="fitness-center"
                        size={20}
                        color={colors.secondary.DEFAULT}
                      />
                    </View>
                    <Text className="text-base font-medium text-on-primary">Gym</Text>
                  </View>
                  <Text className="text-base font-bold text-on-primary">15%</Text>
                </View>

                {/* Cloud */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-xl bg-white/10 p-2">
                      <MaterialIcons name="cloud" size={20} color={colors.secondary.DEFAULT} />
                    </View>
                    <Text className="text-base font-medium text-on-primary">Cloud</Text>
                  </View>
                  <Text className="text-base font-bold text-on-primary">12%</Text>
                </View>

                {/* Productivity */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="rounded-xl bg-white/10 p-2">
                      <MaterialIcons
                        name="rocket-launch"
                        size={20}
                        color={colors.secondary.DEFAULT}
                      />
                    </View>
                    <Text className="text-base font-medium text-on-primary">Productivity</Text>
                  </View>
                  <Text className="text-base font-bold text-on-primary">13%</Text>
                </View>
              </View>
            </View>

            {/* Action Button */}
            {/* Note: Pressable import is required. It should be imported globally. If not, we use View, but standard is Pressable */}
            <View className="mt-8 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-secondary-fixed px-6 py-3">
              <Text className="font-bold text-on-secondary-fixed">View Details</Text>
              <MaterialIcons name="arrow-forward-ios" size={14} color="#000000" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportsScreen;
