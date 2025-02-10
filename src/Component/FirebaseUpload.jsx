import { storage } from "../Api/Firebase";

export const Upload = async ({ currentPic, type, userId, plannerId }) => {
  console.log(">>>>>>>>>", plannerId);
  const imgFolder = type === "profile" ? "UserProfilePic" : "PlannerPic";
  const imgName = type === "profile" ? "profile.png" : `${plannerId}.png`;
  console.log(imgFolder);
  console.log(imgName);

  let updatedPic = currentPic;

  // 프로필 사진이 새로 추가된 경우 Firebase에 업로드
  if (currentPic && currentPic.startsWith("blob:")) {
    // Blob URL을 파일로 변환
    const response = await fetch(currentPic);
    const blob = await response.blob();

    // Firebase Storage 참조
    const storageRef = storage.ref(`/${imgFolder}/${userId}/`);
    const fileRef = storageRef.child(imgName);

    // 파일 업로드
    await fileRef.put(blob);

    // 업로드된 파일 URL 가져오기
    updatedPic = await fileRef.getDownloadURL();
    console.log("새 파일 업로드 성공:", updatedPic);
  }
  return updatedPic;
};

export const deleteFile = async ({ type, userId, plannerId }) => {
  const imgFolder = type === "profile" ? "UserProfilePic" : "PlannerPic";
  const imgName = type === "profile" ? "profile.png" : `${plannerId}.png`;

  try {
    const fileRef = storage.ref(`/${imgFolder}/${userId}/${imgName}`);
    await fileRef.delete();
    console.log("파일 삭제 성공:", imgName);
    return true;
  } catch (error) {
    console.error("파일 삭제 실패:", error);
    return false;
  }
};

export const deleteFolder = async ({ type, userId }) => {
  const imgFolder = type === "profile" ? "UserProfilePic" : "PlannerPic";
  const folderRef = storage.ref(`/${imgFolder}/${userId}/`);

  try {
    const fileList = await folderRef.listAll(); // 폴더 내 모든 파일 목록 가져오기
    // console.log(fileList);
    const deletePromises = fileList.items.map((file) => file.delete()); // 모든 파일 삭제
    await Promise.all(deletePromises);

    console.log("폴더 내 모든 파일 삭제 완료:", imgFolder);
    return true;
  } catch (error) {
    console.error("폴더 삭제 실패:", error);
    return false;
  }
};
