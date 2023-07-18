// import RNFS from 'react-native-fs';
// import data from '../../data/data.json'
// /**
//  * 
//  * @param props 
//  * newAttachList: triggered when new photo is added. 
//  * targetId: target index to be updated
//  */
// function SaveJson(targetId: number, newAttachList: (string | string[])[]) {
//     const updatedNote = newAttachList;
//     // JSON 파일 읽기
//     const filePath = 'file:///Users/data/data.json'; // 파일 경로

//     RNFS.readFile(filePath, 'utf8')
//         .then((data) => {
//             // JSON 데이터 파싱
//             const jsonData = JSON.parse(data);
//             // 주어진 ID와 일치하는 객체를 찾아 업데이트
//             const updatedJsonData = jsonData.map((item: any) => {
//                 if (item.id === targetId) {
//                     return {
//                         ...item,
//                         note: updatedNote,
//                     };
//                 }
//                 return item;
//             });
//             // 업데이트된 JSON 데이터를 다시 문자열로 변환
//             const updatedJsonString = JSON.stringify(updatedJsonData, null, 2);
//             // JSON 파일 업데이트
//             return RNFS.writeFile(filePath, updatedJsonString, 'utf8'); // 파일 경로 변수 사용
//         })
//         .then(() => {
//             console.log('JSON file has been updated.');
//         })
//         .catch((error) => {
//             console.error('Error updating JSON file:', error);
//         });
// }
// export default SaveJson