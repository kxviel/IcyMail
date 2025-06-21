"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Archive,
  Trash2,
  Star,
  Reply,
  Forward,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  avatar?: string;
}

const mockEmails: Email[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah.johnson@company.com",
    subject: "Q4 Marketing Strategy Review",
    preview:
      "Hi team, I've attached the Q4 marketing strategy document for your review. Please take a look and provide feedback by Friday...",
    content:
      "Hi team,\n\nI've attached the Q4 marketing strategy document for your review. Please take a look and provide feedback by Friday.\n\nKey points to consider:\n- Budget allocation for digital campaigns\n- Target audience segmentation\n- ROI projections\n\nLet me know if you have any questions.\n\nBest regards,\nSarah",
    date: "2 hours ago",
    isRead: false,
    isStarred: true,
    hasAttachment: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    sender: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "Security alert: New sign-in from Chrome on Windows",
    preview:
      "We noticed a new sign-in to your GitHub account from a device we don't recognize...",
    content:
      "We noticed a new sign-in to your GitHub account from a device we don't recognize.\n\nDevice: Chrome on Windows\nLocation: San Francisco, CA\nTime: Today at 2:30 PM\n\nIf this was you, you can safely ignore this email. If not, please secure your account immediately.",
    date: "4 hours ago",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
  },
  {
    id: "3",
    sender: "Alex Chen",
    senderEmail: "alex.chen@startup.io",
    subject: "Coffee chat next week?",
    preview:
      "Hey! Hope you're doing well. I'll be in town next week and would love to catch up over coffee...",
    content:
      "Hey!\n\nHope you're doing well. I'll be in town next week and would love to catch up over coffee.\n\nAre you free Tuesday or Wednesday afternoon? I know a great place downtown.\n\nLet me know!\n\nCheers,\nAlex",
    date: "Yesterday",
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    sender: "Newsletter Team",
    senderEmail: "newsletter@techweekly.com",
    subject: "This Week in Tech: AI Breakthroughs and More",
    preview:
      "Your weekly dose of tech news is here! This week we're covering the latest AI developments...",
    content:
      "Your weekly dose of tech news is here!\n\nThis week we're covering:\n- Latest AI developments\n- New startup funding rounds\n- Tech policy updates\n- Product launches\n\nRead the full newsletter at techweekly.com\n\nBest,\nThe Tech Weekly Team",
    date: "2 days ago",
    isRead: false,
    isStarred: false,
    hasAttachment: false,
  },
];

const folders = [
  { name: "Inbox", count: 2, active: true },
  { name: "Starred", count: 1, active: false },
  { name: "Sent", count: 0, active: false },
  { name: "Drafts", count: 3, active: false },
  { name: "Archive", count: 0, active: false },
  { name: "Trash", count: 0, active: false },
];

export default function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(
    mockEmails[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const filteredEmails = mockEmails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4">
          <Sheet open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <SheetTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Compose
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[600px] sm:w-[600px]">
              <SheetHeader>
                <SheetTitle>New Message</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input id="to" placeholder="recipient@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-[300px]"
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setIsComposeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsComposeOpen(false)}>Send</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {folders.map((folder) => (
              <Button
                key={folder.name}
                variant={folder.active ? "secondary" : "ghost"}
                className="w-full justify-between mb-1"
              >
                <span>{folder.name}</span>
                {folder.count > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {folder.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email List */}
      <div className="w-96 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="divide-y">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedEmail?.id === email.id ? "bg-muted" : ""
                } ${!email.isRead ? "border-l-2 border-l-blue-500" : ""}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={email.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {email.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate ${
                          !email.isRead ? "font-semibold" : ""
                        }`}
                      >
                        {email.sender}
                      </p>
                      <div className="flex items-center space-x-1">
                        {email.isStarred && (
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        )}
                        {email.hasAttachment && (
                          <div className="h-2 w-2 bg-muted-foreground rounded-full" />
                        )}
                      </div>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        !email.isRead ? "font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {email.preview}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {email.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Email Detail */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star
                      className={`h-4 w-4 ${
                        selectedEmail.isStarred
                          ? "fill-yellow-400 text-yellow-400"
                          : ""
                      }`}
                    />
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="ghost" size="icon">
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Forward className="h-4 w-4" />
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    <DropdownMenuItem>Add label</DropdownMenuItem>
                    <DropdownMenuItem>Block sender</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-semibold">
                  {selectedEmail.subject}
                </h1>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedEmail.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {selectedEmail.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedEmail.sender}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmail.senderEmail}
                    </p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    {selectedEmail.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <ScrollArea className="flex-1 p-6">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedEmail.content}
                </div>
              </div>
            </ScrollArea>

            {/* Reply Section */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Button>
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </Button>
                <Button variant="outline">
                  <Forward className="mr-2 h-4 w-4" />
                  Forward
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium">No email selected</h3>
              <p className="text-sm">
                Choose an email from the list to view its contents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
