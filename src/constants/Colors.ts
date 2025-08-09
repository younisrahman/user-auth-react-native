const tintColorLight = "#C10021"; // Kloudius Primary Red
const tintColorDark = "#FF4C5B"; // A brighter red for contrast in dark mode

export const Colors = {
  light: {
    text: "#333333", // Dark Gray Text
    textDark: "#222222", // Even darker for headings/labels
    textMuted: "#7A7A7A", // Muted gray text
    background: "#FFFFFF", // Pure white background
    tint: tintColorLight, // Primary red for links/buttons/icons
    icon: "#C10021", // Icon color in primary red
    tabIconDefault: "#A0A0A0", // Muted icon color
    tabIconSelected: tintColorLight,
    border: "#E0E0E0", // Light gray border
    inputBackground: "#F9F9F9", // Light input background
    buttonText: "#FFFFFF", // White button text
    error: "#D9534F", // Error red
  },
  dark: {
    text: "#ECEDEE", // Light text for dark background
    textDark: "#FFFFFF", // Pure white for headings
    textMuted: "#AAAAAA", // Muted gray text in dark mode
    background: "#151718", // Dark background
    tint: tintColorDark, // Soft red for better contrast
    icon: "#FF4C5B", // Brighter red icons
    tabIconDefault: "#666", // Muted dark icon
    tabIconSelected: tintColorDark,
    border: "#333333", // Dark border
    inputBackground: "#1E1E1E", // Darker input background
    buttonText: "#FFFFFF", // White button text
    error: "#FF6B6B", // Softer red error for dark mode
  },
};
