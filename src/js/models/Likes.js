export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, image) {
    const item = {
      id,
      title,
      author,
      image,
    };
    this.likes.push(item);

    // persist the data in local storage
    this.persistData();

    return item;
  }

  removeLike(id) {
    const itemIndex = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(itemIndex, 1);

    // persist the data in local storage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.find((el) => el.id === id);
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // restore data from the local storage
    if (storage) this.likes = storage;
  }
}
