import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import ChartWrapper from './ChartWrapper';
import SafeAreaWrapper from '../SafeAreaWrapper';
import globalStyles from '../../styles/global.style';
import { useTranslation } from '../../hooks/useTranslation';
import { Colors } from '../../configs/colors';
import { useApi } from '../../hooks/useApi';
import ApiStrings from '../../lib/apis_string';
import { useAuthStore } from '../../store/store';
import Paragraph from '../ui/Paragraph';



const RehabilitationReportScreen: React.FC = () => {

  const { t } = useTranslation()
  const screenWidth = Dimensions.get('window').width;
  const { user } = useAuthStore()
  const [lineChartData, setLineChartData] = useState<LineChartData>({
    labels: [],
    datasets: []
  });
  const [rate, setRate] = useState({
    successRate: '',
    progressRate: '',
    failedRate: '',
  })
  const { request, loading, error } = useApi()

  useEffect(() => {
    const fetchChartData = async () => {
      const { data } = await request('get', ApiStrings.GET_REPORT(user?.masjid._id ?? ''));


      const lineData: LineChartData = {
        labels: data.labels,
        datasets: [
          {
            data: data.successData ?? [],
            color: (opacity = 1) => `rgba(0, 176, 116, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: data.failedData ?? [],
            color: (opacity = 1) => `rgba(220, 53, 69, ${opacity})`,
            strokeWidth: 2
          }
        ],
        legend: [t('rehabilitation.successful'), t('rehabilitation.failed')]
      };



      setLineChartData(lineData);
      setRate({
        successRate: data?.successRate,
        failedRate: data?.failedRate,
        progressRate: data?.progressRate
      })

    };

    fetchChartData();
  }, [user]);

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(26, 115, 232, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: Colors.primary,
    },
  };


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }


  if (!lineChartData.labels.length || !lineChartData.datasets.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No data available</Text>
      </View>
    );
  }


  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <Paragraph weight='Bold' level='Medium' style={styles.sectionTitle}>মাসিক পরিসংখ্যান</Paragraph>
        <ChartWrapper>
          <LineChart
            data={{
              labels: lineChartData.labels,
              datasets: lineChartData.datasets.map(dataset => ({
                ...dataset,
                color: dataset.color || ((opacity = 1) => `rgba(26, 115, 232, ${opacity})`),
              })),
            }}
            width={screenWidth - 40}
            height={180}
            chartConfig={chartConfig}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            fromZero={true}
            verticalLabelRotation={45}
          />
        </ChartWrapper>

        <Paragraph weight='Bold' level='Medium' style={styles.sectionTitle}>সাফল্যের হার</Paragraph>
        <ChartWrapper>
          <PieChart
            data={[
              { name: t('rehabilitation.successful'), population: parseFloat(rate.successRate), color: Colors.primary },
              { name: t('rehabilitation.inProgress'), population: parseFloat(rate.progressRate), color: Colors.warning },
              { name: t('rehabilitation.failed'), population: parseFloat(rate.failedRate), color: Colors.danger },
            ]}
            width={300}
            height={200}
            chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft='20'
          />
        </ChartWrapper>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginVertical: 16,
    color: Colors.black,
  },
});

export default RehabilitationReportScreen;