import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTricks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2022-03-18T00:00.000Z',
      '2022-03-19T00:00.000Z',
      '2022-03-20T00:00.000Z',
      '2022-03-21T00:00.000Z',
      '2022-03-22T00:00.000Z',
      '2022-03-23T00:00.000Z',
      '2022-03-25T00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
} as const;

const series = [
  { name: 'Series1', data: [31, 120, 50, 8, 15, 6, 56] }
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Bem vindo | dashgo.</title>
      </Head>
      <Flex direction="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
            <Box
              p="8"
              pb="4"
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Inscritos da semana</Text>
              <Chart type="area" options={options} height={160} series={series} />
            </Box>

            <Box
              p="8"
              pb="4"
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Taxa de abertura</Text>
              <Chart type="area" options={options} height={160} series={series} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  )
}