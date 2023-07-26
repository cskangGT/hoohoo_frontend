
import axios, { AxiosError } from 'axios'; import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  iosClientId: '969791243790-jio2m5ca9m2rcn3n7kco5ti8dbp14n4u.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});
const uploadToGoogleDrive = async (token: any, data: any[]) => {

  const accessToken = token;
  const jsonArrayStr = JSON.stringify(data[0]);
  console.log("accessToken", accessToken);
  console.log("data", data);

  await axios.post(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
    "{name: 'data.json',parents: ['1Ex8UWyCvx1pPRujIvJyO8w6YBRzvLBSY']}",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
      },
      data: jsonArrayStr,
    }
  ).then(response => {
    console.log("response", response);
    console.log('File uploaded to Google Drive:', response.data);
  }).catch((error: AxiosError) => {
    if (error.response) {
      // reply but error
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
      console.log('Response headers:', error.response.headers);
    } else if (error.request) {
      // send request but no reply
      console.log('No response received:', error.request);
    } else {
      // error occurs before sending request
      console.log('Error:', error.message);

    }
  })
}
export const handleGoogleSignIn = async (exportData: any) => {
  try {
    const user = await GoogleSignin.addScopes({
      scopes: ['https://www.googleapis.com/auth/user.gender.read', 'https://www.googleapis.com/auth/drive.file'],
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info:', JSON.stringify(userInfo));

    const accessToken = await GoogleSignin.getTokens();
    console.log('Access Token:', accessToken);

    uploadToGoogleDrive(accessToken.accessToken, exportData);

  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Sign in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services is not available');
    } else {
      console.log('Error signing in:', error);
    }
  }
};
export async function onAppleLogin() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    console.log("Authenticated ", credentialState);

  }
}