import http from "../http-common";
class UploadFilesService {
  upload(file, onUploadProgress) {
    const attachmentId = "";
    const fileOriginalName = "";
    const fileStorageName = "";
    const fileURL = "";
    const fileType = "";
    const fileSize = "";
    const attachment = {
      attachmentId,
      fileOriginalName,
      fileStorageName,
      fileURL,
      fileType,
      fileSize,
    };
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(attachment),
      onUploadProgress,
    });
  }

  uploadAttachment(folderId, file, onUploadProgress) {
    const attachmentId = "";
    const fileOriginalName = "";
    const fileStorageName = "";
    const fileURL = "";
    const fileType = "";
    const fileSize = "";
    const attachment = {
      attachmentId,
      fileOriginalName,
      fileStorageName,
      fileURL,
      fileType,
      fileSize,
    };
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/uploadFileToFolder?folderId=" + folderId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(attachment),
      onUploadProgress,
    });
  }

  uploadAttachmentToFileSubmission(fileSubmissionId, file, onUploadProgress) {
    const attachmentId = "";
    const fileOriginalName = "";
    const fileStorageName = "";
    const fileURL = "";
    const fileType = "";
    const fileSize = "";
    const attachment = {
      attachmentId,
      fileOriginalName,
      fileStorageName,
      fileURL,
      fileType,
      fileSize,
    };
    let formData = new FormData();
    formData.append("file", file);
    return http.post(
      "/uploadAttachmentToFileSubmission?fileSubmissionId=" + fileSubmissionId,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(attachment),
        onUploadProgress,
      }
    );
  }

  uploadAttachmentToFileSubmissionAttempt(fileSubmissionAttemptId, file, onUploadProgress) {
    const attachmentId = "";
    const fileOriginalName = "";
    const fileStorageName = "";
    const fileURL = "";
    const fileType = "";
    const fileSize = "";
    const attachment = {
      attachmentId,
      fileOriginalName,
      fileStorageName,
      fileURL,
      fileType,
      fileSize,
    };
    let formData = new FormData();
    formData.append("file", file);
    return http.post(
      "/uploadAttachmentToFileSubmissionAttempt?fileSubmissionAttemptId=" + fileSubmissionAttemptId,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(attachment),
        onUploadProgress,
      }
    );
  }
}
export default new UploadFilesService();
