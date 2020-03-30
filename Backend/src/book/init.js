import Book from "./model";

export default {
    async run(req, res) {
        try {
            await Book.deleteMany({});
            const books = [
                {
                    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
                    isbn: "0-201-63361-2",
                    authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
                    published: new Date("01-11-1997"),
                    pages: 368,
                    price: 449.95
                },
                {
                    title: "The Art of Computer Programming. Vol.1",
                    isbn: "0-201-89683-4",
                    authors: ["Donald E. Knuth"],
                    published: new Date(1974, 1, 1),
                    pages: 735,
                    price: 799
                },
                {
                    title: "The Art of Computer Programming. Vol.2",
                    isbn: "0-201-89683-4",
                    authors: ["Donald E. Knuth"],
                    published: new Date(1974, 1, 1),
                    pages: 735,
                    price: 799
                },
                {
                    title: "The Art of Computer Programming. Vol.3",
                    isbn: "0-201-89683-4",
                    authors: ["Donald E. Knuth"],
                    published: new Date(1974, 1, 1),
                    pages: 735,
                    price: 799
                },
                {
                    title: "Шаблоны проектирования Node.JS",
                    isbn: "978-5-97060-485-4",
                    authors: ["Марно Каскиаро", "Лучано Маммино"],
                    published: new Date("05-04-2017"),
                    pages: 396,
                    price: 960
                },
                {
                    title: "Разработка веб-приложений с помощью Node.js, MongoDB и Angular. Исчерпывающее руководство по использованию стека MEAN",
                    isbn: "978-5-6040044-8-7",
                    authors: ["Дейли Брэд"],
                    published: new Date("09-01-2017"),
                    pages: 656,
                    price: 588
                }
            ];

            books.forEach(async book => await new Book(book).save());
        } catch (error) {
            console.log(error)
        }
    }
}
