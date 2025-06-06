"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Brain,
  Bell,
  Key,
  Shield,
  Palette,
  Save,
  RotateCcw,
  Mail,
  Phone,
  Building,
  MapPin,
  Camera,
  Target,
  Clock,
  Zap,
  ChevronRight,
  Smartphone,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    role: "Senior Product Manager",
    location: "San Francisco, CA",
    bio: "Experienced product manager focused on conversation analytics and team collaboration."
  });

  const [analysisSettings, setAnalysisSettings] = useState({
    confidenceThreshold: 70,
    autoAnalyze: false,
    textAnalysis: true,
    voiceAnalysis: true,
    emotionDetection: true,
    contextualUnderstanding: true,
    modelType: "comprehensive"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: false,
    phoneNotifications: true,
    analysisComplete: true,
    highRiskOutcomes: true,
    weeklySummary: false,
    frequency: "immediate"
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalysisChange = (field: string, value: any) => {
    setAnalysisSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Settings</span>
        </div>

        {/* Main Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
                  Manage your PulsePredict preferences and configuration
        </p>
      </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex">
              Auto-save enabled
            </Badge>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Settings Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-8"
      >
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal details and profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback className="text-2xl">
                  {profile.firstName[0]}{profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Profile Photo</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a new avatar to personalize your account
                </p>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="company"
                    className="pl-10"
                    value={profile.company}
                    onChange={(e) => handleProfileChange("company", e.target.value)}
                    placeholder="Enter your company"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Job Title</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => handleProfileChange("role", e.target.value)}
                  placeholder="Enter your job title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  className="pl-10"
                  value={profile.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Analysis Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Analysis Configuration
            </CardTitle>
            <CardDescription>
              Configure AI model preferences and analysis behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <Label htmlFor="model-type">Analysis Model</Label>
                <Select
                  value={analysisSettings.modelType}
                  onValueChange={(value) => handleAnalysisChange("modelType", value)}
                >
                  <SelectTrigger id="model-type">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fast">Fast Analysis</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive (Recommended)</SelectItem>
                  <SelectItem value="detailed">Highly Detailed</SelectItem>
                </SelectContent>
              </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                  <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                    {analysisSettings.confidenceThreshold}%
                  </span>
                </div>
                <Slider
                  id="confidence-threshold"
                  min={50}
                  max={95}
                  step={5}
                  value={[analysisSettings.confidenceThreshold]}
                  onValueChange={(value) => handleAnalysisChange("confidenceThreshold", value[0])}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-analyze">Auto-Analyze Uploads</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically begin analysis when files are uploaded
                </p>
              </div>
              <Switch
                id="auto-analyze"
                checked={analysisSettings.autoAnalyze}
                onCheckedChange={(checked) => handleAnalysisChange("autoAnalyze", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Analysis Features</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "textAnalysis", label: "Text Content Analysis", desc: "Analyze conversation text and language patterns" },
                  { key: "voiceAnalysis", label: "Voice Tone Analysis", desc: "Analyze vocal patterns and tone changes" },
                  { key: "emotionDetection", label: "Emotion Detection", desc: "Identify emotional states and sentiment changes" },
                  { key: "contextualUnderstanding", label: "Contextual Understanding", desc: "Understand conversation context and relationships" }
                ].map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label htmlFor={feature.key} className="cursor-pointer">
                        {feature.label}
                      </Label>
              <p className="text-xs text-muted-foreground">
                        {feature.desc}
                      </p>
                    </div>
                    <Switch
                      id={feature.key}
                      checked={analysisSettings[feature.key as keyof typeof analysisSettings] as boolean}
                      onCheckedChange={(checked) => handleAnalysisChange(feature.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                { key: "emailNotifications", icon: Mail, label: "Email Notifications", desc: "Receive updates via email" },
                { key: "browserNotifications", icon: Globe, label: "Browser Notifications", desc: "Show desktop notifications" },
                { key: "phoneNotifications", icon: Smartphone, label: "Mobile Notifications", desc: "Send notifications to mobile app" }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <setting.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <Label>{setting.label}</Label>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                    onCheckedChange={(checked) => handleNotificationChange(setting.key, checked)}
                  />
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Notification Events</Label>
              <div className="space-y-3">
                {[
                  { key: "analysisComplete", label: "Analysis Complete" },
                  { key: "highRiskOutcomes", label: "High Risk Outcomes" },
                  { key: "weeklySummary", label: "Weekly Summary" }
                ].map((event) => (
                  <div key={event.key} className="flex items-center space-x-3">
                    <Checkbox
                      id={event.key}
                      checked={notificationSettings[event.key as keyof typeof notificationSettings] as boolean}
                      onCheckedChange={(checked) => handleNotificationChange(event.key, checked)}
                    />
                    <label htmlFor={event.key} className="text-sm font-medium">
                      {event.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select
                value={notificationSettings.frequency}
                onValueChange={(value) => handleNotificationChange("frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Integrations
            </CardTitle>
            <CardDescription>
              Connect external services and manage API access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Connected Services</h3>

              <div className="space-y-3">
                {[
                  { name: "Zoom", desc: "Video conference integration", color: "bg-blue-100", textColor: "text-blue-600", initial: "Z" },
                  { name: "Microsoft Teams", desc: "Meeting recordings access", color: "bg-blue-100", textColor: "text-blue-600", initial: "T" },
                  { name: "Slack", desc: "Chat history analysis", color: "bg-green-100", textColor: "text-green-600", initial: "S" }
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${service.color} flex items-center justify-center`}>
                        <span className={`${service.textColor} text-sm font-bold`}>{service.initial}</span>
                </div>
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.desc}</p>
                </div>
                </div>
                    <Button variant="ghost" size="sm">
                      Connect
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <div className="flex justify-end pt-6">
          <Button size="lg" className="px-8">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
      </div>
      </motion.div>
    </div>
  );
}