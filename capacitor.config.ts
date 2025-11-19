import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daggerheart.communitysheet',
  appName: 'Daggerheart Character Sheet',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    // Optional: Configuration for plugins if added later
  }
};

export default config;