# ShowYo

## Run
1) Copy `.env.example` to `.env.local` and fill values.
2) `npm i`
3) `npm run dev`
4) Visit `/` for the site; `/player` for the screen.

## TB60 launch
Portrait: `/player?w=1080&h=1920&fit=cover&zoom=1.02&rotate=90&overlay=1`  
Landscape: `/player?w=1920&h=1080&fit=cover&rotate=0`

## S3 CORS for presigned GET
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length"],
    "MaxAgeSeconds": 300
  }
]
