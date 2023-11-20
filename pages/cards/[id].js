import Layout from '../../components/layout';
import { getAllCardIds, getCardData } from '../../lib/cards';
import Head from 'next/head';
import styles from './id.module.css';
import utilStyles from '../../styles/utils.module.css';
import React, { useEffect } from 'react';
import Image from 'next/image';

export default function Card({ cardData }) {
  const [winState, setWinState] = React.useState(false);
  const [guess, setGuess] = React.useState('');
  const [checkerArr, setCheckerArr] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

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
    setCounter(counter + 1);
    if (answer == guess) {
      setWinState(true);
    }
    if (answer !== guess && counter == 0) {
      setBoardOne(checker(answer, guess));
    }
    if (answer !== guess && counter == 1) {
      setBoardTwo(checker(answer, guess));
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
              {counter > 0 && (
                <div className={styles.ltrListContain}>
                  {boardOne.map((ltr, id) => (
                    <li className={styles.listLtr} key={id}>
                      {ltr}
                    </li>
                  ))}
                </div>
              )}
              {counter > 1 && (
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
          <div className={styles.imgContain}>
            <Image priority src={cardData.image} height={400} width={400} />
          </div>
        </div>
      </article>
      <div>
        <h3>COUNTER: {counter}</h3>
      </div>
      <div>Hints: </div>
      {counter > 0 && <div>1. {cardData.hint1} </div>}
      {counter > 1 && <div>2. {cardData.hint2} </div>}
      {counter > 2 && !winState && (
        <div>
          <h4>Sorry you lose! The correct answer is: {answer}</h4>
          <div dangerouslySetInnerHTML={{ __html: cardData.contentHtml }} />
        </div>
      )}
      {winState && (
        <div>
          <h4> Winner Winner! {answer} was the correct answer!</h4>
          <div dangerouslySetInnerHTML={{ __html: cardData.contentHtml }} />
        </div>
      )}
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
