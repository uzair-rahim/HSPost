<div class="picture">
	{{#if_not_null message.sender.photo}}
		<img src="{{message.sender.photo.url}}"/>
	{{/if_not_null}}
</div>
<div class="text">
	<div class="name">{{message.sender.firstname}} {{message.sender.lastname}}</div>
	<div class="message">{{message.chatMessageContent.text}}</div>
	<div class="date">{{formatDate message.chatMessageContent.updated}}</div>
</div>