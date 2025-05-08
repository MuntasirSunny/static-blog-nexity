# 📝 Techno Blog

Techno Blog is a modern blogging platform powered by **Markdown**, **GitHub**, and **Vercel**. Authors can write blog posts in Markdown, upload them securely, and trigger automatic deployments — no CMS required.

---

## 🚀 Features

- Write blog posts in `.md` files
- Embed local (`/public`) or external images
- Secure file uploads via API with secret key
- GitHub integration using the Content API
- Auto-deploy via Vercel on upload

---

## ✍️ How to Publish a Blog Post

### 1. Write Your Blog Post in Markdown

Create a Markdown file using any editor:

```markdown
# My First Post

Welcome to **Techno Blog**!

## Highlights

- Markdown formatting
- List support
- Image embedding

![Banner](/images/banner.jpg)

External images also work:

![External](https://example.com/image.png)
```

---

### 2. Embed Images

You can embed:

- **Local images** stored in `/public` (e.g., `/images/my-image.jpg`)
- **External images** from trusted domains

#### For External Images:

Add allowed domains to `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    domains: ["example.com", "cdn.example.com"],
  },
};
```

---

### 3. Upload the Markdown File

Use the API endpoint to upload your blog post:

```
POST /api/upload-md
```

#### Required Header

Add a secret header to authenticate your upload:

```http
x-upload-secret: YOUR_UPLOAD_SECRET
```

#### Payload

Send a `multipart/form-data` request with your `.md` file:

- Field: `file`
- Value: Your `.md` file

---

### 4. GitHub Integration

Uploaded posts are:

- Committed to the **`main` branch** of your GitHub repo
- Saved inside the `/blogs` folder
- Automatically deployed by **Vercel**

---

## 🛡️ Security

- All uploads require a secret key via `x-upload-secret` header
- Unauthorized requests will be rejected with `401 Unauthorized`

---

## ✅ Deployment Workflow

1. Markdown file is uploaded via API
2. File is pushed to GitHub using the Content API
3. GitHub commit triggers a Vercel deployment
4. Blog post is live 🚀

---

## 📂 Folder Structure

```
/blogs           # Markdown source files
/public/images   # Locally hosted images
/pages/api       # API for file upload
/utils           # Markdown and GitHub helpers
```

---

## 👨‍💻 Built With

- **Next.js** – React Framework
- **Tailwind CSS** – Styling
- **markdown-to-jsx** – Markdown rendering
- **gray-matter** – Frontmatter parsing
- **GitHub Content API** – Remote file commits
- **Vercel** – Hosting and CI/CD

---

## 🔗 Author

Made with ❤️ by [Muntasir Sunny](https://muntasirsunny.vercel.app/)

---
