export const REGISTER_DATA = {
  branding: {
    name: "Tradixa",
    badge: "Join the Elite",
    heading: "Start your journey",
    subheading: "in institutional trading.",
    description: "Join thousands of professional traders using Tradixa for superior execution.",
    copyright: "© 2026 Tradixa Inc.",
  },
  form: {
    title: "Create Account",
    subtitle: "Sign up to start trading today.",
    fields: [
      { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
      { name: "email", label: "Email Address", placeholder: "name@company.com", type: "email" },
      { name: "password", label: "Password", placeholder: "••••••••", type: "password" },
      { name: "dob", label: "Date of Birth", placeholder: "Pick a date", type: "date" },
    ],
    submitButton: "Create Account",
  },
  social: {
    divider: "Or sign up with",
    providers: [
      { id: "facebook", name: "Facebook" as const },
      { id: "google", name: "Google" as const },
    ],
  },
  footer: {
    hasAccount: "Already have an account?",
    loginAction: "Sign In",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
};
