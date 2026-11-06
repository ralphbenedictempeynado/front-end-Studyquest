import React from "https://esm.sh/react@18";
import { escapeHtml } from "../utils.js";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⌂" },
  { id: "upload", label: "Upload", icon: "↥" },
  { id: "subjects", label: "Subjects", icon: "▤" },
  { id: "quiz", label: "Quiz", icon: "✎" },
  { id: "progress", label: "Progress", icon: "◴" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export function brand() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }, "🎯"),
    React.createElement("span", null, "StudyQuest"),
  );
}

export function renderShell({ content, state }) {
  const level = Math.floor(state.xp / 100) + 1;
  const withinLevel = state.xp % 100;

  return React.createElement(
    "div",
    { className: "app-shell" },
    React.createElement(
      "aside",
      { className: "sidebar" },
      React.createElement("div", { className: "brand" }, brand()),
      React.createElement(
        "nav",
        { className: "nav-list", "aria-label": "Main navigation" },
        navItems.map((item) =>
          React.createElement(
            "button",
            {
              key: item.id,
              type: "button",
              className: `nav-link ${state.active === item.id ? "active" : ""}`,
              "data-page": item.id,
              "aria-current": state.active === item.id ? "page" : "false",
            },
            React.createElement("span", { className: "nav-icon", "aria-hidden": "true" }, item.icon),
            React.createElement("span", null, item.label),
          ),
        ),
      ),
      React.createElement(
        "div",
        { className: "profile-card" },
        React.createElement(
          "div",
          { className: "profile-line" },
          React.createElement("strong", null, `Level ${level}`),
          React.createElement("span", null, `${withinLevel} / 100 XP`),
        ),
        React.createElement(
          "div",
          { className: "progress-track" },
          React.createElement("div", { className: "progress-fill", style: { width: `${withinLevel}%` } }),
        ),
        React.createElement(
          "div",
          { className: "profile-meta" },
          "🔥 ",
          `${state.streak}-day streak`,
          React.createElement("br", null),
          escapeHtml(state.name),
        ),
      ),
    ),
    React.createElement("section", { className: "workspace" }, content),
  );
}

export function renderHeader(title, subtitle, action = null) {
  return React.createElement(
    "header",
    { className: "page-header" },
    React.createElement(
      "div",
      null,
      React.createElement("div", { className: "eyebrow" }, "Your learning space"),
      React.createElement("h1", null, title),
      React.createElement("p", null, subtitle),
    ),
    action,
  );
}

export function renderStats(state) {
  const level = Math.floor(state.xp / 100) + 1;
  return React.createElement(
    "div",
    { className: "stats-grid" },
    React.createElement(
      "div",
      { className: "card stat-card" },
      React.createElement("div", { className: "stat-value" }, `Level ${level}`),
      React.createElement("div", { className: "stat-label" }, `${state.xp % 100} / 100 XP to next level`),
    ),
    React.createElement(
      "div",
      { className: "card stat-card" },
      React.createElement("div", { className: "stat-value" }, `🔥 ${state.streak}`),
      React.createElement("div", { className: "stat-label" }, "day streak"),
    ),
    React.createElement(
      "div",
      { className: "card stat-card" },
      React.createElement("div", { className: "stat-value" }, `${state.quizzes}`),
      React.createElement("div", { className: "stat-label" }, "quizzes completed"),
    ),
    React.createElement(
      "div",
      { className: "card stat-card" },
      React.createElement("div", { className: "stat-value" }, `${state.average}%`),
      React.createElement("div", { className: "stat-label" }, "average score"),
    ),
  );
}
