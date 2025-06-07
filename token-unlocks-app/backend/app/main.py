from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import DLOMRequest, DLOMResponse
from app.dlom import calculate_dlom
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/calculate_dlom", response_model=DLOMResponse)
def calc_dlom(data: DLOMRequest):
    today = datetime.utcnow().date()
    unlock_date = datetime.strptime(data.unlock_date, "%Y-%m-%d").date()
    t = (unlock_date - today).days / 365
    if t <= 0:
        return DLOMResponse(dlom_price=data.spot_price, total_value=data.amount * data.spot_price)
    price = calculate_dlom(data.spot_price, data.spot_price, t, 0.03, data.volatility)
    return DLOMResponse(dlom_price=round(data.spot_price - price, 2), total_value=round((data.spot_price - price) * data.amount, 2))