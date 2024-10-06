import s3Client from "@/lib/s3client";
import { Upload } from '@aws-sdk/lib-storage';

export async function uploadFile(fileName: string, file: Blob) {
    if (!file) {
        throw new Error("No File Input");
    }

    if (fileName.trim() === "") {
        throw new Error("No File Name Input");
    }

    console.log(file);

    // Convert the file to a Buffer
    // const blob = new Blob([file], { type: file.type });
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `${fileName}.m4a`,
        Body: file, // Ensure file.stream() is compatible
        ContentType: 'audio/mp4'
    };

    const upload = new Upload({
        client: s3Client,
        params,
    });

    try {
        const response = await upload.done();
        console.log('Upload Successful:', response);
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error("Upload Failed");
    }
}