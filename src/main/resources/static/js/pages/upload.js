import React from "https://esm.sh/react@18";
import { renderHeader } from "../components/layout.js";
import { escapeHtml } from "../utils.js";

export function UploadPage({ state }) {
  const options = state.subjects.map((subject) =>
    React.createElement("option", { key: subject.name, value: subject.name }, escapeHtml(subject.name)),
  );
  const files = state.subjects.flatMap((subject) =>
    subject.files.map((file) => ({ ...file, subject: subject.name })),
  );

  return React.createElement(
    React.Fragment,
    null,
    renderHeader("Upload study material", "Choose a subject and add a PDF or DOCX (up to 10 MB)."),
    React.createElement(
      "div",
      { className: "upload-layout" },
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement(
          "div",
          { className: "field" },
          React.createElement("label", { htmlFor: "upload-subject" }, "Subject"),
          React.createElement(
            "select",
            { id: "upload-subject" },
            ...options,
            React.createElement("option", { value: "__new__" }, "+ Create a new subject"),
          ),
        ),
        React.createElement(
          "div",
          { id: "drop-zone", className: "drop-zone", tabIndex: 0, role: "button", "aria-label": "Choose a PDF or DOCX file" },
          React.createElement(
            "div",
            null,
            React.createElement("div", { className: "drop-icon", "aria-hidden": "true" }, "📄"),
            React.createElement("strong", null, "Drag and drop a file here"),
            React.createElement(
              "p",
              null,
              "or ",
              React.createElement(
                "label",
                { className: "browse-label", htmlFor: "file-input" },
                "browse files",
                React.createElement("input", {
                  id: "file-input",
                  type: "file",
                  accept: ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }),
              ),
            ),
          ),
        ),
        React.createElement(
          "p",
          { className: "hint" },
          "Demo mode: files are listed in this browser only; text extraction requires a connected backend.",
        ),
      ),
      React.createElement(
        "div",
        { className: "upload-list" },
        files.length
          ? files.map((file) =>
              React.createElement(
                "section",
                { key: `${file.subject}-${file.name}`, className: "card upload-item" },
                React.createElement(
                  "div",
                  { className: "upload-top" },
                  React.createElement("div", { className: "file-name" }, escapeHtml(file.name)),
                  React.createElement("span", { className: "subject-chip" }, "Added"),
                ),
                React.createElement(
                  "div",
                  { className: "upload-progress" },
                  React.createElement("span", null),
                ),
                React.createElement(
                  "div",
                  { className: "upload-footnote" },
                  `${escapeHtml(file.subject)} · Stored in this browser demo`,
                ),
              ),
            )
          : React.createElement("section", { className: "card empty-state" }, "Your study materials will show up here."),
      ),
    ),
  );
}
