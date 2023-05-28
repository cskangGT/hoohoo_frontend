import React from "react";
import axios, { AxiosError } from 'axios';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';


GoogleSignin.configure({
    // offlineAccess: true,
    
    scopes:['https://www.googleapis.com/auth/drive.file'],
        });
const uploadToGoogleDrive = async (token : any, data : any[]) => {

    const accessToken = token;
    const jsonArrayStr = JSON.stringify(data[0]);
    console.log("accessToken", accessToken);
    console.log("data", data);
    
    await axios.post( // 전송은 보내지나 insufficient authentication scopes error occurs
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
    {
        name: 'data.json',
        parents: ['1Ex8UWyCvx1pPRujIvJyO8w6YBRzvLBSY'],
    },
    {
        headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream',
        },
        data: jsonArrayStr,
    }
    ).then(response=> {
        console.log("response", response);
        console.log('File uploaded to Google Drive:', response.data);
    }).catch ((error : AxiosError)=> {
    if (error.response) {
        // 서버 응답이 있는 경우
        console.log('Response status:', error.response.status);
        console.log('Response data:', error.response.data);
        console.log('Response headers:', error.response.headers);
        } else if (error.request) {
        // 요청이 전송되었으나 응답이 없는 경우
        console.log('No response received:', error.request);
        } else {
        // 요청을 보내기 전에 오류가 발생한 경우
        console.log('Error:', error.message);

}})
}
// 로그인 처리
// androidClientId: 
export const handleGoogleSignIn = async (exportData : any) => {
    try{
    const user = await GoogleSignin.addScopes({
        scopes: ['https://www.googleapis.com/auth/user.gender.read', 'https://www.googleapis.com/auth/drive.file'],
      });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info:', JSON.stringify(userInfo));

    const accessToken = await GoogleSignin.getTokens();
    console.log('Access Token:', accessToken);

    uploadToGoogleDrive(accessToken.accessToken, exportData);
    
    } catch (error : any) {
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

// await GoogleSignin.hasPlayServices();
//     .then(async (hasPlayService) => {
//             if (hasPlayService) {
//                 GoogleSignin.signIn().then((userInfo) => {
//                         console.log(JSON.stringify(userInfo))
//                 }).catch((e) => {
//                 console.log("ERROR IS: " + JSON.stringify(e));
//                 })
//                 const accessToken = await GoogleSignin.getTokens();
//                 console.log("accessToken", accessToken);
//                 uploadToGoogleDrive(accessToken.accessToken, exportData);
//             }
//     }).catch((e) => {
//         console.log("ERROR IS: " + JSON.stringify(e));
//     });
// export const uploadToICloud = async () => {
//     try {
//       const accessToken = 'YOUR_ACCESS_TOKEN';
//       const filePath = '/path/to/file.txt';
  
//       const response = await axios.put(
//         'https://api.icloud.com/path/to/destination/file.txt',
//         filePath,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'text/plain',
//           },
//         }
//       );
  
//       console.log('File uploaded to iCloud:', response.data);
//     } catch (error) {
//       console.error('Error uploading file to iCloud:', error);
//     }
//   };

