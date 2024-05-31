import express, { Request } from 'express';

interface Book {
    name: string
    price: number
    cover: string
    pdf: string
    blockchain_collection_id: number
    owner: string
}

const books: Book[] = []

const app = express();

app.use(express.json());

app.get('/books', (_req, res) => {
    res.json({
        success: true,
        books,
        message: "Books successfully obtained"
    });
});

app.post('/books/create', (req: Request<any, any, Book>, res) => {
    const data = req.body;
    books.push(data)

    res.json({
        success: true,
        books,
        message: "Book successfully added"
    });
});

app.post('/user/books', (req: Request<any, any, { ownerWallet: string, collectionId: number }[]>, res) => {
    const data = req.body;
    const userBooks: Book[] = []

    for (let i = 0; i < data.length; i++) {
        const book = books.find((book) => book.owner === data[i].ownerWallet && book.blockchain_collection_id === data[i].collectionId)
        if (book) {
            userBooks.push(book)
        }
    }

    res.json({
        success: true,
        books: userBooks,
        message: "Books successfully obtained"
    });
});

app.use(express.static('/dist'));

app.listen();
