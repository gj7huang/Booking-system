let ticket = {
    insert: `CALL bookTicket(?,?)`,
    // update: 'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    //queryById: "select * from Ticket where t_id=?",
    queryAll: `CALL getTicketList()`
};

export default ticket;