class MeetupModel {
  constructor() {
    this.meetups = [
      {
        id: 1,
        createdOn: '2019-01-01T22:48:05.633',
        location: '235 adeola adeku VI lagos',
        topic: 'Introduction to Javascript',
        happeningOn: '2019-01-022T22:48:05.633',
        tags: ['programming', 'web', 'front-end']
      },
      {
        id: 2,
        createdOn: '2019-01-01T22:48:05.633',
        location: '235 adeola adeku VI lagos',
        topic: 'Introduction to CSS3',
        happeningOn: '2019-01-022T22:48:05.633',
        tags: ['programming', 'web', 'front-end']
      }
    ];
  }

  getAllMeetups() {
    return this.meetups;
  }
}

export default new MeetupModel();
