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
import { useSelector } from "react-redux";

export default function CategoryForm({ fetchTransactions, EditCategory }) {
  const { categories } = useSelector((state) => state.auth.user);

  const initialForm = {
    label: "",
    icon: "",
  };

  const icons = [{ label: "user" }];

  const token = Cookies.get("token");
  useEffect(() => {
    if (EditCategory._id !== undefined) {
      setForm(EditCategory);
    }
  }, [EditCategory]);

  const [form, setForm] = useState(initialForm);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    EditCategory._id !== undefined ? update() : create();
  }

  async function create() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
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
      `${process.env.REACT_APP_API_URL}/category/${EditCategory._id}`,
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

  

  const {label} = form;

  function getCategoryNameById() {
    return (
      categories.find((category) => category.id === form.category_id) ?? ""
    );
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Category</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Label"
            name="label"
            variant="outlined"
            value={label}
            onChange={handleChange}
          />
          

          <Autocomplete
            // value={form.category_id}
            value={getCategoryNameById()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue.label });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, marginRight: 5 }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Icon" />
            )}
          />

          {EditCategory._id === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}

          {EditCategory._id !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
