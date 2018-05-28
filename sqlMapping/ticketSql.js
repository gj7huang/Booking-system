let ticket = {
    insert: 'INSERT INTO Ticket (cus_id, m_id) VALUES(?,?)',
    // update: 'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    //queryById: "select * from Ticket where t_id=?",
    queryAll: `select t.t_id, c.cus_name, m.m_title, t.t_order_time
                from Ticket t
                Inner Join Customer c on c.cus_id=t.cus_id
                Inner Join Movie m on m.m_id=t.m_id
                Order By t.t_order_time desc`
};

export default ticket;