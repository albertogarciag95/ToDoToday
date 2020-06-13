export default function makePostUserController ({ postUserUseCase }) {
  return async function postItineraryController (httpRequest) {
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
      console.log("ERROR: ", e);
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
