import React from "https://esm.sh/react@18";

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

export function initialsName(value) {
  return value.trim().split(/\s+/).slice(0, 2).join(" ") || "Alex";
}

export function button(label, action, style = "", props = {}) {
  const className = ["button", style].filter(Boolean).join(" ");
  return React.createElement(
    "button",
    {
      type: "button",
      className,
      "data-action": action,
      ...props,
    },
    label,
  );
}
