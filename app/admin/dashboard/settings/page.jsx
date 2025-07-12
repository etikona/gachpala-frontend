// app/dashboard/settings/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Dashboard Settings
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your account and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="border-2 border-blue-500">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback className="bg-gray-800 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">John Doe</p>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="bg-gray-800 border border-gray-700 p-1 rounded-lg">
            <TabsTrigger
              value="account"
              className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Preferences
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="px-4 py-2 rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-300" htmlFor="firstName">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          defaultValue="John"
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300" htmlFor="lastName">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          defaultValue="Doe"
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300" htmlFor="email">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@example.com"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300" htmlFor="position">
                        Position
                      </Label>
                      <Input
                        id="position"
                        defaultValue="Administrator"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profile Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-6">
                    <Avatar className="w-24 h-24 border-2 border-blue-500">
                      <AvatarImage src="/avatar.jpg" />
                      <AvatarFallback className="bg-gray-700 text-white text-2xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <p className="font-medium text-white">John Doe</p>
                      <p className="text-sm text-gray-400">Administrator</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="bg-transparent text-white border-gray-600 hover:bg-gray-700"
                      >
                        Change
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Password & Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label
                        className="text-gray-300"
                        htmlFor="currentPassword"
                      >
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300" htmlFor="newPassword">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                      />
                    </div>
                    <div>
                      <Label
                        className="text-gray-300"
                        htmlFor="confirmPassword"
                      >
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-500 mt-2"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">
                          Authenticator App
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Use an authenticator app for 2FA
                        </p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">
                          SMS Verification
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Receive codes via SMS
                        </p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">Security Keys</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Use hardware security keys
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="bg-transparent text-white border-gray-600 hover:bg-gray-700"
                      >
                        Add Key
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
