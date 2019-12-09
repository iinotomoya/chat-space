$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.main_chat__contents__content').last().data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildMessage(message)
      });
      $('.main_chat__contents').append(insertHTML);
      $('.main_chat__contents').animate({ scrollTop: $('.main_chat__contents')[0].scrollHeight});
    })

    .fail(function() {
      alert("エラー");
    })
  };

  var buildMessage = function(message) {
    if (message.message && message.image) {
      var html = `<div class="main_chat__contents__content" data-id = ${message.id}>
                    <div class="main_chat__contents__content__nickname">
                      ${message.user_name}
                      <div class="main_chat__contents__content__nickname--today">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.message}
                      </p>
                    </div>
                    <div class="lower-message">
                      <img src=" ${message.image} " class="lower-message__image" >
                    </div>
                  </div>`
      return html;
    } else if (message.message) {
      var html = `<div class="main_chat__contents__content" data-id = ${message.id}>
                    <div class="main_chat__contents__content__nickname">
                      ${message.user_name}
                      <div class="main_chat__contents__content__nickname--today">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.message}
                      </p>
                    </div>
                  </div>`

      return html;
    } else {
      var html = `<div class="main_chat__contents__content" data-id = ${message.id}>
                    <div class="main_chat__contents__content__nickname">
                      ${message.user_name}
                      <div class="main_chat__contents__content__nickname--today">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img src=" ${message.image} " class="lower-message__image" >
                    </div>
                  </div>`
      return html;
    };
  };

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

  if (document.URL.match(/messages/) ){
    setInterval(reloadMessages, 7000);
  }
})