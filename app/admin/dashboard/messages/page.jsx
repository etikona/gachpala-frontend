// app/admin/dashboard/messages/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Mail,
  MailOpen,
  Reply,
  Archive,
  Trash2,
  User,
  Send,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample message data
  const messages = [
    {
      id: "MSG-001",
      sender: "John Smith",
      email: "john@example.com",
      subject: "Order #ORD-001 issue",
      preview: "Hi, I have not received my order yet...",
      date: "2023-06-15",
      read: false,
      category: "support",
    },
    {
      id: "MSG-002",
      sender: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "Partnership inquiry",
      preview: "I represent GreenLeaf Nurseries and would like to discuss...",
      date: "2023-06-16",
      read: true,
      category: "business",
    },
    {
      id: "MSG-003",
      sender: "Michael Brown",
      email: "michael@example.com",
      subject: "Account suspension",
      preview: "Why was my account suspended? I did not violate any...",
      date: "2023-06-16",
      read: false,
      category: "support",
    },
    {
      id: "MSG-004",
      sender: "Plant Commerce Team",
      email: "team@plantcommerce.com",
      subject: "New feature announcement",
      preview: "We are excited to announce our new bulk ordering system...",
      date: "2023-06-17",
      read: true,
      category: "announcement",
    },
    {
      id: "MSG-005",
      sender: "Emily Davis",
      email: "emily@example.com",
      subject: "Return request #RTN-045",
      preview: "I received damaged goods and would like to initiate...",
      date: "2023-06-18",
      read: false,
      category: "support",
    },
  ];

  const statusBadge = (category) => {
    switch (category) {
      case "support":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Support
          </Badge>
        );
      case "business":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Business
          </Badge>
        );
      case "announcement":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Announcement
          </Badge>
        );
      default:
        return <Badge>General</Badge>;
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    // Mark as read when selected
    if (!message.read) {
      message.read = true;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
          Message Center
        </h1>
        <p className="text-gray-400 mt-1">
          Manage communications with users and sellers
        </p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          className={`bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 backdrop-blur-md border ${
            activeTab === "inbox" ? "border-indigo-500" : "border-indigo-800/30"
          } cursor-pointer`}
          onClick={() => setActiveTab("inbox")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Inbox
            </CardTitle>
            <Mail className="h-5 w-5 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>3 unread messages</span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 backdrop-blur-md border ${
            activeTab === "sent"
              ? "border-emerald-500"
              : "border-emerald-800/30"
          } cursor-pointer`}
          onClick={() => setActiveTab("sent")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Sent
            </CardTitle>
            <Send className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Last sent 2 hours ago</span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-amber-900/40 to-amber-800/20 backdrop-blur-md border ${
            activeTab === "drafts" ? "border-amber-500" : "border-amber-800/30"
          } cursor-pointer`}
          onClick={() => setActiveTab("drafts")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Drafts
            </CardTitle>
            <span className="h-5 w-5 text-amber-400">📝</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Last saved yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-md border ${
            activeTab === "archived" ? "border-red-500" : "border-red-800/30"
          } cursor-pointer`}
          onClick={() => setActiveTab("archived")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Archived
            </CardTitle>
            <Archive className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">127</div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <span>Last archived 1 week ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <Button
                variant="ghost"
                className="ml-3 bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {isFilterOpen ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-all ${
                    selectedMessage?.id === message.id ? "bg-gray-800/60" : ""
                  } ${!message.read ? "border-l-4 border-indigo-500" : ""}`}
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="" alt={message.sender} />
                      <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        {message.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3
                          className={`font-medium truncate ${
                            !message.read ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {message.sender}
                        </h3>
                        <span className="text-xs text-gray-500 ml-2">
                          {message.date}
                        </span>
                      </div>
                      <p className="font-semibold text-white truncate mt-1">
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-400 truncate mt-1">
                        {message.preview}
                      </p>
                      <div className="mt-2">
                        {statusBadge(message.category)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="bg-gray-800/30 backdrop-blur-md border border-gray-700 lg:col-span-2">
          <CardContent className="p-0 h-full">
            {selectedMessage ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex items-center mt-1">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-300">
                          {selectedMessage.sender}
                        </span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-gray-400">
                          {selectedMessage.email}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
                  <div className="prose prose-invert max-w-none">
                    <p>Hi Admin Team,</p>
                    <p className="mt-4">
                      I am writing regarding my recent order (#ORD-001). I
                      placed this order on June 10th and it was marked as
                      shipped on June 12th, but I still have not received it.
                      The tracking information has not been updated in 5 days.
                    </p>
                    <p className="mt-4">
                      Could you please look into this and let me know the
                      current status of my shipment? I was really looking
                      forward to receiving these plants for my garden renovation
                      project.
                    </p>
                    <p className="mt-4">Thank you for your assistance,</p>
                    <p>John Smith</p>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-700">
                  <Textarea
                    placeholder="Type your reply here..."
                    className="bg-gray-800/50 border-gray-700 text-white min-h-[100px] mb-3"
                  />
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-gray-300 hover:text-white"
                    >
                      Save Draft
                    </Button>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <MailOpen className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No Message Selected
                </h3>
                <p className="text-gray-500">
                  Select a message from the list to view its contents
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
