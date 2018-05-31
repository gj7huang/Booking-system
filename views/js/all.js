function readyFunc() {
    initOpt();
    updateTicketList();
    $("#book-btn").click(book);

}

function initOpt() {
    $.ajax({
        url: '/customerList',
        type: 'get',
        dataType: 'json',
    })
    .done(res => {
        // console.log(res)
        res.map(el => {
            $('#cus_box').append(`<option value="${el.cus_id}">${el.cus_name}</option>`);
        });
    })
    
    $.ajax({
        url: '/movieList',
        type: 'get',
        dataType: 'json',
    })
    .done(res => {
        // console.log(res)
        res.map(el => {
            $('#mov_box').append(`<option value="${el.m_id}">${el.m_title}</option>`);
        });
    })

}

function updateTicketList() {
    $.ajax({
        url: '/ticketList',
        type: 'GET',
        dataType: 'json'
    })
    .done(res => {
        // console.log(res);
        $("#ticket-list").html('');
        res.map((el) => {
            $("#ticket-list").append(`
                <div class="ticket">
                    <div class="ticket-header">
                        <a>Ticket ID</a></br>
                        <a>Customer</a></br>
                        <a>Movie Title</a></br>
                        <a>Order Time</a>
                    </div>
                    <div class="ticket-detail">
                        <a class="t-id">${el.t_id}</a></br>
                        <a class="cus_name">${el.cus_name}</a></br>
                        <a class="m_title">${el.m_title}</a></br>
                        <a class="t_order_time">${moment(el.t_order_time).format("MMMM Do YYYY, h:mm:ss a")}</a>
                    </div>
                </div>
            `);
        });
    })
}

function book() {
    let cusOpt = $('#cus_box').val();
    let movOpt = $("#mov_box").val();
    if(!(cusOpt === null || movOpt === null)) {
        $.ajax({
            url: '/bookTicket',
            type: 'POST',
            dataType: 'json',
            data: {
                cus: cusOpt,
                mov: movOpt
            }
        })
        .done(res => {
            // console.log(res);
            updateTicketList();
        })
    }
};


$(document).ready(readyFunc);
