import time
import jwt
from decouple import config
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

def token_response(token: str) -> dict:
    return {
        "access token": token
        }


def sign_JWT(userEmail: str, userRole: int) -> dict:
    payload = {
        "user_email": userEmail,
        "user_role": userRole,
        "expiration": time.time() + 1200
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decode_JWT(token: str):
    try:
      decode_token = jwt.decode(token, JWT_SECRET, algorithm=JWT_ALGORITHM)
      return decode_token if decode_token["expiration"] >= time.time() else None
    except:
       return {}
    
class jwtAdminBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
       super(jwtAdminBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtAdminBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            if payload["user_role"] == 1:
                isTokenValid = True
        return isTokenValid
    
class jwtUserBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
       super(jwtUserBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtUserBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            if payload["user_role"] == 2 :
                isTokenValid = True
        return isTokenValid
    
class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
       super(jwtBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid
    