const storageKey = "studyquest-demo-v1";

const defaultState = {
  name: "",
  email: "",
  page: "login",
  active: "dashboard",
  xp: 85,
  quizzes: 5,
  average: 68,
  streak: 3,
  settings: {
    dailyReminder: true,
    reminderTime: "19:00",
    emailReminder: true,
    browserNotifications: false,
  },
  subjects: [
    {
      name: "Biology 101",
      files: [{ name: "Cell Biology Notes.pdf", date: "Uploaded today" }],
    },
    { name: "Chemistry 110", files: [] },
  ],
  quiz: null,
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved && Array.isArray(saved.subjects)) {
      return {
        ...defaultState,
        ...saved,
        settings: { ...defaultState.settings, ...saved.settings },
        page: saved.email ? "app" : "login",
      };
    }
  } catch (error) {
    console.warn("StudyQuest demo data could not be loaded.", error);
  }
  return structuredClone(defaultState);
}

export const state = loadState();

export function saveState() {
  try {
    const { quiz, ...persistentState } = state;
    localStorage.setItem(storageKey, JSON.stringify(persistentState));
    return true;
  } catch (error) {
    console.warn("StudyQuest demo data could not be saved.", error);
    return false;
  }
}
