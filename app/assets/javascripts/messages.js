$(function(){

  function buildMessage(message){
    var html = `<div class="main_chat__contents__content">
                  <div class="main_chat__contents__content__nickname">
                    ${message.message}
                  </div>
                  <div class="main_chat__contents__content__nickname--today">
                    ${message.created_at}
                  </div>
                </div>`
    return html
  }
  // function buildCreated_at(message){
  //   var html = `<div class="main_chat__contents__content">
  //               </div>`
  //   return html
  // }


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
      // var html = buildCreated_at(message)
      // $('.main_chat__contents').append(html)

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