/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button, Col, Container, Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { addProduct, editProduct, getSKUsById } from 'services';
import { useToken } from 'context/LoginContext';

const Action = () => {
  const router = useRouter();
  const token = useToken();
  const { query } = router;
  const [failedMsg, setFailedMsg] = useState('');
  const [sku, setSku] = useState('');
  const [productName, setProductName] = useState('');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [status, setStatus] = useState('');

  const handleSku = (event: ChangeEvent<HTMLInputElement>) => {
    setFailedMsg('');
    setSku(event.target.value);
  };
  const handleProductName = (event: ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };
  const handleQty = (event: ChangeEvent<HTMLInputElement>) => {
    setQty(event.target.value);
  };
  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  const handleUnit = (event: ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value);
  };
  const handleStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const getSKUById = async () => {
      const { skusRes } = await getSKUsById(query.sku as string, token);
      const skuById = skusRes[0];
      setSku(skuById.sku);
      setProductName(skuById.product_name);
      setQty(skuById.qty.toString());
      setPrice(skuById.price.toString());
      setUnit(skuById.unit);
      setStatus(skuById.status.toString());
    };
    if (query.sku) {
      getSKUById();
    }
  }, [query.sku]);

  const handleAddProduct = async () => {
    const { addRes, addErr } = await addProduct(sku, productName, qty, price, unit, status, token);
    if (addErr) {
      setFailedMsg(addRes as unknown as string);
    }

    if (!addErr) {
      console.log('success');
      router.push('/');
    }
  };

  const handleEditProduct = async () => {
    const { editRes, editErr } = await editProduct(
      sku,
      productName,
      qty,
      price,
      unit,
      status,
      token,
    );
    if (editErr) {
      setFailedMsg(editRes as unknown as string);
    }

    if (!editErr) {
      console.log('success');
      router.push('/');
    }
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
          {query?.actionType === 'add' ? (
            <h2>Add Product</h2>
          ) : (
            <h2>Edit Product: {query?.sku}</h2>
          )}
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Form>
            <Form.Group>
              <Form.Label column sm="2">
                SKU
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={sku}
                  onChange={handleSku}
                  placeholder="SKU Code"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                Product Name
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={productName}
                  onChange={handleProductName}
                  placeholder="Product Name"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                Quantity
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  value={qty}
                  onChange={handleQty}
                  placeholder="Quantity"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                Price
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={handlePrice}
                  placeholder="Price"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                Unit
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  value={unit}
                  onChange={handleUnit}
                  placeholder="Unit"
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm="2">
                Status
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  value={status}
                  onChange={handleStatus}
                  placeholder="Status"
                />
              </Col>
              {failedMsg && (
                <div style={{ color: 'red' }}>
                  {failedMsg}
                </div>
              )}
            </Form.Group>
          </Form>
          {query?.actionType === 'add' ? (
            <Button
              variant="success"
              style={{ width: '10rem', float: 'right', marginTop: '2rem' }}
              onClick={() => handleAddProduct()}
            >
              Add Product
            </Button>
          ) : (
            <Button
              variant="success"
              style={{ width: '10rem', float: 'right', marginTop: '2rem' }}
              onClick={() => handleEditProduct()}
            >
              Edit Product
            </Button>
          )}
        </div>
      </main>
    </Container>
  );
};

export default Action;
