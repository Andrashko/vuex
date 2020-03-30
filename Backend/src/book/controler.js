import Book from "./model";

const bookControler = {
    async get(req, res) {
        try {
           
            const list = await Book.find(makeQueryObject (req.query));            
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }


        function makeQueryObject(query){
            let result = {};        
            if (query.year)
                result.$expr = { "$eq": [{ "$year": "$published" }, parseInt( query.year)] } ;

            if (query.minPages){
                result.pages = {"$gte": parseInt(query.minPages)};
            }

            if (query.maxPages){
                if (!result.pages )
                    result.pages = {};
                result.pages.$lte=parseInt(query.maxPages);
            }
            
            return result;
        }
    },
    async getById(req, res) {
        try {
            const book = await Book.findById(req.params.id);
            if (!book)
                res.status(404).send("Not found");
            res.send(book);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {           
            const book = new Book(req.body);
            await book.save();
            res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            if (!book)
                res.status(404).send("Not found");
            res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            if (!book)
                res.status(404).send("Not found");
            await book.save();  
            res.send(book);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default bookControler;