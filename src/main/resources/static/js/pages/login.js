import React from "https://esm.sh/react@18";
import { brand } from "../components/layout.js";

export function LoginPage() {
  return React.createElement(
    "section",
    { className: "login-page" },
    React.createElement(
      "div",
      { className: "welcome-panel" },
      React.createElement("div", { className: "brand" }, brand()),
      React.createElement("h1", null, "Turn your notes into quizzes."),
      React.createElement(
        "p",
        null,
        "Upload your materials, practice actively, earn XP, level up and keep your streak.",
      ),
      React.createElement(
        "div",
        { className: "welcome-note" },
        React.createElement("span", null, "✦"),
        React.createElement("span", null, "Small study sessions. Big progress."),
      ),
    ),
    React.createElement(
      "div",
      { className: "login-panel" },
      React.createElement(
        "form",
        { className: "login-card", id: "login-form", noValidate: true },
        React.createElement("h2", null, "Welcome back"),
        React.createElement("p", null, "Log in or create an account to continue."),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement("label", { htmlFor: "email" }, "Email"),
          React.createElement("input", {
            id: "email",
            name: "email",
            type: "email",
            autoComplete: "email",
            placeholder: "you@school.edu",
            required: true,
          }),
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement(
            "label",
            { htmlFor: "password" },
            "Password ",
            React.createElement("span", { className: "hint" }, "(8+ characters)"),
          ),
          React.createElement("input", {
            id: "password",
            name: "password",
            type: "password",
            autoComplete: "current-password",
            minLength: 8,
            placeholder: "Enter your password",
            required: true,
          }),
        ),
        React.createElement("div", { id: "login-error", className: "error-message", role: "alert" }),
        React.createElement(
          "button",
          { className: "button", style: { width: "100%" }, type: "submit" },
          "Log in",
        ),
        React.createElement(
          "div",
          { className: "login-switch" },
          "New here? ",
          React.createElement(
            "button",
            { className: "link-button", type: "button", "data-action": "create-account" },
            "Create an account",
          ),
        ),
      ),
    ),
  );
}
