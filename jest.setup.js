// Load environment variables for testing
require('dotenv').config({ path: '.env.test' });

// Mock Supabase
jest.mock('./src/services/supabase.service', () => ({
  supabaseClient: {
    storage: {
      from: jest.fn().mockReturnValue({
        upload: jest.fn().mockResolvedValue({ data: {}, error: null }),
        getPublicUrl: jest.fn().mockReturnValue({
          data: { publicUrl: 'http://example.com/test.png' },
        }),
      }),
    },
  },
}));

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
