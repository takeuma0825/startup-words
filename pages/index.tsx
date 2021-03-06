import React from "react";
import Layout from "../components/Layout";
import { db, wordConverter } from "../lib/firestore";
import { Word, Words } from "../interfaces/index";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useStyles } from "../components/theme";

const SYLLABARY: string[] = [
  "あ",
  "い",
  "う",
  "え",
  "お",
  "か",
  "き",
  "く",
  "け",
  "こ",
  "さ",
  "し",
  "す",
  "せ",
  "そ",
  "た",
  "ち",
  "つ",
  "て",
  "と",
  "な",
  "に",
  "ぬ",
  "ね",
  "の",
  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",
  "ま",
  "み",
  "む",
  "め",
  "も",
  "や",
  "ゆ",
  "よ",
  "ら",
  "り",
  "る",
  "れ",
  "ろ",
  "わ",
];

// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  const wordsList: Words[] = [];
  for (const char of SYLLABARY) {
    const wordList: Word[] = [];
    await db
      .collection("words")
      .withConverter(wordConverter) //  objectコンバータで変換して型安全に利用する。
      .where("syllabary", "==", char)
      .orderBy("word")
      .get()
      .then((ss) => {
        ss.forEach((s) => {
          wordList.push(s.data());
        });
      });
    const words: Words = { key: char, words: wordList };
    wordsList.push(words);
  }
  console.log(JSON.stringify(wordsList));
  return {
    props: {
      wordsList,
    },
  };
};

function Syllabary({
  wordsList,
}: //  InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  return (
    // <WordsPage {wordsList}></WordsPage>
    <Layout>
      {wordsList.map((s: Words) => (
        <>
          {s.words.length !== 0 ? (
            <Grid key={s.key} container>
              <Grid item xs={12} component={Card}>
                <CardContent className={classes.card}>
                  <Typography variant="h3">
                    <a id={s.key}>{s.key}</a>
                  </Typography>
                  {s.words.map((word: Word) => (
                    <Grid key={word.word} item xs={10} component={Card}>
                      <CardContent key={word.word} className={classes.wordCard}>
                        <Typography className={classes.text}>
                          {word.word}
                        </Typography>
                        <Typography className={classes.description}>
                          {word.description.replace(/\\n/g, "\n")}
                        </Typography>
                      </CardContent>
                    </Grid>
                  ))}
                </CardContent>
              </Grid>
            </Grid>
          ) : null}
        </>
      ))}
    </Layout>
  );
}

export default Syllabary;
