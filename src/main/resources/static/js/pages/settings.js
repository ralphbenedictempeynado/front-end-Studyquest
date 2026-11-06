import React from "https://esm.sh/react@18";
import { renderHeader } from "../components/layout.js";
import { button, escapeHtml } from "../utils.js";

export function SettingsPage({ state }) {
  const level = Math.floor(state.xp / 100) + 1;
  const nextLevelXp = level * 100;
  const xpInLevel = state.xp % 100;

  return React.createElement(
    React.Fragment,
    null,
    renderHeader("Profile and settings", "Make StudyQuest yours."),
    React.createElement(
      "div",
      { className: "settings-layout" },
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement("div", { className: "settings-card-heading" }, React.createElement("h2", null, "Profile")),
        React.createElement(
          "form",
          { id: "profile-form" },
          React.createElement(
            "div",
            { className: "field" },
            React.createElement("label", { htmlFor: "profile-name" }, "Display name"),
            React.createElement("input", {
              id: "profile-name",
              name: "name",
              type: "text",
              defaultValue: state.name,
              maxLength: 60,
              autoComplete: "name",
              required: true,
            }),
          ),
          React.createElement(
            "div",
            { className: "field" },
            React.createElement("label", { htmlFor: "profile-email" }, "Email"),
            React.createElement("input", {
              id: "profile-email",
              type: "email",
              defaultValue: state.email,
              readOnly: true,
            }),
          ),
          React.createElement("button", { className: "button button-small", type: "submit" }, "Save changes"),
        ),
      ),
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement("div", { className: "settings-card-heading" }, React.createElement("h2", null, "Study reminders")),
        React.createElement(
          "div",
          { className: "reminder-settings" },
          React.createElement(
            "label",
            { className: "reminder-row", htmlFor: "daily-reminder" },
            React.createElement("span", null, "Daily reminder"),
            React.createElement("input", {
              id: "daily-reminder",
              className: "switch-input",
              type: "checkbox",
              role: "switch",
              "data-setting": "dailyReminder",
              defaultChecked: state.settings.dailyReminder,
            }),
            React.createElement("span", { className: "switch", "aria-hidden": "true" }),
          ),
          React.createElement(
            "div",
            { className: "field reminder-time" },
            React.createElement("label", { htmlFor: "reminder-time" }, "Time"),
            React.createElement("input", {
              id: "reminder-time",
              type: "time",
              defaultValue: state.settings.reminderTime,
              "data-setting": "reminderTime",
              disabled: !state.settings.dailyReminder,
            }),
          ),
          React.createElement(
            "label",
            { className: "reminder-row", htmlFor: "email-reminder" },
            React.createElement("span", null, "Email"),
            React.createElement("input", {
              id: "email-reminder",
              className: "switch-input",
              type: "checkbox",
              role: "switch",
              "data-setting": "emailReminder",
              defaultChecked: state.settings.emailReminder,
            }),
            React.createElement("span", { className: "switch", "aria-hidden": "true" }),
          ),
          React.createElement(
            "label",
            { className: "reminder-row", htmlFor: "browser-notifications" },
            React.createElement("span", null, "Browser notification"),
            React.createElement("input", {
              id: "browser-notifications",
              className: "switch-input",
              type: "checkbox",
              role: "switch",
              "data-setting": "browserNotifications",
              defaultChecked: state.settings.browserNotifications,
            }),
            React.createElement("span", { className: "switch", "aria-hidden": "true" }),
          ),
        ),
      ),
      React.createElement(
        "section",
        { className: "card section-card level-summary" },
        React.createElement(
          "div",
          { className: "level-summary-copy" },
          React.createElement("strong", null, `Level ${level} · ${state.xp} XP`),
          React.createElement("span", null, `Level ${level + 1} at ${nextLevelXp} XP`),
        ),
        React.createElement(
          "div",
          { className: "progress-track" },
          React.createElement("div", { className: "progress-fill", style: { width: `${xpInLevel}%` } }),
        ),
        React.createElement(
          "div",
          { className: "level-summary-foot" },
          React.createElement("span", null, `${xpInLevel} / 100 XP to next level`),
          React.createElement("span", null, `${state.streak}-day streak`),
        ),
      ),
      React.createElement(
        "section",
        { className: "card section-card settings-logout" },
        React.createElement(
          "div",
          null,
          React.createElement("h2", null, "Sign out"),
          React.createElement(
            "p",
            null,
            "Return to the login screen on this device. Your demo progress and materials will stay saved in this browser.",
          ),
        ),
        button("Log out", "logout", "button-danger"),
      ),
    ),
  );
}
