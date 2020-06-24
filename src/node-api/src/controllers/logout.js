export default function makeLogoutController ({ logoutUseCase }) {
  return async function logoutController ({ cookies }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      await logoutUseCase(cookies.refresh_token);

      return {
        headers,
        statusCode: 204,
        body: { accessToken: "" }
      }
    } catch (e) {
      console.log(e);
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
