/* eslint-disable no-unused-vars */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { getSKUsData } from 'services';
import { ISKUs } from 'types';
import styles from '../styles/Home.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const { skusRes, skusErr } = await getSKUsData();

  return {
    props: {
      skusRes,
      skusErr,
    },
  };
};

const Home: NextPage<{
  skusRes: ISKUs[],
  skusErr: boolean
 }> = ({
   skusRes,
   skusErr,
 }) => {
   const [skus, setSkus] = useState(skusRes);

   return (
     <div className={styles.container}>
       <Head>
         <title>Simple CRUD</title>
         <meta name="description" content="Simple CRUD using next app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>

       <main className={styles.main}>
         {!!skus.length && !skusErr}
         <ul>
           {skus.map((sku) => (
             <li key={sku.id}>
               {sku.product_name}
             </li>
           ))}
         </ul>
       </main>
     </div>
   );
 };

export default Home;
