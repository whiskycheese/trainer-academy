import firebase from 'firebase/app';

export const getLessons = async () => {
  const lessonsSnapshot = await firebase
    .firestore()
    .collection('lessons')
    .get();
  const { docs } = lessonsSnapshot;

  const lessons = [];
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    const {
      id, category, lesson, isCompleted, video, desc, image,
    } = doc.data();
    lessons.push({
      docID: doc.id,
      id,
      category,
      lesson,
      isCompleted,
      video,
      desc,
      image,
    });
  }
  return lessons;
};

export const changeCompleteStat = async (uid, docid, completeStat) => {
  firebase
    .firestore()
    .collection(uid)
    .doc(docid)
    .update({
      isCompleted: completeStat,
    });

  const clickedLesson = firebase
    .firestore()
    .collection(uid)
    .doc(docid)
    .get();

  return clickedLesson;
};

export const createUser = async (uid) => {
  const lessonsSnapshot = await firebase
    .firestore()
    .collection('lessons')
    .get();
  const { docs } = lessonsSnapshot;

  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    const {
      id, category, lesson, isCompleted, video, desc,
    } = doc.data();
    firebase
      .firestore()
      .collection(uid)
      .doc(doc.id)
      .set({
        id,
        category,
        lesson,
        isCompleted,
        video,
        desc,
      });
  }
};

export const getUserLessons = async (uid) => {
  const lessonsSnapshot = await firebase
    .firestore()
    .collection(uid)
    .get();
  const { docs } = lessonsSnapshot;

  const lessons = [];
  for (let i = 0; i < docs.length; i += 1) {
    const doc = docs[i];
    const {
      id, category, lesson, isCompleted, video, desc,
    } = doc.data();
    lessons.push({
      docID: doc.id,
      id,
      category,
      lesson,
      isCompleted,
      video,
      desc,
    });
  }
  return lessons;
};
