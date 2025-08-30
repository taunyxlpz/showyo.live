import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const { contentType } = await req.json();
  if (!process.env.S3_BUCKET) {
    return NextResponse.json({ error: 'S3 not configured' }, { status: 500 });
  }
  const key = `${new Date().toISOString().slice(0,10)}/${randomUUID()}`;
  const cmd = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType || 'application/octet-stream',
    ACL: 'public-read', // remove if bucket is private
  });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 60 }); // 60s
  const publicUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return NextResponse.json({ uploadUrl: url, publicUrl, key });
}
