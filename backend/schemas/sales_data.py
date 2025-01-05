from pydantic import BaseModel,EmailStr, Field
from typing import Optional


class Sales_Data_Create(BaseModel):
    
    ORDERNUMBER : int = Field()
    SALES : float = Field()
    STATUS : str = Field()
    MONTH_ID : int = Field()
    YEAR_ID : int = Field()
    PRODUCTLINE : str = Field()
    CUSTOMERNAME : str = Field()
    PHONE : str = Field()
    ADDRESSLINE : str = Field()
    CITY : str = Field()
    STATE : str = Field()
    COUNTRY : str = Field()
    DEALSIZE : str = Field()


class ShowSales(BaseModel):
    ORDERNUMBER : int
    SALES : float
    STATUS : str
    MONTH_ID : int
    YEAR_ID : int
    PRODUCTLINE : str
    CUSTOMERNAME : str
    PHONE : str
    ADDRESSLINE : str
    CITY : str
    STATE : str
    COUNTRY : str
    DEALSIZE : str

    class Config():
        from_attributes = True