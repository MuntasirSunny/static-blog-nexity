import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const secret = req.headers.get("x-upload-secret");
  const validSecret = process.env.UPLOAD_SECRET;

  if (secret !== validSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const content = Buffer.from(arrayBuffer).toString("utf-8");
  const filename = file.name;

  // Now push to GitHub
  const githubToken = process.env.GITHUB_TOKEN!;
  const repo = process.env.GITHUB_REPO!;
  const branch = process.env.GITHUB_BRANCH!;
  const path = `blogs/${filename}`;

  // Check if file exists (to get SHA)
  const existing = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  let sha: string | undefined;
  if (existing.ok) {
    const data = await existing.json();
    sha = data.sha;
  }

  const payload = {
    message: `Upload ${filename}`,
    content: Buffer.from(content).toString("base64"),
    branch,
    ...(sha && { sha }),
  };

  const upload = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!upload.ok) {
    const error = await upload.json();
    return NextResponse.json({ error }, { status: upload.status });
  }

  const result = await upload.json();
  return NextResponse.json({ success: true, url: result.content.html_url });
}
