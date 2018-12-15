let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: 'Testi1',
    author: 'Kirjoittaja1',
    url: 'testi.fi',
    likes: '1',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "kayttaja1",
      name: "Nimi1"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: 'Testi2',
    author: 'Kirjoittaja2',
    url: 'testi.net',
    likes: '2',
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "kayttaja1",
      name: "Nimi1"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: 'Testi3',
    author: 'Kirjoittaja3',
    url: 'testi.com',
    likes: '3',
    user: {
      _id: "5a437a9e514ab7f168ddf152",
      username: "kayttaja2",
      name: "Nimi2"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }
