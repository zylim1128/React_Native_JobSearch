import {
    Text, ScrollView, View, SafeAreaView, ActivityIndicator, RefreshControl
} from "react-native";
import { useRouter, Stack, useSearchParams } from 'expo-router';
import { useCallback, useState } from "react";

import {
    Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualification", "Responsibilities"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();

    // fetch data and assign an id?
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })

    const [refreshing, setRefreshing] = useState(false);
    
    // TODO: what is the main function of this line
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => {}

    const displayTabContent = () => {
        // three different cases for the tab
        switch (activeTab) {
            case "Qualification":
                // go in specifics to do something about specifics
                return <Specifics
                    title='Qualifications'
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    info={data[0].job_description ?? "No data provider"}
                />
            case "Responsibilities":
                return <Specifics
                    title='Responsibilities'
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                // this is to set the go back button and share button
                options = {{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft:() => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight:() => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl= {
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : data.length == 0 ? (
                        <Text>No data</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100}}>
                            <Company
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />

                            <JobTabs
                                // like a constructor
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>
                    )}

                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
            </>
        </SafeAreaView>
    )
}

export default JobDetails;