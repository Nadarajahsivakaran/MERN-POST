import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TransactionForm from "../Components/TransactionForm";
import TransactionList from "../Components/TransactionList";
import Cookies from "js-cookie";

const Home = () => {
  const [transaction, setTransactions] = useState([]);
  const [editTransaction, setEditTransactions] = useState({});

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
      />
      <TransactionList
        transaction={transaction}
        fetchTransactions={fetchTransactions}
        setEditTransactions={setEditTransactions}
      />
    </Container>
  );
};

export default Home;
