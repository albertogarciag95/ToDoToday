export default function makeLoginController ({ loginUseCase }) {
  return async function loginController (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const login = await loginUseCase(httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: { "Logged": login }
      }
    } catch (e) {
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
