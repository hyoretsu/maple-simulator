import { NextSeo } from 'next-seo';

import Link from '@components/custom/Link';

import { siteName as title } from './_document';

const Homepage: React.FC = () => {
    const description =
        'A project that aims to simulate various aspects of MapleStory on your browser';

    return (
        <>
            <NextSeo description={description} openGraph={{ description, title }} />
            <Link href="/stats">Stats</Link>
        </>
    );
};

export default Homepage;
