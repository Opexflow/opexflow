const saveOrUpdateUser = async (profile, mongo) => {

  const photo = profile.photos && profile.photos[0] && profile.photos[0].value || '';
  const email = profile.emails && profile.emails[0] && profile.emails[0].value || '';

  var query = { _id: profile.id.toString() };
  const newUser = { 
    $set: {login: profile.displayName, email: email, photo: photo, updatedAt: new Date() },
    $setOnInsert: {
      _id: profile.id.toString(),
      createdAt: new Date(),
      balance: 10000
    }
  }
  const user = await mongo.getUserObject().updateOrInsertUser(query, newUser, {upsert: true});
  return user;
}

module.exports = { saveOrUpdateUser };
