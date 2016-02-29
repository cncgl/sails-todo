var author_1 = require('./author/author');
var book_1 = require('./book/book');
var Routes = (function () {
    function Routes() {
    }
    Routes.get = function () {
        return Routes.items;
    };
    Routes.items = [
        { path: '/author', component: author_1.AuthorCmp, name: 'Author' },
        { path: '/book', component: book_1.BookCmp, name: 'Book' }
    ];
    return Routes;
})();
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map