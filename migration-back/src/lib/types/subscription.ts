export interface Subscription {
  id: string;
  user_id: string;
  plan: "free" | "pro" | "team";
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for getting started",
    features: [
      "1 blueprint per month",
      "Basic AI suggestions",
      "PDF export",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    description: "For serious developers",
    features: [
      "Unlimited blueprints",
      "Advanced AI planning",
      "All export formats",
      "Priority support",
      "Custom templates",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: { monthly: 99, yearly: 990 },
    description: "For growing teams",
    features: [
      "Everything in Pro",
      "Team management",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated support",
      "SSO authentication",
    ],
  },
];
