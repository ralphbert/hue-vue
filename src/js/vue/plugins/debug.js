export default function (store) {
  store.subscribe((mutation, state) => {
    console.log(mutation);
  });
};