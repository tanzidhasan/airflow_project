import React, { useEffect, useState } from "react";

import axios from "axios";

import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function LandingPage() {
    const [all_sales, setAll_sales] = useState([]);

    const [openAddOrders, setOpenAddOrders] = useState(false);

    const handleCloseAddOrders = () => {
        setOpenAddOrders(false);
    };

    useEffect(() => {
        const fetch_sales_data = async () => {
            try {
                const all_sales_res = await axios.get(
                    "http://localhost:8000/sales"
                );
                setAll_sales(all_sales_res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetch_sales_data();
    }, []);

    const onAddOrders = () => {
        setOpenAddOrders(true);
    };

    const onDownloadOrders = () => {};

    const onDeleteOrders = () => {};

    return (
        <>
            <Stack
                spacing={2}
                direction="row"
                style={{
                    fontFamily: "PT Serif",
                }}
            >
                <h1> All Orders </h1>
                <Button
                    variant="outlined"
                    style={{
                        fontFamily: "PT Serif",
                        textTransform: "capitalize",
                    }}
                    onClick={onAddOrders}
                >
                    Add Orders
                </Button>
                <Button
                    variant="outlined"
                    style={{
                        fontFamily: "PT Serif",
                        textTransform: "capitalize",
                    }}
                    onClick={onDownloadOrders}
                >
                    Download Orders
                </Button>

                <Button
                    variant="outlined"
                    style={{
                        fontFamily: "PT Serif",
                        textTransform: "capitalize",
                    }}
                    onClick={onDeleteOrders}
                >
                    Delete Orders
                </Button>
            </Stack>

            <Dialog
                open={openAddOrders}
                onClose={handleCloseAddOrders}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add Order"}</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ "& > :not(style)": { m: 1, width: "500px" } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Order Number"
                            variant="outlined"
                        />
                        {/* ORDERNUMBER,SALES,STATUS,MONTH_ID,YEAR_ID,PRODUCTLINE,CUSTOMERNAME,PHONE,ADDRESSLINE,CITY,STATE,COUNTRY,DEALSIZE */}
                        <TextField
                            id="outlined-basic"
                            label="SALES"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="STATUS"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="SALES"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="STATUS"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-basic"
                            label="SALES"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="STATUS"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="SALES"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            label="STATUS"
                            variant="outlined"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseAddOrders}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Order No{" "}
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Sales
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Status
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Month
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Year
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Product Line
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Customer Name
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Phone
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Address Line
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                City
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                State
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Country
                            </TableCell>
                            <TableCell
                                align="center"
                                style={{
                                    fontFamily: "PT Serif",
                                    fontWeight: "bold",
                                    fontSize: "13pt",
                                }}
                            >
                                Deal Size
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {all_sales.map((sales) => (
                            <TableRow
                                key={sales.ORDERNUMBER}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.ORDERNUMBER}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.SALES}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.STATUS}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.MONTH_ID}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.YEAR_ID}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.PRODUCTLINE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.CUSTOMERNAME}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.PHONE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.ADDRESSLINE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.CITY}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.STATE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.COUNTRY}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                    }}
                                >
                                    {sales.DEALSIZE}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
