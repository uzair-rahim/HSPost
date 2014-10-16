<div class="picture">
	{{#if_not_null summary.photo}}
		<img src="{{summary.photo.url}}"/>
	{{/if_not_null}}
</div>
<div class="info">
	<div class="name">{{summary.name}}</div>
	<div class="message {{summary.type}}">{{summary.message}}</div>
</div>