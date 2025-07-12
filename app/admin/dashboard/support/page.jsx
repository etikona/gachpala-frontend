// app/dashboard/support/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Help & Support</h1>
          <p className="text-gray-400 mt-2">
            Get assistance and find answers to common questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Support Card */}
          <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-300" htmlFor="name">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300" htmlFor="subject">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Briefly describe your issue"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                  />
                </div>
                <div>
                  <Label className="text-gray-300" htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Detailed explanation of your problem"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 min-h-[180px] mt-2"
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Resources */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Support Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Documentation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Knowledge Base
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    Community Forum
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">API Services</p>
                      <p className="text-sm text-gray-400">
                        Backend connectivity
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      Operational
                    </Badge>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Database</p>
                      <p className="text-sm text-gray-400">
                        Primary storage system
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      Operational
                    </Badge>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">CDN Network</p>
                      <p className="text-sm text-gray-400">Content delivery</p>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      Degraded
                    </Badge>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Authentication</p>
                      <p className="text-sm text-gray-400">Login services</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-400">
                  How do I reset my password?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Go to Settings → Security → Password & Authentication. Enter
                  your current password and set a new one. Make sure it meets
                  the security requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-400">
                  Can I change my subscription plan?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Yes, you can upgrade or downgrade your subscription at any
                  time from the Billing section in Settings. Changes take effect
                  immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-400">
                  How do I enable two-factor authentication?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Navigate to Settings → Security → Two-Factor Authentication.
                  Choose your preferred method (authenticator app, SMS, or
                  security key) and follow the setup instructions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-400">
                  Where can I find API documentation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our comprehensive API documentation is available in the
                  Resources section. You can also download it as a PDF or view
                  interactive examples.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-white hover:no-underline hover:text-blue-400">
                  What is the average response time for support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  Our team typically responds to support requests within 1-2
                  business hours for premium accounts, and within 24 hours for
                  standard accounts.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
