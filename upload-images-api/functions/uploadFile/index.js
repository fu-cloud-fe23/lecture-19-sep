const { s3 } = require("../../services/s3");
const parser = require("lambda-multipart-parser");

function createUrl(bucket, filename) {
  return `https://${bucket}.s3.eu-north-1.amazonaws.com/${filename}`;
}

exports.handler = async (event) => {
  const { files } = await parser.parse(event);
  const image = files[0];
  const bucket = "my-uploaded-images-api";

  try {
    await s3.putObject({
      Bucket: bucket,
      Key: image.filename,
      Body: image.content,
      ACL: "public-read",
      ContentType: image.contentType,
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Could not add file",
        error,
      }),
    };
  }

  const url = createUrl(bucket, image.filename);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Image saved successfully!",
      url,
    }),
  };
};
