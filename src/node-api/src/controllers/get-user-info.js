import fs from 'fs';

export default function makeGetUserInfoController ({ getUserInfoUseCase }) {
  return async function getUserInfoController (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const userInfo = await getUserInfoUseCase(httpRequest.params);

      const fileRetrieved = fs.readFileSync('./uploads/' + userInfo.userImage);
      const fileData = Buffer.from(fileRetrieved).toString('base64');
      userInfo.userImage = fileData;

      return {
        headers,
        statusCode: 200,
        body: { userInfo }
      }
    } catch (e) {
      console.log("EEEEEEEEEEERROR", e);
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
