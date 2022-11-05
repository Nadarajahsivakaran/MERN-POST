import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from 'react-redux'

export default function TransactionForm({
  fetchTransactions,
  editTransaction,
}) {


  const { categories} = useSelector((state) => state.auth.user);

  const initialForm = {
    amount: 0,
    description: "",
    date: new Date(),
    category_id: "",
  };


  const token = Cookies.get("token");
  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editTransaction.amount !== undefined ? update() : create();
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setForm(initialForm);
      fetchTransactions();
    }
  }

  async function update() {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setForm(initialForm);
      fetchTransactions();
    }
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  const { amount, description, date } = form;

  function getCategoryNameById(){
    return categories.find((category)=>category.id===form.category_id) ?? '';
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transactions</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            name="amount"
            variant="outlined"
            value={amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            name="description"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              value={date}
              name="date"
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>

          <Autocomplete
            // value={form.category_id}
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, category_id: newValue._id });
            }}
            id="controllable-states-demo"
            options={categories}
            sx={{ width: 200, marginRight: 5  }}
            renderInput={(params) => (
              <TextField
                {...params}
              
                size="small"
                label="Categories"
              />
            )}
          />

          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}

          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
