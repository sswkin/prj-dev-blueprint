import { Subscription } from '@/lib/types/subscription';

// Mock subscription service - in a real app, this would connect to your payment provider
export const subscriptionService = {
  async getCurrentSubscription(userId: string): Promise<Subscription> {
    // Mock data - in reality, this would fetch from your database
    return {
      id: 'sub_mock_123',
      user_id: userId,
      plan: 'free',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      cancel_at_period_end: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  },

  async upgradeToPro(): Promise<{ success: boolean; message: string; checkout_url?: string }> {
    // Mock upgrade process - in reality, this would create a Stripe checkout session
    return {
      success: true,
      message: 'Redirecting to checkout...',
      checkout_url: 'https://checkout.stripe.com/mock-session'
    };
  },

  async cancelSubscription(): Promise<{ success: boolean; message: string }> {
    // Mock cancellation - in reality, this would cancel the subscription
    return {
      success: true,
      message: 'Subscription will be canceled at the end of the current period'
    };
  },

  async getUsageStats(): Promise<{ blueprints_used: number; blueprints_limit: number }> {
    // Mock usage stats - in reality, this would fetch from your database
    return {
      blueprints_used: 0,
      blueprints_limit: 1 // Free plan limit
    };
  }
};