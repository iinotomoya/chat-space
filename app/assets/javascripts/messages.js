$(function(){
//////////////////////////////////////////////////////////////////////////////////////////////////////
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let element = document.getElementById('element');
    console.log(element)
    var last_message_id = element.dataset.id  

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "/groups/last_message_id/api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };


  ///////////////////////////////////////////////////////////////////////////////////////////////////
  function buildMessage(message){ 

    if (message.content && message.image) {
      var html = `<div class="main_chat__contents__content" data-id = ${message.id} id = "element">
      <div class="main_chat__contents__content__nickname">
        ${message.user_name}
        <div class="main_chat__contents__content__nickname--today">
          ${message.created_at}
        </div>
      </div>

      <div class="main_chat__contents__content__coment">
        ${message.message}
      </div>
    </div>`

    } else if (message.content) {


    } else if (message.image) {


    };

    // var html = `<div class="main_chat__contents__content" data-id = ${message.id} id = "element">
    //               <div class="main_chat__contents__content__nickname">
    //                 ${message.user_name}
    //                 <div class="main_chat__contents__content__nickname--today">
    //                   ${message.created_at}
    //                 </div>
    //               </div>

    //               <div class="main_chat__contents__content__coment">
    //                 ${message.message}
    //               </div>
    //             </div>`
    return html;
  };



    // var buildHTML = function(message) {
    //   if (message.content && message.image) {
    //     //data-idが反映されるようにしている
    //     var html = `<div class="message" data-message_id=` + message.id + `>` +
    //       `<div class="upper-message">` +
    //         `<div class="upper-message__user-name">` +
    //           message.user_name +
    //         `</div>` +
    //         `<div class="upper-message__date">` +
    //           message.created_at +
    //         `</div>` +
    //       `</div>` +
    //       `<div class="lower-message">` +
    //         `<p class="lower-message__content">` +
    //           message.content +
    //         `</p>` +
    //         `<img src="` + message.image + `" class="lower-message__image" >` +
    //       `</div>` +
    //     `</div>`
    //   } else if (message.content) {
    //     //同様に、data-idが反映されるようにしている
    //     var html = `<div class="message" data-message_id=` + message.id + `>` +
    //       `<div class="upper-message">` +
    //         `<div class="upper-message__user-name">` +
    //           message.user_name +
    //         `</div>` +
    //         `<div class="upper-message__date">` +
    //           message.created_at +
    //         `</div>` +
    //       `</div>` +
    //       `<div class="lower-message">` +
    //         `<p class="lower-message__content">` +
    //           message.content +
    //         `</p>` +
    //       `</div>` +
    //     `</div>`
    //   } else if (message.image) {
    //     //同様に、data-idが反映されるようにしている
    //     var html = `<div class="message" data-message_id=` + message.id + `>` +
    //       `<div class="upper-message">` +
    //         `<div class="upper-message__user-name">` +
    //           message.user_name +
    //         `</div>` +
    //         `<div class="upper-message__date">` +
    //           message.created_at +
    //         `</div>` +
    //       `</div>` +
    //       `<div class="lower-message">` +
    //         `<img src="` + message.image + `" class="lower-message__image" >` +
    //       `</div>` +
    //     `</div>`
      // 



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message)
      $('.main_chat__contents').append(html)
      $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
      $('#new_message')[0].reset()
    })
    
    .fail(function(){
      alert("エラー");
    })
    
    .always(() => {
      $(".form__button").removeAttr("disabled");
      $('#new_message')[0].reset()
    });
  })

  setInterval(reloadMessages, 7000);
})