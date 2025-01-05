from fastapi import APIRouter

from apis.v1 import route_sales

api_router = APIRouter()
api_router.include_router(route_sales.router,prefix="",tags=["sales"])