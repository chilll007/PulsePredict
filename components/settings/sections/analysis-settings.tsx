"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Settings, Target, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AnalysisSettings() {
  const [settings, setSettings] = useState({
    confidenceThreshold: 70,
    autoAnalyze: false,
    textAnalysis: true,
    voiceAnalysis: true,
    emotionDetection: true,
    contextualUnderstanding: true,
    modelType: "comprehensive",
    analysisDepth: "standard"
  });

  const handleSliderChange = (field: string, value: number[]) => {
    setSettings(prev => ({ ...prev, [field]: value[0] }));
  };

  const handleSwitchChange = (field: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* AI Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Model Configuration
          </CardTitle>
          <CardDescription>
            Choose the AI model and analysis depth for your conversation predictions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="model-type">Analysis Model</Label>
              <Select
                value={settings.modelType}
                onValueChange={(value) => handleSelectChange("modelType", value)}
              >
                <SelectTrigger id="model-type">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">
                    <div className="space-y-1">
                      <div className="font-medium">Fast Analysis</div>
                      <div className="text-xs text-muted-foreground">Quick results, basic insights</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="comprehensive">
                    <div className="space-y-1">
                      <div className="font-medium">Comprehensive</div>
                      <div className="text-xs text-muted-foreground">Balanced speed and accuracy</div>
                    </div>
                  </SelectItem>
                  <SelectItem value="detailed">
                    <div className="space-y-1">
                      <div className="font-medium">Highly Detailed</div>
                      <div className="text-xs text-muted-foreground">Deep analysis, slower processing</div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Recommended</Badge>
                <span className="text-xs text-muted-foreground">
                  Comprehensive model offers the best balance
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="analysis-depth">Analysis Depth</Label>
              <Select
                value={settings.analysisDepth}
                onValueChange={(value) => handleSelectChange("analysisDepth", value)}
              >
                <SelectTrigger id="analysis-depth">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface Level</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="deep">Deep Analysis</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Deeper analysis provides more insights but takes longer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Analysis Parameters
          </CardTitle>
          <CardDescription>
            Fine-tune the analysis behavior and confidence thresholds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
                  {settings.confidenceThreshold}%
                </span>
              </div>
              <Slider
                id="confidence-threshold"
                min={50}
                max={95}
                step={5}
                value={[settings.confidenceThreshold]}
                onValueChange={(value) => handleSliderChange("confidenceThreshold", value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Predictions below this threshold will be marked as "At Risk"
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-analyze">Auto-Analyze Uploads</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically begin analysis when files are uploaded
                </p>
              </div>
              <Switch
                id="auto-analyze"
                checked={settings.autoAnalyze}
                onCheckedChange={(checked) => handleSwitchChange("autoAnalyze", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Features
          </CardTitle>
          <CardDescription>
            Enable or disable specific analysis components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="text-analysis" className="cursor-pointer">
                  Text Content Analysis
                </Label>
                <p className="text-xs text-muted-foreground">
                  Analyze conversation text and language patterns
                </p>
              </div>
              <Switch
                id="text-analysis"
                checked={settings.textAnalysis}
                onCheckedChange={(checked) => handleSwitchChange("textAnalysis", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="voice-analysis" className="cursor-pointer">
                  Voice Tone Analysis
                </Label>
                <p className="text-xs text-muted-foreground">
                  Analyze vocal patterns and tone changes
                </p>
              </div>
              <Switch
                id="voice-analysis"
                checked={settings.voiceAnalysis}
                onCheckedChange={(checked) => handleSwitchChange("voiceAnalysis", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="emotion-detection" className="cursor-pointer">
                  Emotion Detection
                </Label>
                <p className="text-xs text-muted-foreground">
                  Identify emotional states and sentiment changes
                </p>
              </div>
              <Switch
                id="emotion-detection"
                checked={settings.emotionDetection}
                onCheckedChange={(checked) => handleSwitchChange("emotionDetection", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="contextual-understanding" className="cursor-pointer">
                  Contextual Understanding
                </Label>
                <p className="text-xs text-muted-foreground">
                  Understand conversation context and relationships
                </p>
              </div>
              <Switch
                id="contextual-understanding"
                checked={settings.contextualUnderstanding}
                onCheckedChange={(checked) => handleSwitchChange("contextualUnderstanding", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Info */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Performance Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium">Current Setup</div>
              <div className="text-muted-foreground">Comprehensive Model</div>
              <div className="text-green-600 font-medium mt-1">~2-3 minutes</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium">Enabled Features</div>
              <div className="text-muted-foreground">
                {[settings.textAnalysis, settings.voiceAnalysis, settings.emotionDetection, settings.contextualUnderstanding].filter(Boolean).length} / 4
              </div>
              <div className="text-blue-600 font-medium mt-1">High Accuracy</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="font-medium">Confidence Level</div>
              <div className="text-muted-foreground">Threshold</div>
              <div className="text-purple-600 font-medium mt-1">{settings.confidenceThreshold}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Zap className="h-4 w-4 mr-2" />
          Save Analysis Settings
        </Button>
      </div>
    </motion.div>
  );
}