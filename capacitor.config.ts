import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "in.deviihandloom",
  appName: "Devii Handlooms",
  webDir: "public",
  server: {
    // Points directly to the live custom domain for webview packaging
    url: "https://deviihandloom.in",
    allowNavigation: ["*"],
    cleartext: true
  }
};

export default config;
