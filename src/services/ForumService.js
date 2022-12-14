import http from "../http-common";
class ForumService {
  createNewForum(file, onUploadProgress) {
    const attachmentId = "";
    const fileOriginalName = "";
    const fileStorageName = "";
    const fileURL = "";
    const fileType = "";
    const fileSize = "";
    const attachment={attachmentId,fileOriginalName,fileStorageName,fileURL,fileType,fileSize}
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body:JSON.stringify(attachment),
      onUploadProgress,
    });
  }
}
export default new ForumService();