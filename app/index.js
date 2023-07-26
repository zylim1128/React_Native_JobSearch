import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';

const Home = ()  => {
    const router = useRouter();
    // add search term
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
              options={{
                headerStyle: { backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerLeft: () => (
                  <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                ),
                headerRight: () => (
                  <ScreenHeaderBtn iconUrl={images.profile} dimension="60%" />
                ),
                headerTitle: ""
              }}
            />

            <ScrollView shows showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  padding: SIZES.medium
                }}
              >
                <Welcome
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleClick={() => {
                    if (searchTerm) {
                      router.push(`search/${searchTerm}`)
                    }
                  }}
                />
                <Popularjobs>

                </Popularjobs>
                <Nearbyjobs>

                </Nearbyjobs>
              </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;