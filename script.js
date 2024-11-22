let currentStartIndex = 0; // Start index for lazy loading
const BATCH_SIZE = 10; // Number of conversations to load per batch
let jsonData = []; // Variable to hold the JSON data

document.getElementById("fileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      jsonData = JSON.parse(e.target.result); // Parse JSON and store in global variable
      currentStartIndex = 0; // Reset start index
      document.getElementById("conversation").innerHTML = ""; // Clear previous conversations
      renderConversationsBatch(); // Render the first batch
      document.getElementById("loadMoreBtn").style.display = "block"; // Show "Load More" button
    };
    reader.readAsText(file);
  }
});

document.getElementById("userOnlyCheckbox").addEventListener("change", function () {
  // Re-render the current batch based on the checkbox state
  document.getElementById("conversation").innerHTML = ""; // Clear current display
  currentStartIndex = 0; // Reset index to reapply filter
  renderConversationsBatch();
});

function renderConversationsBatch() {
  const conversationDiv = document.getElementById("conversation");
  const endIndex = Math.min(currentStartIndex + BATCH_SIZE, jsonData.length);

  const showOnlyUser = document.getElementById("userOnlyCheckbox").checked;

  let messagesRendered = false; // Flag to track if any messages were added

  for (let i = currentStartIndex; i < endIndex; i++) {
    const thread = jsonData[i];
    const threadDiv = document.createElement("div");
    threadDiv.innerHTML = `<h2>Thread ${i + 1}: ${thread.title}</h2>`;

    Object.values(thread.mapping).forEach((node) => {
      if (node.message && node.message.content && Array.isArray(node.message.content.parts)) {
        const { role } = node.message.author;
        if (showOnlyUser && role !== "user") {
          return; // Skip non-user messages if the checkbox is checked
        }
        const parts = node.message.content.parts.join("\n");
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${role}`;
        messageDiv.innerHTML = `<strong>${role}:</strong> ${formatContent(parts)}`;
        threadDiv.appendChild(messageDiv);
        messagesRendered = true; // Mark that at least one message was rendered
      }
    });

    // Only append the thread if it has visible messages
    if (threadDiv.children.length > 1) {
      conversationDiv.appendChild(threadDiv);
    }
  }

  currentStartIndex = endIndex;

  // Show a message if no messages were rendered
  if (!messagesRendered) {
    conversationDiv.innerHTML = `<p>No messages to display.</p>`;
  }

  // Hide the "Load More" button if all conversations are loaded
  if (currentStartIndex >= jsonData.length) {
    document.getElementById("loadMoreBtn").style.display = "none";
  }
}

document.getElementById("loadMoreBtn").addEventListener("click", function () {
  renderConversationsBatch();
});

function formatContent(text) {
  // Check if the text contains a table structure like "| Column | Header |"
  if (isMarkdownTable(text)) {
    return markdownTableToHtml(text);
  }

  // Apply other formatting
  let formatted = text;

  // Convert headers (### Header -> <h3>Header</h3>)
  formatted = formatted.replace(/^###\s+(.*)$/gm, "<h3>$1</h3>");

  // Convert newlines to <br>
  formatted = formatted.replace(/\n/g, "<br>");

  // Bold text: **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Italic text: *text*
  formatted = formatted.replace(/\*(.*?)\*/g, "<i>$1</i>");

  // Inline code: `code`
  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Lists (Markdown style): - item
  formatted = formatted.replace(/^- (.+)/gm, "<ul><li>$1</li></ul>");

  // Links: [text](url)
  formatted = formatted.replace(/\[([^\]]+)]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  return formatted;
}

function isMarkdownTable(text) {
  // Check if text contains at least one line starting with "|"
  return text.includes("\n|") && text.includes("---");
}

function markdownTableToHtml(text) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return text; // Not enough lines for a table

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  // Process header
  const headers = lines[0].split("|").slice(1, -1); // Remove empty strings from edges
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header.trim();
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Process rows
  for (let i = 2; i < lines.length; i++) {
    const row = document.createElement("tr");
    const cells = lines[i].split("|").slice(1, -1); // Remove empty strings from edges
    cells.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell.trim();
      row.appendChild(td);
    });
    table.appendChild(row);
  }

  return table.outerHTML; // Return the table as an HTML string
}
