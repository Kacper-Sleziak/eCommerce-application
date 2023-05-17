import time
import jwt
from decouple import config
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")
roles = {
    "admin": 1,
    "user": 2
    }

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
        try:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        except:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        is_token_valid = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            if payload["user_role"] == roles["admin"]:
                is_token_valid = True
        return is_token_valid
    
class jwtUserBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
       super(jwtUserBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtUserBearer, self).__call__(request)
        try:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        except:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        is_token_valid: bool = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            if payload["user_role"] == roles["user"]:
                is_token_valid = True
        return is_token_valid
    
class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
       super(jwtBearer, self).__init__(auto_error=auto_error)
    
    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer, self).__call__(request)
        try:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        except:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")
        
    def verify_jwt(self, jwtoken: str) -> bool:
        is_token_valid: bool = False
        try:
            payload = decode_JWT(jwtoken)
        except:
            payload = None
        if payload:
            is_token_valid = True
        return is_token_valid
    