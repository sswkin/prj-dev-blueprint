import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Zap,
  Check,
  ArrowRight,
  Loader2,
  Star,
  TrendingUp,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

import { subscriptionService } from "@/lib/services/subscription";
import { subscriptionPlans, Subscription } from "@/lib/types/subscription";

interface SubscriptionSectionProps {
  userId: string;
}

export function SubscriptionSection({ userId }: SubscriptionSectionProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usageStats, setUsageStats] = useState<{
    blueprints_used: number;
    blueprints_limit: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const [subData, usageData] = await Promise.all([
          subscriptionService.getCurrentSubscription(userId),
          subscriptionService.getUsageStats(),
        ]);

        setSubscription(subData);
        setUsageStats(usageData);
      } catch (error) {
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [userId]);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const response = await subscriptionService.upgradeToPro();

      if (response.success) {
        toast.success(response.message);
        // In a real app, redirect to checkout
        if (response.checkout_url) {
          window.open(response.checkout_url, "_blank");
        }
      } else {
        toast.error("Failed to start upgrade process");
      }
    } catch (error) {
      toast.error("Failed to upgrade subscription");
    } finally {
      setIsUpgrading(false);
    }
  };

  const currentPlan =
    subscriptionPlans.find((plan) => plan.id === subscription?.plan) ||
    subscriptionPlans[0];
  const usagePercentage = usageStats
    ? (usageStats.blueprints_used / usageStats.blueprints_limit) * 100
    : 0;

  if (isLoading) {
    return (
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <CardTitle>Subscription</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <CardTitle>Subscription</CardTitle>
          </div>
          <Badge
            variant={subscription?.plan === "free" ? "secondary" : "default"}
            className="capitalize"
          >
            {subscription?.plan || "Free"} Plan
          </Badge>
        </div>
        <CardDescription>
          Manage your subscription and billing preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Plan Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentPlan.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                $
                {isYearly
                  ? currentPlan.price.yearly
                  : currentPlan.price.monthly}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentPlan.price.monthly === 0
                  ? "Forever"
                  : isYearly
                    ? "/year"
                    : "/month"}
              </div>
            </div>
          </div>

          {/* Usage Stats for Free Plan */}
          {subscription?.plan === "free" && usageStats && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Blueprints this month</span>
                <span className="font-medium">
                  {usageStats.blueprints_used} / {usageStats.blueprints_limit}
                </span>
              </div>
              <Progress value={usagePercentage} className="h-2" />
              {usagePercentage >= 80 && (
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertDescription>
                    You're running low on blueprints! Upgrade to Pro for
                    unlimited access.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        {/* Upgrade Nudge for Free Users */}
        {subscription?.plan === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      Unlock Your Full Potential
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to Pro and transform your development workflow
                      with unlimited blueprints, advanced AI features, and
                      priority support.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span>Unlimited blueprints</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>Team collaboration</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span>Priority support</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span
                          className={
                            !isYearly
                              ? "font-semibold"
                              : "text-muted-foreground"
                          }
                        >
                          Monthly
                        </span>
                        <Switch
                          checked={isYearly}
                          onCheckedChange={setIsYearly}
                        />
                        <span
                          className={
                            isYearly ? "font-semibold" : "text-muted-foreground"
                          }
                        >
                          Yearly{" "}
                          <Badge variant="secondary" className="ml-1">
                            Save 20%
                          </Badge>
                        </span>
                      </div>

                      <Button
                        onClick={handleUpgrade}
                        disabled={isUpgrading}
                        className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      >
                        {isUpgrading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Upgrade to Pro
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Current Plan Features */}
        <div className="space-y-3">
          <h4 className="font-medium">What's included:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Plan Benefits (for free users) */}
        {subscription?.plan === "free" && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-primary">
              Upgrade to Pro and get:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {subscriptionPlans[1].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing Information for Paid Plans */}
        {subscription?.plan !== "free" && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium">Billing Information</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {subscription?.current_period_end && (
                <p>
                  Next billing date:{" "}
                  {new Date(
                    subscription.current_period_end,
                  ).toLocaleDateString()}
                </p>
              )}
              <p>
                Status:{" "}
                <span className="capitalize font-medium text-foreground">
                  {subscription?.status || "inactive"}
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
