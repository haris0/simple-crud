/* eslint-disable no-unused-vars */
import { useIsSigned, useToken } from 'context/LoginContext';
import { useDebouncedEffect } from 'mixin';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import {
  Button, Container, Form, Table,
} from 'react-bootstrap';
import { deleteProduct, getSKUsById, getSKUsData } from 'services';
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

  useDebouncedEffect(async () => {
    if (keyword === '') {
      const { skusRes: skuResUpdate } = await getSKUsData();
      setSkus(skuResUpdate);
    } else {
      const { skusRes: skuResUpdate } = await getSKUsById(keyword, token);
      setSkus(skuResUpdate);
    }
  }, [keyword], 1000);

  const handleDelete = async (sku: string) => {
    const { deleteSuccess, deleteFailed } = await deleteProduct(sku, token);
    const { skusRes: skuResUpdate } = await getSKUsData();
    setSkus(skuResUpdate);
  };

  return (
    <Container className="container-custom">
      <Head>
        <title>Simple CRUD</title>
        <meta name="description" content="Simple CRUD using next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
              <Link href="/action/add" passHref>
                <Button
                  variant="success"
                  style={{ width: '10rem' }}
                >
                  Add Product
                </Button>
              </Link>
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
                  <th>Quantity</th>
                  <th>Price</th>
                  {isSigned() && (
                    <th>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {skus.map((sku) => (
                  <tr key={sku.id}>
                    <td>{sku.sku}</td>
                    <td>{sku.product_name}</td>
                    <td>{sku.qty}</td>
                    <td>{sku.price}</td>
                    {isSigned() && (
                      <td style={{ textAlign: 'center' }}>
                        <Link href={`/action/edit?sku=${sku.sku}`} passHref>
                          <Button
                            variant="success"
                            style={{ marginRight: '1rem' }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(sku.sku)}
                        >
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {!skus.length && (
          <div>
            No Record exists!
          </div>
        )}
      </main>
    </Container>
  );
};

export default Home;
