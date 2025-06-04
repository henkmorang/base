<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ChatGPT Conversations Viewer</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    .conversation {
      background: #fff;
      border-radius: .5rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
    }
    .message {
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: .25rem;
    }
    .user {
      background-color: #d4f0ff;
      border-left: 4px solid #0056b3;
    }
    .assistant {
      background-color: #fff5d4;
      border-left: 4px solid #ff9800;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: .5rem;
      text-align: left;
    }
  </style>
</head>
<body class="bg-light">
  <div class="container py-4">
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" id="userOnlyCheckbox">
      <label class="form-check-label" for="userOnlyCheckbox">Show only user messages</label>
    </div>
    <div id="conversation" class="conversation mb-3">
      <h1 class="h3 mb-3">ChatGPT Conversations</h1>
      <input class="form-control" type="file" id="fileInput" accept=".json">
    </div>
    <button id="loadMoreBtn" class="btn btn-primary">Load More</button>
  </div>
  <script src="script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
