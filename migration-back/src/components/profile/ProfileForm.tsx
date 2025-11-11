import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, X } from "lucide-react";
import { profileSchema, ProfileFormData } from "@/lib/validations/profile";
import { UserProfile } from "@/lib/types/profile";

interface ProfileFormProps {
  profile: UserProfile;
  isLoading: boolean;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
}

export function ProfileForm({
  profile,
  isLoading,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
      twitter_handle: profile.twitter_handle || "",
      github_handle: profile.github_handle || "",
      linkedin_handle: profile.linkedin_handle || "",
    },
    mode: "onChange",
  });

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Edit Profile
        </CardTitle>
        <CardDescription>
          Update your profile information and social links
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  placeholder="Enter your full name"
                  {...form.register("full_name")}
                />
                {form.formState.errors.full_name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  {...form.register("location")}
                />
                {form.formState.errors.location && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={4}
                {...form.register("bio")}
              />
              <p className="text-sm text-muted-foreground">
                {form.watch("bio")?.length || 0}/500 characters
              </p>
              {form.formState.errors.bio && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.bio.message}
                </p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                {...form.register("website")}
              />
              {form.formState.errors.website && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.website.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter_handle">X (Twitter) Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    @
                  </span>
                  <Input
                    id="twitter_handle"
                    placeholder="username"
                    className="pl-8"
                    {...form.register("twitter_handle")}
                  />
                </div>
                {form.formState.errors.twitter_handle && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.twitter_handle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_handle">GitHub Username</Label>
                <Input
                  id="github_handle"
                  placeholder="username"
                  {...form.register("github_handle")}
                />
                {form.formState.errors.github_handle && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.github_handle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_handle">LinkedIn Username</Label>
                <Input
                  id="linkedin_handle"
                  placeholder="username"
                  {...form.register("linkedin_handle")}
                />
                {form.formState.errors.linkedin_handle && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.linkedin_handle.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="flex-1 md:flex-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 md:flex-none"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
