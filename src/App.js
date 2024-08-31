import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PaymentWeb = () => {
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('transactionId');
    const transactionAmount = urlParams.get('amount');
    setPaymentId(transactionId);
    setAmount(transactionAmount);
  }, []);

  const handleSubmit = (status) => async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.trafyn.info/workflow-engine/8f92f2a3-630e-4f42-859a-fd5e2603bed8/1521515/v1/execution/service/run/update-cash-transaction-status-whatsapp',
        {
          input: {
            status: status,
            cashTransactionId: paymentId,
            comments: status === 'COMPLETED' ? "Success" : "FAILED"
          }
        },
        {
          auth: {
            username: 'VeereshNC8849',
            password: 'Veeresh@123'
          }
        }
      );
      toast.success('API call was successful!');
    } catch (error) {
      toast.error('API call failed!');
      console.error('Error calling API:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    paymentBox: {
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '450px',
      textAlign: 'center',
      position: 'relative',
      borderTop: '5px solid #007bff',
    },
    header: {
      marginBottom: '20px',
      fontSize: '26px',
      fontWeight: 'bold',
      color: '#333',
    },
    info: {
      marginBottom: '20px',
      fontSize: '18px',
      color: '#555',
    },
    button: {
      padding: '12px 28px',
      fontSize: '16px',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '10px',
      transition: 'background-color 0.3s ease',
      width: '100%',
      maxWidth: '180px',
    },
    successButton: {
      backgroundColor: '#28a745',
    },
    failureButton: {
      backgroundColor: '#dc3545',
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '20px',
      color: '#007bff',
    },
    disabledButton: {
      opacity: '0.7',
      cursor: 'not-allowed',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.paymentBox}>
        <div style={styles.header}>Payment Confirmation</div>
        <div style={styles.info}><strong>Transaction ID:</strong> {paymentId}</div>
        <div style={styles.info}><strong>Amount:</strong> Rs: {amount}</div>
        <button
          onClick={handleSubmit('COMPLETED')}
          style={{ 
            ...styles.button, 
            ...styles.successButton, 
            ...(loading && styles.disabledButton) 
          }}
          disabled={loading}
        >
          Confirm Success
        </button>
        <button
          onClick={handleSubmit('FAILED')}
          style={{ 
            ...styles.button, 
            ...styles.failureButton, 
            ...(loading && styles.disabledButton) 
          }}
          disabled={loading}
        >
          Report Failure
        </button>
        {loading && <div style={styles.loader}>Processing...</div>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentWeb;
