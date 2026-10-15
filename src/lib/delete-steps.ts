/** Plain data so both the visual timeline (client) and the HowTo structured data (server) use one source. */
export const DELETE_STEPS = [
  { title: "Open the app", body: "Launch EasyEdit on your phone." },
  {
    title: "Make sure you are logged in",
    body: "Sign in with the account you want to delete. Deletion only works for the account that is currently signed in.",
  },
  {
    title: "Go to your profile",
    body: "Tap your profile picture in the top right corner of the home screen, or use the floating menu at the bottom right.",
  },
  { title: "Open Edit profile", body: "Choose the Edit profile option on your profile screen." },
  { title: "Tap Delete account", body: "Scroll to the bottom of the screen and tap Delete account." },
  {
    title: "Confirm the deletion",
    body: "Confirm when asked. You will see a message that your account was deleted successfully.",
  },
] as const;

// The subject is fixed text we ask users to send. It matches the wording shown on the page exactly.
export const DELETE_SUBJECT = "Account Deletion request — EasyEdit";

export const DELETE_BODY_TEMPLATE = "Registered email ID: \nReason for deletion: ";
