export function getConfigValue(configName: string) {
  const configValue = import.meta.env[configName];
  if (!configValue || configValue.length === 0) {
    throw new Error(`Config ${configName} is not set`);
  }

  return configValue;
}
