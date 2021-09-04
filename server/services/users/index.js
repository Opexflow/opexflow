const path = require('path');
const fs = require('fs');
const {downloadImageStream} = require('../../helpers/utils');

const saveOrUpdateUser = async (profile, mongo) => {

  const photo = profile.photos && profile.photos[0] && profile.photos[0].value || '';
  const email = profile.emails && profile.emails[0] && profile.emails[0].value || '';


  const userId = profile.id.toString();
  const savedImagePath = await downloadProfilePic(photo.toString(), userId);
  
  var query = { _id: profile.id.toString() };
  const newUser = { 
    $set: {login: profile.displayName, email: email, photo: savedImagePath, updatedAt: new Date() },
    $setOnInsert: {
      _id: profile.id.toString(),
      createdAt: new Date(),
      balance: 10000
    }
  }
  const user = await mongo.getUserObject().updateOrInsertUser(query, newUser, {upsert: true});
  return savedImagePath.toString();
}

const downloadProfilePic = async (photoURL, userId) => {
  const imagePath = path.join(__dirname, `../../resources/images/profilePic/${userId}.jpg`);
  
  if(!fs.existsSync(path.dirname(imagePath))) {
    fs.mkdirSync(path.dirname(imagePath), {recursive: true});
  }
  const savedImagePath = await downloadImageStream(photoURL, imagePath);
  if(savedImagePath && savedImagePath.success)
    return savedImagePath.imagePath;
  else
    return path.join(__dirname, `../../resources/images/profilePic/blank_profile_photo.png`);
}


module.exports = { saveOrUpdateUser };
