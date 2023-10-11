import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getSortedCardsData } from '../lib/cards';
import Link from 'next/link';

export default function Home({ allCardsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Card</h2>
        <ul className={utilStyles.list}>
          {allCardsData.map(({ id, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/cards/${id}`}>{date}</Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCardsData = getSortedCardsData();
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      allCardsData,
    },
  };
}
