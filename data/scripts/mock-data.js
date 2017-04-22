/**
 * Created by roman_b on 1/16/2017.
 */
var ObjectID = require('mongodb').ObjectID;

var enLang = {_id : "en_US", name: "Английский"};
var deLang = {_id : "de_DE", name: "Немецкий"};
var esLang = {_id : "es_ES", name: "Исанский"};
var frLang = {_id : "fr_FR", name: "Французский"};

var mockDescription = "The world's best-selling grammar series for learners of English. Essential Grammar in Use is a self-study reference and practice book for elementary-level learners (A1-B1), used by millions of people around the world. With clear examples, easy-to-follow exercises and answer key, the Fourth edition is perfect for independent study, covering all the areas of grammar that you will need at this level. The book has an easy-to-use format of two-page units with clear explanations of grammar points on the left-hand page, and practice exercises on the right.";

var book1 = {name: "English World 1: Pupil's Book", language_id : 'en_US', logo: '/img/items/logos/en-world-1.jpg',
    searchTags:['English World', "Pupil's Book"],
    publisher: 'MacMillan', ISBN: '9780230024595, 0230024599', author:'Liz Hocking, Mary Bowen, Wendy Wren', year:'2012',
    edition: '1st Edition', price: 350};
var book2 = {name: "English World 2: Pupil's Book", language_id : 'en_US',
    searchTags:['English World', "Pupil's Book"],
    publisher: 'MacMillan', ISBN: '978-0-230-02460-1', author:'Liz Hocking, Mary Bowen', year:'2009',
    edition: '2d Edition', price: 350};
var book3 = {name: "New Headway: Elementary: Student's Book", language_id : 'en_US', logo: '/img/items/logos/new-headway-el-en-course.jpg',
    isPopular: true, searchTags:["Headway", "Headway Student's Book", "Headway Elementary", "Хэдвэй"],
    publisher: 'Oxford University Press', ISBN: '978-0194715096', author:'Liz Soars, John Soars', year:'2006',
    edition: '3d Edition', price: 100};
var book4 = {name: "English 5", language_id : 'en_US',
    searchTags:["Карпюк", "Карп'юк", "English 5", "5 класс", "5й класс"],
    publisher: 'Астон, Тернопіль', ISBN: '978-0194715096', author:"Карп'юк О.Д.", year:'2013', price: 60};

var book5 = {name: 'Natural English: The "Get" Workbook', language_id : 'en_US', isPopular: true,
    searchTags:["Natural English", "get workbook", "Close", "Karolyn Close", "Tagish Moon"],
    publisher: 'Tagish Moon Publishing', logo : '/img/items/logos/natural-engl.jpg', ISBN: '1502399547', author:"Karolyn Close", year:'2014',
    price: 300, edition: 'Premium edition'};

var book6 = {name: 'New Headway English Course', logo : '/img/items/logos/new-headway-en-course.jpg', language_id : 'en_US', isPopular: true,
    publisher: 'Oxford University Press', ISBN: '978-0194366700', author:"John Soars", year:'2000',
    searchTags:["Headway", "New Headway", "Headway English Course", "Oxford", "Oxford University", "Хэдвэй", "John Soars", "Soars"],
    price: 450, edition: 'Student edition'};

var book7 = {name: 'Essential Grammar in Use with Answers', fullName: 'A Self-Study Reference and Practice Book for Elementary Learners of English', language_id : 'en_US',
    publisher: 'Cambridge University Press', imgs : ['/img/items/ess-gr-in-use-elem-main.jpg'], description: mockDescription,
    searchTags:["Essential Grammar", "Raymond Murphy", "Murphy"],
    logo : '/img/items/logos/ess-gr-in-use-elem.jpg', ISBN: '978-1107480551', author:"Raymond Murphy", year:'2015',
    price: 300, edition: '4th Edition', weight: 1, dimensions: '10.4 x 0.6 x 7.7'};

var book8 = {name: 'English Grammar in Use', fullName: 'A Self-study Reference and Practice Book for Intermediate Students of English - with Answers', language_id : 'en_US',
    publisher: 'Cambridge University Press', logo : '/img/items/logos/ess-gr-in-use-interm.jpg', ISBN: '978-1107480551', isPopular: true, author:"Raymond Murphy", year:'2012',
    searchTags:["English Grammar", "Essential Grammar", "Raymond Murphy", "Murphy"],
    price: 450, edition: '4th Edition', weight: 1.1, dimensions: '10.4 x 0.6 x 7.7'};

var book9 = {name: 'Spanish B', language_id : 'es_ES', description: ': Course companion',
    searchTags:["Spanish", "Barselona University Press", "Valbuena"],
    publisher: 'Barselona University Press', ISBN: '9780198389163 ', author:"By Ana Valbuena, Jesús-Antonio Rodríguez Blanco", year:'2012',
    price: 450, edition: '4th Edition', weight: 1.1, dimensions: '219 x 276'};

var book10 = {name: 'Access Spanish', language_id : 'es_ES', logo : '/img/items/logos/access-spanish.jpg',
    searchTags:["Spanish", "Barselona University Press", "Valbuena"],
    publisher: 'Barselona University Press', ISBN: '9780198389163 ', author:"By Ana Valbuena, Jesús-Antonio Rodríguez Blanco", year:'2014',
    price: 380, edition: '4th Edition', weight: 1.1, dimensions: '219 x 276'};

var book11 = {name: 'Living German', language_id : 'de_DE',
    searchTags:["German", "Hodder", "Buckley"],
    publisher: 'Hodder Education Publishers', ISBN: '978-1444153910 ', author:"R.W. Buckley, Paul Coggle", year:'2012',
    price: 280, edition: '7th Edition', dimensions: '7.7 x 1.2 x 5.1'};

var book12 = {name: 'The Everything Learning German Book', fullName: 'Speak, write, and understand basic German in no time', language_id : 'de_DE',
    publisher: 'Adams Media', ISBN: '978-1444153910 ',
    searchTags:["German", "German Book", "Edward Swick"],
    author:"Edward Swick M.A.", year:'2009',
    price: 320, edition: '2nd Edition', dimensions: '8 x 0.9 x 9.2', weight: 2};

var book13 = {name: "The New Cambridge English Course 1 Teacher's book", language_id : 'en_US',
    searchTags:["Teacher", "Teacher's book", "English Course", "Michael Swan"],
    publisher: 'Cambridge University Press', ISBN: '978-0521376655', author:"Michael Swan, Catherine Walter", year:'1990',
    price: 260, edition: 'Tch edition', dimensions: '8.8 x 0.8 x 11.7', weight: 2.3};

var book14 = {name: "Headway Academic Skills: 1", fullName : "Reading, Writing, and Study Skills Teacher's Guide with Tests CD-ROM", language_id : 'en_US',
    publisher: 'Oxford University Press', year:'2011',
    searchTags:["Teacher", "Teacher's book", "Headway Teacher's book", "Teacher's Guide", "Oxford", "Oxford University", "Academic"],
    price: 260, dimensions: '8.8 x 0.8 x 11.7', weight: 2.3};

var voc1 = {name: "Dictionary of American Idioms", fullName : "(Barron's Dictionary of American Idioms)", language_id : 'en_US',
    publisher: "Barron's Educational Series", ISBN: ' 978-1438001579', author:"Adams Media, M.T Boatner, J.E. Gates", year:'2013',
    searchTags:["Dictionary", "Idioms", "American Idioms", "Barron", "Barron's Dictionary"],
    price: 400, edition: '5th edition', dimensions: '1 x 6 x 9', weight: 1.5};

var voc2 = {name: 'Oxford Advanced American Dictionary for learners of English', language_id : 'en_US', isPopular: true,
    searchTags:["Dictionary", "Idioms", "American Idioms", "Barron", "Barron's Dictionary"],
    publisher: 'Oxford University Press', ISBN: '978-1444153910 ', author:"Inc. Oxford University Press (Corporate Author)", year:'2011',
    price: 520, edition: 'Pap/Cdr Edition', dimensions: '8 x 0.9 x 9.2', weight: 2};

var voc3 = {name: 'Oxford American Dictionary Vocabulary Builder', language_id : 'en_US',
    searchTags:["Dictionary", "Vocabulary", "American Dictionary", "Keith"],
    publisher: 'Oxford University Press', ISBN: '978-0194399951', author:" Keith S. Folse", year:'2010',
    price: 200, edition: 'Workbook Edition', dimensions: '8 x 0.9 x 9.2', weight: 0.5};

var voc4 = {name: 'Mastering German Vocabulary', fullName : 'A Thematic Approach', language_id : 'de_DE',
    searchTags:["German", "Vocabulary", "German Vocabulary", "Barron"],
    publisher: "Barron's Educational Series", ISBN: '978-0812091083', author:"Veronika Schnorr , Gabriele Forst", year:'1995',
    price: 250, edition: '8/22/95 edition', dimensions: '4.8 x 0.8 x 7.6', weight: 3.5};

var voc5 = {name: "Barron's German-English Dictionary", fullName : "Worterbuch Deutsch-Englisch", language_id : 'de_DE',
    searchTags:["German English Dictionary", "German English", "Dictionary", "Barron"],
    publisher: "Barron's Educational Series", ISBN: '978-0764137631', author:"Ursula Martini", year:'2007',
    price: 450, edition: 'Pap/Dol Bl edition', dimensions: '2 x 6 x 8.8', weight: 2};

var fict1 = {name: "End of Watch", fullName : "A Novel (The Bill Hodges Trilogy)", language_id : 'en_US',
    searchTags:["End of Watch", "Novel", "Dictionary", "Stephen King", "King"],
    publisher: "Scribner; Book Club Edition edition", ISBN: '978-1501129742', author:"Stephen King", year:'2016',
    price: 510, edition: '1st edition', dimensions: '6.1 x 1.5 x 9.2', weight: 0.7};

var fict2 = {name: 'Harry Potter and the Cursed Child, Parts 1 & 2', language_id : 'en_US',
    searchTags:["Harry Potter", "Potter", "Harry Potter and the Cursed Child", "Rowling"],
    publisher: 'Arthur A. Levine Books', ISBN: '978-1338099133', author:"J.K. Rowling, Jack Thorne, John Tiffany", year:'2016',
    price: 500, edition: 'Special Rehearsal ed. edition', dimensions: '6.4 x 1.2 x 9.1', weight: 1.2};

var fict3 = {name: 'Hamilton: The Revolution', language_id : 'en_US',
    searchTags:["Hamilton", "The Revolution", "Hamilton The Revolution", "Lin-Manuel Miranda"],
    publisher: 'Grand Central Publishing', ISBN: '978-1455539741', author:"Lin-Manuel Miranda, Jeremy McCarter", year:'2016',
    price: 200, edition: 'First Edition edition', dimensions: '9 x 1.6 x 10.6 ', weight: 2.2};


var subCat1Cat1 = {name: '1-3 класс', items:[book1, book2], img : '/img/categories/elementary.png'}
var subCat2Cat1 = {name: '5-7 класс', items: [book3, book4, book9], img : '/img/categories/middle.png'}
var subCat3Cat1 = {name: '8-11 класс', items: [book5, book6, book7, book8, book10, book11], img : '/img/categories/high.png'}
var subCat4Cat1 = {name: 'Преподавателю', items: [book12, book13], img : '/img/categories/teacher.png'}

var subCat1Cat2 = {name: 'Английский', items:[voc1, voc2, voc3], img : '/img/categories/en-dict.png'}
var subCat2Cat2 = {name: 'Немецкий', items: [voc4, voc5], img : '/img/categories/de-dict.png'}

var cat1 = {name:'Учебная', disporder:0, img:"/img/menu/education-lit-41x41.png", subCategories: [subCat1Cat1, subCat2Cat1, subCat3Cat1, subCat4Cat1]};
var cat2 = {name:'Словари', disporder:1, img:"/img/menu/dictionary-41x41.png", subCategories: [subCat1Cat2, subCat2Cat2]};
var cat3 = {name:'Художественная', disporder:2, img:"/img/menu/fiction-lit-41x41.png", items: [fict1, fict2, fict3]};


var catList = [cat1, cat2, cat3];
var allBooks = [];

for (var i=0; i < catList.length; i++){
    catList[i]._id = new ObjectID();
    if (catList[i].subCategories == null && catList[i].items == null)
        continue;
    if (catList[i].subCategories != null){
        for (var j = 0; j < catList[i].subCategories.length; j++){
            var subCat = catList[i].subCategories[j];
            subCat._id = new ObjectID();
            for (var h = 0; h < subCat.items.length; h++){
                var item = subCat.items[h];
                item._id = new ObjectID();
                item.parentIdsChain = [catList[i]._id, subCat._id];
            }
            allBooks = allBooks.concat(subCat.items);
            subCat.items = null;
            delete subCat.items;
        }
    }
    if (catList[i].items != null){
        for (var m = 0; m < catList[i].items.length; m++){
            var item = catList[i].items[m];
            item._id = new ObjectID();
            item.parentIdsChain = [catList[i]._id];
        }
        allBooks = allBooks.concat(catList[i].items);
        catList[i].items = null;
        delete catList[i].items;
    }
}

module.exports = function(){
    this.categories = [cat1, cat2, cat3];
    this.items = allBooks;
    this.languages = [enLang, deLang, esLang, frLang];
}