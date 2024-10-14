import { config } from 'dotenv';

config();

describe('Environment Variables', () => {
  it('should load the required environment variables', () => {
    const requiredEnvVariables: string[] = [
      'EXPO_PUBLIC_API_URL',
      'EXPO_PUBLIC_API_KEY',
 
    ];

    requiredEnvVariables.forEach((envVar) => {
      expect(process.env[envVar]).toBeDefined();
    });
  });

  it('should have non-empty environment variable values', () => {
    const requiredEnvVariables: string[] = [
      'EXPO_PUBLIC_API_URL',
      'EXPO_PUBLIC_API_KEY',
  
    ];

    requiredEnvVariables.forEach((envVar) => {
      expect(process.env[envVar]).not.toBe('');
    });
  });
});