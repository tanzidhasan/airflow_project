import React, { useEffect, useState } from "react";

import {
    PDFViewer,
    Document,
    Page,
    View,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";

import axios from "axios";

import Stack from "@mui/material/Stack";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";
import { minor } from "@mui/material";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "500pt",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box
            sx={{ flexShrink: 0, ml: 2.5, width: "100%" }}
            alignContent={"center"}
        >
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function LandingPage() {
    const [all_sales, setAll_sales] = useState([]);
    const [pdfDisplay, setPdfDisplay] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - all_sales.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [openAddOrders, setOpenAddOrders] = useState(false);

    const [orderNo, setOrderNo] = useState("");
    const [orderNoError, setOrderNoError] = useState("");

    const [orderSales, setOrderSales] = useState("");
    const [orderSalesError, setOrderSalesError] = useState("");

    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState("");

    const [month, setMonth] = useState("");
    const [monthError, setMonthError] = useState("");

    const [year, setYear] = useState("");
    const [yearError, setYearError] = useState("");

    const [productLine, setProductLine] = useState("");
    const [productLineError, setProductLineError] = useState("");

    const [customerName, setCustomerName] = useState("");
    const [customerNameError, setCustomerNameError] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [addressLine, setAddressLine] = useState("");
    const [addressLineError, setAddressLineError] = useState("");

    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState("");

    const [state, setState] = useState("");
    const [stateError, setStateError] = useState("");

    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState("");

    const [dealSize, setDealSize] = useState("");
    const [dealSizeError, setDealSizeError] = useState("");

    const handleCloseAddOrders = () => {
        setOpenAddOrders(false);
    };

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

    const validateOrder = () => {
        if (orderNo == "") {
            setOrderNoError("Order No can't be empty");
            return false;
        } else if (Number(orderNo) < 10000) {
            setOrderNoError("Order No. must be greater than 10000");
            return false;
        } else {
            setOrderNoError("");
        }

        if (orderSales == "") {
            setOrderSalesError("Order Sale can't be empty");
            return false;
        } else if (Number(orderSales) < 0) {
            setOrderSalesError("Order Sale must be greater than zero");
            return false;
        } else {
            setOrderSalesError("");
        }

        if (status == "") {
            setStatusError("Status can't be empty");
            return false;
        } else {
            setStatusError("");
        }

        if (month == "") {
            setMonthError("Month can't be empty");
            return false;
        } else if (Number(month) < 1 && Number(month) > 12) {
            setMonthError("Enter right month in number");
            return false;
        } else {
            setMonthError("");
        }

        if (year == "") {
            setYearError("Year can't be empty");
            return false;
        } else if (Number(year) < 2000 && Number(year) > 2024) {
            setYearError("Enter right Year in number");
            return false;
        } else {
            setYearError("");
        }

        if (productLine == "") {
            setProductLineError("Product Line can't be empty");
            return false;
        } else {
            setProductLineError("");
        }

        if (customerName == "") {
            setCustomerNameError("Customer Name can't be empty");
            return false;
        } else {
            setCustomerNameError("");
        }

        if (phone == "") {
            setPhoneError("Phone Number can't be empty");
            return false;
        } else if (phone.length < 10) {
            setPhoneError("Enter right Phone number");
            return false;
        } else {
            setPhoneError("");
        }

        if (addressLine == "") {
            setAddressLineError("Address Line can't be empty");
            return false;
        } else {
            setAddressLineError("");
        }

        if (city == "") {
            setCityError("City can't be empty");
            return false;
        } else {
            setCityError("");
        }

        if (state == "") {
            setStateError("State can't be empty");
            return false;
        } else {
            setStateError("");
        }

        if (country == "") {
            setCountryError("Country can't be empty");
            return false;
        } else {
            setCountryError("");
        }

        if (dealSize == "") {
            setDealSizeError("Country can't be empty");
            return false;
        } else {
            setDealSizeError("");
        }

        console.log("Oreder is Validated");

        return true;
    };

    const resetOrder = () => {
        setOrderNo("");
        setOrderSales("");
        setStatus("");
        setMonth("");
        setYear("");
        setProductLine("");
        setCustomerName("");
        setPhone("");
        setAddressLine("");
        setCity("");
        setState("");
        setCountry("");
        setDealSize("");
    };

    const OrderPdf = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Order No: {orderNo}</Text>
                    <Text>Order Sales: {orderSales}</Text>
                    <Text>Status: {status}</Text>
                </View>
            </Page>
        </Document>
    );

    const onDialogAddOrders = () => {
        if (validateOrder()) {
            const new_sale = {
                ORDERNUMBER: orderNo,
                SALES: orderSales,
                STATUS: status,
                MONTH_ID: month,
                YEAR_ID: year,
                PRODUCTLINE: productLine,
                CUSTOMERNAME: customerName,
                PHONE: phone,
                ADDRESSLINE: addressLine,
                CITY: city,
                STATE: state,
                COUNTRY: country,
                DEALSIZE: dealSize,
            };

            axios
                .post("http://localhost:8000/create_new_sale", new_sale)
                .then((response) => {
                    resetOrder();
                    fetch_sales_data();
                    handleCloseAddOrders();
                });
        }
    };

    useEffect(() => {
        fetch_sales_data();
    }, []);

    const onAddOrders = () => {
        setOpenAddOrders(true);
    };

    return (
        <>
            <Stack
                spacing={5}
                direction="row"
                style={{
                    fontFamily: "PT Serif",
                    marginLeft: 30,
                    marginTop: 20,
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
            </Stack>

            <Dialog
                open={openAddOrders}
                onClose={handleCloseAddOrders}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{
                        fontFamily: "PT Serif",
                        fontWeight: "bold",
                    }}
                >
                    {"Add Order"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": {
                                m: 1,
                                width: "500px",
                                fontFamily: "PT Serif",
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            label="Order Number"
                            variant="outlined"
                            type="number"
                            value={orderNo}
                            onChange={(e) => setOrderNo(e.target.value)}
                            error={orderNoError != ""}
                            helperText={orderNoError}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Sales"
                            variant="outlined"
                            type="number"
                            value={orderSales}
                            onChange={(e) => setOrderSales(e.target.value)}
                            error={orderSalesError != ""}
                            helperText={orderSalesError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Status"
                            variant="outlined"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            error={statusError != ""}
                            helperText={statusError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Month"
                            variant="outlined"
                            type="number"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            error={monthError != ""}
                            helperText={monthError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Year"
                            variant="outlined"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            error={yearError != ""}
                            helperText={yearError}
                        />

                        <TextField
                            id="outlined-basic"
                            label="Product Line"
                            variant="outlined"
                            value={productLine}
                            onChange={(e) => setProductLine(e.target.value)}
                            error={productLineError != ""}
                            helperText={productLineError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Customer Name"
                            variant="outlined"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            error={customerNameError != ""}
                            helperText={customerNameError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Phone Number"
                            variant="outlined"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={phoneError != ""}
                            helperText={phoneError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            value={addressLine}
                            onChange={(e) => setAddressLine(e.target.value)}
                            error={addressLineError != ""}
                            helperText={addressLineError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            error={cityError != ""}
                            helperText={cityError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="State"
                            variant="outlined"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            error={stateError != ""}
                            helperText={stateError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            error={countryError != ""}
                            helperText={countryError}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Deal Size"
                            variant="outlined"
                            value={dealSize}
                            onChange={(e) => setDealSize(e.target.value)}
                            error={dealSizeError != ""}
                            helperText={dealSizeError}
                        />
                    </Box>
                    <PDFViewer
                        style={{ display: pdfDisplay ? "flex" : "none" }}
                    >
                        <OrderPdf />
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onDialogAddOrders}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer
                component={Paper}
                sx={{ marginLeft: 5, marginTop: 5, marginRight: 20 }}
            >
                <Table
                    sx={{ maxWidth: 300, maxHeight: 100 }}
                    aria-label="simple table"
                >
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
                        {(rowsPerPage > 0
                            ? all_sales.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : all_sales
                        ).map((sales) => (
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
                                        width: 100,
                                    }}
                                >
                                    {sales.ORDERNUMBER}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.SALES}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.STATUS}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {months[sales.MONTH_ID]}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.YEAR_ID}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.PRODUCTLINE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.CUSTOMERNAME}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.PHONE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.ADDRESSLINE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 250,
                                    }}
                                >
                                    {sales.CITY}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.STATE}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.COUNTRY}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        fontFamily: "PT Serif",
                                        fontSize: "12pt",
                                        width: 100,
                                    }}
                                >
                                    {sales.DEALSIZE}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: "All", value: -1 },
                                ]}
                                colSpan={3}
                                count={all_sales.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                slotProps={{
                                    select: {
                                        inputProps: {
                                            "aria-label": "rows per page",
                                        },
                                        native: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}
