import React from "https://esm.sh/react@18";
import { renderHeader } from "../components/layout.js";
import { button, escapeHtml } from "../utils.js";

export const sampleQuestions = [
  {
    question: "Which cell structure is known as the powerhouse of the cell?",
    answers: ["Nucleus", "Mitochondrion", "Cell membrane", "Ribosome"],
    correct: 1,
  },
  {
    question: "What is the main role of the cell membrane?",
    answers: [
      "Store genetic information",
      "Produce energy",
      "Control what enters and leaves the cell",
      "Make proteins",
    ],
    correct: 2,
  },
  {
    question: "Where is most of a cell's genetic material stored?",
    answers: ["Nucleus", "Cytoplasm", "Cell wall", "Mitochondrion"],
    correct: 0,
  },
];

export function QuizPage({ state }) {
  if (!state.quiz) {
    return React.createElement(
      React.Fragment,
      null,
      renderHeader("Quick quiz", "Choose a subject to practice what you know."),
      React.createElement(
        "section",
        { className: "card section-card" },
        React.createElement(
          "div",
          { className: "section-heading" },
          React.createElement(
            "div",
            null,
            React.createElement("h2", null, "Ready when you are"),
            React.createElement(
              "p",
              null,
              "Try a short sample quiz. Your study materials are not processed in demo mode.",
            ),
          ),
        ),
        React.createElement(
          "div",
          { className: "field" },
          React.createElement("label", { htmlFor: "quiz-subject" }, "Subject"),
          React.createElement(
            "select",
            { id: "quiz-subject" },
            state.subjects.map((subject) =>
              React.createElement("option", { key: subject.name }, escapeHtml(subject.name)),
            ),
          ),
        ),
        button("Start sample quiz", "start-quiz", "button-small"),
      ),
    );
  }

  const quiz = state.quiz;
  if (quiz.done) {
    return React.createElement(
      "section",
      { className: "card result-card" },
      React.createElement("div", { className: "result-icon" }, quiz.score >= 2 ? "🎉" : "💪"),
      React.createElement("div", { className: "eyebrow" }, "Quiz complete"),
      React.createElement("h2", null, `You scored ${quiz.score} out of ${sampleQuestions.length}`),
      React.createElement(
        "p",
        null,
        quiz.score >= 2
          ? "Nice work! Keep your momentum going."
          : "Every attempt helps. Review and give it another go.",
        " This was a sample quiz.",
      ),
      React.createElement(
        "div",
        { className: "study-actions", style: { justifyContent: "center" } },
        button("Try again", "start-quiz", "button-small"),
        button("Back to dashboard", "go-dashboard", "button-secondary button-small"),
      ),
    );
  }

  const question = sampleQuestions[quiz.index];
  return React.createElement(
    "section",
    { className: "card quiz-card" },
    React.createElement(
      "div",
      { className: "quiz-progress-head" },
      React.createElement("span", null, `${escapeHtml(quiz.subject)} · Sample quiz`),
      React.createElement("span", null, `Question ${quiz.index + 1} of ${sampleQuestions.length}`),
    ),
    React.createElement(
      "div",
      { className: "progress-track" },
      React.createElement("div", {
        className: "progress-fill",
        style: { width: `${((quiz.index + 1) / sampleQuestions.length) * 100}%` },
      }),
    ),
    React.createElement("h2", { className: "quiz-question" }, question.question),
    React.createElement(
      "div",
      { className: "answer-list" },
      question.answers.map((answer, index) =>
        React.createElement(
          "button",
          {
            key: `${answer}-${index}`,
            type: "button",
            className: `answer-option ${quiz.selected === index ? "selected" : ""} ${quiz.answered && index === question.correct ? "correct" : ""} ${quiz.answered && quiz.selected === index && index !== question.correct ? "incorrect" : ""}`,
            "data-answer": index,
            disabled: quiz.answered,
          },
          `${String.fromCharCode(65 + index)}. \u00A0${answer}`,
        ),
      ),
    ),
    React.createElement(
      "div",
      { className: "quiz-footer" },
      React.createElement(
        "span",
        { className: "hint" },
        quiz.answered
          ? quiz.selected === question.correct
            ? "That's right!"
            : `Review: ${question.answers[question.correct]}`
          : "Select your answer to continue.",
      ),
      button(
        quiz.index === sampleQuestions.length - 1 ? "See results" : "Next question",
        "next-question",
        "button-small",
      ),
    ),
  );
}
