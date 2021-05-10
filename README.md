# Image-Repository
## This is the submission for the Shopify Developer Challenge
Pet Moments is an image-repository platform for pet owner to share their favorite pet moments with the rest of the world

Technologies Used for This Project: React (with MaterialUI), Node, Express, MongoDB, Firebase, Google Cloud Vision, Auth0, Heroku (Deployment), Mochai and Chai (Testing)

## Implementation Highlights
- Enable ability for user to upload single and multiple pictures
- Pictures stored in on external Firebase storage with user data and image URL stored on MongoDB 
- Secured Backend API with Auth0 and JWT for necessary endpoints
- Secured frontend user facing platform with Auth0
- Used Google Vision API to detect specific animal labels for images uploaded
- Allows user to specifically search for pictures based on animal labels 
- Created Test Cases To Test Backend Endpoints Using Mocha and Chai
- Added endpoint for deleting images(currently only used for testing)

## Project Demo
Since credentials were used and secured with .env files, the website is deployed on Heroku for demo
Demo URL: https://image-repository-deploy.herokuapp.com

## Demo Load Time
Since the project is deployed on Heroku under a free option, if the page is not accessed within a short time frame. The server would become idle and need to wait for slightly longer (~20 seconds) for the page and the tests to properly run.

## Project Testing
In order to ensure that backend APIs are working as intended, a series of tests are conducted. These include negative cases where no authentication is provided for the endpoints. The test cases use Mocha and Chai.

Running the Tests:
```
cd ./backend && npm test
```

## Implementation Details
Front end: The front end is made using React and Material UI. MaterialUI is used for the convinence to create components in a timely manner. Auth0 is also used on the frontend to allow user login. The features of Auth0 is used throughout the frontend in checking logging, getting tokens, and fetching user information.

Backend Image Storage: The backend is the highlight of this project. In order to securely and easily upload images from the frontend to storage, firebase storage is used. Firebase storage is a wrapper/client for Google's cloud storage and allows the user to upload image straight to the desired bucket directly to from the front facing platform without going through the backend which saves processing power on our server. In order to ensure security, 
during each session the credentials for uploading to Firebase is stored on the backend and accessed through an authorized endpoint through a token provided by Auth0. This way, we limit the strain on our server while ensuring that the upload does not take much resources. After the upload is complete, the frontend then sends a request to the backend
with the username, image name and the URLs for the images which is then uploaded to MongoDB through Mongoose. 

The process for doing this is inspired by this article:  https://jgefroh.medium.com/software-architecture-image-uploading-67997101a034

Backend Vision Label: In order to provide labels, when we upload the URL for the image to the backend to be stored in MongoDB, the URLs are passed to Google Vision API for label detection. Then after the labels are found, we parse through the data and fetch all the labels that contains animal names and stored that data along side the image data
to MongoDB. This way, when we search for a specific picture on the frontend in the future, we can easily search for the picture depending on the approriate label

## Future Implementation Additions
These are some additional features I want to include in the future for this project
- Deleting pictures based on user authentication/have a page for user to see their posts
- Improve frontend styling
- Add additional fields for the image upload submission such as a field for description

