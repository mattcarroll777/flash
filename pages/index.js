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
        <div className={utilStyles.descript}>
          Welcome to Flashle! A flash card game with a Wordle-like twist. An
          image will be displayed and have three chances to guess who it is. If
          your guess isn't spot-on, don't fret. The correct letters from your
          incorrect guess will be shown (e.g., "Mike" vs. "Mitch" will display
          as "M I _ _"), and you'll receive a handy hint to steer you closer to
          the correct answer.
        </div>
        <h2 className={utilStyles.headingLg}>Cards</h2>
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
