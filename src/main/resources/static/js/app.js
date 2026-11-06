import React, { useEffect, useRef, useState } from "https://esm.sh/react@18";
import { createRoot } from "https://esm.sh/react-dom@18/client";
import { navItems, renderShell } from "./components/layout.js";
import { DashboardPage } from "./pages/dashboard.js";
import { LoginPage } from "./pages/login.js";
import { ProgressPage } from "./pages/progress.js";
import { QuizPage, sampleQuestions } from "./pages/quiz.js";
import { SettingsPage } from "./pages/settings.js";
import { SubjectsPage } from "./pages/subjects.js";
import { UploadPage } from "./pages/upload.js";
import { state, saveState } from "./state.js";
import { initialsName } from "./utils.js";

const app = document.querySelector("#app");
const root = createRoot(app);

function App() {
  const [version, setVersion] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimer = useRef(null);

  const refreshView = () => setVersion((current) => current + 1);

  const showToast = (message) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(""), 3200);
  };

  const persistState = () => {
    if (!saveState()) showToast("Your browser couldn't save this demo session.");
  };

  const renderPageContent = () => {
    if (state.page === "login") return React.createElement(LoginPage);

    const views = {
      dashboard: DashboardPage,
      upload: UploadPage,
      subjects: SubjectsPage,
      quiz: QuizPage,
      progress: ProgressPage,
      settings: SettingsPage,
    };

    const Page = views[state.active] || DashboardPage;
    return renderShell({
      content: React.createElement(Page, { state }),
      state,
    });
  };

  const startQuiz = (subjectName) => {
    const select = document.querySelector("#quiz-subject");
    const subject =
      subjectName || select?.value || state.subjects[0]?.name || "Biology 101";
    state.active = "quiz";
    state.quiz = {
      subject,
      index: 0,
      selected: null,
      answered: false,
      score: 0,
      done: false,
    };
    refreshView();
  };

  const addFiles = (fileList) => {
    const subjectSelect = document.querySelector("#upload-subject");
    let subjectName = subjectSelect?.value || state.subjects[0]?.name;
    if (subjectName === "__new__") {
      subjectName = window.prompt("Name your new subject:");
      if (!subjectName?.trim()) return;
      subjectName = subjectName.trim();
    }
    if (!subjectName) {
      showToast("Create a subject before adding a study material.");
      return;
    }
    let subject = state.subjects.find(
      (item) => item.name.toLowerCase() === subjectName.toLowerCase(),
    );
    if (!subject) {
      subject = { name: subjectName, files: [] };
      state.subjects.push(subject);
    }
    const validFiles = [...fileList].filter((file) => {
      const validType = /\.(pdf|docx)$/i.test(file.name);
      if (!validType) showToast(`${file.name}: choose a PDF or DOCX file.`);
      else if (file.size > 10 * 1024 * 1024)
        showToast(`${file.name}: the maximum file size is 10 MB.`);
      return validType && file.size <= 10 * 1024 * 1024;
    });
    validFiles.forEach((file) =>
      subject.files.push({ name: file.name, date: "Added just now" }),
    );
    if (validFiles.length) {
      persistState();
      showToast(
        `${validFiles.length} ${validFiles.length === 1 ? "material added" : "materials added"} to ${subject.name}.`,
      );
    }
    refreshView();
  };

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const handleSubmit = (event) => {
    if (event.target.id === "profile-form") {
      event.preventDefault();
      const name = String(new FormData(event.target).get("name") || "")
        .trim()
        .replace(/\s+/g, " ");
      if (!name) {
        showToast("Enter a name before saving.");
        return;
      }
      state.name = name;
      persistState();
      refreshView();
      showToast("Profile name updated.");
      return;
    }
    if (event.target.id !== "login-form") return;
    event.preventDefault();
    const form = new FormData(event.target);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const error = document.querySelector("#login-error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.textContent = "Please enter a valid email address.";
      return;
    }
    if (password.length < 8) {
      error.textContent = "Your password must be at least 8 characters.";
      return;
    }
    state.email = email;
    state.name = initialsName(email.split("@")[0].replace(/[._-]+/g, " "));
    state.page = "app";
    state.active = "dashboard";
    persistState();
    refreshView();
  };

  const handleChange = async (event) => {
    const control = event.target;
    if (control.id === "file-input" && control.files?.length) {
      addFiles(control.files);
      control.value = "";
      return;
    }

    const setting = control.dataset.setting;
    if (!setting) return;

    if (setting === "browserNotifications" && control.checked) {
      if (!("Notification" in window)) {
        showToast("Browser notifications aren't supported in this browser.");
        refreshView();
        return;
      }
      if (Notification.permission === "default") {
        try {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            showToast("Allow notifications in your browser to enable this setting.");
            refreshView();
            return;
          }
        } catch (error) {
          console.warn("Browser notification permission could not be requested.", error);
          showToast("Couldn't request browser notification permission.");
          refreshView();
          return;
        }
      } else if (Notification.permission !== "granted") {
        showToast("Allow notifications in your browser to enable this setting.");
        refreshView();
        return;
      }
    }

    state.settings[setting] =
      control.type === "checkbox" ? control.checked : control.value;
    persistState();
    refreshView();
  };

  const handleClick = (event) => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) {
      if (!navItems.some((item) => item.id === pageButton.dataset.page)) return;
      state.active = pageButton.dataset.page;
      if (state.active !== "quiz") state.quiz = null;
      refreshView();
      return;
    }
    const answerButton = event.target.closest("[data-answer]");
    if (answerButton && state.quiz && !state.quiz.answered) {
      const choice = Number(answerButton.dataset.answer);
      state.quiz.selected = choice;
      state.quiz.answered = true;
      if (choice === sampleQuestions[state.quiz.index].correct) state.quiz.score++;
      refreshView();
      return;
    }
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === "create-account") {
      showToast(
        "Account creation needs a connected backend. You can try the local demo with any email.",
      );
    } else if (action === "go-upload") {
      state.active = "upload";
      refreshView();
    } else if (action === "go-dashboard") {
      state.active = "dashboard";
      state.quiz = null;
      refreshView();
    } else if (action === "logout") {
      state.email = "";
      state.page = "login";
      state.active = "dashboard";
      state.quiz = null;
      persistState();
      refreshView();
    } else if (action === "new-subject") {
      const name = window.prompt("What would you like to call this subject?");
      if (name?.trim()) {
        if (
          state.subjects.some(
            (subject) =>
              subject.name.toLowerCase() === name.trim().toLowerCase(),
          )
        ) {
          showToast("That subject already exists.");
        } else {
          state.subjects.push({ name: name.trim(), files: [] });
          persistState();
          refreshView();
        }
      }
    } else if (action.startsWith("quiz-subject-")) {
      const index = Number(action.slice("quiz-subject-".length));
      startQuiz(state.subjects[index]?.name);
    } else if (action === "start-quiz") {
      startQuiz();
    } else if (action === "weak-topics") {
      showToast("Finish a few quizzes to find topics to practice.");
    } else if (action === "next-question" && state.quiz) {
      if (!state.quiz.answered) {
        showToast("Choose an answer to continue.");
        return;
      }
      if (state.quiz.index === sampleQuestions.length - 1) {
        state.quiz.done = true;
        state.quizzes++;
        state.xp += state.quiz.score * 10;
        state.average = Math.round(
          (state.average * (state.quizzes - 1) +
            (state.quiz.score / sampleQuestions.length) * 100) /
            state.quizzes,
        );
        persistState();
      } else {
        state.quiz.index++;
        state.quiz.selected = null;
        state.quiz.answered = false;
      }
      refreshView();
    }
  };

  const handleDragOver = (event) => {
    if (event.target.closest("#drop-zone")) {
      event.preventDefault();
      const zone = document.querySelector("#drop-zone");
      zone?.classList.add("drag-over");
    }
  };

  const handleDragLeave = (event) => {
    if (
      event.target.closest("#drop-zone") &&
      !event.target.closest("#drop-zone").contains(event.relatedTarget)
    ) {
      document.querySelector("#drop-zone")?.classList.remove("drag-over");
    }
  };

  const handleDrop = (event) => {
    if (!event.target.closest("#drop-zone")) return;
    event.preventDefault();
    document.querySelector("#drop-zone")?.classList.remove("drag-over");
    if (event.dataTransfer?.files?.length) addFiles(event.dataTransfer.files);
  };

  const handleKeyDown = (event) => {
    if (
      event.target.id === "drop-zone" &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      document.querySelector("#file-input")?.click();
    }
  };

  return React.createElement(
    "div",
    {
      className: "react-app-root",
      onSubmit: handleSubmit,
      onChange: handleChange,
      onClick: handleClick,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onKeyDown: handleKeyDown,
    },
    renderPageContent(),
    toastMessage
      ? React.createElement("div", { className: "toast", role: "status" }, toastMessage)
      : null,
  );
}

root.render(React.createElement(App));
