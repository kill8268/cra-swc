import React from 'react'
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'
import DataCard from './DataCard'

export default function Menu() {
  return (
    <Tabs isFitted>
    <TabList>
      <Tab>我的一天</Tab>
      <Tab>我的计划</Tab>
      <Tab>工作计划</Tab>
      <Tab>历史查询</Tab>
    </TabList>
    <TabPanels>
      <TabPanel className='space-y-4'>
        <DataCard id="1" text="id: 1" />
        <DataCard id="2" text="id: 2" />
      </TabPanel>
      <TabPanel className='space-y-4'>
        <DataCard id="3" text="id: 3" />
        <DataCard id="4" text="id: 4" />
        <DataCard />
      </TabPanel>
      <TabPanel className='space-y-4'>
        <DataCard id="5" text="id: 5" />
        <DataCard id="6" text="id: 6" />
      </TabPanel>
      <TabPanel className='space-y-4'>
        <DataCard id="7" text="id: 7" />
        <DataCard id="8" text="id: 8" />
      </TabPanel>
    </TabPanels>
  </Tabs>
  )
}