import React from "https://esm.sh/react@18";
import { renderHeader, renderStats } from "../components/layout.js";
import { button, escapeHtml } from "../utils.js";

export function DashboardPage({ state }) {
  const subject = state.subjects.find((item) => item.files.length) || state.subjects[0];
  const file = subject?.files[0];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const heights = [34, 56, 42, 72, 49, 88, 63];

  return React.createElement(
    React.Fragment,
    null,
    renderHeader(
      `Hi, ${escapeHtml(state.name.split(" ")[0])} 👋`,
      "Keep your streak going today.",
      button("Upload material", "go-upload", "button-small"),
    ),
    renderStats(state),
    React.createElement(
      "section",
      { className: "card section-card" },
      React.createElement(
        "div",
        { className: "section-heading" },
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, "Continue studying"),
          React.createElement(
            "p",
            null,
            file ? `${escapeHtml(file.name)} · Last score 67%` : "Add a study material to start your learning streak.",
          ),
        ),
        subject ? React.createElement("span", { className: "subject-chip" }, escapeHtml(subject.name)) : null,
      ),
      React.createElement(
        "div",
        { className: "study-actions" },
        button("Take a new quiz", "start-quiz", "button-small"),
        button("Practice weak topics", "weak-topics", "button-secondary button-small"),
      ),
    ),
    React.createElement(
      "div",
      { className: "dashboard-grid" },
      React.createElement(
        "section",
        { className: "card chart-card" },
        React.createElement(
          "div",
          { className: "section-heading" },
          React.createElement("h3", null, "XP this week"),
        ),
        React.createElement(
          "div",
          { className: "bar-chart", "aria-label": "XP activity this week" },
          days.map((day, index) =>
            React.createElement(
              "div",
              { key: day + index, className: "bar-column" },
              React.createElement("div", {
                className: `bar ${index === 6 ? "today" : ""}`,
                style: { height: `${heights[index]}%` },
              }),
              React.createElement("span", null, ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]),
            ),
          ),
        ),
      ),
      React.createElement(
        "section",
        { className: "card calendar-card" },
        React.createElement(
          "div",
          { className: "section-heading" },
          React.createElement("h3", null, "Streak calendar"),
        ),
        React.createElement(
          "div",
          { className: "calendar-grid" },
          days.map((day, index) =>
            React.createElement(
              "div",
              { key: day + index, className: "calendar-day" },
              day,
              React.createElement(
                "div",
                { className: `calendar-date ${index < state.streak ? "done" : ""} ${index === 6 ? "today" : ""}` },
                index + 1,
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "section",
      { className: "card section-card" },
      React.createElement(
        "div",
        { className: "section-heading" },
        React.createElement("h3", null, "Your badges"),
      ),
      React.createElement(
        "div",
        { className: "badges-row" },
        React.createElement("span", { className: "badge" }, "🚀 First quiz"),
        React.createElement("span", { className: "badge" }, `🔥 ${state.streak}-day streak`),
        React.createElement("span", { className: "badge" }, "🎯 Perfect focus"),
      ),
    ),
    React.createElement(
      "div",
      { className: "card unlock-note" },
      "🔒 Unlocks: Fill-in-the-blank at Level 3 · Identification at Level 4 · Hard difficulty at Level 5",
    ),
  );
}
