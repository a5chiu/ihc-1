export function uploadUpdatesHelper(realm, fetchUrl) {
  // const patients = Object.values(realm.objects('Patient').filtered('needToUpload = true'));
  const patients = Object.values(realm.objects('Patient'));
  fetch('patients/', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patients: patients
    }),
  }).then(response => {
    return Promise.resolve(true);
  }).catch(err => {
    return Promise.reject(err);
  });
}
