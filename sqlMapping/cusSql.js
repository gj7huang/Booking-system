let cus = {
    // insert: 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    // update: 'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    // queryById: 'select * from Customer where cus_id=?',
    // queryAll: 'select * from Customer',
    queryList: `CALL getCusList()`
};

export default cus;