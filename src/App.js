import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed: npm install axios

const PaymentWeb = () => {
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('transactionId');
    const transactionAmount = urlParams.get('amount');
    setPaymentId(transactionId);
    setAmount(transactionAmount);
  }, []);

  const handleSubmit = (status) => async () => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        paymentId,
        status,
        amount,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    },
    paymentBox: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    header: {
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    info: {
      marginBottom: '20px',
      fontSize: '18px',
      color: '#555',
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
      transition: 'background-color 0.3s ease',
    },
    successButton: {
      backgroundColor: '#28a745',
    },
    failureButton: {
      backgroundColor: '#dc3545',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.paymentBox}>
        <div style={styles.header}>Payment Confirm</div>
        <div style={styles.info}>Transaction ID: {paymentId}</div>
        <div style={styles.info}>Amount: Rs{amount}</div>
        <button onClick={handleSubmit('success')} style={{ ...styles.button, ...styles.successButton }}>
          Success
        </button>
        <button onClick={handleSubmit('fail')} style={{ ...styles.button, ...styles.failureButton }}>
          Failure
        </button>
      </div>
    </div>
  );
};

export default PaymentWeb;
