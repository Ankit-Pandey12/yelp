const mongoose = require('mongoose');
const Campground =require('../models/campground');
const cities= require('./cities');
const {places,descriptors}= require('./seedhelpers');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(console.log('mongoose connected'));
}

const sample = array=>array[Math.floor(Math.random()*array.length)];

const seedDB= async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const ramdon1000= Math.floor(Math.random()*1000);
        const camp = new Campground({
            location:`${cities[ramdon1000].city},${cities[ramdon1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`
        });
        await camp.save();


    }
}
seedDB().then(() =>{
    mongoose.connection.close();
});