import React from "react";
import Layout from "../components/Layout";
import { db, wordConverter } from "../lib/firestore";
import { Word, Words } from "../interfaces/index";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useStyles } from "../components/theme";

const ROUND: string[] = [
  "シード",
  "アーリー",
  "シリーズA",
  "シリーズB",
  "シリーズC",
];

export const getStaticProps: GetStaticProps = async () => {
  const wordsList: Words[] = [];
  for (const char of ROUND) {
    const wordList: Word[] = [];
    await db
      .collection("words")
      .withConverter(wordConverter)
      .where("investment_round", "==", char)
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
function Round({ wordsList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();
  return (
    <Layout key="round">
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
                          {word.fullword === null
                            ? ""
                            : "(" + word.fullword + ")"}
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

export default Round;
