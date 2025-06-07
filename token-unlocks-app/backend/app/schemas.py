from pydantic import BaseModel

class DLOMRequest(BaseModel):
    token: str
    amount: float
    spot_price: float
    volatility: float
    unlock_date: str  # ISO format YYYY-MM-DD

class DLOMResponse(BaseModel):
    dlom_price: float
    total_value: float
