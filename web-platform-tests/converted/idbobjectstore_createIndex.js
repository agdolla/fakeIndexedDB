require("../../build/global.js");
const {
    add_completion_callback,
    assert_array_equals,
    assert_equals,
    assert_false,
    assert_not_equals,
    assert_throws,
    assert_true,
    async_test,
    createdb,
    createdb_for_multiple_tests,
    fail,
    indexeddb_test,
    setup,
    test,
} = require("../support-node.js");

const document = {};
const window = global;


    var db,
      t = async_test();

    var open_rq = createdb(t);
    open_rq.onupgradeneeded = function(e) {
        db = e.target.result;
        var objStore = db.createObjectStore("store");
        var index = objStore.createIndex("index", "indexedProperty", { unique: true });

        assert_true(index instanceof IDBIndex, "IDBIndex");
        assert_equals(index.name, "index", "name");
        assert_equals(index.objectStore, objStore, "objectStore");
        assert_equals(index.keyPath, "indexedProperty", "keyPath");
        assert_true(index.unique, "unique");
        assert_false(index.multiEntry, "multiEntry");

        t.done();
    };