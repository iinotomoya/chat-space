$(function(){

  function buildMessage(message){
    var html = `<div class="main_chat__contents__content">
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

    return html
  }

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
      $('#message_message').val('')
      $(".form__button").removeAttr("disabled");
    })
    
    .fail(function(){
      alert("エラー");
    })
    
    .always(() => {
    });
  })
})