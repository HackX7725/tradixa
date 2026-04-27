export const LOGIN_DATA = {
  branding: {
    name: "Tradixa",
    badge: "Enterprise Suite",
    heading: "High-fidelity trading",
    subheading: "engineered for speed.",
    description: "The platform of choice for institutional liquidity and precision market analysis.",
    copyright: "© 2026 Tradixa Inc.",
  },
  form: {
    title: "Sign in",
    subtitle: "Please enter your authorized credentials.",
    fields: [
      { 
        name: "email", 
        label: "Email Address", 
        placeholder: "name@company.com", 
        type: "email" 
      },
      { 
        name: "password", 
        label: "Password", 
        placeholder: "••••••••", 
        type: "password",
        hasRecover: true
      },
    ],
    submitButton: "Access Account",
  },
  social: {
    divider: "Identity Provider",
    providers: [
      { id: "facebook", name: "Facebook" as const },
      { id: "google", name: "Google" as const },
    ],
  },
  footer: {
    noAccount: "No account?",
    joinAction: "Join Tradixa",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
};
