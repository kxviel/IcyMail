import {
  ArchiveIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  InboxIcon,
  MailIcon,
  MailPlusIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PencilIcon,
  RefreshCwIcon,
  ReplyIcon,
  SearchIcon,
  SendIcon,
  SnowflakeIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";

import Composer from "@/components/mail/Composer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FolderId = "inbox" | "starred" | "sent" | "drafts" | "archive" | "trash";

type Message = {
  id: number;
  folder: FolderId;
  sender: string;
  email: string;
  initials: string;
  avatar: string;
  subject: string;
  preview: string;
  date: string;
  fullDate: string;
  unread: boolean;
  starred: boolean;
  attachment?: string;
  body: string[];
};

const folders: Array<{
  id: FolderId;
  label: string;
  icon: typeof InboxIcon;
}> = [
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "starred", label: "Starred", icon: StarIcon },
  { id: "sent", label: "Sent", icon: SendIcon },
  { id: "drafts", label: "Drafts", icon: FileTextIcon },
  { id: "archive", label: "Archive", icon: ArchiveIcon },
  { id: "trash", label: "Trash", icon: Trash2Icon },
];

const initialMessages: Message[] = [
  {
    id: 1,
    folder: "inbox",
    sender: "Maya Chen",
    email: "maya@northstar.studio",
    initials: "MC",
    avatar: "bg-[#e7ddff] text-[#5a4395]",
    subject: "Notes from today’s design review",
    preview: "I pulled together the decisions we made and the two open questions…",
    date: "10:42",
    fullDate: "Today, 10:42 AM",
    unread: true,
    starred: true,
    attachment: "Review-notes.pdf · 1.2 MB",
    body: [
      "Hi Alex,",
      "I pulled together the decisions we made in today’s design review. The simplified navigation felt like the right direction, and the team agreed to keep the composer focused on the essentials.",
      "There are two open questions: whether archived conversations should stay in search results, and if we want keyboard shortcuts in the first release.",
      "I’ve attached the notes. Let me know if I missed anything.",
      "Maya",
    ],
  },
  {
    id: 2,
    folder: "inbox",
    sender: "Orbit Calendar",
    email: "updates@orbitcalendar.com",
    initials: "OC",
    avatar: "bg-[#dceff0] text-[#316f74]",
    subject: "Tomorrow: Product sync at 9:30",
    preview: "A reminder for your upcoming event with the product team.",
    date: "09:15",
    fullDate: "Today, 9:15 AM",
    unread: true,
    starred: false,
    body: [
      "This is a reminder that Product sync starts tomorrow at 9:30 AM.",
      "Location: Meeting room Cedar · Duration: 45 minutes",
    ],
  },
  {
    id: 3,
    folder: "inbox",
    sender: "Noah Williams",
    email: "noah.williams@example.com",
    initials: "NW",
    avatar: "bg-[#f5e4d0] text-[#8b5c27]",
    subject: "Re: Weekend plans",
    preview: "That works for me. I’ll book a table for seven and send the address.",
    date: "Yesterday",
    fullDate: "Yesterday, 6:21 PM",
    unread: false,
    starred: false,
    body: [
      "That works for me. I’ll book a table for seven and send the address once it’s confirmed.",
      "Looking forward to catching up!",
      "Noah",
    ],
  },
  {
    id: 4,
    folder: "inbox",
    sender: "Papertrail",
    email: "hello@papertrail.news",
    initials: "P",
    avatar: "bg-[#e8e8ed] text-[#52515b]",
    subject: "A calmer way to plan your week",
    preview: "This week: working with your attention instead of against it…",
    date: "Tue",
    fullDate: "Tuesday, 2:08 PM",
    unread: false,
    starred: true,
    body: [
      "This week, we’re looking at ways to work with your attention instead of against it.",
      "Start with one clear priority, leave room between meetings, and close the day by writing down the next small step.",
    ],
  },
  {
    id: 5,
    folder: "inbox",
    sender: "Elena Rossi",
    email: "elena@fieldwork.co",
    initials: "ER",
    avatar: "bg-[#f3dfe8] text-[#914665]",
    subject: "Photos from Copenhagen",
    preview: "Finally sorted the film scans—these were my favorites from the trip.",
    date: "Mon",
    fullDate: "Monday, 11:32 AM",
    unread: false,
    starred: false,
    attachment: "Copenhagen.zip · 18.4 MB",
    body: [
      "Hey Alex,",
      "I finally sorted the film scans. These were my favorites from the trip—the harbor shots turned out especially well.",
      "Hope you’re having a good week.",
      "Elena",
    ],
  },
  {
    id: 6,
    folder: "inbox",
    sender: "Buildroom",
    email: "notifications@buildroom.dev",
    initials: "BR",
    avatar: "bg-[#e2e8fa] text-[#455b97]",
    subject: "Release 2.4.0 is ready",
    preview: "Your production build completed successfully in 2m 14s.",
    date: "Sep 18",
    fullDate: "September 18, 4:52 PM",
    unread: false,
    starred: false,
    body: [
      "Release 2.4.0 completed successfully.",
      "Production build: 2m 14s · 248 checks passed · 0 warnings",
    ],
  },
  {
    id: 7,
    folder: "sent",
    sender: "Sam Reed",
    email: "sam@aurora.example",
    initials: "SR",
    avatar: "bg-[#e5ead7] text-[#60713b]",
    subject: "Project handoff",
    preview: "Everything is documented in the shared folder. Thanks again for the help.",
    date: "Sep 17",
    fullDate: "September 17, 1:20 PM",
    unread: false,
    starred: false,
    body: [
      "Hi Sam,",
      "Everything is documented in the shared folder. Thanks again for the help getting this across the line.",
      "Alex",
    ],
  },
  {
    id: 8,
    folder: "drafts",
    sender: "Draft",
    email: "",
    initials: "D",
    avatar: "bg-muted text-muted-foreground",
    subject: "Quarterly update",
    preview: "A quick look at what we shipped and what’s coming next…",
    date: "Sep 16",
    fullDate: "Last edited September 16",
    unread: false,
    starred: false,
    body: ["A quick look at what we shipped and what’s coming next…"],
  },
  {
    id: 9,
    folder: "archive",
    sender: "Lea Martin",
    email: "lea@example.com",
    initials: "LM",
    avatar: "bg-[#dff0e5] text-[#397052]",
    subject: "Coffee next week?",
    preview: "I’m nearby on Thursday afternoon if you have time.",
    date: "Sep 12",
    fullDate: "September 12, 3:40 PM",
    unread: false,
    starred: false,
    body: ["I’m nearby on Thursday afternoon if you have time for coffee.", "Lea"],
  },
];

function IconButton({
  label,
  children,
  className,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className={cn("text-muted-foreground hover:text-foreground", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default function Mail() {
  const [messages, setMessages] = useState(initialMessages);
  const [folder, setFolder] = useState<FolderId>("inbox");
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [mobileReading, setMobileReading] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return messages.filter((message) => {
      const inFolder = folder === "starred" ? message.starred : message.folder === folder;
      const matchesSearch =
        !normalizedQuery ||
        `${message.sender} ${message.subject} ${message.preview}`
          .toLowerCase()
          .includes(normalizedQuery);
      return inFolder && matchesSearch;
    });
  }, [folder, messages, query]);

  const selectedMessage =
    visibleMessages.find((message) => message.id === selectedId) ?? visibleMessages[0];
  const unreadCount = messages.filter(
    (message) => message.folder === "inbox" && message.unread,
  ).length;

  const chooseFolder = (nextFolder: FolderId) => {
    setFolder(nextFolder);
    setQuery("");
    const nextMessage = messages.find((message) =>
      nextFolder === "starred" ? message.starred : message.folder === nextFolder,
    );
    if (nextMessage) setSelectedId(nextMessage.id);
    setMobileReading(false);
  };

  const selectMessage = (message: Message) => {
    setSelectedId(message.id);
    setMobileReading(true);
    setMessages((current) =>
      current.map((item) => (item.id === message.id ? { ...item, unread: false } : item)),
    );
  };

  const toggleStar = (messageId: number) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === messageId ? { ...message, starred: !message.starred } : message,
      ),
    );
  };

  const moveSelected = (destination: FolderId) => {
    if (!selectedMessage) return;
    setMessages((current) =>
      current.map((message) =>
        message.id === selectedMessage.id ? { ...message, folder: destination } : message,
      ),
    );
    setNotice(destination === "trash" ? "Moved to trash" : "Conversation archived");
    window.setTimeout(() => setNotice(""), 2200);
    setMobileReading(false);
  };

  return (
    <main className="bg-background flex h-svh min-h-[520px] w-full overflow-hidden">
      <aside className="bg-card hidden w-[72px] shrink-0 flex-col border-r md:flex xl:w-[232px]">
        <div className="flex h-[72px] items-center gap-3 border-b px-4 xl:px-5">
          <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center">
            <SnowflakeIcon className="size-5" />
          </span>
          <div className="hidden min-w-0 xl:block">
            <p className="truncate text-sm font-semibold tracking-tight">Icy Mail</p>
            <p className="text-muted-foreground truncate text-[11px]">alex@example.com</p>
          </div>
        </div>

        <div className="p-3 xl:p-4">
          <Button
            type="button"
            onClick={() => setComposerOpen(true)}
            className="h-10 w-full px-0 xl:justify-start xl:px-3"
            aria-label="Compose a new message"
          >
            <PencilIcon />
            <span className="hidden xl:inline">Compose</span>
          </Button>
        </div>

        <nav aria-label="Mail folders" className="flex flex-1 flex-col gap-0.5 px-2 xl:px-3">
          {folders.map((item) => {
            const Icon = item.icon;
            const active = folder === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => chooseFolder(item.id)}
                aria-current={active ? "page" : undefined}
                title={item.label}
                className={cn(
                  "text-muted-foreground flex h-10 items-center justify-center gap-3 px-3 text-sm transition-colors xl:justify-start",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-[18px] shrink-0" />
                <span className="hidden xl:inline">{item.label}</span>
                {item.id === "inbox" && unreadCount > 0 ? (
                  <span className="bg-primary text-primary-foreground ml-auto hidden min-w-5 px-1.5 py-0.5 text-center text-[10px] font-semibold xl:inline">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center border-t p-3 xl:px-4">
          <span className="bg-secondary hidden size-9 shrink-0 items-center justify-center text-xs font-semibold xl:flex">
            AR
          </span>
          <div className="ml-3 hidden min-w-0 xl:block">
            <p className="truncate text-xs font-medium">Alex Rivera</p>
            <p className="text-muted-foreground truncate text-[10px]">Personal inbox</p>
          </div>
          <div className="mx-auto xl:mr-0 xl:ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <section
        aria-label={`${folders.find((item) => item.id === folder)?.label} messages`}
        className={cn(
          "bg-card flex w-full shrink-0 flex-col border-r md:w-[328px] lg:w-[372px]",
          mobileReading && "hidden md:flex",
        )}
      >
        <header className="flex h-[72px] shrink-0 items-center border-b px-4">
          <div className="mr-3 md:hidden">
            <span className="bg-primary text-primary-foreground flex size-9 items-center justify-center">
              <SnowflakeIcon className="size-4" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-semibold">
                {folders.find((item) => item.id === folder)?.label}
              </h1>
              <ChevronDownIcon className="text-muted-foreground size-3.5" />
            </div>
            <p className="text-muted-foreground mt-0.5 text-[11px]">
              {visibleMessages.length} conversation{visibleMessages.length === 1 ? "" : "s"}
            </p>
          </div>
          <IconButton label="Refresh messages" className="ml-auto">
            <RefreshCwIcon />
          </IconButton>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setComposerOpen(true)}
            aria-label="Compose a new message"
          >
            <MailPlusIcon />
          </Button>
        </header>

        <div className="flex h-[60px] shrink-0 items-center gap-2 border-b px-3">
          <label className="bg-muted/75 focus-within:ring-ring flex h-9 min-w-0 flex-1 items-center gap-2 px-3 focus-within:ring-1">
            <SearchIcon className="text-muted-foreground size-4 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search mail"
              aria-label="Search mail"
              className="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-xs outline-none"
            />
          </label>
          <IconButton label="Message list options">
            <MenuIcon />
          </IconButton>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {visibleMessages.length > 0 ? (
            visibleMessages.map((message) => {
              const selected = selectedMessage?.id === message.id;
              return (
                <article
                  key={message.id}
                  className={cn(
                    "group relative flex min-h-[102px] border-b transition-colors",
                    selected ? "bg-accent/75" : "hover:bg-muted/60",
                  )}
                >
                  {selected ? (
                    <span className="bg-primary absolute inset-y-0 left-0 w-0.5" />
                  ) : null}
                  <button
                    type="button"
                    onClick={() => selectMessage(message)}
                    className="flex min-w-0 flex-1 gap-3 py-3 pr-1 pl-4 text-left"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center text-[11px] font-semibold",
                        message.avatar,
                      )}
                    >
                      {message.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start gap-2">
                        <span
                          className={cn(
                            "min-w-0 flex-1 truncate text-xs",
                            message.unread
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {message.sender}
                        </span>
                        <span className="text-muted-foreground shrink-0 pt-0.5 text-[10px]">
                          {message.date}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 block truncate text-xs",
                          message.unread ? "font-semibold" : "font-medium",
                        )}
                      >
                        {message.subject}
                      </span>
                      <span className="text-muted-foreground mt-1 line-clamp-1 text-[11px] leading-4">
                        {message.preview}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleStar(message.id)}
                    className="mr-2 flex w-7 shrink-0 items-center justify-center"
                    aria-label={message.starred ? "Remove star" : "Star message"}
                  >
                    <StarIcon
                      className={cn(
                        "size-3.5",
                        message.starred
                          ? "fill-[#c3932e] text-[#c3932e]"
                          : "text-muted-foreground/50 group-hover:text-muted-foreground",
                      )}
                    />
                  </button>
                </article>
              );
            })
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center px-6 text-center">
              <MailIcon className="mb-3 size-7 opacity-50" />
              <p className="text-foreground text-sm font-medium">Nothing here</p>
              <p className="mt-1 text-xs">Try another folder or search term.</p>
            </div>
          )}
        </div>
      </section>

      <section
        aria-label="Message detail"
        className={cn(
          "bg-background min-w-0 flex-1 flex-col",
          mobileReading ? "flex" : "hidden md:flex",
        )}
      >
        {selectedMessage ? (
          <>
            <header className="flex h-[72px] shrink-0 items-center border-b px-3 sm:px-5">
              <IconButton
                label="Back to message list"
                className="md:hidden"
                onClick={() => setMobileReading(false)}
              >
                <ArrowLeftIcon />
              </IconButton>
              <div className="hidden md:block">
                <IconButton label="Collapse navigation">
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <div className="bg-border mx-2 hidden h-5 w-px sm:block" />
              <IconButton label="Archive" onClick={() => moveSelected("archive")}>
                <ArchiveIcon />
              </IconButton>
              <IconButton label="Move to trash" onClick={() => moveSelected("trash")}>
                <Trash2Icon />
              </IconButton>
              <span className="flex-1" />
              <span className="text-muted-foreground mr-2 hidden text-[11px] lg:inline">
                {Math.max(
                  1,
                  visibleMessages.findIndex((item) => item.id === selectedMessage.id) + 1,
                )}{" "}
                of {Math.max(visibleMessages.length, 1)}
              </span>
              <IconButton label="Previous message">
                <ChevronLeftIcon />
              </IconButton>
              <IconButton label="Next message">
                <ChevronRightIcon />
              </IconButton>
              <IconButton label="More actions">
                <MoreHorizontalIcon />
              </IconButton>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <article className="mx-auto w-full max-w-4xl px-5 py-7 sm:px-8 sm:py-9 lg:px-12">
                <div className="flex items-start gap-4">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center text-xs font-semibold sm:size-12",
                      selectedMessage.avatar,
                    )}
                  >
                    {selectedMessage.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{selectedMessage.sender}</p>
                        <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
                          {selectedMessage.email
                            ? `to me · ${selectedMessage.email}`
                            : "Unfinished draft"}
                        </p>
                      </div>
                      <time className="text-muted-foreground hidden pt-0.5 text-[11px] sm:block">
                        {selectedMessage.fullDate}
                      </time>
                      <IconButton
                        label={selectedMessage.starred ? "Remove star" : "Star message"}
                        onClick={() => toggleStar(selectedMessage.id)}
                      >
                        <StarIcon
                          className={cn(selectedMessage.starred && "fill-[#c3932e] text-[#c3932e]")}
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>

                <div className="mt-7 border-b pb-7 sm:mt-9 sm:pb-8">
                  <p className="text-muted-foreground mb-2 text-[10px] font-semibold tracking-[0.12em] uppercase">
                    Subject
                  </p>
                  <h2 className="max-w-3xl text-xl leading-tight font-semibold tracking-[-0.02em] sm:text-2xl">
                    {selectedMessage.subject}
                  </h2>
                </div>

                <div className="max-w-3xl py-7 text-[14px] leading-7 sm:py-9 sm:text-[15px] sm:leading-8">
                  {selectedMessage.body.map((paragraph, index) => (
                    <p key={`${selectedMessage.id}-${index}`} className="mb-5 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {selectedMessage.attachment ? (
                  <button
                    type="button"
                    className="hover:bg-muted flex w-full max-w-sm items-center gap-3 border px-4 py-3 text-left transition-colors"
                  >
                    <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center">
                      <PaperclipIcon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-medium">
                        {selectedMessage.attachment.split(" · ")[0]}
                      </span>
                      <span className="text-muted-foreground mt-0.5 block text-[10px]">
                        {selectedMessage.attachment.split(" · ")[1]}
                      </span>
                    </span>
                  </button>
                ) : null}

                <div className="mt-10 flex gap-2 border-t pt-6">
                  <Button type="button" variant="outline" onClick={() => setComposerOpen(true)}>
                    <ReplyIcon data-icon="inline-start" />
                    Reply
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setComposerOpen(true)}>
                    Forward
                  </Button>
                </div>
              </article>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
            <MailIcon className="mb-3 size-8 opacity-50" />
            <p className="text-sm">Select a message to read it.</p>
          </div>
        )}
      </section>

      {notice ? (
        <div
          role="status"
          className="bg-foreground text-background fixed bottom-5 left-1/2 z-40 -translate-x-1/2 px-4 py-2 text-xs shadow-lg"
        >
          {notice}
        </div>
      ) : null}

      <Composer
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onSend={(recipient, subject) => {
          setNotice(`Sent “${subject}” to ${recipient}`);
          window.setTimeout(() => setNotice(""), 2800);
        }}
      />
    </main>
  );
}
