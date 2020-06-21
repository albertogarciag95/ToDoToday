export default function makePostUserController ({ postUserUseCase }) {
  return async function postUserController (httpRequest) {
    httpRequest.body.file = httpRequest.file.filename;
    try {
      await postUserUseCase(httpRequest.body);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {}
      }
    } catch (e) {
      console.log(e);
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
