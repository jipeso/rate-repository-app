import { getDefaultConfig } from "@expo/metro-config";

const config = getDefaultConfig(import.meta.dirname);

config.resolver.sourceExts.push("cjs");

export default config;
