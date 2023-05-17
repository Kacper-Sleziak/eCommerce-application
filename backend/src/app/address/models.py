from typing import Optional
from pydantic import BaseModel

class CreateAddress(BaseModel):
      country: str
      region: str
      city: str
      postal_code: str
      street: str
      building: int
      flat: Optional[str]
      latitude: Optional[str]
      longitude: Optional[str]