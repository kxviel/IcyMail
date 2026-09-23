export type SearchHistoryRecord = {
  url: string;
  searchedAt: string;
};

const STORAGE_KEY = "crystal-index-search-history";
const HISTORY_LIMIT = 20;

export function getSearchHistory(): SearchHistoryRecord[] {
  try {
    const history: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");

    if (!Array.isArray(history)) return [];

    return history.filter(
      (record): record is SearchHistoryRecord =>
        typeof record === "object" &&
        record !== null &&
        "url" in record &&
        "searchedAt" in record &&
        typeof record.url === "string" &&
        typeof record.searchedAt === "string",
    );
  } catch {
    return [];
  }
}

export function setSearchHistory(history: SearchHistoryRecord[]) {
  if (history.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function recordCurrentSearch() {
  const url = window.location.pathname + window.location.search;
  const history = getSearchHistory().filter((record) => record.url !== url);

  setSearchHistory(
    [{ url, searchedAt: new Date().toISOString() }, ...history].slice(0, HISTORY_LIMIT),
  );
}
