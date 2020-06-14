export default function makePostUserController ({ postUserUseCase }) {
  return async function postUserController (httpRequest) {
    try {
      const newUser = await postUserUseCase(
        httpRequest.body
      );
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(newUser.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: "Created"
      }
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
