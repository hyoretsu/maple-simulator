import { NextSeo } from 'next-seo';

import appPackageJson from '../../package.json';
import { siteName as title } from './_document';

const Homepage: React.FC = () => {
 const { description } = appPackageJson;

 return <NextSeo description={description} openGraph={{ description, title }} />;
};

export default Homepage;
