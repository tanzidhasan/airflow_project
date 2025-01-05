from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from fastapi import Depends
from typing import List
from schemas.sales_data import Sales_Data_Create, ShowSales
from db.session import get_db
from db.repository.sales import create_new_sale, retreive_sale, all_sales

router = APIRouter()


@router.post("/create_new_sale")
def create_sales(sales : Sales_Data_Create, db: Session = Depends(get_db)):
    sale = create_new_sale(sales=sales,db=db)
    return sale 


@router.get("/sales/{id}", response_model=ShowSales)
def get_sales(id: int, db: Session= Depends(get_db)):
    sale = retreive_sale(id=id, db=db)
    if not sale:
        raise HTTPException(detail=f"Sale with ID {id} does not exist.", status_code=status.HTTP_404_NOT_FOUND)
    return sale

@router.get("/sales", response_model=List[ShowSales])
def get_all_sales(db: Session= Depends(get_db)):
    sale = all_sales(db=db)
    if not sale:
        raise HTTPException(detail=f"No Sales exist.", status_code=status.HTTP_404_NOT_FOUND)
    return sale
    
