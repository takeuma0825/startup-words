import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Typography } from "@material-ui/core";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Startup words" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>あいうえお</a>
        </Link>{" "}
        |{" "}
        <Link href="/round">
          <a>投資ラウンド</a>
        </Link>{" "}
        |{" "}
        <Link href="/alphabet">
          <a>アルファベット</a>
        </Link>{" "}
        |{" "}
        <Link href="/category">
          <a>カテゴリ</a>
        </Link>
        <hr />
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <Typography color="textPrimary" variant="h5">
        <span>Startup用語</span>
      </Typography>
      <br />
      <Typography color="textSecondary" variant="h6">
        <a href="//twitter.com/takeuma0825">
          <TwitterIcon color="primary" fontSize="large" />
          @takeuma0825
        </a>
      </Typography>
    </footer>
  </div>
);

export default Layout;
