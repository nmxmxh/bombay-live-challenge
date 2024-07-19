import Header from "@/components/shared/header";
import Providers from "@/lib/providers";
import GlobalStyles from "@/styles/global";
import { Metadata } from "next";

import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--primary-font",
});

export const metadata: Metadata = {
  title: "Rock & Paper - Bombai Live Challenge",
  description: "Developed by Nobert Momoh",
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <Providers>
          <GlobalStyles />
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
