import React from "react";
import { Outlet } from 'react-router-dom'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import useNowTime from '@hooks/useNowTime'
import useCity from "@hooks/api/useCity";
import useWeatherAndLoc from '@hooks/api/useWeatherAndLoc';
import useWeatherName from "@hooks/api/useWeatherName";
import useUserStore from "@hooks/store/useUserStore";
import AffixBtn from "@components/AffixBtn";
import Menu from '@components/menu';

export default function Base() {

  const [cityName, setCityName] = React.useState('-')

  const [weatherCName, setWeatherCName] = React.useState('-')

  const nowTime = useNowTime({ format: 'YYYY年MM月DD日 HH时mm分' })

  const [locationAndWeather] = useWeatherAndLoc()

  const [weatherName] = useWeatherName()

  const [city] = useCity()
  
  const { isLogin } = useUserStore()

  React.useEffect(() => {
    if (!isLogin) return 
    if (!isLogin()) {
      window.location.href = '/sign-in'
    }
  }, [isLogin])

  React.useEffect(() => {
    if (city && locationAndWeather && weatherName) {
      setCityName(city[locationAndWeather.location.name] || '-')
      setWeatherCName(weatherName[locationAndWeather.current.condition.text])
    }
  }, [city, locationAndWeather])

  return (
    <Flex height="100%">
      <Box flex={1} className="bg-blur">
        <Box px={4} py={4}>
          <Flex justifyContent="space-between">
            <Heading>欢迎！</Heading>
            <Flex alignItems="center">
              <Text fontSize='xl'>{cityName} {weatherCName} {locationAndWeather?.current.temp_c}℃</Text>
            </Flex>
          </Flex>
          <Heading mt={1} size="md">{nowTime}</Heading>
        </Box>
        <Menu />
      </Box>
      <Flex flex={2}>
        <Outlet />
      </Flex>
      <AffixBtn />
    </Flex >
  );
}