import React, {useState} from 'react';
import {View, Button, Image, Text, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {stat} from 'react-native-fs';
import {ACCESS_KEY_ID, SECRET_KEY_ID} from '@env';
import {getItem} from '../../../../src/utils/asyncStorage';
import ImageResizer from 'react-native-image-resizer';

const ImageUploadScreen = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [matchedImages, setMatchedImages] = useState([]);

  // Rekognition Config
  const rekognition = new AWS.Rekognition({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY_ID,
    region: 'ap-south-1',
  });

  // S3 Config
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY_ID,
    region: 'ap-south-1',
  });

  const validateImageSize = async uri => {
    try {
      const stats = await RNFS.stat(uri.replace('file://', '')); // Ensure correct URI format
      if (stats.size > 15 * 1024 * 1024) {
        // Limit: 15MB
        throw new Error('Image size exceeds 15MB');
      }
    } catch (error) {
      console.error('Error validating image size:', error.message);
      throw new Error('Failed to validate image size');
    }
  };

  const convertBlobToBytes = async uri => {
    try {
      const fileBase64 = await RNFS.readFile(uri, 'base64');
      console.log(Buffer.from(fileBase64, 'base64'));
      return Buffer.from(fileBase64, 'base64');
    } catch (error) {
      console.error('Error converting image to bytes:', error.message);
      throw new Error('Failed to convert image to bytes');
    }
  };

  const downloadImageFromS3 = async () => {
    try {
      let user = await getItem();
      let imageUrl = user?.face;

      if (!imageUrl) {
        throw new Error('No image URL found for the user.');
      }

      const localFilePath = RNFS.DocumentDirectoryPath + '/downloadedImage.jpg';

      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: localFilePath,
      }).promise;

      console.log('Download Result:', downloadResult);
      console.log('Image downloaded to:', localFilePath);

      if (downloadResult?.statusCode !== 200) {
        throw new Error(
          `Failed to download image. Status code: ${downloadResult?.statusCode}`,
        );
      }

      return localFilePath;
    } catch (error) {
      console.error('Error downloading image:', error.message);
      throw new Error('Failed to download image from S3');
    }
  };

  const resizeImage = async uri => {
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      800,
      600,
      'JPEG',
      80,
    );
    return resizedImage.uri;
  };

  // Function to compare the downloaded image with S3 images
  const compareImageWithS3 = async () => {
    setLoading(true);
    setMessage('Comparing...');

    try {
      const localImagePath = await downloadImageFromS3();
      await validateImageSize(localImagePath);

      const resizedUri = await resizeImage(localImagePath);

      const bytes = await convertBlobToBytes(resizedUri);

      // Step 3: Fetch images from S3 for comparison
      console.log('Fetching images list from S3...');
      const listParams = {
        Bucket: 'wedding',
        Prefix: '8979669612/8770821586/Birthday%20Celebration/tilak/', // Update as per your S3 folder path
      };
      const objects = await s3.listObjectsV2(listParams).promise();
      console.log('S3 objects: ', objects);

      const imageNames = objects?.Contents?.map(item => item.Key).filter(name =>
        name.match(/\.(jpg|jpeg|png)$/i),
      );

      // Step 4: Compare the downloaded image with each image in S3
      const matchedImages = [];
      for (const imageName of imageNames) {
        console.log(`Comparing with ${imageName}...`);

        const compareParams = {
          SourceImage: {Bytes: bytes},
          TargetImage: {
            S3Object: {
              Bucket: 'wedding',
              Name: imageName,
            },
          },
          SimilarityThreshold: 80,
        };

        try {
          const result = await rekognition
            .compareFaces(compareParams)
            .promise();

          // If faces match, add to matchedImages array
          if (result.FaceMatches?.length > 0) {
            const url = s3.getSignedUrl('getObject', {
              Bucket: 'wedding',
              Key: imageName,
              Expires: 3600,
            });

            matchedImages.push({
              imageName,
              similarity: result.FaceMatches[0].Similarity,
              url,
            });
          }
        } catch (error) {
          console.error(`Error comparing with ${imageName}:`, error.message);
        }
      }

      if (matchedImages.length > 0) {
        console.log('Matched Images:', JSON.stringify(matchedImages, null, 2));
        setMatchedImages(matchedImages);
        setMessage('Matches found!');
      } else {
        setMessage('No matches found.');
      }
    } catch (error) {
      console.error('Error during comparison:', error.message);
      setMessage(`Comparison failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllImagesFromS3 = async () => {
    setLoading(true);
    setMessage('Fetching images from S3...');

    try {
      const listParams = {
        Bucket: 'wedding',
        Prefix: '8979669612/8770821586/Birthday%20Celebration/haldi',
      };

      const objects = await s3.listObjectsV2(listParams).promise();
      console.log('🚀 ~ fetchAllImagesFromS3 ~ objects:', objects);

      if (!objects.Contents || objects.Contents.length === 0) {
        setMessage('No images found in the specified S3 bucket and prefix.');
        setLoading(false);
        return;
      }

      const imageNames = objects.Contents.map(item => item.Key).filter(name =>
        name.match(/\.(jpg|jpeg|png)$/i),
      );

      console.log('Valid image names:', imageNames);

      if (imageNames.length === 0) {
        setMessage('No valid image files found under the specified prefix.');
        setLoading(false);
        return;
      }

      const imageUrls = imageNames.map(imageName => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'wedding',
          Key: imageName,
          Expires: 3600,
        });
        return {imageName, url};
      });

      setMatchedImages(imageUrls);
      setMessage('Images fetched successfully!');
    } catch (error) {
      console.error('Error fetching images from S3:', error.message);
      setMessage(`Failed to fetch images: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{marginTop: '20%', padding: 20}}>
      {/* <Button title="Select Image" onPress={selectImage} /> */}
      {image && (
        <Image
          source={{uri: image?.uri}}
          style={{width: 200, height: 200, marginVertical: 10}}
        />
      )}
      <Button title="Compare Image Directly" onPress={compareImageWithS3} />
      {loading ? <Text>Loading...</Text> : <Text>{message}</Text>}
      {matchedImages?.map((item, idx) => {
        // console.log('lind', item.url);
        return (
          <View key={idx} style={{marginVertical: 10}}>
            <Image
              source={{uri: item?.url}}
              style={{width: 200, height: 200}}
            />
            <Text>Similarity: {item?.similarity?.toFixed(2)}%</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ImageUploadScreen;
