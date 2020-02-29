$(function(){
  function buildHTML(messages){
    if ( message.image ) {
      var html =
       `<div class="messages">
          <div class="messages-main">
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
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="messages">
          <div class="messages-main">
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
          </div>
        </div>`
      return html;
    };
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
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-messages').append(html);  
        $('input-box_text')[0].reset('');
        $('.chat-messages').animate({ scrollTop: $('.new_messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
})
});