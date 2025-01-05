from sqlalchemy.orm import Session

from schemas.sales_data import Sales_Data_Create
from db.models.sales_data import Sales_Data


def create_new_sale(sales:Sales_Data_Create ,db:Session):
    sale = Sales_Data(
        ORDERNUMBER = sales.ORDERNUMBER,
        SALES = sales.SALES,
        STATUS = sales.STATUS,
        MONTH_ID = sales.MONTH_ID,
        YEAR_ID = sales.YEAR_ID,
        PRODUCTLINE = sales.PRODUCTLINE,
        CUSTOMERNAME = sales.CUSTOMERNAME,
        PHONE = sales.PHONE,
        ADDRESSLINE = sales.ADDRESSLINE,
        CITY = sales.CITY,
        STATE = sales.STATE,
        COUNTRY = sales.COUNTRY,
        DEALSIZE = sales.DEALSIZE
        )
    db.add(sale)
    db.commit()
    db.refresh(sale)
    return sale

def retreive_sale(id: int, db: Session):
    sale = db.query(Sales_Data).filter(Sales_Data.ORDERNUMBER == id).first()
    return sale

def all_sales(db:Session):
    sales = db.query(Sales_Data)
    return sales