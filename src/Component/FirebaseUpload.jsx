import { storage } from "../Api/Firebase";

export const Upload = async ({ currentPic, type, userId }) => {
  const imgFolder = type === "profile" ? "UserProfilePic" : "PlannerPic";

  let updatedPic = currentPic;

  // 프로필 사진이 새로 추가된 경우 Firebase에 업로드
  if (currentPic && currentPic.startsWith("blob:")) {
    // Blob URL을 파일로 변환
    const response = await fetch(currentPic);
    const blob = await response.blob();

    // Firebase Storage 참조
    const storageRef = storage.ref(`/${imgFolder}/${userId}/`);
    const fileRef = storageRef.child("profile.png");

    // 파일 업로드
    await fileRef.put(blob);

    // 업로드된 파일 URL 가져오기
    updatedPic = await fileRef.getDownloadURL();
    console.log("새 파일 업로드 성공:", updatedPic);
  }
  return updatedPic;
};
