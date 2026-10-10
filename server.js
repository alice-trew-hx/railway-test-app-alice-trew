// A tiny web app with zero dependencies, so there's nothing to install or break.
// It uses Node's built-in http module. The ONE thing that matters for Railway:
// the app must listen on the port Railway gives it, via process.env.PORT.

const http = require("http");

const PORT = process.env.PORT || 3000;

const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Railway test app</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 640px;
      margin: 0 auto;
      padding: 48px 24px;
      line-height: 1.5;
    }
    h1 { font-size: 1.6rem; margin-bottom: 0.25rem; }
    .sub { opacity: 0.7; margin-top: 0; }
    .card {
      border: 1px solid rgba(128,128,128,0.3);
      border-radius: 12px;
      padding: 20px;
      margin-top: 28px;
    }
    textarea {
      width: 100%;
      min-height: 80px;
      border-radius: 8px;
      border: 1px solid rgba(128,128,128,0.4);
      padding: 10px;
      font: inherit;
      box-sizing: border-box;
    }
    button {
      margin-top: 12px;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background: #6c5ce7;
      color: white;
      font: inherit;
      cursor: pointer;
    }
    #output { margin-top: 16px; font-weight: 600; }
    .ok { color: #2e9e5b; }
  </style>
</head>
<body>
  <h1>It works. 🎉</h1>
  <p class="sub">This page is being served live from Railway.</p>

  <div class="card">
    <p><strong>Quick interactivity test</strong> — type something and hit the button.
    This proves a user can enter and change data in the page (the foundation of the
    "see it, correct it" idea for MEDDPICC).</p>
    <textarea id="input" placeholder="e.g. Economic buyer: Jane Smith, CFO"></textarea>
    <button id="btn">Save (demo)</button>
    <div id="output"></div>
  </div>

  <script>
    document.getElementById("btn").addEventListener("click", function () {
      var val = document.getElementById("input").value.trim();
      var out = document.getElementById("output");
      if (!val) { out.textContent = "Type something first."; out.className = ""; return; }
      out.textContent = "Captured: \"" + val + "\"  (in a real app this would push to Salesforce)";
      out.className = "ok";
    });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(page);
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
