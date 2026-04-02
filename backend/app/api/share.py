from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.core.database import files_col

router = APIRouter()

@router.get("/{token}")
async def access_shared_file(token: str):
    file = await files_col.find_one({"share_token": token})
    if not file or file.get("share_expires_at", datetime.min) < datetime.utcnow():
        raise HTTPException(status_code=404, detail="Link expired or invalid")
        
    url = f"https://wasd-y3xb.onrender.com/uploaded/{file['s3_key']}"
    return {"download_url": url}

