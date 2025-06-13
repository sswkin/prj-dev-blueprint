// React and core dependencies
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Third-party libraries
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Crown,
  Loader2,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

// UI Components
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';

// Contexts and Services
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/lib/services/subscription';

// Types
import type { Subscription } from '@/lib/types/subscription';
import { subscriptionPlans } from '@/lib/types/subscription';

export default function SubscriptionsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usageStats, setUsageStats] = useState<{ blueprints_used: number; blueprints_limit: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchSubscriptionData = async () => {
      try {
        const [subData, usageData] = await Promise.all([
          subscriptionService.getCurrentSubscription(user.id),
          subscriptionService.getUsageStats()
        ]);
        
        setSubscription(subData);
        setUsageStats(usageData);
      } catch (error) {
        toast.error('Failed to load subscription data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user, navigate]);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      const response = await subscriptionService.upgradeToPro();
      
      if (response.success) {
        toast.success(response.message);
        // In a real app, redirect to checkout
        if (response.checkout_url) {
          window.open(response.checkout_url, '_blank');
        }
      } else {
        toast.error('Failed to start upgrade process');
      }
    } catch (error) {
      toast.error('Failed to upgrade subscription');
    } finally {
      setIsUpgrading(false);
    }
  };

  const currentPlan = subscriptionPlans.find(plan => plan.id === subscription?.plan) || subscriptionPlans[0];
  const usagePercentage = usageStats ? (usageStats.blueprints_used / usageStats.blueprints_limit) * 100 : 0;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Subscriptions - DevBlueprint AI</title>
          <meta name="description" content="Manage your DevBlueprint AI subscription and billing preferences." />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading subscription data...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Subscriptions - DevBlueprint AI</title>
        <meta name="description" content="Manage your DevBlueprint AI subscription and billing preferences." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Crown className="h-8 w-8 text-primary" />
                Subscription Management
              </h1>
              <p className="text-muted-foreground">
                Manage your subscription and billing preferences
              </p>
            </div>

            {/* Current Plan Overview */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <CardTitle>Current Plan</CardTitle>
                  </div>
                  <Badge variant={subscription?.plan === 'free' ? 'secondary' : 'default'} className="capitalize">
                    {subscription?.plan || 'Free'} Plan
                  </Badge>
                </div>
                <CardDescription>
                  Your current subscription details and usage
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${isYearly ? currentPlan.price.yearly : currentPlan.price.monthly}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {currentPlan.price.monthly === 0 ? 'Forever' : isYearly ? '/year' : '/month'}
                    </div>
                  </div>
                </div>

                {/* Usage Stats for Free Plan */}
                {subscription?.plan === 'free' && usageStats && (
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
                          You're running low on blueprints! Upgrade to Pro for unlimited access.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
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

                {/* Billing Information for Paid Plans */}
                {subscription?.plan !== 'free' && (
                  <div className="space-y-2 pt-4 border-t">
                    <h4 className="font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Billing Information
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {subscription && (
                        <>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Next billing date: {new Date(subscription.current_period_end).toLocaleDateString()}</span>
                          </div>
                          <p>Status: <span className="capitalize font-medium text-foreground">{subscription.status}</span></p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upgrade Section for Free Users */}
            {subscription?.plan === 'free' && (
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
                          Upgrade to Pro and transform your development workflow with unlimited blueprints, 
                          advanced AI features, and priority support.
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
                            <span className={!isYearly ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
                            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                            <span className={isYearly ? "font-semibold" : "text-muted-foreground"}>
                              Yearly <Badge variant="secondary" className="ml-1">Save 20%</Badge>
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

            {/* All Plans Comparison */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">All Plans</h2>
                <p className="text-muted-foreground mb-6">Choose the plan that fits your needs</p>
                
                <div className="flex items-center justify-center space-x-4">
                  <span className={!isYearly ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
                  <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                  <span className={isYearly ? "font-semibold" : "text-muted-foreground"}>
                    Yearly <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`relative h-full ${
                      plan.popular ? 'border-primary shadow-lg scale-105' : ''
                    } ${
                      plan.id === subscription?.plan ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Most Popular</Badge>
                    )}
                    {plan.id === subscription?.plan && (
                      <Badge variant="secondary" className="absolute -top-2 right-4">Current Plan</Badge>
                    )}
                    
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-muted-foreground">
                          {plan.price.monthly === 0 ? '' : isYearly ? '/year' : '/month'}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="w-full" 
                        variant={plan.id === subscription?.plan ? "secondary" : plan.popular ? "default" : "outline"}
                        disabled={plan.id === subscription?.plan || isUpgrading}
                        onClick={plan.id !== subscription?.plan ? handleUpgrade : undefined}
                      >
                        {plan.id === subscription?.plan ? (
                          "Current Plan"
                        ) : plan.name === "Free" ? (
                          "Downgrade"
                        ) : (
                          <>
                            {isUpgrading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Upgrade"
                            )}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Billing History */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing History
                </CardTitle>
                <CardDescription>
                  View your past invoices and payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No billing history available</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your invoices and payment history will appear here once you upgrade to a paid plan.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}