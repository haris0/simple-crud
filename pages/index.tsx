/* eslint-disable no-unused-vars */
import Header from 'components/Header';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
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
    <>
      <Header />
      <Container className="container-custom">
        <Head>
          <title>Simple CRUD</title>
          <meta name="description" content="Simple CRUD using next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {!!skus.length && !skusErr && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {skus.map((sku) => (
                  <tr key={sku.id}>
                    <td>{sku.sku}</td>
                    <td>{sku.product_name}</td>
                    <td>{sku.price}</td>
                    <th>{' '}</th>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </main>
      </Container>
    </>
  );
};

export default Home;
