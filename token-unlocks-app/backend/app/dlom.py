from scipy.stats import norm
from math import log, sqrt, exp

def calculate_dlom(S: float, K: float, T: float, r: float, sigma: float) -> float:
    d1 = (log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * sqrt(T))
    d2 = d1 - sigma * sqrt(T)
    put_price = K * exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    return put_price
