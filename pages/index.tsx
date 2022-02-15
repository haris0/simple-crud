/* eslint-disable no-unused-vars */
import Header from 'components/Header';
import { useIsSigned, useToken } from 'context/LoginContext';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import {
  Button, Container, Form, Table,
} from 'react-bootstrap';
import { deleteProduct, getSKUsData } from 'services';
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
  const isSigned = useIsSigned();
  const token = useToken();
  const [keyword, setKeyword] = useState('');
  const handleKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleDelete = async (sku: string) => {
    console.log(sku);
    const { deleteSuccess, deleteFailed } = await deleteProduct(sku, token);
    const { skusRes: skuResUpdate } = await getSKUsData();
    setSkus(skuResUpdate);
    console.log(deleteSuccess, deleteFailed);
  };

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
          <div>
            {isSigned() && (
              <div className={styles.search_add}>
                <Form.Control
                  type="text"
                  aria-describedby="Seacrh by SKU"
                  placeholder="Seacrh by SKU"
                  value={keyword}
                  onChange={handleKeyword}
                />
                <Button
                  variant="success"
                  style={{ width: '10rem' }}
                >
                  Add Product
                </Button>
              </div>
            )}
          </div>
          {!!skus.length && !skusErr && (
            <div className={styles.table_wraper}>
              <Table striped bordered hover style={{ margin: 'unset' }}>
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
                      <th style={{ textAlign: 'center' }}>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(sku.sku)}
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </main>
      </Container>
    </>
  );
};

export default Home;
