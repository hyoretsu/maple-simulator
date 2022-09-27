import { NextSeo } from 'next-seo';

import CoreStatsInfo from '@components/CoreStatsInfo';
import EquipmentInventory from '@components/EquipmentInventory';
import ExpBar from '@components/ExpBar';
import Stats from '@components/Stats';

import { BottomBar, Styling } from '@styles/index';

import { siteName as title } from './_document';

const description = 'A project that aims to simulate various aspects of MapleStory on your browser';

const Homepage: React.FC = () => {
    return (
        <>
            <NextSeo description={description} openGraph={{ description, title }} title={title} />
            <Styling>
                <EquipmentInventory />
                <Stats />
            </Styling>
            <BottomBar>
                <CoreStatsInfo />
                <ExpBar />
            </BottomBar>
        </>
    );
};

export default Homepage;
