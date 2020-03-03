$(function(){
  var buildHTML = function(message) {
  
    if (message.content && message.image) {
      var html = `<div class="messages" data-message-id= ${message.id}>
        <div class="messages-main">
          <div class="messages-main__box">
            <div class="messages-main__box__name">
              ${message.user_name}
            </div>
            <div class="messages-main__box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages-main__text">
            <p class="messages-main__text__content">
              ${message.content}
            </p>
            <img src=${message.image}> 
          </div>
        </div>
      </div>`
      
    } else if (message.content) {
      var html = `<div class="messages" data-message-id=${message.id}>
        <div class="messages-main">
          <div class="messages-main__box">
            <div class="messages-main__box__name">
              ${message.user_name }
            </div>
            <div class="messages-main__box__date">
              ${message.created_at}
            </div>
          </div>
          <div class="messages-main__text">
            <p class="messages-main__text__content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>`
    
    } else if (message.image) {
      var html = `<div class="messages" data-message-id=${message.id}>
        <div class = "messages-main">
          <div class="messages-main__box">
            <div class = "messages-main__box__name">
              ${message.user_name}
            </div>
            <div class = "messages-main__box__date">
              ${message.created_at}
            </div>
          </div>
          <div class = "messages-main__text">
            <img src=${message.image} >
          </div>
        </div>
      </div>`
    };
    return html;
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
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-message').append(html);
      $('form')[0].reset();
      $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight});
        return false
    })
    .fail(function(data){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.messages:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-message').append(insertHTML);
        $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document. location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});