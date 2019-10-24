const request = require('request')

const threats = [
  {
      id: 1,
      displayName: 'Shashi Kiran.',
      necessaryPowers: ['flying'],
      img: 'tower.jpg',
      assignedHero: 0
  },
  {
      id: 2,
      displayName: 'Tanish Shetty',
      necessaryPowers: ['teleporting'],
      img: 'mess.jpg',
      assignedHero: 0
  },
  {
      id: 3,
      displayName: 'Jas',
      necessaryPowers: ['clairvoyance'],
      img: 'joke.jpg',
      assignedHero: 0
  }
];

request.post({
     headers: {'content-type': 'application/json'},
      url: `http://localhost:8081/hero/4`,
      body: `{
          "busy": true
      }`
  }, (err, heroResponse, body) => {
      if (!err) {
          console.log ( "shashi - threats.js, in !error ")
          const threatId = 3
          console.log ( "shashi - threats.js, threatId= ", threatId);
          const threat = threats.find(subject => subject.id === threatId);
          console.log ( "shashi - threats.js, threat= ", threat);
          threat.assignedHero = 4;
      } else {
          console.log({problem: `Hero Service responded with issue ${err}`});
      }
})
