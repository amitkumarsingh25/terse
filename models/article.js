class article {
  constructor(
    id,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    source
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
    this.source = source;
  }
}

export default article;
