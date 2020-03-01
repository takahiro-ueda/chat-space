$(function(){
  function buildHTML(message){
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
});