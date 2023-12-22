$(function(){
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar, #content").toggleClass("active");
        $(".collapse.in").toggleClass("in");
        $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });

    getListData()
    $("#delete-btn").on("click",function(){
        axios.get("/to-do-list/the-newest-id")
             .then(function(response){
                var newToDoId = String(Number(response.data.result)-1);
                
                $("#to-do-id").val(newToDoId);
                var to_do_id  = $("#to-do-id").val();
                var doubleCheck = confirm("您確定刪除 "+ to_do_id +" 最新的待辦細項 ?");
                if(doubleCheck) deleteToDoItem(to_do_id);
             })
             .catch(function(err){
                console.log(err);
             });       
        
    });
});


async function getListData(){
    try {
        const response = await axios.get("/to-do-list/list/list");
        console.log(response.data.result);
        var data = response.data.result;
        createTable(data);
      
      } catch (error) {
        console.error(error);
      }
};



function createTable(data){
    data = data || [
        {
            to_do_id  : "10001",
            subject   : "晨會",
            time    : "2020-10-24 09:00",
            brief : "午餐負責人",
            level   : 3 ,
            author  : "傑夫"
        },
        {
            to_do_id  : "10002",
            subject   : "下午茶",
            time    : "2020-10-24 12:30",
            brief : "50嵐 VS 可不可熟成",
            level   : 8 ,
            author  : "Leo"
        },
        {
            to_do_id  : "10003",
            subject   : "客戶拜訪",
            time    : "2020-10-24 16:20",
            brief : "陽明山上的阿婷來訪",
            level   : 7 ,
            author  : "小魚"
        },
        {
            to_do_id  : "10004",
            subject   : "晨會",
            time    : "2020-10-25 09:00",
            brief : "午餐自行處理",
            level   : 1 ,
            author  : "傑夫"
        },
        {
            to_do_id  : "10005",
            subject   : "下午茶",
            time    : "2020-10-25 13:00",
            brief : "京盛宇限定",
            level   : 5 ,
            author  : "Leo"
        },
    ];


    var dataTemplate = data.map(function(ele,i){
        return `<tr>
                    <th scope="row">
                    ${ele.to_do_id}</th>
                    <td>${ele.subject}</td>
                    <td>"2020-10-24 09:00"</td>
                    <td>"2020-10-24 09:00"</td>
                    <td>
                    ${(new Array(ele.level)).fill(0).map(function(_){ return `<i class="fas fa-bell bell-icon"></i>`}).join("\n")}
                </td>
                    <td> ${ele.author}</td>                
                                </tr>`;
    }).join("");
    document.getElementById('to-do-list-table').innerHTML +=dataTemplate;
};

function deleteToDoItem(to_do_id){

    axios.delete("/to-do-list/detail/"+to_do_id)
         .then(function(response){
             if(response.data.message === "ok."){
                 alert("刪除完成！");
                 location.href = "/to-do-list/list";
             };
         })
         .catch(function(err){
            if(err.response && err.response.status === 404){
                alert("找不到該 API !");
                return;
            };
         });
};