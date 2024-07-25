const { hello } = require('../handlers/handler');

describe('hello function', () => {
  it('should return status code 200 and message "Hello World"', async () => {
    const event = {}; // Mock event object
    const result = await hello(event);
    
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe('Hello World');
  });
});
