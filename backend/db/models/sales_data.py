from datetime import datetime
from sqlalchemy import Column, Integer, Text, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship

from db.base_class import Base


class Sales_Data(Base):
    ORDERNUMBER = Column(Integer, primary_key=True)
    SALES = Column(Float)
    STATUS= Column(String)
    MONTH_ID = Column(Integer)
    YEAR_ID = Column(Integer)
    PRODUCTLINE = Column(String)
    CUSTOMERNAME = Column(String)
    PHONE = Column(String)
    ADDRESSLINE = Column(String)
    CITY = Column(String)
    STATE = Column(String)
    COUNTRY = Column(String)
    DEALSIZE = Column(String)
