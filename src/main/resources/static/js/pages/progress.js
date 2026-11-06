import React from "https://esm.sh/react@18";
import { renderHeader } from "../components/layout.js";

export function ProgressPage({ state }) {
  return React.createElement(
    React.Fragment,
    null,
    renderHeader("Your progress", "Every practice session gets you a little further."),
    React.createElement(
      "div",
      { className: "progress-layout" },
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement(
          "div",
          { className: "section-heading" },
          React.createElement(
            "div",
            null,
            React.createElement("h2", null, "Learning summary"),
            React.createElement("p", null, "Your StudyQuest demo stats"),
          ),
        ),
        React.createElement(
          "div",
          { className: "progress-summary" },
          React.createElement(
            "div",
            { className: "card stat-card" },
            React.createElement("div", { className: "stat-value" }, state.xp),
            React.createElement("div", { className: "stat-label" }, "total XP earned"),
          ),
          React.createElement(
            "div",
            { className: "card stat-card" },
            React.createElement("div", { className: "stat-value" }, state.quizzes),
            React.createElement("div", { className: "stat-label" }, "quizzes completed"),
          ),
          React.createElement(
            "div",
            { className: "card stat-card" },
            React.createElement("div", { className: "stat-value" }, `${state.average}%`),
            React.createElement("div", { className: "stat-label" }, "average score"),
          ),
          React.createElement(
            "div",
            { className: "card stat-card" },
            React.createElement("div", { className: "stat-value" }, `🔥 ${state.streak}`),
            React.createElement("div", { className: "stat-label" }, "day streak"),
          ),
        ),
      ),
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement(
          "div",
          { className: "section-heading" },
          React.createElement(
            "div",
            null,
            React.createElement("h2", null, "Study goals"),
            React.createElement("p", null, "A little progress adds up."),
          ),
        ),
        React.createElement(
          "div",
          { className: "profile-line" },
          React.createElement("span", null, "Weekly quiz goal"),
          React.createElement("strong", null, `${Math.min(state.quizzes, 5)} / 5`),
        ),
        React.createElement(
          "div",
          { className: "progress-track" },
          React.createElement("div", { className: "progress-fill", style: { width: `${Math.min(state.quizzes, 5) * 20}%` } }),
        ),
        React.createElement(
          "div",
          { className: "profile-line" },
          React.createElement("span", null, "Next level"),
          React.createElement("strong", null, `${state.xp % 100} / 100 XP`),
        ),
        React.createElement(
          "div",
          { className: "progress-track" },
          React.createElement("div", { className: "progress-fill", style: { width: `${state.xp % 100}%` } }),
        ),
      ),
    ),
  );
}
