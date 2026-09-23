import { useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getSearchHistory, setSearchHistory, type SearchHistoryRecord } from "@/lib/searchHistory";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function getSearchLabel(url: string) {
  return new URL(url, window.location.origin).searchParams.get("search")?.trim() || "All materials";
}

export function SearchHistory({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [history, setHistory] = useState<SearchHistoryRecord[]>([]);

  useEffect(() => {
    if (open) setHistory(getSearchHistory());
  }, [open]);

  const removeRecord = (url: string) => {
    const nextHistory = history.filter((record) => record.url !== url);
    setHistory(nextHistory);
    setSearchHistory(nextHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    setSearchHistory([]);
  };

  const openSearch = (url: string) => {
    onOpenChange(false);
    void navigate({ href: url });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="border-b pr-12">
          <SheetTitle>Search history</SheetTitle>
          <SheetDescription>Your 20 most recent searches on this device.</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-y-auto px-4">
          {history.length > 0 ? (
            <ul className="divide-border/70 divide-y">
              {history.map((record) => (
                <li key={record.url} className="flex items-center gap-2 py-3">
                  <button
                    type="button"
                    className="hover:text-primary focus-visible:outline-ring min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => openSearch(record.url)}
                  >
                    <span className="block truncate text-sm font-medium">
                      {getSearchLabel(record.url)}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-xs">
                      {dateFormatter.format(new Date(record.searchedAt))}
                    </span>
                  </button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${getSearchLabel(record.url)} from history`}
                    onClick={() => removeRecord(record.url)}
                  >
                    <Trash2 />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground my-auto text-center text-sm">
              Your search history is empty.
            </p>
          )}
        </div>

        <SheetFooter className="border-t sm:flex-row">
          {history.length > 0 && (
            <Button variant="ghost" className="text-destructive" onClick={clearHistory}>
              Clear history
            </Button>
          )}
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
