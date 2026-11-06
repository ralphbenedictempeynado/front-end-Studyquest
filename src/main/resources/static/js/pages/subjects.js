import React from "https://esm.sh/react@18";
import { renderHeader } from "../components/layout.js";
import { button, escapeHtml } from "../utils.js";

function SubjectCards({ state }) {
  if (!state.subjects.length) {
    return React.createElement(
      "div",
      { className: "card empty-state" },
      React.createElement("span", { "aria-hidden": "true" }, "📚"),
      React.createElement("strong", null, "No subjects yet"),
      "Make a subject to organize your study materials.",
    );
  }

  return React.createElement(
    React.Fragment,
    null,
    ...state.subjects.map((subject, index) =>
      React.createElement(
        "section",
        { key: subject.name, className: "card subject-card" },
        React.createElement(
          "div",
          { className: "subject-title-row" },
          React.createElement("h2", null, escapeHtml(subject.name)),
          React.createElement(
            "span",
            { className: "subject-chip" },
            `${subject.files.length} ${subject.files.length === 1 ? "material" : "materials"}`,
          ),
        ),
        subject.files.length
          ? subject.files.map((file) =>
              React.createElement(
                "div",
                { key: `${subject.name}-${file.name}`, className: "material-row" },
                React.createElement(
                  "div",
                  { className: "file-meta" },
                  React.createElement("div", { className: "file-name" }, `📄 ${escapeHtml(file.name)}`),
                  React.createElement("span", null, escapeHtml(file.date)),
                ),
                React.createElement(
                  "div",
                  { className: "study-actions" },
                  button("Generate quiz", `quiz-subject-${index}`, "button-small"),
                ),
              ),
            )
          : React.createElement(
              "div",
              { className: "material-row" },
              React.createElement("div", { className: "file-meta" }, "No materials added yet."),
              button("Add material", "go-upload", "button-secondary button-small"),
            ),
      ),
    ),
  );
}

export function SubjectsPage({ state }) {
  return React.createElement(
    React.Fragment,
    null,
    renderHeader(
      "Subjects",
      "Pick a material to generate a quiz.",
      button("+ New subject", "new-subject", "button-secondary button-small"),
    ),
    React.createElement("div", { className: "content-stack" }, React.createElement(SubjectCards, { state })),
  );
}
