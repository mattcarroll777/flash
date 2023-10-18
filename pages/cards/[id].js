import Layout from '../../components/layout';
import { getAllCardIds, getCardData } from '../../lib/cards';
import Head from 'next/head';
import styles from './id.module.css';
import utilStyles from '../../styles/utils.module.css';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Card({ cardData }) {
  const [showHint1, setShowHint1] = React.useState(false);
  const [showHint2, setShowHint2] = React.useState(false);
  const [winState, setWinState] = React.useState(false);
  const [guess, setGuess] = React.useState('');
  const [checkerArr, setCheckerArr] = React.useState([]);

  const [boardOne, setBoardOne] = React.useState([]);
  const [boardTwo, setBoardTwo] = React.useState([]);

  const answer = cardData.name.toUpperCase();

  const checker = (ans, str) => {
    let correctArr = [];
    for (let i = 0; i < ans.length; i++) {
      if (ans[i] == str[i]) {
        correctArr[i] = ans[i];
      }
      if (!correctArr[i]) {
        correctArr[i] = ' ';
      }
    }
    return correctArr;
  };

  useEffect(() => {
    setCheckerArr(checker(answer, ''));
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    if (answer == guess) {
      setWinState(true);
    }
    if (answer !== guess && !showHint1) {
      setBoardOne(checker(answer, guess));
      setShowHint1(true);
    }
    if (answer !== guess && showHint1 && !showHint2) {
      setBoardTwo(checker(answer, guess));
      setShowHint2(true);
    }
  }

  return (
    <Layout>
      <Head>
        <title>{cardData.date}</title>
      </Head>
      <article>
        <div className={styles.gameContain}>
          <div className={styles.formContain}>
            <div className={styles.gameBoardContain}>
              <div className={styles.ltrListContain}>
                {checkerArr.map(({ id, ltr }) => (
                  <li key={id} className={styles.listLtr}>
                    {ltr}
                  </li>
                ))}
              </div>
              {showHint1 && (
                <div className={styles.ltrListContain}>
                  {boardOne.map((ltr, id) => (
                    <li className={styles.listLtr} key={id}>
                      {ltr}
                    </li>
                  ))}
                </div>
              )}
              {showHint2 && (
                <div className={styles.ltrListContain}>
                  {boardTwo.map((ltr, id) => (
                    <li className={styles.listLtr} key={id}>
                      {ltr}
                    </li>
                  ))}
                </div>
              )}
            </div>
            <form className={styles.formForm} onSubmit={onSubmit}>
              <label>Guess </label>
              <input
                type="text"
                name="guess"
                value={guess}
                onChange={(e) => setGuess(e.target.value.toUpperCase())}
              />
              <input type="submit" value="Submit Guess" />
            </form>
          </div>
          <Image
            priority
            src={cardData.image}
            className={utilStyles.prodImage}
            height={400}
            width={400}
          />
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: cardData.contentHtml }} /> */}
      </article>
      {showHint1 && <div> {cardData.hint1} </div>}
      {showHint2 && <div> {cardData.hint2} </div>}
      {winState && <div> Winner Winner </div>}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCardIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const cardData = await getCardData(params.id);
  return {
    props: {
      cardData,
    },
  };
}
