const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hostel = require('./models/Hostel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('MongoDB connected...');

  const hostelsData = [
/*      {
      name: 'UTown Residence',
      description: 'UTown Residence, also known as UTR, is located in the heart of NUS University Town. It is the first of its kind in Singapore’s higher learning landscape where both undergraduate and graduate students live and learn in close proximity. The design of the residence emphasises open common areas, and the architecture fosters a sense of community and cross-disciplinary discussion. UTR oversees the large Town Green, which is a big green space for students to gather, play sports or even have a picnic. UTR consists of the North and South Tower, which can house up to 1,700 residents.',
      price: 636,
      type: 'Student Residence 4-Bdrm Apt (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown_residence.jpg?alt=media&token=05ca08dc-1dc0-40d5-a085-a0500fdacd6f',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=7a97b262-7002-4b64-8d05-467ebe0b317c',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20Apt%20living%20room.jpg?alt=media&token=ca338917-14ba-4f7b-a13f-0d8db008261d',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FUtown%2Futown%204-bedrm%20toilet.jpg?alt=media&token=1aeddc92-c695-45a4-84a5-963cb9af018b'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3052,
      longitude: 103.7739,
      savedBy: [] // Initialize with an empty array
    }, */
/*     {
      name: 'PGP Residence',
      description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders.',
      price: 688,
      type: 'Student Residence Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence.jpg?alt=media&token=56b3a87d-458b-419a-a0b6-fe0d814c3e48',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=6830cd75-bec0-4f1f-b401-92bb6cf25adb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20lounge.jpg?alt=media&token=3e47043a-efc5-4c6b-9231-bd8c365410f9',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20pantry.jpg?alt=media&token=74dd67db-bcd8-49fc-9a69-311da900bda7'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    } */
 
/*     {
        name: 'PGP Residence',
        description: 'Nestled in a valley near the Kent Ridge MRT station, the PGP Residence (PGPR) beckons to all students who wish to live in a condominium-like hostel with air-conditioned rooms, lounges, study rooms, music rooms as well as sports facilities such as badminton, basketball, tennis courts and a gym. This is not all that PGPR can offer you. Here are some of the other things you can look forward including a diverse multicultural community with residents hailing from 68 countries to strong pastoral care from the residential staff and student leaders.',
        price: 608,
        type: 'Student Residence Single Type C (Non-AC)',
        imageUrls: [
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence.jpg?alt=media&token=56b3a87d-458b-419a-a0b6-fe0d814c3e48',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=6830cd75-bec0-4f1f-b401-92bb6cf25adb',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20lounge.jpg?alt=media&token=3e47043a-efc5-4c6b-9231-bd8c365410f9',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPGP%20Residence%2Fpgp%20residence%20pantry.jpg?alt=media&token=74dd67db-bcd8-49fc-9a69-311da900bda7'
        ],
        averageRating: 0,
        ratings: [],
        latitude: 1.2917,
        longitude: 103.7796,
        savedBy: [] // Initialize with an empty array
      } */

/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }  */

/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }  */
/*     {
      name: 'PGP Pioneer House',
      description: 'Pioneer House (PH), formerly known as “PGP House”, was established in 2017 as a pilot to develop a new type of housing model in NUS. Over the past few years, PH has implemented innovative programmes to provide proactive pastoral care and mentoring to the residents to develop a familial and inclusive residential community. Sense-of-belonging, micro-cultures, and significant networks are some of the approaches which the activities in PH were planned and executed to encourage a balanced and vibrant on-campus living and learning experience for the residents. Our signature Peer Mentorship Programme offers freshmen an opportunity to receive academic guidance and student life-related care from a select group of accomplished seniors known as "Peer Mentors". Resident Fellows and Resident Assistants are also readily available to provide pastoral care and support to all residents. At Pioneer House, every life matters and we welcome you to join our PHamily!',
      price: 608,
      type: 'House Single Type C (Non-AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fph-entrance3.jpg?alt=media&token=123671b8-f696-4101-860c-7bb2b74922c1',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence.jpg?alt=media&token=ed4c35ea-2e78-4913-b81e-b23898a1dbe4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20AC-Standard-Room.jpg?alt=media&token=107a50b1-7b38-43c4-a9cb-d44a71eb4c56',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20lounge.jpg?alt=media&token=619f52f1-74f5-4f66-aea1-434d00c1cfaf',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fpgp%20residence%20pantry.jpg?alt=media&token=4a2d571f-0e68-49df-b4d0-693a386dd7fa',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FPioneer%20house%2Fquiet-room.jpg?alt=media&token=2f256597-3f17-467a-8757-9cd7b27b0b29'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2917,
      longitude: 103.7796,
      savedBy: [] // Initialize with an empty array
    }   */

/*      {
      name: 'PGP Light House',
      description: 'The five panels in our logo represent the five blocks on our grounds that make up the physical space that LightHouse occupies. This physical space gains meaning when students, depicted by the "i", step into the space and commit to our shared vision of creating a community where each resident has the opportunity to embark on this journey of self-discovery. An integral part of this vision is light, represented by the colour yellow, be it living your own light or shining that light to inspire others to do the same. Balancing that light is the colour black, reminiscent of the lows in our journey and the darkness in our lives, a reality that LightHouse both acknowledges and embraces. Our hope and commitment to residents is to build a home that shines light into their lives amidst the darkness, and ultimately empower them to find their light and be a beacon to the people around them.',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Flight%20house.jpeg?alt=media&token=cd130799-14fa-45c9-9838-8782da9e7e0c',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Flighthouse%20Room%20.jpeg?alt=media&token=652a4428-b955-4bc9-821e-6d696d4462fb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Fpgp%20residence%20pantry.jpg?alt=media&token=0a111463-c426-4312-9b4d-a875bd66b294',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FLighthouse%2Fphoto_2023-07-20_16-29-21.jpg?alt=media&token=113b0928-852a-4af2-a99c-a2c160be4431'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2904,
      longitude: 103.7817,
      savedBy: [] // Initialize with an empty array
    }    */

/*     {
      name: 'PGP Helix House',
      description: 'Helix House is located in the PGP estate, on the eastern end of the Kent Ridge Campus and is within close proximity to Science Park and Kent Ridge MRT Station. With over 3000 local and international students living within the estate, Helix House embraces global community living and racial harmony. As with all of our residences, your room at Helix House comes fully furnished with beds, desks, and wardrobes that maximize living space.Each block in Helix House has its own block amenities, and they include a block lounge. All lounges are air-conditioned and well-furnished, to facilitate bonding activities. On top of that, a shared pantry and laundrette are housed within the House. There is a small fee for the usage of washing machines and dryers, payable via NETS, Flashpay and Paylah. Other shared facilities includes a Recreation room, Music, and Baking room. While Recreation room is open for all Helix House residents, Music and Baking rooms are accessible by booking or if authorised.',
      price: 688,
      type: 'House Single Type C (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Fhelix%20front.jpeg?alt=media&token=05e44eeb-eeb9-4d15-8697-dcbe0df95088',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Froom.jpg?alt=media&token=597fe855-1bbe-4bdb-9e86-392c610dd6ff',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Fpantry.jpeg?alt=media&token=34d8e724-74af-464e-ad91-e1eaef3b1966',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Flounge1.jpg?alt=media&token=845e570e-0b87-4f8a-9e3e-fd72f5b7df42'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2912,
      longitude: 103.7800,
      savedBy: [] // Initialize with an empty array
    }   , */
/*     {
      name: 'PGP Helix House',
      description: 'Helix House is located in the PGP estate, on the eastern end of the Kent Ridge Campus and is within close proximity to Science Park and Kent Ridge MRT Station. With over 3000 local and international students living within the estate, Helix House embraces global community living and racial harmony. As with all of our residences, your room at Helix House comes fully furnished with beds, desks, and wardrobes that maximize living space. Each block in Helix House has its own block amenities, and they include a block lounge. All lounges are air-conditioned and well-furnished, to facilitate bonding activities. On top of that, a shared pantry and laundrette are housed within the House. There is a small fee for the usage of washing machines and dryers, payable via NETS, Flashpay and Paylah. Other shared facilities includes a Recreation room, Music, and Baking room. While Recreation room is open for all Helix House residents, Music and Baking rooms are accessible by booking or if authorised.',
      price: 608,
      type: 'House Single Type C (Non-AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Fhelix%20front.jpeg?alt=media&token=05e44eeb-eeb9-4d15-8697-dcbe0df95088',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Froom.jpg?alt=media&token=597fe855-1bbe-4bdb-9e86-392c610dd6ff',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Fpantry.jpeg?alt=media&token=34d8e724-74af-464e-ad91-e1eaef3b1966',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FHelixhouse%2Flounge1.jpg?alt=media&token=845e570e-0b87-4f8a-9e3e-fd72f5b7df42'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2912,
      longitude: 103.7800,
      savedBy: [] // Initialize with an empty array
    }   , */
/*     {
      name: 'College  of Alice & Peter Tan (CAPT)',
      description: 'Founded in 2012, the College of Alice & Peter Tan (CAPT) is a Residential College made up of undergraduate students, faculty and administrative staff at the National University of Singapore. Together with three other residential colleges, CAPT is located within University Town and within close proximity to the wide range of learning, sports and performing arts facilities.The College of Alice & Peter Tan is distinguished by its vision of helping students engage with the community within and outside of NUS, and encouraging them to apply their knowledge to address issues that are important to society. The College consciously weaves this theme of active citizenship and community engagement through its curriculum and other aspects of the student experience. The University Town College Programme (UTCP) curriculum at CAPT is designed to help students become critical thinkers, articulate communicators, and individuals who can deal with complexity and uncertainty. In addition, through various informal learning activities, students have the opportunity to acquire a greater awareness of the diverse communities around us, develop empathy, leadership and organisational skills, and cultivate an informed view of issues relevant to society. We believe that active citizenship in the context of an educational institution is fundamentally about being equipped for participation in society. Our hope is that the outcome of this living-learning programme will be the shaping of knowledge, skills and values needed to make a difference, and that ultimately our students will apply them when they graduate to work across a wide range of careers and professions.',
      price: 688,
      type: 'Residential College Single Room (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2FCAPT.jpg?alt=media&token=ed2f8723-4fc2-4c89-a798-4d433b9ed5de',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Froom.png?alt=media&token=13115fa2-a9a2-4e21-8bdc-23802526befb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Fdining%20hall.jpeg?alt=media&token=27202370-e0fe-40dd-a3c3-8c6fb141f9e4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Flounge.png?alt=media&token=b3c82f2e-3ae8-41bd-b751-9bccaaac12ff'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3079,
      longitude: 103.7733,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes'
    }   , */
/*     {
      name: 'College  of Alice & Peter Tan (CAPT)',
      description: 'Founded in 2012, the College of Alice & Peter Tan (CAPT) is a Residential College made up of undergraduate students, faculty and administrative staff at the National University of Singapore. Together with three other residential colleges, CAPT is located within University Town and within close proximity to the wide range of learning, sports and performing arts facilities.The College of Alice & Peter Tan is distinguished by its vision of helping students engage with the community within and outside of NUS, and encouraging them to apply their knowledge to address issues that are important to society. The College consciously weaves this theme of active citizenship and community engagement through its curriculum and other aspects of the student experience. The University Town College Programme (UTCP) curriculum at CAPT is designed to help students become critical thinkers, articulate communicators, and individuals who can deal with complexity and uncertainty. In addition, through various informal learning activities, students have the opportunity to acquire a greater awareness of the diverse communities around us, develop empathy, leadership and organisational skills, and cultivate an informed view of issues relevant to society. We believe that active citizenship in the context of an educational institution is fundamentally about being equipped for participation in society. Our hope is that the outcome of this living-learning programme will be the shaping of knowledge, skills and values needed to make a difference, and that ultimately our students will apply them when they graduate to work across a wide range of careers and professions.',
      price: 608,
      type: 'Residential College Single Room (Non-AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2FCAPT.jpg?alt=media&token=ed2f8723-4fc2-4c89-a798-4d433b9ed5de',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Froom.png?alt=media&token=13115fa2-a9a2-4e21-8bdc-23802526befb',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Fdining%20hall.jpeg?alt=media&token=27202370-e0fe-40dd-a3c3-8c6fb141f9e4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Flounge.png?alt=media&token=b3c82f2e-3ae8-41bd-b751-9bccaaac12ff'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3079,
      longitude: 103.7733,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes'
    }   , */
     {
    name: 'College  of Alice & Peter Tan (CAPT)',
    description: 'Founded in 2012, the College of Alice & Peter Tan (CAPT) is a Residential College made up of undergraduate students, faculty and administrative staff at the National University of Singapore. Together with three other residential colleges, CAPT is located within University Town and within close proximity to the wide range of learning, sports and performing arts facilities.The College of Alice & Peter Tan is distinguished by its vision of helping students engage with the community within and outside of NUS, and encouraging them to apply their knowledge to address issues that are important to society. The College consciously weaves this theme of active citizenship and community engagement through its curriculum and other aspects of the student experience. The University Town College Programme (UTCP) curriculum at CAPT is designed to help students become critical thinkers, articulate communicators, and individuals who can deal with complexity and uncertainty. In addition, through various informal learning activities, students have the opportunity to acquire a greater awareness of the diverse communities around us, develop empathy, leadership and organisational skills, and cultivate an informed view of issues relevant to society. We believe that active citizenship in the context of an educational institution is fundamentally about being equipped for participation in society. Our hope is that the outcome of this living-learning programme will be the shaping of knowledge, skills and values needed to make a difference, and that ultimately our students will apply them when they graduate to work across a wide range of careers and professions.',
    price: 736,
    type: 'Residential College 6-Bdrm Apt (AC)',
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2FCAPT.jpg?alt=media&token=ed2f8723-4fc2-4c89-a798-4d433b9ed5de',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Froom.png?alt=media&token=13115fa2-a9a2-4e21-8bdc-23802526befb',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Fdining%20hall.jpeg?alt=media&token=27202370-e0fe-40dd-a3c3-8c6fb141f9e4',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Flounge.png?alt=media&token=b3c82f2e-3ae8-41bd-b751-9bccaaac12ff'
    ],
    averageRating: 0,
    ratings: [],
    latitude: 1.3079,
    longitude: 103.7733,
    savedBy: [], // Initialize with an empty array
    mealPlan:'Yes - $1147.77/Semester',
    academicProgrammes:'Yes(Compulsory)',
    hostelActivities: 'Yes(Compulsory)'
  }   , 
     {
    name: 'College  of Alice & Peter Tan (CAPT)',
    description: 'Founded in 2012, the College of Alice & Peter Tan (CAPT) is a Residential College made up of undergraduate students, faculty and administrative staff at the National University of Singapore. Together with three other residential colleges, CAPT is located within University Town and within close proximity to the wide range of learning, sports and performing arts facilities.The College of Alice & Peter Tan is distinguished by its vision of helping students engage with the community within and outside of NUS, and encouraging them to apply their knowledge to address issues that are important to society. The College consciously weaves this theme of active citizenship and community engagement through its curriculum and other aspects of the student experience. The University Town College Programme (UTCP) curriculum at CAPT is designed to help students become critical thinkers, articulate communicators, and individuals who can deal with complexity and uncertainty. In addition, through various informal learning activities, students have the opportunity to acquire a greater awareness of the diverse communities around us, develop empathy, leadership and organisational skills, and cultivate an informed view of issues relevant to society. We believe that active citizenship in the context of an educational institution is fundamentally about being equipped for participation in society. Our hope is that the outcome of this living-learning programme will be the shaping of knowledge, skills and values needed to make a difference, and that ultimately our students will apply them when they graduate to work across a wide range of careers and professions.',
    price: 660,
    type: 'Residential College 6-Bdrm Apt (Non-AC)',
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2FCAPT.jpg?alt=media&token=ed2f8723-4fc2-4c89-a798-4d433b9ed5de',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Froom.png?alt=media&token=13115fa2-a9a2-4e21-8bdc-23802526befb',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Fdining%20hall.jpeg?alt=media&token=27202370-e0fe-40dd-a3c3-8c6fb141f9e4',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FCollege%20of%20Alice%20and%20Peter%20Tan%2Flounge.png?alt=media&token=b3c82f2e-3ae8-41bd-b751-9bccaaac12ff'
    ],
    averageRating: 0,
    ratings: [],
    latitude: 1.3079,
    longitude: 103.7733,
    savedBy: [], // Initialize with an empty array
    mealPlan:'Yes - $1147.77/Semester',
    academicProgrammes:'Yes(Compulsory)',
    hostelActivities: 'Yes(Compulsory)'
  }   , 
    {
      name: 'Residential College 4',
      description: 'RC4 provide a curriculum with a focus on “systems thinking”. We adopt an interdisciplinary and integrative approach that examines how complex problems in the world can be seen through the lens of a system, with the intertwined interconnectivity of its multiple parts. Let us take healthcare as an example. Clearly, it is not just about medical sciences; economics, sociology, culture and belief systems, and human behaviour are equally important factors. RC4 is also the home-away-from-home for our 600 residents. It is a close-knit living-and-learning community with a strong spirit of concern and care. In the College, students study together, egg each other on to become better “systems thinkers”, engage in various co-curricular interests together, discuss real world issues together, and support each other in times of need. At the same time, they are supported by a dedicated team of 5 Resident Fellows (who are academic staff teaching in the College), 15 Resident Assistants (who are senior students with assigned duties), as well as other teaching fellows, admin staff and housing staff.',
      price: 688,
      type: 'Residential College Single Room (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2FRC4.jpg?alt=media&token=eb3207f3-891d-49dd-aecb-31d1256424ab',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2Fbedroom.jpeg?alt=media&token=03c18244-5d1f-4aa5-bd11-efb832c9856a',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2Flounge.jpeg?alt=media&token=54a0154f-c0ff-476e-a08c-2d069a956f3b',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2FScreenshot%202024-07-25%20at%203.51.34%20PM.png?alt=media&token=531b0d3e-7ab9-4183-9f06-298d55b53caf'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3082,
      longitude: 103.7734,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
    }   ,
    {
      name: 'Residential College 4',
      description: 'RC4 provide a curriculum with a focus on “systems thinking”. We adopt an interdisciplinary and integrative approach that examines how complex problems in the world can be seen through the lens of a system, with the intertwined interconnectivity of its multiple parts. Let us take healthcare as an example. Clearly, it is not just about medical sciences; economics, sociology, culture and belief systems, and human behaviour are equally important factors. RC4 is also the home-away-from-home for our 600 residents. It is a close-knit living-and-learning community with a strong spirit of concern and care. In the College, students study together, egg each other on to become better “systems thinkers”, engage in various co-curricular interests together, discuss real world issues together, and support each other in times of need. At the same time, they are supported by a dedicated team of 5 Resident Fellows (who are academic staff teaching in the College), 15 Resident Assistants (who are senior students with assigned duties), as well as other teaching fellows, admin staff and housing staff.',
      price: 736,
      type: 'Residential College 6-Bdrm Apt (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2FRC4.jpg?alt=media&token=eb3207f3-891d-49dd-aecb-31d1256424ab',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2Fbedroom.jpeg?alt=media&token=03c18244-5d1f-4aa5-bd11-efb832c9856a',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2Flounge.jpeg?alt=media&token=54a0154f-c0ff-476e-a08c-2d069a956f3b',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FResidential%20College%204%2FScreenshot%202024-07-25%20at%203.51.34%20PM.png?alt=media&token=531b0d3e-7ab9-4183-9f06-298d55b53caf'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3082,
      longitude: 103.7734,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
    }   ,
    {
      name: 'Tembusu College',
      description: 'The Tembusu College community is known for its friendly, open, and welcoming culture. In our College, learning is not just restricted to the classroom but interwoven throughout daily life. Students can expect a myriad of opportunities to interact with Fellows — many of whom also reside at the College — and distinguished visitors, both during official functions and as part of everyday living at the College. Coupled with a continually evolving schedule of sports, music, culture, drama, and events organised by student interest groups, and the student government, the College is a constant hive of activity. Within the college community, there are smaller entities called houses — which are formed through the clustering of various floors. The five houses — Shan, Ora, Tancho, Gaja, and Ponya — are named after endangered animal species to reflect our commitment to caring for the environment. The house system facilitates the formation of neighbourhoods within the greater college community, and helps students better know each other through more intimate events. Houses also occasionally engage in friendly competition with each other at events such as the Tembusu Sports Day. As our living space greatly impacts our lives, the College takes great pride in curating and maintaining its environment. Our dining hall — which we share with our neighbours at Cinnamon College — is the centre of college life. After all, dining is a social event, and our company is often the highlight of the meal. Meal times are thus moments when students socialise and engage with Fellows, Graduate Fellows, distinguished visitors, guests, and, most importantly, with each other. Some of the other spaces in the college include a common lounge on level one, replete with sofas, tables, and a range of board games, perfect for small gatherings and discussions; a games room with a pool table, an air hockey table, and an Xbox with kinect; The Abbey, a music room with a wide range of instruments; and the Tembusu Reading Room which is designed and stocked by the Fellowship of the college. In addition, every floor has its own lounge — personalised by, and catering to the needs of, its respective residents.',
      price: 736,
      type: 'Residential College 6-Bdrm Apt (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FTembusu.jpg?alt=media&token=9c023196-cb02-470b-8ad0-c92246d5c428',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=fb5c097b-220b-4dd1-89f5-6d91aadca4df',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FLounge-oqenl6xkc6fq0nfqy5zouphrmhy45wbn5ue8304lic.jpg?alt=media&token=eec96469-f327-4a75-b2e0-23f5b97ed843',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FColleg2.jpg?alt=media&token=1588aae7-d74f-4a47-bbd4-5f82742e4397'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3062,
      longitude: 103.7738,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
    }   , 
       {
        name: 'Tembusu College',
        description: 'The Tembusu College community is known for its friendly, open, and welcoming culture. In our College, learning is not just restricted to the classroom but interwoven throughout daily life. Students can expect a myriad of opportunities to interact with Fellows — many of whom also reside at the College — and distinguished visitors, both during official functions and as part of everyday living at the College. Coupled with a continually evolving schedule of sports, music, culture, drama, and events organised by student interest groups, and the student government, the College is a constant hive of activity. Within the college community, there are smaller entities called houses — which are formed through the clustering of various floors. The five houses — Shan, Ora, Tancho, Gaja, and Ponya — are named after endangered animal species to reflect our commitment to caring for the environment. The house system facilitates the formation of neighbourhoods within the greater college community, and helps students better know each other through more intimate events. Houses also occasionally engage in friendly competition with each other at events such as the Tembusu Sports Day. As our living space greatly impacts our lives, the College takes great pride in curating and maintaining its environment. Our dining hall — which we share with our neighbours at Cinnamon College — is the centre of college life. After all, dining is a social event, and our company is often the highlight of the meal. Meal times are thus moments when students socialise and engage with Fellows, Graduate Fellows, distinguished visitors, guests, and, most importantly, with each other. Some of the other spaces in the college include a common lounge on level one, replete with sofas, tables, and a range of board games, perfect for small gatherings and discussions; a games room with a pool table, an air hockey table, and an Xbox with kinect; The Abbey, a music room with a wide range of instruments; and the Tembusu Reading Room which is designed and stocked by the Fellowship of the college. In addition, every floor has its own lounge — personalised by, and catering to the needs of, its respective residents.',
        price: 660,
        type: 'Residential College 6-Bdrm Apt (Non-AC)',
        imageUrls: [
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FTembusu.jpg?alt=media&token=9c023196-cb02-470b-8ad0-c92246d5c428',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=fb5c097b-220b-4dd1-89f5-6d91aadca4df',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FLounge-oqenl6xkc6fq0nfqy5zouphrmhy45wbn5ue8304lic.jpg?alt=media&token=eec96469-f327-4a75-b2e0-23f5b97ed843',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FColleg2.jpg?alt=media&token=1588aae7-d74f-4a47-bbd4-5f82742e4397'
        ],
        averageRating: 0,
        ratings: [],
        latitude: 1.3062,
        longitude: 103.7738,
        savedBy: [], // Initialize with an empty array
        mealPlan:'Yes - $1147.77/Semester',
        academicProgrammes:'Yes(Compulsory)',
        hostelActivities: 'Yes(Compulsory)'
    }   , 
    {
      name: 'Tembusu College',
      description: 'The Tembusu College community is known for its friendly, open, and welcoming culture. In our College, learning is not just restricted to the classroom but interwoven throughout daily life. Students can expect a myriad of opportunities to interact with Fellows — many of whom also reside at the College — and distinguished visitors, both during official functions and as part of everyday living at the College. Coupled with a continually evolving schedule of sports, music, culture, drama, and events organised by student interest groups, and the student government, the College is a constant hive of activity. Within the college community, there are smaller entities called houses — which are formed through the clustering of various floors. The five houses — Shan, Ora, Tancho, Gaja, and Ponya — are named after endangered animal species to reflect our commitment to caring for the environment. The house system facilitates the formation of neighbourhoods within the greater college community, and helps students better know each other through more intimate events. Houses also occasionally engage in friendly competition with each other at events such as the Tembusu Sports Day. As our living space greatly impacts our lives, the College takes great pride in curating and maintaining its environment. Our dining hall — which we share with our neighbours at Cinnamon College — is the centre of college life. After all, dining is a social event, and our company is often the highlight of the meal. Meal times are thus moments when students socialise and engage with Fellows, Graduate Fellows, distinguished visitors, guests, and, most importantly, with each other. Some of the other spaces in the college include a common lounge on level one, replete with sofas, tables, and a range of board games, perfect for small gatherings and discussions; a games room with a pool table, an air hockey table, and an Xbox with kinect; The Abbey, a music room with a wide range of instruments; and the Tembusu Reading Room which is designed and stocked by the Fellowship of the college. In addition, every floor has its own lounge — personalised by, and catering to the needs of, its respective residents.',
      price: 688,
      type: 'Residential College Single Room (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FTembusu.jpg?alt=media&token=9c023196-cb02-470b-8ad0-c92246d5c428',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=fb5c097b-220b-4dd1-89f5-6d91aadca4df',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FReadingRoom-oqenl6xkc6fq0nfqy5zouphrmhy45wbn5ue8304lic.jpg?alt=media&token=52e766bc-e8fb-47a4-94e9-2991bc83b5e4',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FColleg2.jpg?alt=media&token=1588aae7-d74f-4a47-bbd4-5f82742e4397'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.3062,
      longitude: 103.7738,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
    }   , 
       {
        name: 'Tembusu College',
        description: 'The Tembusu College community is known for its friendly, open, and welcoming culture. In our College, learning is not just restricted to the classroom but interwoven throughout daily life. Students can expect a myriad of opportunities to interact with Fellows — many of whom also reside at the College — and distinguished visitors, both during official functions and as part of everyday living at the College. Coupled with a continually evolving schedule of sports, music, culture, drama, and events organised by student interest groups, and the student government, the College is a constant hive of activity. Within the college community, there are smaller entities called houses — which are formed through the clustering of various floors. The five houses — Shan, Ora, Tancho, Gaja, and Ponya — are named after endangered animal species to reflect our commitment to caring for the environment. The house system facilitates the formation of neighbourhoods within the greater college community, and helps students better know each other through more intimate events. Houses also occasionally engage in friendly competition with each other at events such as the Tembusu Sports Day. As our living space greatly impacts our lives, the College takes great pride in curating and maintaining its environment. Our dining hall — which we share with our neighbours at Cinnamon College — is the centre of college life. After all, dining is a social event, and our company is often the highlight of the meal. Meal times are thus moments when students socialise and engage with Fellows, Graduate Fellows, distinguished visitors, guests, and, most importantly, with each other. Some of the other spaces in the college include a common lounge on level one, replete with sofas, tables, and a range of board games, perfect for small gatherings and discussions; a games room with a pool table, an air hockey table, and an Xbox with kinect; The Abbey, a music room with a wide range of instruments; and the Tembusu Reading Room which is designed and stocked by the Fellowship of the college. In addition, every floor has its own lounge — personalised by, and catering to the needs of, its respective residents.',
        price: 608,
        type: 'Residential College Single Room (Non-AC)',
        imageUrls: [
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FTembusu.jpg?alt=media&token=9c023196-cb02-470b-8ad0-c92246d5c428',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2Futown%204-bedrm%20apt%20bedrm.jpg?alt=media&token=fb5c097b-220b-4dd1-89f5-6d91aadca4df',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FReadingRoom-oqenl6xkc6fq0nfqy5zouphrmhy45wbn5ue8304lic.jpg?alt=media&token=52e766bc-e8fb-47a4-94e9-2991bc83b5e4',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTembusu%20College%2FColleg2.jpg?alt=media&token=1588aae7-d74f-4a47-bbd4-5f82742e4397'
        ],
        averageRating: 0,
        ratings: [],
        latitude: 1.3062,
        longitude: 103.7738,
        savedBy: [], // Initialize with an empty array
        mealPlan:'Yes - $1147.77/Semester',
        academicProgrammes:'Yes(Compulsory)',
        hostelActivities: 'Yes(Compulsory)'
    }  ,
    {
      name: 'Ridge View Residential College',
      description: 'Ridge View Residential College (RVRC), is a beautiful residential college in nature. Our verdant setting and environment are unique to NUS. The interconnected college buildings are set within lush, spacious grounds to create a close-knit kampong community. RVRC is also located at the heart of student activities in the university; the NUS Sports Centre, the Football and Multi-purpose Fields, and the University Medical Centre are just across the street from us. There are also plenty of food options on either side of RVRC,within a few minutes walk. At RVRC, students live and learn under the motto: The World is Our Classroom. The college emphasizes sustainability and environmental stewardship, with many of our courses incorporating the United Nations Sustainable Development Goals (SDGs). We believe that learning has many facets and often takes place beyond the classroom, which means we focus on experiential and outdoor learning, and close relationships with external partners. To prepare students for their future workplace,we organise industry engagement through curated dialogue series and visits. In short, we make it our mission to use the world as our classroom and to make learning fun! When students join RVRC they will become a member of our diverse community. Each of the RVRC residential blocks is organised in a House, represented by a rare or endangered animal native to Singapore. Engaging fellow students and house mates in bonding activities makes RVRC a home away from home. Students are also encouraged to join meaningful college activities, diverse interest groups, events, or adopt student leadership roles. Thus, when joining RVRC, students become members of a close-knit community, meet many people, and form friendships that might last a lifetime.',
      price: 664,
      type: 'Residential College Single Room (AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FRVRC.jpg?alt=media&token=d4bdf179-9399-40f6-a33f-ae09f63bf6e6',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2Fsingle.jpg?alt=media&token=3acfa6cb-8d67-4b7b-a1d3-c1ab543bfc90',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FSmart-classroom-square-6be26bb2096bd7b2b4af6a87e2617595-5a98d80b22f94.jpg?alt=media&token=3a28fc59-b2f0-450f-ac70-f36ba62cc704',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FDining-hall-square-78769ae0cd8c9af0a0c1647f7d51264b-5a5c320921d77.jpg?alt=media&token=4d3ecda3-7964-408e-8f1c-f676fee0accf'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2975,
      longitude: 103.7771,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $1147.77/Semester',
      academicProgrammes:'Yes(Compulsory)',
      hostelActivities: 'Yes(Compulsory)'
  }  ,
  {
    name: 'Ridge View Residential College',
    description: 'Ridge View Residential College (RVRC), is a beautiful residential college in nature. Our verdant setting and environment are unique to NUS. The interconnected college buildings are set within lush, spacious grounds to create a close-knit kampong community. RVRC is also located at the heart of student activities in the university; the NUS Sports Centre, the Football and Multi-purpose Fields, and the University Medical Centre are just across the street from us. There are also plenty of food options on either side of RVRC,within a few minutes walk. At RVRC, students live and learn under the motto: The World is Our Classroom. The college emphasizes sustainability and environmental stewardship, with many of our courses incorporating the United Nations Sustainable Development Goals (SDGs). We believe that learning has many facets and often takes place beyond the classroom, which means we focus on experiential and outdoor learning, and close relationships with external partners. To prepare students for their future workplace,we organise industry engagement through curated dialogue series and visits. In short, we make it our mission to use the world as our classroom and to make learning fun! When students join RVRC they will become a member of our diverse community. Each of the RVRC residential blocks is organised in a House, represented by a rare or endangered animal native to Singapore. Engaging fellow students and house mates in bonding activities makes RVRC a home away from home. Students are also encouraged to join meaningful college activities, diverse interest groups, events, or adopt student leadership roles. Thus, when joining RVRC, students become members of a close-knit community, meet many people, and form friendships that might last a lifetime.',
    price: 584,
    type: 'Residential College Single Room (Non-AC)',
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FRVRC.jpg?alt=media&token=d4bdf179-9399-40f6-a33f-ae09f63bf6e6',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2Fsingle.jpg?alt=media&token=3acfa6cb-8d67-4b7b-a1d3-c1ab543bfc90',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FSmart-classroom-square-6be26bb2096bd7b2b4af6a87e2617595-5a98d80b22f94.jpg?alt=media&token=3a28fc59-b2f0-450f-ac70-f36ba62cc704',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FDining-hall-square-78769ae0cd8c9af0a0c1647f7d51264b-5a5c320921d77.jpg?alt=media&token=4d3ecda3-7964-408e-8f1c-f676fee0accf'
    ],
    averageRating: 0,
    ratings: [],
    latitude: 1.2975,
    longitude: 103.7771,
    savedBy: [], // Initialize with an empty array
    mealPlan:'Yes - $1147.77/Semester',
    academicProgrammes:'Yes(Compulsory)',
    hostelActivities: 'Yes(Compulsory)'
}  ,
{
  name: 'Ridge View Residential College',
  description: 'Ridge View Residential College (RVRC), is a beautiful residential college in nature. Our verdant setting and environment are unique to NUS. The interconnected college buildings are set within lush, spacious grounds to create a close-knit kampong community. RVRC is also located at the heart of student activities in the university; the NUS Sports Centre, the Football and Multi-purpose Fields, and the University Medical Centre are just across the street from us. There are also plenty of food options on either side of RVRC,within a few minutes walk. At RVRC, students live and learn under the motto: The World is Our Classroom. The college emphasizes sustainability and environmental stewardship, with many of our courses incorporating the United Nations Sustainable Development Goals (SDGs). We believe that learning has many facets and often takes place beyond the classroom, which means we focus on experiential and outdoor learning, and close relationships with external partners. To prepare students for their future workplace,we organise industry engagement through curated dialogue series and visits. In short, we make it our mission to use the world as our classroom and to make learning fun! When students join RVRC they will become a member of our diverse community. Each of the RVRC residential blocks is organised in a House, represented by a rare or endangered animal native to Singapore. Engaging fellow students and house mates in bonding activities makes RVRC a home away from home. Students are also encouraged to join meaningful college activities, diverse interest groups, events, or adopt student leadership roles. Thus, when joining RVRC, students become members of a close-knit community, meet many people, and form friendships that might last a lifetime.',
  price: 432,
  type: 'Residential College Double Room (AC)',
  imageUrls: [
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FRVRC.jpg?alt=media&token=d4bdf179-9399-40f6-a33f-ae09f63bf6e6',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2Fdouble.png?alt=media&token=e477ec9c-8b64-46ae-97c2-a17fa1b2a63d',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FSmart-classroom-square-6be26bb2096bd7b2b4af6a87e2617595-5a98d80b22f94.jpg?alt=media&token=3a28fc59-b2f0-450f-ac70-f36ba62cc704',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FDining-hall-square-78769ae0cd8c9af0a0c1647f7d51264b-5a5c320921d77.jpg?alt=media&token=4d3ecda3-7964-408e-8f1c-f676fee0accf'
  ],
  averageRating: 0,
  ratings: [],
  latitude: 1.2975,
  longitude: 103.7771,
  savedBy: [], // Initialize with an empty array
  mealPlan:'Yes - $1147.77/Semester',
  academicProgrammes:'Yes(Compulsory)',
  hostelActivities: 'Yes(Compulsory)'
}  ,
{
name: 'Ridge View Residential College',
description: 'Ridge View Residential College (RVRC), is a beautiful residential college in nature. Our verdant setting and environment are unique to NUS. The interconnected college buildings are set within lush, spacious grounds to create a close-knit kampong community. RVRC is also located at the heart of student activities in the university; the NUS Sports Centre, the Football and Multi-purpose Fields, and the University Medical Centre are just across the street from us. There are also plenty of food options on either side of RVRC,within a few minutes walk. At RVRC, students live and learn under the motto: The World is Our Classroom. The college emphasizes sustainability and environmental stewardship, with many of our courses incorporating the United Nations Sustainable Development Goals (SDGs). We believe that learning has many facets and often takes place beyond the classroom, which means we focus on experiential and outdoor learning, and close relationships with external partners. To prepare students for their future workplace,we organise industry engagement through curated dialogue series and visits. In short, we make it our mission to use the world as our classroom and to make learning fun! When students join RVRC they will become a member of our diverse community. Each of the RVRC residential blocks is organised in a House, represented by a rare or endangered animal native to Singapore. Engaging fellow students and house mates in bonding activities makes RVRC a home away from home. Students are also encouraged to join meaningful college activities, diverse interest groups, events, or adopt student leadership roles. Thus, when joining RVRC, students become members of a close-knit community, meet many people, and form friendships that might last a lifetime.',
price: 396,
type: 'Residential College Single Room (Non-AC)',
imageUrls: [
  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FRVRC.jpg?alt=media&token=d4bdf179-9399-40f6-a33f-ae09f63bf6e6',
  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2Fdouble.png?alt=media&token=e477ec9c-8b64-46ae-97c2-a17fa1b2a63d',
  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FSmart-classroom-square-6be26bb2096bd7b2b4af6a87e2617595-5a98d80b22f94.jpg?alt=media&token=3a28fc59-b2f0-450f-ac70-f36ba62cc704',
  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRVRC%2FDining-hall-square-78769ae0cd8c9af0a0c1647f7d51264b-5a5c320921d77.jpg?alt=media&token=4d3ecda3-7964-408e-8f1c-f676fee0accf'
],
averageRating: 0,
ratings: [],
latitude: 1.2975,
longitude: 103.7771,
savedBy: [], // Initialize with an empty array
mealPlan:'Yes - $1147.77/Semester',
academicProgrammes:'Yes(Compulsory)',
hostelActivities: 'Yes(Compulsory)'
},
{
  name: 'Eusoff Hall',
  description: 'Eusoff Hall (EH) is a progressive residence offering inclusive, stimulating and purposeful living-cum-learning programmes. You will find a home away from home where you will immerse in intentional engagement in co-curricular activities and build lasting friendships.',
  price: 556,
  type: 'Hall Single Room (Non-AC)',
  imageUrls: [
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2FEH.jpg?alt=media&token=e5622f89-16f0-4faf-b4f3-6886462a2b88',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fsingle-room-updated.png?alt=media&token=fcbf3bc8-841d-469b-88b4-a3d13e61e22c',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fkitchenette-1.jpg?alt=media&token=d3a4d625-d20c-4b4a-a140-4d1414977b4f',
    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fblue-oyster-2.jpg?alt=media&token=05aef60d-40f1-4267-a638-a77b3a1a86d4'
  ],
  averageRating: 0,
  ratings: [],
  latitude: 1.2938,
  longitude: 103.7704,
  savedBy: [], // Initialize with an empty array
  mealPlan:'Yes - $671/Semester',
  academicProgrammes:'Yes(Optional)',
  hostelActivities: 'Yes(Compulsory)'
  },
  {
    name: 'Eusoff Hall',
    description: 'Eusoff Hall (EH) is a progressive residence offering inclusive, stimulating and purposeful living-cum-learning programmes. You will find a home away from home where you will immerse in intentional engagement in co-curricular activities and build lasting friendships.',
    price: 384,
    type: 'Hall Double Room (Non-AC)',
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2FEH.jpg?alt=media&token=e5622f89-16f0-4faf-b4f3-6886462a2b88',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fsingle-room-updated.png?alt=media&token=fcbf3bc8-841d-469b-88b4-a3d13e61e22c',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fkitchenette-1.jpg?alt=media&token=d3a4d625-d20c-4b4a-a140-4d1414977b4f',
      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FEusoff%20Hall%2Fdouble-room-updated.png?alt=media&token=785d788c-4cca-49a5-bff4-6451b875dee3'
    ],
    averageRating: 0,
    ratings: [],
    latitude: 1.2938,
    longitude: 103.7704,
    savedBy: [], // Initialize with an empty array
    mealPlan:'Yes - $671/Semester',
    academicProgrammes:'Yes(Optional)',
    hostelActivities: 'Yes(Compulsory)'
    },
    {
      name: 'Kent Ridge Hall',
      description: 'Kent Ridge Hall (KRH) strives to be a premium provider of a first class university living experience that is unique & well rounded. Through a myriad of opportunities in performing arts, sports or committees, you can immerse in vibrant living experiences of on-campus housing by becoming part of KRH family.',
      price: 556,
      type: 'Hall Single Room (Non-AC)',
      imageUrls: [
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKent%20Ridge%20Hall%2FKRH.jpg?alt=media&token=6c6d426b-520d-4daa-87a9-dd1c50172321',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKent%20Ridge%20Hall%2Froom.png?alt=media&token=bc063631-3dde-4c68-92c4-e8b7c9d73a96',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKent%20Ridge%20Hall%2Famenities-lounge.jpg?alt=media&token=6eb67b26-5a47-457d-bd91-ad448273981d',
        'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKent%20Ridge%20Hall%2Famenities-lounge.jpg?alt=media&token=6eb67b26-5a47-457d-bd91-ad448273981d'
      ],
      averageRating: 0,
      ratings: [],
      latitude: 1.2918,
      longitude: 103.7748,
      savedBy: [], // Initialize with an empty array
      mealPlan:'Yes - $671/Semester',
      academicProgrammes:'Yes(Optional)',
      hostelActivities: 'Yes(Compulsory)'
      },
      {
        name: 'Sheares Hall',
        description: 'Founded in 1952, Sheares Hall (SH) has groomed generations of notable leaders and has an exceptional alumni network that set up the very first hall-based bursary at NUS. Be prepared to be immersed in a wide spectrum of experiences through a myriad of cultural, sports, committee, and community activities.',
        price: 556,
        type: 'Hall Single Room (Non-AC)',
        imageUrls: [
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FSheares%20Hall%2FSH.jpg?alt=media&token=41ab04de-a601-44e5-bc45-109b680082af',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FSheares%20Hall%2Fsample-room.png?alt=media&token=28f3d7e3-5593-40ef-aafa-ba4b982e705d',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FSheares%20Hall%2Flounge.png?alt=media&token=d87c5b29-02ce-44cd-bd45-db05d64899ec',
          'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FSheares%20Hall%2Fkitchen.png?alt=media&token=ec1f2bce-6216-44c5-afee-e396e95d1d8d'
        ],
        averageRating: 0,
        ratings: [],
        latitude: 1.2914,
        longitude: 103.7756,
        savedBy: [], // Initialize with an empty array
        mealPlan:'Yes - $671/Semester',
        academicProgrammes:'Yes(Optional)',
        hostelActivities: 'Yes(Compulsory)'
        },
        {
          name: 'King Edward VII Hall',
          description: 'With a century-old tradition, King Edward VII Hall (KEVII)’s uniqueness is its strong commitment to cultivating individual effectiveness within a living-learning community. KEVII offers a plethora of out-of-classroom activities in the theatre arts, culture, music, sports, photo-journalism, community engagement, and leadership.',
          price: 556,
          type: 'Hall Single Room (Non-AC)',
          imageUrls: [
            'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2FKEVII.jpg?alt=media&token=e6e156d2-beca-4531-9f3d-e3948d3c8b17',
            'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fsingle-room-updated.png?alt=media&token=e0c53b46-7146-4932-b101-32ed8a01b79e',
            'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fblock-lounge.png?alt=media&token=aa460f5a-518a-43c0-a84f-701feda13f80',
            'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fkitchenettes.png?alt=media&token=0ddd96bd-d247-4a8a-b2b1-66bafc9b96fc'
          ],
          averageRating: 0,
          ratings: [],
          latitude: 1.2924,
          longitude: 103.7811,
          savedBy: [], // Initialize with an empty array
          mealPlan:'Yes - $671/Semester',
          academicProgrammes:'Yes(Optional)',
          hostelActivities: 'Yes(Compulsory)'
          },
          {
            name: 'King Edward VII Hall',
            description: 'With a century-old tradition, King Edward VII Hall (KEVII)’s uniqueness is its strong commitment to cultivating individual effectiveness within a living-learning community. KEVII offers a plethora of out-of-classroom activities in the theatre arts, culture, music, sports, photo-journalism, community engagement, and leadership.',
            price: 384,
            type: 'Hall Double Room (Non-AC)',
            imageUrls: [
              'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2FKEVII.jpg?alt=media&token=e6e156d2-beca-4531-9f3d-e3948d3c8b17',
              'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fdouble-room-updated.png?alt=media&token=4c8ee477-da71-4007-8c5d-0efe22fcc627',
              'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fblock-lounge.png?alt=media&token=aa460f5a-518a-43c0-a84f-701feda13f80',
              'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FKing%20Edward%20Hall%2Fkitchenettes.png?alt=media&token=0ddd96bd-d247-4a8a-b2b1-66bafc9b96fc'
            ],
            averageRating: 0,
            ratings: [],
            latitude: 1.2924,
            longitude: 103.7811,
            savedBy: [], // Initialize with an empty array
            mealPlan:'Yes - $671/Semester',
            academicProgrammes:'Yes(Optional)',
            hostelActivities: 'Yes(Compulsory)'
            },
            {
              name: 'Raffles Hall',
              description: 'Established in 1958, Raffles Hall (RH) has a rich heritage supported by strong alumni relations and a traditional culture of excellence cultivated by its residents. It is the largest and most centrally located hall within the Kent Ridge Campus.',
              price: 556,
              type: 'Hall Single Room (Non-AC)',
              imageUrls: [
                'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2FRH.jpg?alt=media&token=36090b4c-bd22-4a22-a584-9e5c5a5877ce',
                'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Fsingle.png?alt=media&token=be299164-9023-4433-a732-6dc360874396',
                'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Flower-lounge.jpg?alt=media&token=0e9dcfc7-e2aa-47bc-9f21-4a1fae51e521',
                'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Fcomm-hall-e1432982818222.jpg?alt=media&token=cbf873f3-b169-4d87-9bdd-df153f67c54b'
              ],
              averageRating: 0,
              ratings: [],
              latitude: 1.3000,
              longitude: 103.7740,
              savedBy: [], // Initialize with an empty array
              mealPlan:'Yes - $671/Semester',
              academicProgrammes:'Yes(Optional)',
              hostelActivities: 'Yes(Compulsory)'
              },
              {
                name: 'Raffles Hall',
                description: 'Established in 1958, Raffles Hall (RH) has a rich heritage supported by strong alumni relations and a traditional culture of excellence cultivated by its residents. It is the largest and most centrally located hall within the Kent Ridge Campus.',
                price: 384,
                type: 'Hall Double Room (Non-AC)',
                imageUrls: [
                  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2FRH.jpg?alt=media&token=36090b4c-bd22-4a22-a584-9e5c5a5877ce',
                  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Fdouble.png?alt=media&token=52a95c36-b7f8-4976-a17f-18c66fc7df1e',
                  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Flower-lounge.jpg?alt=media&token=0e9dcfc7-e2aa-47bc-9f21-4a1fae51e521',
                  'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FRaffles%20Hall%2Fcomm-hall-e1432982818222.jpg?alt=media&token=cbf873f3-b169-4d87-9bdd-df153f67c54b'
                ],
                averageRating: 0,
                ratings: [],
                latitude: 1.3000,
                longitude: 103.7740,
                savedBy: [], // Initialize with an empty array
                mealPlan:'Yes - $671/Semester',
                academicProgrammes:'Yes(Optional)',
                hostelActivities: 'Yes(Compulsory)'
                },
                {
                  name: 'Temasek Hall',
                  description: 'What sets the Hall of Residences apart from other residences in NUS is its vibrancy with a whole range of co-curriculum activities available to their residents to participate. Temasek Hall provides its residents a pleasant, safe and conducive environment to live, to play and to learn. From the photo gallery and video footages on this website, you will find a myriad of sports, cultural and other activities in Temasek Hall to develop talents, cultivate leadership and build character of its residents. Over the years, many lifelong friendships have been forged through these activities. Most of the activities are initiated, organized and run by the residents. They are led by a group of student leaders, including the sports captains, heads of cultural groups and heads of committees. Overseeing the various groups and activities is the Junior Common Room Committee (JCRC), made up of elected student leaders holding different portfolios. You can find the photos of these student leaders on this website.There are five residential blocks in TH, and in each block, there is a resident fellow (RF) in charge. These RFs are all full time NUS staff, either academic or non-academic, working in various departments in the University. The five RFs and the Hall Master form the Senior Common Room Committee (SCRC) to provide guidance and advices to the residents on any aspects of hall life. They live in the Hall with their family members to look after and interact with the residents after office hours. To support the student activities, we have a very dedicated team of hall office staff led by a Hall manager. They take care of the day to day running of the hall operations, including admission, finance, meals, hall facilities and equipment as well as safety and security.',
                  price: 556,
                  type: 'Hall Single Room (Non-AC)',
                  imageUrls: [
                    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Ftemasek-hall-scaled.jpg?alt=media&token=bcf227d9-2eca-4b19-a777-9c5f839f1be3',
                    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Fsingle.png?alt=media&token=0f229221-59f3-4812-b426-6d0d26d1d370',
                    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Flounge.jpg?alt=media&token=a8c99719-348b-49f0-a862-5dc088659158',
                    'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Fkitchenette.jpg?alt=media&token=484daa6b-4443-4915-bf55-eef7dd5785a1'
                  ],
                  averageRating: 0,
                  ratings: [],
                  latitude: 1.292,
                  longitude: 103.7714,
                  savedBy: [], // Initialize with an empty array
                  mealPlan:'Yes - $671/Semester',
                  academicProgrammes:'Yes(Optional)',
                  hostelActivities: 'Yes(Compulsory)'
                  },
                  {
                    name: 'Temasek Hall',
                    description: 'What sets the Hall of Residences apart from other residences in NUS is its vibrancy with a whole range of co-curriculum activities available to their residents to participate. Temasek Hall provides its residents a pleasant, safe and conducive environment to live, to play and to learn. From the photo gallery and video footages on this website, you will find a myriad of sports, cultural and other activities in Temasek Hall to develop talents, cultivate leadership and build character of its residents. Over the years, many lifelong friendships have been forged through these activities. Most of the activities are initiated, organized and run by the residents. They are led by a group of student leaders, including the sports captains, heads of cultural groups and heads of committees. Overseeing the various groups and activities is the Junior Common Room Committee (JCRC), made up of elected student leaders holding different portfolios. You can find the photos of these student leaders on this website.There are five residential blocks in TH, and in each block, there is a resident fellow (RF) in charge. These RFs are all full time NUS staff, either academic or non-academic, working in various departments in the University. The five RFs and the Hall Master form the Senior Common Room Committee (SCRC) to provide guidance and advices to the residents on any aspects of hall life. They live in the Hall with their family members to look after and interact with the residents after office hours. To support the student activities, we have a very dedicated team of hall office staff led by a Hall manager. They take care of the day to day running of the hall operations, including admission, finance, meals, hall facilities and equipment as well as safety and security.',
                    price: 384,
                    type: 'Hall Double Room (Non-AC)',
                    imageUrls: [
                      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Ftemasek-hall-scaled.jpg?alt=media&token=bcf227d9-2eca-4b19-a777-9c5f839f1be3',
                      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Fdouble.png?alt=media&token=dc8e194d-0c67-43f0-803e-47ef2bc740e2',
                      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Flounge.jpg?alt=media&token=a8c99719-348b-49f0-a862-5dc088659158',
                      'https://firebasestorage.googleapis.com/v0/b/auth-development-6bbed.appspot.com/o/Hostels%2FTemasek%20Hall%2Fkitchenette.jpg?alt=media&token=484daa6b-4443-4915-bf55-eef7dd5785a1'
                    ],
                    averageRating: 0,
                    ratings: [],
                    latitude: 1.292,
                    longitude: 103.7714,
                    savedBy: [], // Initialize with an empty array
                    mealPlan:'Yes - $671/Semester',
                    academicProgrammes:'Yes(Optional)',
                    hostelActivities: 'Yes(Compulsory)'
                    }
  ];

  try {
/*     console.log('Deleting existing hostels...');
    await Hostel.deleteMany({}); // Clear existing data */

    console.log('Inserting new hostels...');
    const result = await Hostel.insertMany(hostelsData);
    console.log('Hostels inserted:', result);
  } catch (err) {
    console.error('Error inserting hostels:', err);
  } finally {
    mongoose.connection.close();
  }
});
